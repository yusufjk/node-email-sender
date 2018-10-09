var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var nodemailer = require('nodemailer')
var xoauth2 = require('xoauth2')

var app = express()
app.use(cors())
app.use(bodyParser.json())

// deklarasi email transporter
var sender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aduhcapekkali@gmail.com',
        type: 'OAuth2',
        clientId: 'mysecretclientid',
        clientSecret: 'mysecretclientsecret',
        refreshToken: 'mysecretrefreshtoken'
    }  
})

// initial route
app.get('/', (req, res)=>{
    res.send('<h1>Express & Nodemailer</h1>')
})

// route untuk kirim email
app.post('/email', (req, res)=>{
    
    // deklarasi email yang akan dikirim
    var emailku = {
        from: 'superman <superman@dc.com>',
        to: req.body.email,
        subject: `Halo, ${req.body.nama} 🤖`,
        // text: 'Halo dunia!'
        html: `<h1>Halo ${req.body.nama} 🤖</h1>`,
        attachments:[{
                filename: 'barca.png', 
                path:'https://vignette.wikia.nocookie.net/logopedia/images/0/0e/Barcelona.png'
            },
            {
                filename: 'pesan.txt',
                content: 'Halo, apa kabar? Maaf nyepam!'
            }
        ]
    }

    sender.sendMail(emailku, (error)=>{
        if(error){
            console.log(error)
            res.send(error)
        } else {
            console.log('Email sukses terkirim!')
            res.send('Email sukses terkirim!')
        }
    })
})

app.listen(3210, ()=>{
    console.log('Server aktif @port 3210!')
})