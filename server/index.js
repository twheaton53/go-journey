const express = require('express');
const path = require('path');
const db = require('./database/index.js');
const queries = require('./database/dbQueries.js');
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(express.static(path.join(__dirname, '../dist')));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get('/trips', (req, res) => {
  console.log('Get request for trips');
  queries.getTrips(req, res);
})

app.post('/trips/add', (req, res) => {
  console.log('Post request for trips');
  queries.addTrip(req, res);
})
