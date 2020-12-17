
//----------- services
const loggerService=require("./logger")
const mailService=require("./mailService")


const handleError = (message)=>{

    // do handling error here
    if( typeof error==='object')
        message =  error.stack || error.message || error.response

    loggerService.log({ message, logToConsole: true })

    if (process.env.NOTIFY_ON_ERROR==='YES')
      mailService.sendMailFromApp({
          to: process.env.SUPPORT_EMAIL,
          from: process.env.SUPPORT_EMAIL,
          subject:"Error in Task Manager App",
          text:message
      })


}

module.exports={
    handleError
}