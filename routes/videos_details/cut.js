var express = require('express');
var router = express.Router();
let superagent = require('superagent')
let cheerio = require('cheerio')
let eventproxy = require('eventproxy')
let ep = new eventproxy()
let MongoClient = require('mongodb').MongoClient;
let dbUrl = 'mongodb://wenjiewu2001:iopjkl1002@ds133816.mlab.com:33816/goodtime'
let db;
MongoClient.connect(dbUrl, (err, database) => {
    if(err) return console.log(err)
    db = database;
})
router.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    db.collection('movies').find().toArray((err, result) => {
        if (err) return console.log(err)
        let list = result[0].list
        ep.after('detais_data',list.length,function(topics){
            res.json(topics)
        });
        list.map((item) => {
            superagent.get(item.src).end((err, sres) => {
                if(err) {
                    return next(err)
                }
                let $ = cheerio.load(sres.text)
                let src, title;
                $(".post-main").each((idx, element) => {
                    let $element = $(element)
                    src = $element.find(".p00b204e980 iframe").attr("src") ? $element.find(".p00b204e980 iframe").attr("src"): item.src
                    title = $element.find('.post-title').text()
                })
                console.log(src)
                ep.emit('detais_data',{src, title});
            })
        })
    })
})
module.exports = router;
