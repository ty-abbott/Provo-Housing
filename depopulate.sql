DELETE FROM "User"
WHERE email = 'buttocks@buttocks.org'
AND password = 'notanactualhash'
AND isAdmin = FALSE
AND isLandlord = TRUE;

DELETE FROM "HousingUnit"
WHERE description = 'A house';

DELETE FROM "Listing"
WHERE dateExpires = date '2021-02-05'
AND price_in_cents = 74999
AND message = 'We are listing!';

DELETE FROM "Certification"
WHERE description = 'a cert'
AND certManagerContact = 'call 123-456-7890';

DELETE FROM "Photo"
WHERE URL = 'example.com';

DELETE FROM "Rating"
WHERE stars = 2
AND text = 'not great';

DELETE FROM "Flag"
WHERE reason = 'it bad';

DELETE FROM "Flag"
WHERE reason = 'it bad too';

DELETE FROM "HousingUnitHasCertification"
WHERE HousingUnitID, CertificationID)
VALUES (housing_unit_id, certification_id);

