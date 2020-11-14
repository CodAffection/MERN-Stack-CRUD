require('./db')
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

var postMessageRoutes = require('./controllers/postMessageController')


var app = express()
app.use(bodyParser.json())
app.use(cors({ origin: 'http://localhost:3000' }))
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server started at : ${PORT}`))


app.use('/postMessages', postMessageRoutes)