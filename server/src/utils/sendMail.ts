import nodemailer from 'nodemailer';
import path from 'path';
import ejs from 'ejs';

interface EmailOptions{
    email: string;
    subject: string;
    template: string;
    data: {[key: string]: any};
}


const sendMail= async(options: EmailOptions):Promise<void> =>{
    
    const transporter = nodemailer.createTransport({
        host: (process.env.SMTP_HOST || "smtp.gmail.com"),
        secure: false,
        port: parseInt(process.env.SMTP_PORT ||'587'),
        service: process.env.SMTP_SERVICE,
        auth:{
            type: "login", 
            user:process.env.SMPT_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    }as nodemailer.TransportOptions);

    const {email, subject, template, data} = options
    // get the path to th email template file
    const templatePath = path.join(__dirname,'../mails', template);

    // render the email template with EJS
    const html: string = await ejs.renderFile(templatePath,data);
    
    const mailOptions={
        from: process.env.SMTP_MAIL,
        to:email,
        subject,
        html
    }

    await transporter.sendMail(mailOptions)
}

export default sendMail;