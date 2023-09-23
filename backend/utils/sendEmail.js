//password recovery 
const nodeMailer = require("nodemailer")

const sendEmail = async(options)=>{
   
    const SMPT_SERVICE = "gmail"
    const SMPT_MAIL = "ecommercnodemailer170@gmail.com"
    const SMPT_PASSWORD = "ascmczbawelkexec"
    const SMPT_HOST = "smpt.gmail.com"
    const SMPT_PORT = 465

    const transporter = nodeMailer.createTransport({
        host : SMPT_HOST,
        port : SMPT_PORT,
        service: SMPT_SERVICE,
        auth:{
            user : SMPT_MAIL,
            pass :SMPT_PASSWORD
        }
    })

    const mailOptions = {
        from : SMPT_MAIL,
        to : options.email,
        subject : options.subject,
        text : options.message
    }

    await transporter.sendMail(mailOptions)
}



//Buy a Project Mail
const buyProjectMail = async(options)=>{
    const SMPT_SERVICE = "gmail"
    // const SMPT_MAIL = "ecommercnodemailer170@gmail.com"
    const SMPT_MAIL = options.buyerEmail
    const SMPT_PASSWORD = "ascmczbawelkexec"
    const SMPT_HOST = "smpt.gmail.com"
    const SMPT_PORT = 465

    const transporter = nodeMailer.createTransport({
        host : SMPT_HOST,
        port : SMPT_PORT,
        service: SMPT_SERVICE,
        auth:{
            user : SMPT_MAIL,
            pass :SMPT_PASSWORD
        }
    })

      const mailOptions = {
        from : options.buyerEmail,
        to : options.sellerEmail,
        subject : options.subject,
        text : options.description
      }
     
      await transporter.sendMail(mailOptions)
}


module.exports = {sendEmail,
    buyProjectMail:buyProjectMail}