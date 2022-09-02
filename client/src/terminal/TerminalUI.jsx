import React, { useRef,useEffect, useContext } from 'react'
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css'
import './TerminalUI.css'

const SOCKET_URL = 'wss://long-century.codedamn.app:1338'

function TerminalUI({io}) {
    const terminalRef = useRef()

    let term = new Terminal()
    
    useEffect(() => {
    
    // set terminal
    console.log('init terminal')
    term.open(terminalRef.current)
    term.resize(90, 5);
    term.write("Terminal Connected to Server")
    term.write('\r\n');

    },[])

    function listenToInput(){
        term.onData(data => {
            console.log('input', data)
            io.emit('input', data)
        })

        io.on('output', data => {
            console.log('output : ', data)
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