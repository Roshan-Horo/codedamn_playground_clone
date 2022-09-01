import React from 'react'
import Split from 'react-split'
import './SplitContainer.css'
import TerminalUI from '../terminal/TerminalUI.jsx'
import MultiModelEditor from '../editor/MultiModelEditor.jsx'
import Files from '../files/Files.jsx'
import initSocket from '../utils/Socket.js'
import { OUTPUT_URL } from '../config.js'

// initialize web socket client
const io = initSocket();

const SplitContainer = () => {
    return (
      <>
       <Split 
       className="container"
       sizes={[15, 55, 30]}
    minSize={0}
    expandToMin={false}
    gutterSize={5}
    gutterAlign="center"
    snapOffset={30}
    dragInterval={1}
    direction="horizontal"
    cursor="col-resize"

       >
         <div className="files"><Files io={io} /></div>
         <Split 
          className="editorContainer"
          sizes={[80,20]}
            minSize={0}
            expandToMin={false}
            gutterSize={5}
            gutterAlign="center"
            snapOffset={30}
            dragInterval={1}
            direction="vertical"
            cursor="col-resize"
         >
           <div className="editor"><MultiModelEditor io={io} /></div>
           <div className="terminal"><TerminalUI io={io} /></div>
         </Split>

         <div className="output">
          <div className="outputHeader">
           <div 
            className="outputRefresh"
            // onClick={() => window.location.reload(false)}
           >re</div>
           <div className="outputUrl">{OUTPUT_URL}</div>
           <div 
            className="outputTab"
            onClick={() => window.open(OUTPUT_URL, '_blank')}
           >-&gt;</div>
          </div>
          <iframe
           src={OUTPUT_URL}
          >
          </iframe>
         </div>
       </Split>
      </>
    )
}

export default SplitContainer