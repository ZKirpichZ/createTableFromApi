const axios = require("axios").default;
const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const db = require("./bd");

async function createUser() {
  axios.get("https://randomuser.me/api/").then(async (res) => {
    results = res.data.results[0];
    datas = res.data;
    console.log('Запись успешно создана!');
    name = await db.query(
      "INSERT INTO name (title, first, last) values ($1,$2,$3) RETURNING name_id",
      [results.name.title, results.name.first, results.name.last]
    );
    street = await db.query(
      "INSERT INTO street (number, name) values ($1,$2) RETURNING street_id ",
      [results.location.street.number, results.location.street.name]
    );
    coordinates = await db.query(
      "INSERT INTO coordinates (latitude, longitude) values ($1,$2) RETURNING coordinates_id ",
      [
        results.location.coordinates.latitude,
        results.location.coordinates.longitude,
      ]
    );
    timezone = await db.query(
      "INSERT INTO timezone (offsett, description) values ($1,$2) RETURNING timezone_id ",
      [results.location.timezone.offset, results.location.timezone.description]
    );

    location = await db.query(
      "INSERT INTO location (street, city, state, country, postcode, coordinates, timezone) values ($1,$2,$3,$4,$5,$6,$7) RETURNING location_id",
      [
        street.rows[0].street_id,
        results.location.city,
        results.location.state,
        results.location.country,
        results.location.postcode,
        coordinates.rows[0].coordinates_id,
        timezone.rows[0].timezone_id,
      ]
    );
    login = await db.query(
      "INSERT INTO login (uuid, username, password, salt, md5, sha1, sha256) values ($1,$2,$3,$4,$5,$6,$7) RETURNING login_id ",
      [
        results.login.uuid,
        results.login.username,
        results.login.password,
        results.login.salt,
        results.login.md5,
        results.login.sha1,
        results.login.sha256,
      ]
    );
    dob = await db.query(
      "INSERT INTO dob (date, age) values ($1,$2) RETURNING dob_id ",
      [results.dob.date, results.dob.age]
    );

    registered = await db.query(
      "INSERT INTO registered (date, age) values ($1,$2) RETURNING registered_id ",
      [results.registered.date, results.registered.age]
    );

    id = await db.query(
      "INSERT INTO ids (name, value) values ($1,$2) RETURNING ids_id ",
      [results.id.name, results.id.value]
    );

    picture = await db.query(
      "INSERT INTO picture (large, medium, thumbnail) values ($1,$2,$3) RETURNING picture_id ",
      [results.picture.large, results.picture.medium, results.picture.thumbnail]
    );

    await db.query(
      "INSERT INTO users (gender, name, location, email, login, dob, registered, phone, cell, id, picture, nat) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
      [
        results.gender,
        name.rows[0].name_id,
        location.rows[0].location_id,
        results.email,
        login.rows[0].login_id,
        dob.rows[0].dob_id,
        registered.rows[0].registered_id,
        results.phone,
        results.cell,
        id.rows[0].ids_id,
        picture.rows[0].picture_id,
        results.nat,
      ]
    );
    await db.query(
      "INSERT INTO info (seed, results, page, version) values ($1,$2,$3,$4)",
      [
        datas.info.seed,
        datas.info.results,
        datas.info.page,
        datas.info.version,
      ]
    );
  });
}

createUser();


app.listen(PORT, () => console.log(`Server started, PORT = ${PORT}`));
