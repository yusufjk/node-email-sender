// Nodemailer & Gmail API

var nodemailer = require('nodemailer')
var xoauth2 = require('xoauth2')

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

// deklarasi email yang akan dikirim
var emailku = {
    from: 'superman <superman@dc.com>',
    to: 'lintangwisesa@ymail.com, lintangbagus@mail.ugm.ac.id',
    subject: 'URGENT! 🤖',
    // text: 'Halo dunia!'
    html: '<h1>Halo Dunia! 💩</h1>',
    attachments:[{
            filename: 'barca.png', 
            path:'https://vignette.wikia.nocookie.net/logopedia/images/0/0e/Barcelona.png'
        },
        {
            filename: 'pesan.txt',
            content: 'Halo, apa kabar? Maaf nyepam!'
        },
        {
            path: './tes_email_template.html'
        }
    ]
}

sender.sendMail(emailku, (error)=>{
    if(error){console.log(error)}
    else{console.log('Email sukses terkirim!')}
})