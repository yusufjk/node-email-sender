var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')

var app = express()
app.use(cors())
app.use(bodyParser.json())

// bikin route

app.listen(3210, ()=>{
    console.log('Server aktif @port 3210!')
})