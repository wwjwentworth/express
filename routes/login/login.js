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
    let formData = JSON.parse(Object.keys(req.body))
    db.collection("user").find({"username":formData.username, "password":formData.password}).toArray((err, result) => {
        if(result.length) {
            res.send({"isExistUser":true})
        } else {
            res.send({"isExistUser":false})
        }
    })
    
    
})
module.exports = router