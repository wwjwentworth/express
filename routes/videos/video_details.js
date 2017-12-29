var express = require('express');
var router = express.Router();
let superagent = require('superagent')
let cheerio = require('cheerio')
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
    console.log(formData.id)
    db.collection("videos").find().toArray((err, result) => {
      result.map((item, idx) => {
          if(item._id == formData.id) {
              res.json(item);
              return;
          }
      })
    })
})
module.exports = router;
