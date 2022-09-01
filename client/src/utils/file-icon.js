export const fileIcon = (fileName) => {
    const ext = fileName.split('.')[1] 
    if(ext === undefined || null){
      return  'https://codedamn.com/assets/images/svg/folder.svg'
    }else{
        switch(ext){
            case 'html': return 'https://codedamn.com/assets/images/svg/html5.svg';
            break;
            case 'css': return 'https://codedamn.com/assets/images/svg/css3.svg';
            break;
            case 'json': return 'https://codedamn.com/assets/images/svg/json.svg'
            break;
            case 'js': return 'https://codedamn.com/assets/images/svg/javascript.svg'
            break;
            case 'jsx': return 'https://codedamn.com/assets/images/svg/javascript.svg'
            break;
            default: return 'https://codedamn.com/assets/images/svg/file.svg'
        }
    }
}

export const fileLanguage = (ext) => {
    if(ext === undefined || null){
      return 'javascript'
    }else{
        switch(ext){
            case 'html': return 'html';
            break;
            case 'css': return 'css';
            break;
            case 'json': return 'json'
            break;
            case 'js': return 'javascript'
            break;
            case 'ts': return 'typescript'
            break;
            default: return 'javascript'
        }
    }
}