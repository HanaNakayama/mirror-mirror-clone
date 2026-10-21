import { timingSafeEqual } from "node:crypto";
import { createServer } from "node:http";
import { mkdirSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";

const serverDirectory = fileURLToPath(new URL(".", import.meta.url));
const dataDirectory = join(serverDirectory, "../data");
mkdirSync(dataDirectory, { recursive: true });

const database = new DatabaseSync(join(dataDirectory, "reservations.sqlite"));
database.exec("PRAGMA journal_mode = WAL;");
database.exec(`
  CREATE TABLE IF NOT EXISTS schema_migrations (
    version INTEGER PRIMARY KEY,
    applied_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
  );
`);

const migrationDirectory = join(serverDirectory, "migrations");
const appliedMigrations = new Set(
  database.prepare("SELECT version FROM schema_migrations").all().map((row) => row.version),
);

for (const filename of readdirSync(migrationDirectory).filter((name) => name.endsWith(".sql")).sort()) {
  const version = Number(filename.match(/^(\d+)_/)?.[1]);
  if (!Number.isInteger(version) || appliedMigrations.has(version)) continue;

  database.exec("BEGIN");
  try {
    database.exec(readFileSync(join(migrationDirectory, filename), "utf8"));
    database.prepare("INSERT INTO schema_migrations (version) VALUES (?)").run(version);
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
}

const insertReservation = database.prepare(`
  INSERT INTO reservations (
    selected_place,
    ceremony_date,
    ceremony_place,
    party_place,
    bride_last_name,
    bride_first_name,
    bride_last_name_furigana,
    bride_first_name_furigana,
    bride_birth_date,
    ceremony_year,
    ceremony_month,
    ceremony_day,
    bride_birth_year,
    bride_birth_month,
    bride_birth_day,
    height_cm,
    shoe_size,
    phone_number,
    email,
    groom_last_name,
    groom_first_name,
    groom_last_name_furigana,
    groom_first_name_furigana,
    dress_size
  ) VALUES (
    $selectedPlace,
    $ceremonyDate,
    $ceremonyPlace,
    $partyPlace,
    $lastName,
    $firstName,
    $lastNameFurigana,
    $firstNameFurigana,
    $birthDate,
    $ceremonyYear,
    $ceremonyMonth,
    $ceremonyDay,
    $birthYear,
    $birthMonth,
    $birthDay,
    $heightCm,
    $shoeSize,
    $phoneNumber,
    $email,
    $groomLastName,
    $groomFirstName,
    $groomLastNameFurigana,
    $groomFirstNameFurigana,
    $size
  )
`);

const selectReservations = database.prepare(`
  SELECT
    id,
    selected_place AS selectedPlace,
    ceremony_date AS ceremonyDate,
    ceremony_place AS ceremonyPlace,
    party_place AS partyPlace,
    bride_last_name AS lastName,
    bride_first_name AS firstName,
    bride_last_name_furigana AS lastNameFurigana,
    bride_first_name_furigana AS firstNameFurigana,
    bride_birth_date AS birthDate,
    ceremony_year AS ceremonyYear,
    ceremony_month AS ceremonyMonth,
    ceremony_day AS ceremonyDay,
    bride_birth_year AS birthYear,
    bride_birth_month AS birthMonth,
    bride_birth_day AS birthDay,
    height_cm AS height,
    shoe_size AS footsize,
    phone_number AS phone,
    email,
    groom_last_name AS groomLastName,
    groom_first_name AS groomFirstName,
    groom_last_name_furigana AS groomLastNameFurigana,
    groom_first_name_furigana AS groomFirstNameFurigana,
    dress_size AS size,
    status,
    submitted_at AS submittedAt
  FROM reservations
  ORDER BY submitted_at DESC, id DESC
  LIMIT ?
`);

class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(JSON.stringify(payload));
}

async function readJsonBody(request) {
  const chunks = [];
  let bytes = 0;
  const maxBytes = 64 * 1024;

  for await (const chunk of request) {
    bytes += chunk.length;
    if (bytes > maxBytes) throw new HttpError(413, "Request body is too large.");
    chunks.push(chunk);
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new HttpError(400, "Request body must be valid JSON.");
  }
}

function readText(body, field, maxLength = 200) {
  const value = body[field] ?? "";
  if (typeof value !== "string") throw new HttpError(400, `${field} must be a string.`);
  if (value.length > maxLength) throw new HttpError(400, `${field} is too long.`);
  return value.trim();
}

function readInteger(body, field, min, max) {
  const value = body[field];
  const number = typeof value === "number"
    ? value
    : typeof value === "string" && /^\d+$/.test(value.trim())
      ? Number(value)
      : NaN;

  if (!Number.isSafeInteger(number) || number < min || number > max) {
    throw new HttpError(400, `${field} must be an integer between ${min} and ${max}.`);
  }
  return number;
}

function readPhoneNumber(body) {
  const value = body.phone;
  if (typeof value === "string" && /^0\d{9,10}$/.test(value.trim())) {
    return Number(value.trim());
  }

  if (typeof value === "number" && Number.isSafeInteger(value) && /^\d{9,10}$/.test(String(value))) {
    return value;
  }

  throw new HttpError(400, "phone must be a 10- or 11-digit phone number.");
}

function readDate(body, yearField, monthField, dayField) {
  const year = readInteger(body, yearField, 1900, 2200);
  const month = readInteger(body, monthField, 1, 12);
  const day = readInteger(body, dayField, 1, 31);

  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    year < 1900 ||
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new HttpError(400, `A valid date is required for ${yearField}.`);
  }

  return {
    year,
    month,
    day,
    iso: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
  };
}

