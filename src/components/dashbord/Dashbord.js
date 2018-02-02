import React ,{Component} from 'react'
import {TabBar} from 'antd-mobile';

export default class Dashbord extends Component{
  const navList = {
    {
      path:'/boss',
      text:'牛人',
      icon:'boss'
    }
  }
  render(){
    return(
      <div>Dashbord</div>
    )
  }
}
