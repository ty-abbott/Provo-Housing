DO $$

	DECLARE user_id INT;
	DECLARE housing_unit_id INT;
	DECLARE listing_id INT;
	DECLARE certification_id INT;
	DECLARE rating_id INT;
BEGIN

	SELECT UserID INTO user_id FROM "User"
	WHERE email = 'something@classy.org';
	/* raw strings */

	SELECT HousingUnitID INTO housing_unit_id FROM "HousingUnit"
	WHERE UserID = user_id;
	/* Depends: UserID, HousingUnitID */

	SELECT ListingID INTO listing_id FROM "Listing"
	WHERE HousingUnitID = housing_unit_id;
	/* Depends: UserID, HousingUnitID */

	SELECT CertificationID INTO certification_id FROM "Certification"
	WHERE description = 'a cert';
	/* raw strings */

	SELECT RatingID INTO rating_id FROM "Rating"
	WHERE HousingUnitID = housing_unit_id
	AND UserID = user_id;
	/* Depends: UserID, HousingUnitID */

	DELETE FROM "Flag"
	WHERE UserID = user_id;

	DELETE FROM "Rating"
	WHERE RatingID = rating_id;

	DELETE FROM "Photo"
	WHERE HousingUnitID = housing_unit_id;

	DELETE FROM "HousingUnitHasCertification"
	WHERE HousingUnitID = housing_unit_id;

	DELETE FROM "Listing"
	WHERE ListingID = listing_id;

	DELETE FROM "HousingUnit"
	WHERE HousingUnitID = housing_unit_id;

	DELETE FROM "Certification"
	WHERE CertificationID = certification_id;

	DELETE FROM "User"
	WHERE UserID = user_id;

END;
$$;
