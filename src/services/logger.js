const fs=require("fs")
let LOGS_PATH=process.env.LOGS_PATH

/**
 * @param {String} msg log text that needs to be write
 * @param {String} fileName  file name...in which log text should be recorded
*/
const writeToFile=(msg,fileName)=>{

    let today=new Date()
    today=today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear()+" "+today.toLocaleTimeString()

    msg=today+"-->"+msg
    fs.writeFile(fileName,msg,(err)=>{
        if(err)
        console.log("err",err)
    })

}

/**
 * @param {String} msg  text that needs to be append
 * @param {String} fileName  file name...in which log text should be recorded
*/
const appendToFile=(msg,fileName)=>{
    let today=new Date()
    today=today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear()+" "+today.toLocaleTimeString()

    msg=today+"-->"+msg
    // appending in new line
    // first arg is file name
    fs.appendFile(fileName,`\n${msg}`,(err)=>{
        if(err)
        console.log(err)
    })

}


/**
 * @param {String} message log text that needs to be append/log
 * @param {String}[logFilePath] if not passed...today date named file will be created
*/
const log=({ message,logFilePath="",logToConsole=false})=>{

    let today=new Date()
    if(!logFilePath)
      logFilePath=today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear()+".log"


      logFilePath=LOGS_PATH+"/"+logFilePath

      if(fs.existsSync(logFilePath))
        appendToFile(message,logFilePath)
      else writeToFile(message,logFilePath)

     if(logToConsole)
       console.log(message) 

}


module.exports={log}