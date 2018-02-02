import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {loadData} from '../../redux/user.redux'
import {connect} from 'react-redux'
@withRouter
@connect(
  null,
  {loadData}
)
export default class AuthRoute extends React.Component{
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
          this.props.loadData(res.data.data)
        }else{
          this.props.history.push('/login');
        }
      }
    })
  }
}
