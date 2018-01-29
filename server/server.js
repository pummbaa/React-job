const express = require('express')
const app = express()
const mongoose = require('mongoose')
const DB_URL = 'mongodb://127.0.0.1:27017';
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
  console.log('mongo connect success')
})
app.get('/',function(req,res){
  res.send('<h1>Hello world</h1>')
})

app.get('/data',function(req,res){
  res.json({name:'imooc',type:'IT'})
})

app.listen(8080,function(){
  console.log('Node app start at port 9093')
})
