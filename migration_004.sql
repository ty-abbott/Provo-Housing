CREATE VIEW housingunitswithlistings AS
SELECT "HousingUnit".housingunitid, "HousingUnit".name, "HousingUnit".address, "HousingUnit".description, "Listing".listingid, "Listing".datelisted, "Listing".dateexpires, "Listing".price_in_cents, "Listing".message FROM "HousingUnit" LEFT JOIN "Listing" ON "HousingUnit".housingunitid = "Listing".housingunitid;
