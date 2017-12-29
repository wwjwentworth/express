let express = require('express');
let router = express.Router();
let superagent = require('superagent')
let cheerio = require('cheerio')
let eventproxy = require('eventproxy')
router.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    superagent.get("http://www.vmovier.com/channel/trailer/")
    .end((err, sres) => {
        if(err) {
            return next(err)
        }
        let $ = cheerio.load(sres.text)
        let trailerLists = []
        let data = {list:[]}
        $("#post-list li").each((idx, element) => {
            let $element = $(element)
            trailerLists.push({
                src : 'http://www.vmovier.com'+$element.find("a").attr("href"),
                bg_img:$element.find("a img").attr("src"),
            })
        })
        let ep = new eventproxy()
        ep.after("descEvent", trailerLists.length, function(texts){
            texts.map((text, idx) => {
                let $ = cheerio.load(text)
                trailerLists[idx].desc = $(".post-title").text()
                trailerLists[idx].video = $("iframe").attr("src")
            })
            trailerLists.map((cut, idx) => {
                if(!cut.video) {
                    trailerLists.splice(idx, 1)
                }
            })
            res.send(trailerLists)
        })
        trailerLists.forEach(cut => {
            superagent.get(cut.src).end((err, mes) => {
                if(err) return err
                ep.emit("descEvent", mes.text)
            })
        })
    })
})
module.exports = router