const mongoose = require('mongoose')
require('dotenv').config()

const DB_CONNECTION = process.env.DB_CONNECTION

async function connecting() {
    try {
        await mongoose.connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Mongodb connection succeeded.')
    } catch (err) {
        console.log('Error while connecting MongoDB : ' + JSON.stringify(err, undefined, 2))

    }
}

connecting()