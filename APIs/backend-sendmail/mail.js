const nodemailer = require('nodemailer');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
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

var useremail = "";



app.post('/sendemail', (req, res) => {
    useremail = req.body;
    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: 'SHERYAAN.Donations@outlook.com',
        pass: 'SHERYAAN8'
      }
    });

    const verificationCode = generateVerificationCode();

    verificationCodesMap.set(useremail.email, {
        code: verificationCode,
        verified: false
      });
  
    const mailOptions = {
      from: 'SHERYAAN.Donations@outlook.com',
      to: useremail.email,
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
          verificationCodesMap.delete(user.email);
          res.status(200).json({ success: true });
        } else {
          res.status(200).json({ success: false });
        }
      });
  });
