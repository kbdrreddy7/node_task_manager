
//----------- services

const loggerService=require("./logger")
const mailService=require("./mailService")


const handleError=(error)=>{

    // do handling error here
    if( typeof error==='object')
        loggerService.log({ message: error.stack || error.message, logToConsole:true})
    else loggerService.log({ message: error, logToConsole: true })



    /*  mailService.sendMail({
    userName:"kbdrreddy10@gmail.com",
    password:"***",
    from:"kbdrreddy10@gmail.com",
    to:"kbdrreddy10@gmail.com",
    subject:"Mail from Node",
    textMessage:"Hello",
    htmlMessage:"<h1>Hello</h1>"
    })
 */

}

module.exports={
    handleError
}