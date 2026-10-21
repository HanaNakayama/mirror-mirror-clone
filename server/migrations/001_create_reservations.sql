CREATE TABLE reservations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  selected_place TEXT NOT NULL DEFAULT '',
  ceremony_date TEXT NOT NULL,
  ceremony_place TEXT NOT NULL DEFAULT '',
  party_place TEXT NOT NULL DEFAULT '',
  bride_last_name TEXT NOT NULL DEFAULT '',
  bride_first_name TEXT NOT NULL DEFAULT '',
  bride_last_name_furigana TEXT NOT NULL DEFAULT '',
  bride_first_name_furigana TEXT NOT NULL DEFAULT '',
  bride_birth_date TEXT NOT NULL,
  dress_size TEXT NOT NULL CHECK (dress_size IN ('S', 'M', 'L')),
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'contacted', 'completed', 'cancelled')),
  submitted_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX reservations_submitted_at_idx
  ON reservations (submitted_at DESC, id DESC);
