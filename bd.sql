CREATE TABLE name (
    name_id SERIAL PRIMARY KEY,
    title varchar(64),
    first varchar(64),
    last varchar(64)
);

CREATE TABLE street (
    street_id SERIAL PRIMARY KEY,
    number int,
    name varchar(64)
);

CREATE TABLE coordinates (
    coordinates_id SERIAL PRIMARY KEY,
    latitude varchar(64),
    longitude varchar(64)
);

CREATE TABLE timezone (
    timezone_id SERIAL PRIMARY KEY,
    offsett varchar(64),
    description varchar(255)
);

CREATE TABLE login (
    login_id SERIAL PRIMARY KEY,
    uuid varchar(255),
    username varchar(64),
    password varchar(64),
    salt varchar(64),
    md5 varchar(255),
    sha1 varchar(255),
    sha256 varchar(255)
    
);

CREATE TABLE dob (
    dob_id SERIAL PRIMARY KEY,
    date timestamp,
    age int
    
);

CREATE TABLE registered (
    registered_id SERIAL PRIMARY KEY,
    date timestamp,
    age int
);

CREATE TABLE ids (
    ids_id SERIAL PRIMARY KEY,
    name varchar(255),
    value varchar(255)
);
CREATE TABLE picture (
    picture_id SERIAL PRIMARY KEY,
    large varchar(255),
    medium varchar(255),
    thumbnail varchar(255)
);

CREATE TABLE location (
    location_id SERIAL PRIMARY KEY,
    street int REFERENCES street(street_id),
    city varchar(64),
    state varchar(64),
    country varchar(64),
    postcode varchar(64),
    coordinates int REFERENCES coordinates(coordinates_id),
    timezone int REFERENCES timezone(timezone_id)
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    gender varchar(64),
    name int REFERENCES name(name_id),
    location int REFERENCES location(location_id),
    email varchar(255),
    login int REFERENCES login(login_id),
    dob int REFERENCES dob(dob_id),
    registered int REFERENCES registered(registered_id),
    phone varchar(64),
    cell varchar(64),
    id int REFERENCES ids(ids_id),
    picture int REFERENCES picture(picture_id),
    nat varchar(64)
);
CREATE TABLE info (
    info_id SERIAL PRIMARY KEY,
    seed varchar(64),
    results int,
    page int,
    version varchar(64)
);
