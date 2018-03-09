let express = require('express');
let router = express.Router();
let superagent = require('superagent')
let cheerio = require('cheerio')
let path = require('path')
let MongoClient = require('mongodb').MongoClient;
let dbUrl = 'mongodb://wenjiewu2001:iopjkl1002@ds133816.mlab.com:33816/goodtime'
let db;
let ObjectID = require('mongodb').ObjectID
MongoClient.connect(dbUrl, (err, database) => {
    if (err) return console.log(err)
    db = database;
})

router.put('/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    db.collection("community").update({_id:ObjectID(req.params.id)}, {$set:req.body})
    db.collection('community').find().toArray((err, result) => {
        if (err) return console.log(err)
       res.json(result)
    })
})
module.exports = router