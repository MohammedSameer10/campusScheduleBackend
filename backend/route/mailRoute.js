const express = require('express');
const nodemailer = require('nodemailer');
const Mail = require('../model/mailModel'); 
const MAIL_USER='mohammedsameer.cs22@bitsathy.ac.in';
const MAIL_PASSWORD='unjlnbbrhmdgvbdy';
const mailRouter = express.Router();

const sendMail = async (req, res) => {
    try {
        const { name, type, date, startTime, endTime, venue, mail } = req.body;

        if (!(name && type && date && startTime && endTime && venue && Array.isArray(mail) && mail.length > 0)) {
            console.log(`Missing parameters`, name, type, date, startTime, endTime, venue, mail);
            return res.json({ code: 0, msg: "Missing parameters in body" });
        }

        const newMail = new Mail({ name, type, date, startTime, endTime, venue, mail });
        await newMail.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: MAIL_USER,      
                pass: MAIL_PASSWORD,  
            }
        });

        const mailOptions = {
            from: `Campus Planner <mohammedsameer.cs22@bitsathy.ac.in>`,
            to: mail,
            subject: `Event: ${name} | ${type}`,
            text: `You are invited to the following event:\n\n` +
                `Name: ${name}\nType: ${type}\nDate: ${date}\nTime: ${startTime} - ${endTime}\nVenue: ${venue}\n\n` +
                `Please be on time.`
        };

        await transporter.sendMail(mailOptions);
        console.log("Mail sent successfully");

        return res.status(200).json({ code: 1, msg: "Mail sent and queued successfully" });

    } catch (error) {
        console.error(`Error while sending email: ${error}`);
        return res.status(500).json({ code: -1, msg: "Internal server error" });
    }
};

const getMail = async (req, res) => {
    try {
        const mails = await Mail.find(); // latest first
        if(mails.length<=0){
            console.log(`no data found`);
            return res.json({code:0,msg:"no data found"});
        }
        return res.status(200).json({ code: 1, data: mails });
    } catch (error) {
        console.log(`Error while getting all mail data: ${error}`);
        return res.status(500).json({ code: -1, msg: "Internal server error while giving mail data" });
    }
};

mailRouter.post('/add-queue', sendMail);
mailRouter.get('/getMail', getMail);


module.exports = mailRouter;
