var express = require('express')
var app = express()
app.listen(process.env.PORT||8100)
app.get('/',function(req,res){
  res.sendFile(__dirname+'/public/index.html')
})