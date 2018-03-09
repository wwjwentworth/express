let express = require('express');
let router = express.Router();
let superagent = require('superagent')
let cheerio = require('cheerio')
let eventproxy = require('eventproxy')
let MongoClient = require('mongodb').MongoClient;
let dbUrl = 'mongodb://wenjiewu2001:iopjkl1002@ds133816.mlab.com:33816/goodtime'
MongoClient.connect(dbUrl, (err, database) => {
    if (err) return console.log(err)
    db = database;
})
router.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    MongoClient.connect(dbUrl, (err, database) => {
        if (err) return console.log(err)
        let db = database;
        db.collection('community').find().toArray((err, result) => {
            if (err) return console.log(err)
            res.json(result)
        })
    })
})
module.exports = router