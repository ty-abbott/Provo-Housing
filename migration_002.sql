ALTER TABLE "HousingUnit"
ADD COLUMN address TEXT NOT NULL,
ALTER COLUMN address SET DEFAULT '',
ADD COLUMN name TEXT NOT NULL,
ALTER COLUMN name SET DEFAULT '';

ALTER TABLE "Flag"
ADD COLUMN creation_date DATE NOT NULL,
ALTER COLUMN creation_date SET DEFAULT now();

