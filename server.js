var express = require('express')
var validUrl = require('valid-url');
var app = express()
app.listen(process.env.PORT||8100)
app.get('/',function(req,res){
  res.sendFile(__dirname+'/public/index.html')
})
app.get('/new/*',function(req,res){
  var siteurl = req.params[0]
  console.log(siteurl)
  if (validUrl.isUri(siteurl)){
    res.send({message:'passed parameter is a valid URL ;)'})
  } else{
    res.send({error:'Wrong url format, make sure you have a valid protocol and real site.'})
  }
})