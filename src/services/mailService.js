const nodemailer=require("nodemailer");
const errorHandler = require("./errorHandler");



const sendMail = ({ user, pass,from,to,subject, text, html})=>{


    let  smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Gmail Host
        port: 587, // Port
        secure: false, // this is true as port is 465...else false
       // service:"gmail",
        auth: { user,pass }
    });

    var mailOptions = {from,to,subject,text,html}

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            errorHandler.handleError(`mail with subject ${subject} sending failed to ${to} and error response is: ${error.response}`)
        }else{
            //console.log( response.response)
            console.log(`mail with subject ${subject} sent successfullt to ${to}`)

        }
    });
}

const sendMailFromApp = ({ to, subject, text, html})=>{
    sendMail({
        user: process.env.SUPPORT_EMAIL,
        pass: process.env.SUPPORT_EMAIL_PASSWORD,
        from: process.env.SUPPORT_EMAIL,
        to, subject, text,html
    })

}


module.exports={
    sendMail,
    sendMailFromApp
}