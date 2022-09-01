const http = require('http')
const SocketService = require('./SocketService')
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

// NOTE: YOU HAVE TO RUN THE SERVER ON THIS PORT ONLY. OTHERWISE THE OUTPUT ON RIGHT WILL NOT WORK
const port = 1338

const server = http.createServer(app)

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`)
    const socketService = new SocketService()
    socketService.attachServer(server)
})
