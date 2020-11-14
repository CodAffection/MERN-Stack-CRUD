const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId


var { PostMessage } = require('../models/postMessage')


router.get('/', (req, res) => {
    PostMessage.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while retrieving all records : ' + JSON.stringify(err, undefined, 2))
    })
})

router.post('/', async(req, res) => {
    var newRecord = new PostMessage({
        title: req.body.title,
        message: req.body.message
    })
  try{
     const newDoc = await PostMessage.create(newRecord)
     console.log(newDoc) 
  }catch(err){
    console.log('Error while creating new record : ' + JSON.stringify(err, undefined, 2)) 
  }
   
})

router.put('/:id', async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No record with given id : ' + req.params.id)

    var updatedRecord = {
        title: req.body.title,
        message: req.body.message
    }
  try{
      const foundDoc = await PostMessage.findByIdAndUpdate(req.params.id, { $set: updatedRecord },{new:true})
      res.send(foundDoc)
  }catch(err){
      console.log('Error while updating a record : ' + JSON.stringify(err, undefined, 2))
  }
})

router.delete('/:id', async(req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No record with given id : ' + req.params.id)

    try{    
       const deletedDoc = await PostMessage.findByIdAndRemove(req.params.id) 
       res.send(deletedDoc)
    }catch(err){
        console.log('Error while deleting a record : ' + JSON.stringify(err, undefined, 2))
    }    
    
})


module.exports = router