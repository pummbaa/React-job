import axios from 'axios'
import {getRedirectPath} from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

const initState = {
  redirectTo:'',
  msg:'',
  isAuth:false,
  user:'',
  pwd:'',
  type:''
}
//reducer
export function user(state=initState,action){
  switch(action.type){
    case REGISTER_SUCCESS:
      return {...state,msg:'',isAuth:true,...action.payload,redirectTo:getRedirectPath(action.payload)}
    case ERROR_MSG:
      return {...state,isAuth:false,msg:action.msg}
    case LOGIN_SUCCESS:
      return {...state,isAuth:true,...action.payload,redirectTo:getRedirectPath(action.payload)}
    default:
      return state
  }
}


export function register({user,pwd,repeatpwd,type}){
  if(!user || !pwd){
    return errorMsg('用户名密码必须输入')
  }
  if(pwd !== repeatpwd){
    return errorMsg('两次输入的密码不一致')
  }
  return dispatch=>{
    axios.post('/user/register',{user,pwd,type})
      .then(res=>{
        if(res.status === 200 && res.data.code ===0){
          dispatch(registerSuccess({user,pwd,type}))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function login({user,pwd}){
  if(!user || !pwd){
    return errorMsg('用户名密码必须输入')
  }
  return dispatch =>{
    axios.post('/user/login',{user,pwd})
      .then(res=>{
        if(res.status === 200 && res.data.code === 0){
          dispatch(loginSuccess(res.data))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}


function errorMsg(msg){
  return {msg,type:ERROR_MSG}
}


function registerSuccess(data){
  return {type:REGISTER_SUCCESS,payload:data}
}

function loginSuccess(data){
  return {type:LOGIN_SUCCESS,payload:data}
}
