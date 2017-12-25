let express = require('express');
let router = express.Router();
let superagent = require('superagent')
let cheerio = require('cheerio')
let path = require('path')
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
        let newTrailerLists = []
        $("#post-list li").each((idx, element) => {
            let $element = $(element)
            console.log($(element).html())
            trailerLists.push({
                src : 'http://www.vmovier.com'+$element.find("a").attr("href"),
                bg_img:$element.find("a img").attr("src"),
                info:$element.find(".works-text h4 a").text()
            })
        })
        res.send(trailerLists)
    })
})
module.exports = router