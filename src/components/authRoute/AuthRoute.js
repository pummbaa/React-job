import React ,{Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

@withRouter
export default class AuthRoute extends Component{
  render(){
    return null
  }

  componentDidMount(){
    const publicList = ['/login','register ']
      //获取用户信息
    const pathname = this.props.location.pathname
    if(publicList.includes(pathname)){
      return null
    }
    axios.get('/user/info').then(res=>{
      if(res.status === 200){
        if(res.data.code === 0){
          //有登陆信息
        }else{
          console.log(this.props.history.push('/login'));
        }
        console.log(res.data)
      }
    })
  }
}
