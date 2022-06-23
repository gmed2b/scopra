if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use(express.static('public'));

app.post('/weather', (req, res) => {
  const { lat, lon } = req.body;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}`;
  request(url, (err, response, body) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(body);
    }
  });
});

http.createServer(app).listen(3001);
https.createServer({
  key: fs.readFileSync('.privkey.pem'),
  cert: fs.readFileSync('.cert.pem')
}, app).listen(3000);