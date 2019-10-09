const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const dataForge = require('data-forge');
require('data-forge-fs');

const port = process.env.PORT || 5000;

const match_data = require('./match_data.js');

const app = express();
app.use(morgan('dev'));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

let loc = path.join(__dirname, './sachin_data_cleaned.csv');
app.locals.data = dataForge
  .readFileSync(loc)
  .parseCSV()
  .parseInts([
    'batting_score',
    'wickets',
    'runs_conceded',
    'catches',
    'year',
    'month',
    'day'
  ])
  .parseDates('date');

app.use('/match_data', match_data);

app.listen(port, (req, res) => {
  console.log(`server listening on port: ${port}`);
});
