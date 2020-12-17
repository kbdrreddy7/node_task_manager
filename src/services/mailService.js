const nodemailer=require("nodemailer")



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
            console.log(error);
        }else{
            //res.redirect('/');
            console.log(" success response ", response)
        }
    });
}

const sendMailFromApp = ({ to, subject, text, html})=>{

    sendMail({
        user: process.env.SUPPORT_EMAIL,
        pass: process.env.SUPPORT_EMAIL_PASSWORD,
        from:"Task Manager App",
        ...to, subject, text,html
    })

}

/* sendMailFromApp({
    to:"kbdrreddy7@gmail.com", subject:"testing",text:"WHS"
}) */

module.exports={
    sendMail,
    sendMailFromApp
}