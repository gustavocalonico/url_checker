# url_checker
Simple application for checking if an Url is valid, and the content type of it. The check for url content is mocked, and can be found in `server/index.js`. You shall test the content type with the mocked urls contained in this file:

```javascript
// files
const fileUrls = [
  "https://stackoverflow.com",
  "https://github.com",
  "https://youtube.com",
];
// directories
const dirUrls = [
  "https://google.com",
  "https://coinmarketcap.com",
  "https://duckduckgo.com",
];
```

## CLI Commands
*   `npm install`: Installs dependencies

*   `npm run dev`: Run a development, HMR server

*   `npm run serve`: Run a production-like server

*   `npm run build`: Production-ready build

For testing locally, just run `npm install` then `npm run dev`.

# Screenshots

![Home](/screenshots/home.png?raw=true "Home")
![Url](/screenshots/url.png?raw=true "Url")
