const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const fileUrls = [
  "https://stackoverflow.com",
  "https://github.com",
  "https://youtube.com",
];

const dirUrls = [
  "https://google.com",
  "https://coinmarketcap.com",
  "https://duckduckgo.com",
];

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/greeting', cors(corsOptions), (req, res) => {
  const { url } = req?.query || '';
  res.setHeader('Content-Type', 'application/json');

  if (fileUrls.indexOf(url) !== -1) {
    res.json(JSON.stringify({ type: 'file' }));
  } else if (dirUrls.indexOf(url) !== -1) {
    res.json(JSON.stringify({ type: 'directory' }));
  } else {
    res.json(JSON.stringify({ type: 'unknown' }));
  }
});

app.listen(3001, () => console.log('Express server is running on localhost:3001'));
