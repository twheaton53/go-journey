const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'go-journey',
  password: 'Bucsare#1!',
  port: '5432'
});

client.connect((err, res) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected to database.')
  }
});

const trips = 'Trips';
const days = 'Days';
const attending = 'Attending';
const itinerary = 'Itinerary';

const createTrips = `
  DROP TABLE IF EXISTS ${trips};
  CREATE TABLE IF NOT EXISTS ${trips} (
    id SERIAL PRIMARY KEY,
    location VARCHAR(255) NOT NULL,
    arrivalDate DATE NOT NULL,
    arrivalFlight VARCHAR(255),
    departureDate DATE NOT NULL,
    departureFlight VARCHAR(255)
  );`;

const createDays = `
  DROP TABLE IF EXISTS ${days};
  CREATE TABLE IF NOT EXISTS ${days} (
    id SERIAL PRIMARY KEY,
    id_Trips INT REFERENCES ${trips}(id),
    title VARCHAR(1000) NOT NULL,
    date DATE NOT NULL
  );`;

const createItinerary = `
  DROP TABLE IF EXISTS ${itinerary};
  CREATE TABLE IF NOT EXISTS ${itinerary} (
    id SERIAL PRIMARY KEY,
    id_Days INT REFERENCES ${days}(id),
    title VARCHAR(1000) NOT NULL,
    time TIME NOT NULL,
    notes VARCHAR(1000) NOT NULL
  );`;

const createAttending = `
  DROP TABLE IF EXISTS ${attending};
  CREATE TABLE IF NOT EXISTS ${attending} (
    id SERIAL PRIMARY KEY,
    id_Days INT REFERENCES ${days}(id),
    id_Itinerary INT REFERENCES ${itinerary}(id),
    name VARCHAR(255) NOT NULL
  );`;

client.query(createTrips)
    .then((res) => {
      console.log(`${trips} successfully created`);
      client.query(createDays)
    })
    .then((res) => {
      console.log(`${days} successfully created`);
      client.query(createItinerary)
    })
    .then((res) => {
      console.log(`${itinerary} successfully created`);
      client.query(createAttending)
    })
    .then((res) => {
      console.log(`All tables successfully created`);
    })
    .catch((err) => {
      throw err;
    });
