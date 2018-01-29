let express = require('express');
let router = express.Router();
let superagent = require('superagent')
let cheerio = require('cheerio')
let path = require('path')
router.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    superagent.get("http://movie.mtime.com/").end((err, sres) => {
        if(err) {
            return next(err)
        }
        let $ = cheerio.load(sres.text)
        let bannerLists = [];
        $("#headImgDiv #headImgSlidesRegion dd").each((idx, element) =>{
            let $element = $(element)
            let imgLength = $element.css("background-image").length
            bannerLists.push({
                img:$element.css("background-image").substring(4, imgLength-1),
                title:$element.find("a").text()
            })
        })
        $("#headImgDiv #headImgTxtSlidesRegion .dis_videomod").each((idx, element) =>{
            let $element = $(element)
            bannerLists[idx].date =  $element.find(".px14 p").eq(0).text()
            bannerLists[idx].director = $element.find(".px14 p a").eq(0).text()
            bannerLists[idx].actors = $element.find(".px14 p a").eq(1).text()
            bannerLists[idx].info = $element.find(".textinfo").text()
        })
        res.send(bannerLists)
    })
   
    
})

module.exports = router;