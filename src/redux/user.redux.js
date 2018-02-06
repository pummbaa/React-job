import axios from 'axios'
import {getRedirectPath} from '../util'

const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'
const CHANGE_REDIRECT = 'CHANGE_REDIRECT'

const initState = {
  redirectTo:'',
  msg:'',
  user:'',
  type:''
}
//reducer
export function user(state=initState,action){
  switch(action.type){
    case AUTH_SUCCESS:
      return {...state,msg:'',...action.payload,redirectTo:getRedirectPath(action.payload)}
    case ERROR_MSG:
      return {...state,isAuth:false,msg:action.payload}
    case LOAD_DATA:
      return {...state,...action.payload}
    case LOGOUT:
      return {...initState,redirectTo:'/login'}
    case CHANGE_REDIRECT:
      return {...state,redirectTo:action.payload}
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
          dispatch(authSuccess(res.data.data))
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
          dispatch(authSuccess(res.data.data))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
export function changeRedirectTo(redirect){
  return dispatch=>{
    dispatch(changeRedirect(redirect))
  }
}
export function logoutSubmit(){
  return {type:LOGOUT}
}

export function loadData(userinfo){
  return {type:LOAD_DATA,payload:userinfo}
}

export function update(data){
  return dispatch=>{
    axios.post('/user/update',data)
      .then(res=>{
        if(res.status === 200 && res.data.code === 0){
          dispatch(authSuccess(res.data.data))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

function changeRedirect(redirect){
  return {type:CHANGE_REDIRECT,payload:redirect}
}

function errorMsg(msg){
  return {payload:msg,type:ERROR_MSG}
}


function authSuccess(data){
  return {type:AUTH_SUCCESS,payload:data}
}
