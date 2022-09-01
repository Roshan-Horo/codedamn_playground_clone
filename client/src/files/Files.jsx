import React, {useState, useEffect, useContext} from 'react'
import  { fullFilePath } from './filedata.js'
import File from './File.jsx'
import FileContext from '../context/FileContext.js'
import { PARENT_FOLDER, defaultOpenedFiles } from '../config.js'

function Files( { io }) {
    const { allFiles,setActiveFiles,activeFile, setActiveFile } = useContext(FileContext)
    const [files, setFiles] = useState(null)
    const [parentFolder, setParentFolder] = useState(PARENT_FOLDER)

    useEffect(() => {
        defaultOpenedFiles?.map(file => {
            io.emit('file_read', `${PARENT_FOLDER}/${file}`)
        })
    },[])

    useEffect(() => {console.log('files : ', files)},[files,parentFolder])

    io.on('dir_read_output', data => {    
        setFiles(data)
    })

    function handleFileClick(fileName){
        // setActiveFile(current)
        if(allFiles.length > 0 && fileName.includes('.')){
            setActiveFile(current => {
                return allFiles[fileName]
            })
        }else{
            setParentFolder(fileName)
        }


        io.emit('file_read', fileName)
    }

    function handleBackBtn(){
        console.log('parent_folder : ', PARENT_FOLDER)
        console.log('parent path : ', parentFolder)
        if(parentFolder !== PARENT_FOLDER){
            let parentPath = parentFolder
            let splitParts = parentPath.split('/')
            let splitLen = parentPath.includes('.') ? splitParts.length - 2 : splitParts.length - 1;
            let newParentPath = '';

            for(let i=0;i< splitLen;i++) {
                if(i !== 0){
                    newParentPath = newParentPath + '/' + splitParts[i]
                }

            }
            setParentFolder(newParentPath)
            io.emit('file_read', newParentPath)
        }

    }


	return (
		<div className="files-div">
        <div className="filesHeader">
          <div>CODE</div>
          {
              parentFolder !== PARENT_FOLDER ? <div className="filesBack" onClick={handleBackBtn}>&lt;-</div> : null
          }
        </div>
			{
                files?.map(file => <File file={file} key={file} handleFileClick={handleFileClick} />)
            }
		</div>
	)
}

export default Files