function toReservation(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new HttpError(400, "Request body must be an object.");
  }

  const size = readText(body, "size", 2);
  if (!["S", "M", "L"].includes(size)) throw new HttpError(400, "size must be S, M, or L.");
  const ceremonyDate = readDate(body, "year", "month", "day");
  const birthDate = readDate(body, "birthYear", "birthMonth", "birthDay");

  return {
    selectedPlace: readText(body, "selectedPlace"),
    ceremonyDate: ceremonyDate.iso,
    ceremonyYear: ceremonyDate.year,
    ceremonyMonth: ceremonyDate.month,
    ceremonyDay: ceremonyDate.day,
    ceremonyPlace: readText(body, "ceremonyPlace"),
    partyPlace: readText(body, "partyPlace"),
    lastName: readText(body, "lastName"),
    firstName: readText(body, "firstName"),
    lastNameFurigana: readText(body, "lastNameFurigana"),
    firstNameFurigana: readText(body, "firstNameFurigana"),
    birthDate: birthDate.iso,
    birthYear: birthDate.year,
    birthMonth: birthDate.month,
    birthDay: birthDate.day,
    heightCm: readInteger(body, "height", 130, 200),
    shoeSize: readInteger(body, "footsize", 21, 30),
    phoneNumber: readPhoneNumber(body),
    email: readText(body, "email", 320),
    groomLastName: readText(body, "groomLastName"),
    groomFirstName: readText(body, "groomFirstName"),
    groomLastNameFurigana: readText(body, "groomLastNameFurigana"),
    groomFirstNameFurigana: readText(body, "groomFirstNameFurigana"),
    size,
  };
}

function isAdminAuthorized(request) {
  const expectedToken = process.env.ADMIN_API_TOKEN;
  if (!expectedToken) return false;

  const authorization = request.headers.authorization ?? "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
  const provided = Buffer.from(token);
  const expected = Buffer.from(expectedToken);
  return provided.length === expected.length && timingSafeEqual(provided, expected);
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);

    if (request.method === "GET" && url.pathname === "/api/health") {
      sendJson(response, 200, { status: "ok" });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/reservations") {
      const reservation = toReservation(await readJsonBody(request));
      const result = insertReservation.run(reservation);
      sendJson(response, 201, { id: Number(result.lastInsertRowid) });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/admin/reservations") {
      if (!process.env.ADMIN_API_TOKEN) {
        throw new HttpError(503, "Admin API is not configured.");
      }
      if (!isAdminAuthorized(request)) throw new HttpError(401, "Unauthorized.");

      const requestedLimit = Number(url.searchParams.get("limit") ?? 50);
      const limit = Number.isInteger(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 100) : 50;
      sendJson(response, 200, { reservations: selectReservations.all(limit), limit });
      return;
    }

    sendJson(response, 404, { error: "Not found." });
  } catch (error) {
    if (!(error instanceof HttpError)) console.error("API request failed.", error);
    sendJson(response, error instanceof HttpError ? error.statusCode : 500, {
      error: error instanceof HttpError ? error.message : "Internal server error.",
    });
  }
});

const port = Number(process.env.API_PORT ?? 3001);
const host = process.env.API_HOST ?? "127.0.0.1";
server.listen(port, host, () => {
  console.log(`Reservation API listening on http://localhost:${port}`);
});
