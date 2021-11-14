const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/greeting', cors(corsOptions), (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.json(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(3001, () => console.log('Express server is running on localhost:3001'));
