const pg = require('pg');
const db = require('./index.js');

module.exports = {

  getTrips: (req, res) => {
    db.query(`SELECT * FROM Trips`, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(data.rows);
        res.end();
      }
    });
  },

  addTrip: (req, res) => {
    const body = req.body;
    const query = `INSERT INTO Trips (destination, arrivalDate, arrivalFlight, departureDate, departureFlight) VALUES ($1, $2, $3, $4, $5) RETURNING id;`;
    const args = [body.destination, body.arrivalDate, body.arrivalFlight, body.departureDate, body.departureFlight];
    const dateArgs = ['May 21, 2021', 'May 22, 2021', 'May 23, 2021'];

    db.query(query, args)
      .then((res) => {
        db.query(`INSERT INTO days (date) VALUES ($1), ($2), ($3);`, dateArgs)
      })
      .then((res) => {
        res.status(204).end();
      })
      .catch((err) => {
        res.status(404).send(err)
      });
  }
}