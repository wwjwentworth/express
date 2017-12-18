let express = require('express');
let router = express.Router();
let superagent = require('superagent')
require('superagent-proxy')(superagent) // 引入SuperAgent-proxy
let cheerio = require('cheerio')
let proxy = 'http://127.0.0.1:3000';
let path = require('path')
let header = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.6',
    'Host': 'www.dianping.com',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Mobile Safari/537.36',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive'
};

router.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    superagent
    .get('http://www.vmovier.com/53129?from=channel_new')
    // .proxy(proxy)
    // .timeout(3600*1000)
    .end((err, res) => {
      console.log(res.text)
    //   console.log(res.status, res.headers);
    //   console.log(res.body);
    })
})
module.exports = router