import React, {useState, useEffect} from 'react'
import './File.css'
import { fileIcon } from '../utils/file-icon.js'
import { PARENT_FOLDER } from '../config.js'

const File = ({ file, handleFileClick }) => {
    let fileLogo = fileIcon(file)
    const [isDelBtnShown, setIsDelBtnShown] = useState(false)

    useEffect(() => {},[isDelBtnShown])

    function handleFileDelete(fileName){
        console.log(fileName)
    }

    return (
        <div className="fileContainer"
         onMouseEnter={() => setIsDelBtnShown(true)}
         onMouseLeave={() => setIsDelBtnShown(false)}
         onClick={() => handleFileClick(file)}
        >

         <div className="fileLogo">
          <img src={fileLogo} />
         </div>
         <div className="fileName">{file.split(`${PARENT_FOLDER}/`)[1]}</div>
         <div className={isDelBtnShown ? "fileDelete" : "fileDelete displayNone"}>
            <button 
             onClick={() => handleFileDelete(file)}
            >X</button>
         </div>
         
        </div>
    )
}

export default File