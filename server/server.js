import express  from 'express'
import userRouter  from './user'
import bodyParser  from 'body-parser'
import cookieParser  from 'cookie-parser'
import path from 'path'
import models from './module'

const Chat = models.getModel('chat')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection',function(socket){
  socket.on('sendmsg',function(data){
    const {from,to,msg} = data
    const chatid = [from,to].sort().join('_')
    Chat.create({chatid,from,to,content:msg},function(err,doc){
      io.emit('recvmsg',Object.assign({},doc._doc))
    })
  })
})


app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user',userRouter)
app.use(function(req,res,next){
  if(req.url.startsWith('/user/')||req.url.startsWith('/static/')){
    return next()
  }
  return res.sendFile(path.resolve('build/index.html'))
})
app.use('/',express.static(path.resolve('build')))

server.listen(9093,function(){
  console.log('Node app start at port 9093')
})
