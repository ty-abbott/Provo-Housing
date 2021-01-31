DO $$

	DECLARE user_id INT;
	DECLARE housing_unit_id INT;
	DECLARE listing_id INT;
	DECLARE certification_id INT;
	DECLARE rating_id INT;
BEGIN

	INSERT INTO "User" (email, password, isAdmin, isLandlord)
	VALUES ('something@classy.org', 'notanactualhash', FALSE, TRUE)
	RETURNING UserID INTO user_id;

	INSERT INTO "HousingUnit" (description, UserID)
	VALUES ('A house', user_id)
	RETURNING HousingUnitID INTO housing_unit_id;

	INSERT INTO "Listing" (dateListed, dateExpires, price_in_cents, message, HousingUnitID)
	VALUES (now(), date '2021-02-05', 74999, 'We are listing!', housing_unit_id)
	RETURNING ListingID INTO listing_id;

	INSERT INTO "Certification" (description, certManagerContact)
	VALUES ('a cert', 'call 123-456-7890')
	RETURNING CertificationID INTO certification_id;

	INSERT INTO "Photo" (URL, HousingUnitID)
	VALUES ('example.com', housing_unit_id);

	INSERT INTO "Rating" (stars, text, HousingUnitID, UserID)
	VALUES (2, 'not great', housing_unit_id, user_id)
	RETURNING RatingID INTO rating_id;

	INSERT INTO "Flag" (reason, ListingID, UserID)
	VALUES ('it bad', listing_id, user_id);

	INSERT INTO "Flag" (reason, RatingID, UserID)
	VALUES ('it bad too', rating_id, user_id);

	INSERT INTO "HousingUnitHasCertification" (HousingUnitID, CertificationID)
	VALUES (housing_unit_id, certification_id);

END;
$$;
