const nodemailer = require('nodemailer');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(8081, () => {
  console.log("The server started on port 8081 !!!!!!");
});

function generateVerificationCode() {
    const codeLength = 6; // Set the desired length of the verification code
    const characters = '0123456789'; // Characters to use for the code
    let code = '';
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  }

const verificationCodesMap = new Map();

app.use(express.json());

var orgemail = "";



app.post('/sendemail', (req, res) => {
    orgemail = req.body;
    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: 'abdelrahmanali.testing@outlook.com',
        pass: 'abdoali123Ali@#'
      }
    });
  
    const verificationCode = generateVerificationCode();

    verificationCodesMap.set(orgemail.email, {
        code: verificationCode,
        verified: false
      });
  

    const mailOptions = {
      from: 'abdelrahmanali.testing@outlook.com',
      to: orgemail.email,
      subject: 'Email Verification',
      text: `Your verification code is: ${verificationCode}`
    };
  
    // transporter.sendMail(mailOptions, function(error, info) {
    //   if (error) {
    //     console.log(error);
    //     res.status(500).send('Error sending email');
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //     res.status(200).send('Email sent successfully');
    //   }
    // });

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
          res.status(500).json({ success: false, message: 'Error sending email' });
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({ success: true, message: 'Email sent successfully' });
        }
      });
    

    app.post('/verify-code', (req, res) => {
        const { user, verificationCode } = req.body;
        const storedVerificationCode = verificationCodesMap.get(user.email);
      
        if (storedVerificationCode && storedVerificationCode.code === verificationCode) {
          // Code verification successful
          verificationCodesMap.set(user.email, {
            code: storedVerificationCode.code,
            verified: true
          });
          res.status(200).json({ success: true });
        } else {
          // Code verification failed
          res.status(200).json({ success: false });
        }
      });
      
      app.delete('/delete-resource', (req, res) => {
        const { user } = req.body;
        const storedVerificationCode = verificationCodesMap.get(user.email);
      
        if (storedVerificationCode && storedVerificationCode.verified) {
          // Delete the resource or perform other actions
          verificationCodesMap.delete(orgemail.email);
          res.status(200).json({ success: true });
        } else {
          res.status(200).json({ success: false });
        }
      });
  });