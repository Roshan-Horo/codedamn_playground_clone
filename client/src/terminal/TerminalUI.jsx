import React, { useRef,useEffect, useContext } from 'react'
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css'
import './TerminalUI.css'

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