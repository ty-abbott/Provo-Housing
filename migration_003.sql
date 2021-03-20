CREATE VIEW PageLogin AS
SELECT UserID, email, password, isAdmin, isLandlord FROM "User";

CREATE VIEW PageRegister AS
SELECT UserID, email, password, isAdmin, isLandlord FROM "User";

CREATE VIEW PageSearchListings AS
SELECT "Listing".ListingID, "Listing".price_in_cents, "HousingUnit".name, "HousingUnit".description AS housing_unit_description, "HousingUnit".address, "Photo".URL, "Certification".description AS certification_description
FROM "HousingUnit"
JOIN "Listing" ON "Listing".HousingUnitID = "HousingUnit".HousingUnitID
JOIN "Photo" ON "Photo".HousingUnitID = "HousingUnit".HousingUnitID
JOIN "HousingUnitHasCertification" ON "HousingUnitHasCertification".HousingUnitID = "HousingUnit".HousingUnitID
JOIN "Certification" ON "Certification".CertificationID = "HousingUnitHasCertification".CertificationID;

CREATE VIEW PageUploadHousingUnit AS
SELECT HousingUnitID, description, UserID FROM "HousingUnit";

CREATE VIEW PageRecentFlags AS
SELECT FlagID, reason, ListingID, RatingID, UserID FROM "Flag";

CREATE VIEW PageViewListing AS
SELECT "Listing".ListingID, "Listing".price_in_cents, "Listing".dateListed, "Listing".dateExpires, "HousingUnit".name, "HousingUnit".description AS housing_unit_description, "HousingUnit".address, "Photo".URL, "Certification".description AS certification_description, "Rating".stars
FROM "HousingUnit"
JOIN "Listing" ON "Listing".HousingUnitID = "HousingUnit".HousingUnitID
JOIN "Photo" ON "Photo".HousingUnitID = "HousingUnit".HousingUnitID
JOIN "HousingUnitHasCertification" ON "HousingUnitHasCertification".HousingUnitID = "HousingUnit".HousingUnitID
JOIN "Certification" ON "Certification".CertificationID = "HousingUnitHasCertification".CertificationID
JOIN "Rating" ON "Rating".HousingUnitID = "HousingUnit".HousingUnitID;

CREATE VIEW PageViewOwnListings AS
SELECT "Listing".ListingID, "Listing".price_in_cents, "Listing".dateListed, "Listing".dateExpires, "HousingUnit".name, "HousingUnit".description AS housing_unit_description, "HousingUnit".address, "Photo".URL, "Certification".description AS certification_description, "Rating".stars
FROM "HousingUnit"
JOIN "Listing" ON "Listing".HousingUnitID = "HousingUnit".HousingUnitID
JOIN "Photo" ON "Photo".HousingUnitID = "HousingUnit".HousingUnitID
JOIN "HousingUnitHasCertification" ON "HousingUnitHasCertification".HousingUnitID = "HousingUnit".HousingUnitID
JOIN "Certification" ON "Certification".CertificationID = "HousingUnitHasCertification".CertificationID
JOIN "Rating" ON "Rating".HousingUnitID = "HousingUnit".HousingUnitID;
