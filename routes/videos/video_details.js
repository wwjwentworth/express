var express = require('express');
var router = express.Router();
let superagent = require('superagent')
let cheerio = require('cheerio')
let MongoClient = require('mongodb').MongoClient;
let dbUrl = 'mongodb://wenjiewu2001:iopjkl1002@ds133816.mlab.com:33816/goodtime'
let db;
MongoClient.connect(dbUrl, (err, database) => {
    if (err) return console.log(err)
    db = database;
})

router.get('/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const path = req._parsedOriginalUrl.pathname.split('videos_details/')[1]
    db.collection("videos").find().toArray((err, result) => {
        result.map((item, idx) => {
            if (item._id == path) {
                console.log(item)
                res.json(item);
                return;
            }
        })
    })
})
module.exports = router;
