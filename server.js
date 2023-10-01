import path from 'path'
import compression from 'compression'
import http from 'http'
import express from 'express'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
