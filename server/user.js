const express = require('express');
const Router = express.Router();
const models = require('./module')
const User = models.getModel('user')
const utils = require('utility');
const _filter = {'pwd':0,'__v':0}

Router.get('/list',function(req,res){
  const {type} = req.query
  User.find({type},_filter,function(err,doc){
    return res.json({code:0,data:doc})
  })
})

Router.get('/clear',function(req,res){
  User.remove({},function(err,doc){
    if(doc){
      return res.json({code:0})
    }
  })
})

Router.post('/register',function(req,res){
  const {user,pwd,type} = req.body
  User.findOne({user:user},function(err,doc){
    if(doc){
      return res.json({code:1,msg:'用户名重复'})
    }
    const userModel = new User({user,type,pwd:md5Pwd(pwd)})
    userModel.save(function(err,doc){
      if(err){
        return res.json({code:1,msg:'后端出错'})
      }
      const {user,type,_id} = doc
      res.cookie('userid',doc._id)
      return res.json({code:0,data:{user,type,_id}})
    })
  })
})

Router.post('/update',function(req,res){
  const userid = req.cookies.userid
  if(!userid){
    return json.dumps({code:1})
  }
  const body = req.body
  User.findByIdAndUpdate({_id:userid},body,function(err,doc){
    if(err){
      return res.json({code:1,msg:'后端出错了'})
    }
    if(doc){
      const data = Object.assign({},{user:doc.user,type:doc.type},body)
      return res.json({code:0,data})
    }
  })
})

Router.post('/login',function(req,res){
  const {user,pwd} = req.body
  User.findOne({user:user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
    if(!doc){
      return res.json({code:1,msg:'用户名或密码错误'})
    }
    res.cookie('userid',doc._id);
    return res.json({code:0,data:doc})
  })
})

Router.get('/info',function(req,res){
  const {userid} = req.cookies
  if(!userid){
    return res.json({code:1})
  }
  User.findOne({_id:userid},_filter,function(err,doc){
    if(err){
      return res.json({code:1,msg:'后端出错了'})
    }
    return res.json({code:0,data:doc})
  })
})

function md5Pwd(pwd){
  const salt = 'd9f809asd-9ffa908sd0'
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router
