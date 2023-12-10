require('dotenv').config();

const sgmail = require('@sendgrid/mail');
sgmail.setApiKey(process.env.SENDGRID_API);
const msg = {
    to:'senders email',
    from:'receivers email',
    subject:'sending with sendgrid a test email',
    text:'and easy to do anywhere, even with node.js',
    html:'<strong>and easy to do anywhere, even with node.js</strong>'
}

sgmail.send(msg).then(()=>{
    console.log('email sent');
}).catch((error)=>{
    console.log(error);
})