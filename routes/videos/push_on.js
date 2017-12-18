let express = require('express');
let router = express.Router();
let superagent = require('superagent')
let cheerio = require('cheerio')
let path = require('path')
router.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    superagent.get("http://joepbeving.com/video/").end((err, sres) => {
        if(err) {
            return next(err)
        }
        let $ = cheerio.load(sres)
        let pushonLists = []
        $(".container .post_content_holder").each((idx, element) => {
            let $element = $(element)
            pushonLists.push({
                src : $element.find(".post_image iframe").attr("src"),
                title:{
                    src:$element.find(".post_text h2 a").attr("href"),
                    text:$element.find(".post_text h2 a").text()
                },
                info:$element.find(".post_text p").text()
            })
        })
        res.send(pushonLists)
    })
})
module.exports = router