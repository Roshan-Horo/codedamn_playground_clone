const os = require('os')
const pty = require('node-pty')

class PTY {
    constructor(socket) {
        this.shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
        this.ptyProcess = null;
        this.socket = socket;

        // init pty service
        this.startPtyProcess();
    }



    startPtyProcess(){

        this.ptyProcess = pty.spawn(this.shell, [], {
            name: 'xterm-color',
            cwd: '/home/testuser/code', // starting path of the terminal
            env: process.env
        })

        // add a 'data' event listener
        this.ptyProcess.on('data', data => {
            // whenever terminal outputs any data, send data to socket.io client
            this.sendToClient(data)
        })

    }

       // send input data ( commands ) to pty
        write(data){
            this.ptyProcess.write(data)
        }

        sendToClient(data){
            // emit data to socket.io client
            this.socket.emit('output', data)
        }
}

module.exports = PTY;
