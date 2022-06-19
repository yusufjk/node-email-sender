import response from './response.js'
import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'
import 'dotenv/config'

var app = express()
app.use(cors())
app.use(bodyParser.json())

// deklarasi email transporter
var sender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD,
    }
})

// initial route
app.get('/', (req, res)=>{
    res.send('<h1>Node Email Sender</h1>')
})

// route to send email
app.post('/send-email', (req, res)=>{
    const emailObj = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: req.body.email,
        subject: req.body.subject,
        html: req.body.message,
    };

    sender.sendMail(emailObj, (error)=>{
        if(error){
            console.log(error)
            response(res, 200, false, 'Error while sending email!.')
        } else {
            console.log('Email sent!')
            response(res, 200, true, 'Email sent successfully.')
        }
    })
})

app.listen(process.env.PORT, ()=>{
    console.log(`Node Email Sender running on port ${process.env.PORT}`)
})
