let express = require('express');
let router = express.Router();
let superagent = require('superagent')
let cheerio = require('cheerio')
let path = require('path')
router.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    superagent.get("https://www.reddit.com/r/videos/rising/").end((err, sres) => {
        if(err) {
            return next(err)
        }
        let $ = cheerio.load(sres.text)
        let risingLists = [];
        $(".expando").each((idx, element) =>{
            let $element = $(element)
            risingLists.push({
                src:$element.find("iframe").attr("src")
            })
        })
        res.send(risingLists)
    })
   
    
})

module.exports = router;