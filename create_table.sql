CREATE TABLE User
(
  UserID SERIAL NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  isAdmin BOOLEAN NOT NULL,
  isLandlord BOOLEAN NOT NULL,
  PRIMARY KEY (UserID),
  UNIQUE (email)
);

CREATE TABLE HousingUnit
(
  HousingUnitID SERIAL NOT NULL,
  description VARCHAR NOT NULL,
  UserID INT NOT NULL,
  PRIMARY KEY (HousingUnitID),
  FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE Listing
(
  ListingID SERIAL NOT NULL,
  dateListed DATE NOT NULL,
  dateExpires DATE NOT NULL,
  price_in_cents INT NOT NULL,
  message VARCHAR NOT NULL,
  HousingUnitID INT NOT NULL,
  PRIMARY KEY (ListingID),
  FOREIGN KEY (HousingUnitID) REFERENCES HousingUnit(HousingUnitID)
);

CREATE TABLE Certification
(
  CertificationID SERIAL NOT NULL,
  description VARCHAR NOT NULL,
  certManagerContact VARCHAR NOT NULL,
  PRIMARY KEY (CertificationID)
);

CREATE TABLE Photo
(
  PhotoID SERIAL NOT NULL,
  URL VARCHAR NOT NULL,
  HousingUnitID INT NOT NULL,
  PRIMARY KEY (PhotoID),
  FOREIGN KEY (HousingUnitID) REFERENCES HousingUnit(HousingUnitID),
  UNIQUE (URL)
);

CREATE TABLE Rating
(
  RatingID SERIAL NOT NULL,
  stars INT NOT NULL,
  text VARCHAR NOT NULL,
  HousingUnitID INT NOT NULL,
  UserID INT NOT NULL,
  PRIMARY KEY (RatingID),
  FOREIGN KEY (HousingUnitID) REFERENCES HousingUnit(HousingUnitID),
  FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE Flag
(
  FlagID SERIAL NOT NULL,
  reason VARCHAR NOT NULL,
  ListingID INT,
  RatingID INT,
  UserID INT NOT NULL,
  PRIMARY KEY (FlagID),
  FOREIGN KEY (ListingID) REFERENCES Listing(ListingID),
  FOREIGN KEY (RatingID) REFERENCES Rating(RatingID),
  FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE HousingUnitHasCertification
(
  HousingUnitID INT NOT NULL,
  CertificationID INT NOT NULL,
  PRIMARY KEY (HousingUnitID, CertificationID),
  FOREIGN KEY (HousingUnitID) REFERENCES HousingUnit(HousingUnitID),
  FOREIGN KEY (CertificationID) REFERENCES Certification(CertificationID)
);
