const mongoose = require('mongoose')

async function connecting() {
    try {
        await mongoose.connect('mongodb://localhost:27017/postManagerDB', { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Mongodb connection succeeded.')
    } catch (err) {
        console.log('Error while connecting MongoDB : ' + JSON.stringify(err, undefined, 2))

    }
}

connecting()