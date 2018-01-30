const express = require('express');
const Router = express.Router();
const models = require('./module')
const User = models.getModel('user')
const utils = require('utility');

Router.get('/list',function(req,res){
  User.find({},function(err,doc){
    return res.json(doc)
  })
})

Router.post('/register',function(req,res){
  console.log(req.body)
  const {user,pwd,type} = req.body
  User.findOne({user:user},function(err,doc){
    if(doc){
      return res.json({code:1,msg:'用户名重复'})
    }
    User.create({user,pwd:md5Pwd(pwd),type},function(err,doc){
      if(err){
        return res.json({code:1,msg:'后端出错了'})
      }
      return res.json({code:0})
    })
  })
})

Router.get('/info',function(req,res){
  return res.json({code:1})
})

function md5Pwd(pwd){
  const salt = 'd9f809asd-9ffa908sd0'
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router