ALTER TABLE reservations ADD COLUMN ceremony_year INTEGER;
ALTER TABLE reservations ADD COLUMN ceremony_month INTEGER;
ALTER TABLE reservations ADD COLUMN ceremony_day INTEGER;
ALTER TABLE reservations ADD COLUMN bride_birth_year INTEGER;
ALTER TABLE reservations ADD COLUMN bride_birth_month INTEGER;
ALTER TABLE reservations ADD COLUMN bride_birth_day INTEGER;
ALTER TABLE reservations ADD COLUMN height_cm INTEGER;
ALTER TABLE reservations ADD COLUMN shoe_size INTEGER;
ALTER TABLE reservations ADD COLUMN phone_number INTEGER;
ALTER TABLE reservations ADD COLUMN email TEXT;
ALTER TABLE reservations ADD COLUMN groom_last_name TEXT;
ALTER TABLE reservations ADD COLUMN groom_first_name TEXT;
ALTER TABLE reservations ADD COLUMN groom_last_name_furigana TEXT;
ALTER TABLE reservations ADD COLUMN groom_first_name_furigana TEXT;

UPDATE reservations
SET
  ceremony_year = CAST(substr(ceremony_date, 1, 4) AS INTEGER),
  ceremony_month = CAST(substr(ceremony_date, 6, 2) AS INTEGER),
  ceremony_day = CAST(substr(ceremony_date, 9, 2) AS INTEGER),
  bride_birth_year = CAST(substr(bride_birth_date, 1, 4) AS INTEGER),
  bride_birth_month = CAST(substr(bride_birth_date, 6, 2) AS INTEGER),
  bride_birth_day = CAST(substr(bride_birth_date, 9, 2) AS INTEGER);
