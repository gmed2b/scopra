if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

const path = require('path');
const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap-icons/font')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use(express.static('public'));

https.createServer({
  key: fs.readFileSync('.privkey.pem'),
  cert: fs.readFileSync('.cert.pem')
}, app).listen(3000);