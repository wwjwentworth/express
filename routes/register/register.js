let express = require('express');
let router = express.Router();
let superagent = require('superagent')
let cheerio = require('cheerio')
let path = require('path')
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
    let message
    
    db.collection("user").find().toArray((err, result) => {
        result.map((r, idx) => {
            if(r.email === req.body.email) {
                message = '该邮箱已被注册，请重新选择！'
                return;
            }
        })
        if(!message) {
            db.collection("user").save(req.body)
            res.send({"success":"注册成功！"})
        } else {
            res.send({"errors":message})
        }
    })
})
module.exports = router