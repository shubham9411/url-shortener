var express = require('express')
var validUrl = require('valid-url')
var shortid = require('shortid');
var mongodb = require('mongodb').MongoClient
var app = express()
var dburl = process.env.url
var serverurl = 'https://delicate-scene.glitch.me/'
app.listen(process.env.PORT||8100)
app.get('/',function(req,res){
  res.sendFile(__dirname+'/public/index.html')
})
app.get('/new/*',function(req,res){
  var siteurl = req.params[0]
  console.log(siteurl)
  if (validUrl.isUri(siteurl)){
    var obj = { 
      'siteurl': siteurl,
      'unique_id': shortid.generate()
    }
    mongodb.connect(dburl,function(err,db){
      if(err) throw err
      var collection = db.collection('shortener')
      collection.insert(obj,function(err){
        var shorturl = serverurl+obj.unique_id
        var response = {
          original_url:siteurl,
          short_url: shorturl
        }
        res.send(response)
      })
      db.close();
    })
  } else{
    res.send({error:'Wrong url format, make sure you have a valid protocol and real site.'})
  }
})
app.get('/:id',function(req,res){
  var id = req.params.id
  mongodb.connect(dburl,function(err,db){
    if(err) throw err
    var collection = db.collection('shortener')
    collection.find({
      unique_id:{
        $eq: id
      }
    },{
      _id: 1,
      siteurl:1
    }).limit(1).toArray(function(err,doc){
      if(err) throw err
      db.close()
      console.log(doc)
      console.log(doc[0])
      var redirect = {
        error: 'This url is not on the database.'
      }
      if(doc!= 'undefind' && !doc[0] == false ){
        redirect = doc[0].siteurl
      } else{
        res.send(redirect)
        return
      }
      res.writeHead(302, {
        'Location': redirect
      })
      res.end()
    })
  })
})