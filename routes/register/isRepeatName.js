let express = require('express');
let router = express.Router();
let superagent = require('superagent')
let cheerio = require('cheerio')
let path = require('path')
let MongoClient = require('mongodb').MongoClient;
let dbUrl = 'mongodb://wenjiewu2001:iopjkl1002@ds133816.mlab.com:33816/goodtime'
let db;
MongoClient.connect(dbUrl, (err, database) => {
    if(err) return console.log(err)
    db = database;
})
router.post('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    db.collection("user").find().toArray((err, results) => {
        if(err) return err
        results.map(result =>{
            if(result.username == req.body.username) {
                res.send({ isRepeatName: true })
            } else {
                res.send({ isRepeatName: false })
            }
        })
    })
})
module.exports = router