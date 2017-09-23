var express = require('express')
var validUrl = require('valid-url')
var mongodb = require('mongodb').MongoClient
var app = express()
var url = process.env.url
var serverurl = 'https://delicate-scene.glitch.me/'
app.listen(process.env.PORT||8100)
app.get('/',function(req,res){
  res.sendFile(__dirname+'/public/index.html')
})
app.get('/new/*',function(req,res){
  var siteurl = req.params[0]
  console.log(siteurl)
  if (validUrl.isUri(siteurl)){
    var obj = { 'siteurl': siteurl}
    mongodb.connect(url,function(err,db){
      if(err) throw err
      var collection = db.collection('shortener')
      collection.insert(obj,function(err){
        var shorturl = serverurl+obj._id
        res.send({original_url:siteurl,short_url: shorturl})
      })
      db.close();
    })
  } else{
    res.send({error:'Wrong url format, make sure you have a valid protocol and real site.'})
  }
})