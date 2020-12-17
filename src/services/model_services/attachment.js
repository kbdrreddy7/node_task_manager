const {attachment:folderDetails}=require('../../config')

// models
const { Attachment } = require("../../models")

// services
const globalService = require("./global")
const fileService = require("../fileService")
const utilService = require("../util")


const readFile = ({ group, subGroup, name }, callBack)=>{
    
    let fullName = getFullName({ group, subGroup, name })

    return fileService.readFile({ name: fullName }, (result) => {
        /*
            save attachment details in attachment table
         */

        return callBack(result)

    })

}

const getFilePath = ({ group, subGroup, name})=>{
    let fullName = getFullName({group,subGroup,name})
    if (!fileService.isFileExists({ path:fullName}))
      return ({status:false,error:"File doesn't exists"})
    return ({status:true,filePath:fullName})  
}

const uploadFile = ({ group, subGroup, name,file},callBack)=>{


    let extension=getFileExtension({file})
    let id = utilService.generateObjectId(Attachment)
    if(!name)
        name = `${id}${extension}`

   let fullName= getFullName({ group, subGroup, name})


    if (fileService.isFileExists({path:fullName}))
       return callBack({ status: false, error:'File already exists'})

return fileService.saveFile({name:fullName,file},(result)=>{

    if (!result.status)
        return callBack(result)
    /*
        save attachment details in attachment table
     */

    return callBack({ ...result, name, url: `${group}/${subGroup}/${name}` })

   })
    
}

const editFile = ({ group, subGroup, name, file }, callBack)=>{

    let  fullName  = getFullName({ group, subGroup, name })

    if (!fileService.isFileExists({ path:fullName}))
        return callBack({ status: false, error: "File doesn't exists" })

   return fileService.deleteFile({ name: fullName, file }, (deleteResult)=>{

        if (!deleteResult.status)
            return callBack(deleteResult)


       //new file may be different format/type   jpg--> png
       let oldExtension = name.includes(".") ? `.${name.split('.').pop()}` : ""
       let newExtension = getFileExtension({ file })

       if (oldExtension !== newExtension) {
           name = name.replace(oldExtension, "")
           name = name + newExtension
           //name = name.replace(oldExtension, newExtension) // this won't work...some may doesn't have extension
           fullName = getFullName({ group, subGroup, name })
       }

       return fileService.saveFile({ name: fullName, file },(result)=>{
           if (!result.status)
               return callBack(result)
           /*
               edit attachment details in attachment table
           */

           return callBack({ ...result, name, url: `${group}/${subGroup}/${name}` })  
       })
         
    })
   
}

const deleteFile = ({ group, subGroup, name }, callBack)=>{
    let fullName = getFullName({ group, subGroup, name })

    if (!fileService.isFileExists({ path:fullName}))
        return callBack({ status: false, error: "File doesn't exists" })

    return fileService.deleteFile({ name: fullName },(result)=>{
        /* 
        delet attachment details in attachment table
        */
        return callBack(result)
    })
  
}


const getFullName = ({ group, subGroup, name }) => `${folderDetails[group][subGroup]}/${name}`



const getFileExtension=({file})=>{
    let type = file.mimetype.split("/")[1]
    return type === "octet-stream" ? "" : `.${type}`
  
}

module.exports={
    readFile,
    getFilePath,
    uploadFile,
    editFile,
    deleteFile,

    //
    getFullName,
    getFileExtension
}