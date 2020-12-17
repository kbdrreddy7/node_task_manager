const fs = require("fs")

const writeToFile = ({ name, data }, callBack)=>{

    return fs.writeFile(name, data, (err) => {
        if (err) return callBack({ status: false, error: err.message })
        return callBack({ status: true, name, message: "Uploaded Successfully" })
    })

}

const readFile = ({ name }, callBack)=>{

    return fs.readFile(name,(err,data)=>{
        if(err) return callBack({status:false,error:err.message})
        return callBack({status:true,data})
    })

}

const saveBufferToFile = ({ name, bufferData }, callBack) => {

    return fs.writeFile(name, bufferData, (err) => {
        if (err) return callBack({ status: false, error: err.message })
        return callBack({ status: true, name, message: "Uploaded Successfully" })
    })

}

const saveBase64ToFile = ({ name, base64Data }, callBack) => {

    base64Data = Buffer.from(base64Data, 'base64')
    // fs.writeFileSync(name,buff1)//('fromBase64.png', buff1);

    return fs.writeFile(name, base64Data, (err) => {
        if (err) return callBack({ status: false, error: err.message })
        return callBack({ status: true, base64data: base64Data, message: "Uploaded Successfully" })
    })

}
const deleteFile = ({ name }, callBack) => {

    return fs.unlink(name, (err) => {
        if (err) return callBack({ status: false, error: err.message })
        return callBack({ status: true, message: "Deleted Successfully" })
    })
}

const isFileExists = ({  path }) => fs.existsSync(path)

/* 
https://www.npmjs.com/package/express-fileupload

below methods are based on express-fileupload
*/

const saveFile = ({ name, file },callBack) => {

    return file.mv(name, (err) => {
        if (err) return callBack({ status: false, error: err.message })
        return callBack({ status: true, message: "Saved Successfully" })
    })

}


const editFile = ({ name, file }, callBack) => {
    return file.mv(name, (err) => {
        if (err) return callBack({ status: false, error: err.message })
        return callBack({ status: true, message: "Edited Successfully" })
    })
}







module.exports = {
    writeToFile,
    readFile,
    saveBufferToFile,
    saveBase64ToFile,
    saveFile,
    editFile,
    deleteFile,
    isFileExists
}