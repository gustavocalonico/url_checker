const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const whitelist = ['http://localhost', 'http://localhost:3000'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const fileUrls = [
  "http://file",
  "https://stackoverflow.com",
  "https://github.com",
  "https://youtube.com",
];

const dirUrls = [
  "http://directory",
  "https://google.com",
  "https://coinmarketcap.com",
  "https://duckduckgo.com",
];

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/greeting', cors(corsOptions), (req, res) => {
  // Timeout with 500 ms floor
  const timeout = ((0.5 + Math.random()) * 2) * 1000;

  const { url } = req?.query || '';
  res.setHeader('Content-Type', 'application/json');
  res.setTimeout(timeout, () => {
    if (fileUrls.indexOf(url) !== -1) {
      res.json(JSON.stringify({ type: 'file' }));
    } else if (dirUrls.indexOf(url) !== -1) {
      res.json(JSON.stringify({ type: 'directory' }));
    } else {
      res.json(JSON.stringify({ type: 'unknown' }));
    }
  });
});

app.listen(3001, () => console.log('Express server is running on localhost:3001'));
