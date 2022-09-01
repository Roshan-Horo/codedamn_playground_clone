import React,{useState, useEffect, useRef, useContext} from "react";
import files from './codeFiles.js'
import { fileLanguage } from '../utils/file-icon.js'
import Editor from "@monaco-editor/react";
import './MultiModelEditor.css'
// context
import FileContext from '../context/FileContext.js'

const MultiModelEditor = ( { io } ) => {
  const editorRef = useRef(null)
  const { allFiles, setAllFiles, activeFile, setActiveFile } = useContext(FileContext)

//   useEffect(() => {
//     editorRef.current?.focus();
//   }, [activeFile]);

  io.on('file_read_output', data => {
      data.language = fileLanguage(data.extName)
      console.log('got file : ',data)
      setAllFiles(current => {
          return Object.defineProperty(current, data.name, {value : data,
                    writable : true,
                    enumerable : true,
                    configurable : true});
      })

      setActiveFile(data)
  })

  function handleEditorChange(value, event){
      let fileObj = Object.assign({}, allFiles[activeFile.name])
      fileObj["value"] = value;
      io.emit('file_change', fileObj)
  }

  function handleActiveFileClick(fileName){
      console.log('Active file click : ', fileName)
      setActiveFile(allFiles[fileName])
  }

  return (
    <>

      <div className="filesOpened">
       {
           Object.keys(allFiles)?.map(file => 
           <div className={activeFile?.name === file ? 'activeFile' : ''} 
                key={file} 
                onClick={() => handleActiveFileClick(file)} 
            >{file}</div>)
       }
      </div>

      <Editor
        height="93%"
        theme="vs-dark"
        path={activeFile?.name}
        defaultLanguage={activeFile?.language}
        defaultValue={activeFile?.value}
        onMount={(editor) => (editorRef.current = editor)}
        onChange={handleEditorChange}
      />
    </>
  );
}

export default MultiModelEditor