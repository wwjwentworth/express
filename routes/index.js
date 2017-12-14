let express = require('express');
let router = express.Router();
let path = require('path')
let MongoClient = require('mongodb').MongoClient;
let dbUrl = 'mongodb://wenjiewu2001:iopjkl1002@ds133816.mlab.com:33816/goodtime'
let db;
MongoClient.connect(dbUrl, (err, database) => {
    if(err) return console.log(err)
    db = database;
})
router.post('/', (req, res) => {
    db.collection('home').find().toArray((err, result) => {
        if (err) return console.log(err)
       res.json(result)
    })
    
})

module.exports = router;
