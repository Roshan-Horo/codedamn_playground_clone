const socketIO = require('socket.io')
const ptyService = require('./PtyService.js')
const fs = require('fs')
const path = require('path')
const { defaultReadPath } = require('./config.js')

class SocketService {
    constructor() {
        this.socket = null;
        this.pty = null
    }

    attachServer(server){
        if(!server){
            throw new Error('Server not found')
        }

        const io = socketIO(server, {cors:{origin:"*"}})
        console.log('Created socket server. Waiting for client connection.');

        // connection event - when client connects
        io.on('connection', socket => {
            console.log('client connect to socket : ', socket.id)

          
            this.socket = socket;

            // send files and dir from default read path / init path
            let defaultReadResponse = fs.readdirSync(defaultReadPath).map(file => path.join(defaultReadPath,file))

            this.socket.emit('dir_read_output', defaultReadResponse)

        this.socket.on('disconnect', () => {
            console.log('Disconnected Socket: ', socket.id)
        })

        // create a new pty service for client
        this.pty = new ptyService(this.socket)

        // attach event listener for socket.io
        this.socket.on('input', input => {
            // runs this listener when socket receives "input" events from socket.io client
            // input event is emitted on client side when user types in terminal UI
            this.pty.write(input)
        })

        // code related to reading files
        this.socket.on('file_read', data => {

            let readPath = data;
            let readResponse;
            if(readPath.includes('.')){

               try {
                readResponse = fs.readFileSync(readPath, 'utf8');
                } catch (err) {
                console.error(err);
                }
            }else{
               readResponse = fs.readdirSync(readPath).map(file => path.join(readPath,file))
            }

            if(typeof readResponse === 'object'){
                this.socket.emit('dir_read_output', readResponse)
            }else{
                let name = readPath.split('/')[readPath.split('/').length - 1];
                let fileObj = {
                    name,
                    extName: name.split('.')[1],
                    path: readPath,
                    value: readResponse
                }
                this.socket.emit('file_read_output', fileObj)
            }

        })

        // code related to writing files
        this.socket.on('file_change', data => {
            let file = data.path;

            try{
                fs.writeFileSync(file, data.value);
            } catch(err){
                console.log(err);
            }
        })

        })

    }
}

module.exports = SocketService;