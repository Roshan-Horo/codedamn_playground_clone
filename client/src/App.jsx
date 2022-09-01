import React, {useState} from 'react'
import logo from './logo.svg'
import './App.css'
import SplitContainer from './components/SplitContainer.jsx'
// context
import FileContext from './context/FileContext.js'

function App() {
  const [allFiles, setAllFiles] = useState({})
  const [activeFile, setActiveFile] = useState()

	return (
        <FileContext.Provider value={{
            allFiles,
            setAllFiles,
            activeFile,
            setActiveFile
        }}>
        	<div className="App">
                <header>
                 <div>Saved</div>
                 <div>My Playground ( Codedamn playground Clone )</div>
                 <div className="header-share">
                  <div>share</div>
                  <div>Fork</div>
                 </div>
                </header>
                <SplitContainer />
            </div>
        </FileContext.Provider>

	)
}

export default App
