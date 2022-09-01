import React, { useRef,useEffect } from 'react'
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css'
import './TerminalUI.css'
// import { io } from '../utils/Socket.js'

let term = new Terminal()
// let io = socketio.connect(SOCKET_URL, { transports: ['websocket'] });

function TerminalUI( { io } ) {
    const terminalRef = useRef()

    useEffect(() => {

    // term.setOption("theme", {
    //     background: '#202B33',
    //     foreground: '#F5F8FA'
    // })
    
    // set terminal
    term.open(terminalRef.current)
    term.resize(90, 5);
    term.write("Terminal Connected to Server")
    term.write('\r\n');
    console.log(terminalRef.current)

    })

    function listenToInput(){
        term.onData(data => {
            io.emit('input', data)
        })

        io.on('output', data => {
            term.write(data)
        })
    }

    listenToInput()

    return (
        <div className="terminal-container">
            <div className="terminal-header">
              <div>Terminal</div>
            </div>
            <div ref={terminalRef} className="terminal-div"></div>
        </div>
    )
}

export default TerminalUI