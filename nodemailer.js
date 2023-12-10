const nodemailer = require('nodemailer');
require('dotenv').config();

//1. create a transporter object

const transporter = nodemailer.createTransport({
    service:"gmail",
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:"ayush.raj.sd@@gmail.com",
        pass:process.env.PASSWORD
    }
})

// 2. create a reusable function to send emails
const sendEmail = async(mailDetails, callback) => {
    try{
        const info = await transporter.sendMail(mailDetails);
        callback(info)
    } catch(error){
        console.log(error)
    }
}

// 2.2 create a html template for email
const HTML_TEMPLATE = (text) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>NodeMailer Email Template</title>
          <style>
            .container {
              width: 100%;
              height: 100%;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .email {
              width: 80%;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
            }
            .email-header {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
            .email-body {
              padding: 20px;
            }
            .email-footer {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email">
              <div class="email-header">
                <h1>OTP for Reset</h1>
              </div>
              <div class="email-body">
                <p>${text}</p>
              </div>
              <div class="email-footer">
                <p>EMAIL FOOTER</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  }
 
  // 3. email options
  const message = 'Hello from NodeMailer';
  const options = {
    from:'ayush.raj.sd@gmail.com',
    to:'raj.ayush@scaler.com',
    subject:' send email in node js with NodeMailer and Gmail',
    text:message,
    html:HTML_TEMPLATE(message)
  }

  // 4. sending email
//   sendEmail(options, (info)=>{
//     console.log("email sent successfully")
//     console.log("message id:",info.messageId)
//   })

  async function emailBuilder(to, subject, text) {
    try{
        const options = {
            from:'ayush.raj.sd@gmail.com',
            to:to,
            subject:subject,
            text:text,
            html:HTML_TEMPLATE(text)
        }
        sendEmail(options, (info)=>{
            console.log("email sent successfully")
            console.log("message id:",info.messageId)
          })

    }catch(error){

    }
  }

  module.exports = {
        sendEmail,
        HTML_TEMPLATE,
        emailBuilder
  }