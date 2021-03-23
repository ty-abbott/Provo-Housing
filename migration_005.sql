CREATE OR REPLACE VIEW flagswithlistings AS
SELECT "Flag".flagid, "Flag".reason, "Flag".listingid, "Flag".userid, "Flag".creation_date, "Listing".message, "User".email, "HousingUnit".housingunitid
FROM "Flag"
LEFT JOIN "Listing" ON "Flag".listingid = "Listing".listingid
JOIN "User" ON "Flag".userid = "User".userid
JOIN "HousingUnit" ON "Listing".housingunitid = "HousingUnit".housingunitid;
