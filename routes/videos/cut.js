let express = require('express');
let router = express.Router();
let superagent = require('superagent')
let cheerio = require('cheerio')
let path = require('path')
let MongoClient = require('mongodb').MongoClient;
let dbUrl = 'mongodb://wenjiewu2001:iopjkl1002@ds133816.mlab.com:33816/goodtime'
let ObjectID = require('mongodb').ObjectID
let db;
router.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    superagent.get("http://www.vmovier.com/channel/cut/")
    .end((err, sres) => {
        if(err) {
            return next(err)
        }
        let $ = cheerio.load(sres.text)
        let cutLists = []
        let data = {list:[]}
        $("#post-list li").each((idx, element) => {
            let $element = $(element)
            cutLists.push({
                src : 'http://www.vmovier.com'+$element.find("a").attr("href"),
                bg_img:$element.find("a img").attr("src"),
                info:$element.find(".works-text h4 a").text()
            })
        })
        data.list = cutLists
        MongoClient.connect(dbUrl, (err, database) => {
            if(err) return console.log(err)
            db = database;
            db.collection('movies').find().toArray((err, result) => {
                if(result.length === 0) {
                    db.collection("movies").save(data)
                } else {
                    let mongoData = result[0]
                    db.collection("movies").update({"_id":result[0]._id}, data)
                }
            })
        })
        
        res.send(cutLists)
    })
})
module.exports = router