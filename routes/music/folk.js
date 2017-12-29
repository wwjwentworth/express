let express = require('express');
let router = express.Router();
let superagent = require('superagent')
let cheerio = require('cheerio')
let eventproxy = require('eventproxy')
let MongoClient = require('mongodb').MongoClient;
let dbUrl = 'mongodb://wenjiewu2001:iopjkl1002@ds133816.mlab.com:33816/goodtime'
let ObjectID = require('mongodb').ObjectID
let db;
router.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    superagent.get("http://www.luoo.net/music/folk")
    .end((err, sres) => {
        if(err) {
            return next(err)
        }
        let $ = cheerio.load(sres.text)
        let folkLists = []
        $(".vol-list .item").each((idx, element) => {
            let $element = $(element)
            folkLists.push({
                src:$element.find("a").attr("href"),
                img:$element.find("a img").attr("src"),
                text:$element.find(".rounded a").text()
            })
        })
        let ep = new eventproxy()
        ep.after("descEvent", folkLists.length, function(texts){
            texts.map((text, idx) => {
                let $ = cheerio.load(text)
                folkLists[idx].desc = $(".vol-desc").text()
            })
            res.send(folkLists)
        })
        folkLists.forEach(folk => {
            superagent.get(folk.src).end((err, mes) => {
                if(err) return err
                ep.emit("descEvent", mes.text)
            })
        })
    })
})
module.exports = router