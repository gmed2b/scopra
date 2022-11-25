if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const path = require('path')
const fs = require('fs')
const compression = require('compression')
const http = require('http')
const express = require('express')
const app = express()
const PORT = 8010

app.use(compression())
app.use(express.json())
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap-icons/font')))
app.use('/img', express.static(path.join(__dirname, 'public/img')))
app.use(express.static('public'))

const server = http.createServer(app)
server.listen(PORT, () => console.log(`Listening on ${PORT}`))

// https.createServer({
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// }, app).listen(3000);
