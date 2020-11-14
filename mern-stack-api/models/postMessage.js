const mongoose = require('mongoose')

const postMessageSchema = new mongoose.Schema({
    
        title : {type:String},
        message : {type:String},
    
})
var PostMessage = mongoose.model('PostMessage', postMessageSchema)

module.exports = { PostMessage}