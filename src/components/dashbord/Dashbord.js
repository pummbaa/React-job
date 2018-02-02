import React ,{Component} from 'react'
import {NavBar} from 'antd-mobile';
import {connect} from 'react-redux';
import Navlink from '../navlink/Navlink'
import {Switch,Route} from 'react-router-dom'
import Boss from '../boss/Boss'
import Genius from '../genius/Genius'
import User from '../user/User'
import Msg from '../msg/Msg'

@connect(
  state=>state,
)
export default class Dashbord extends Component{
  constructor(props){
    super(props)
  }

  render(){
    const user = this.props.user
    const pathname = this.props.location.pathname
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      }, {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'Boss列表',
        component: Genius,
        hide: user.type === 'boss'
      }, {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      }, {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]

    return(
      <div >
        <NavBar className='fixed-header' mode='dard'>{navList.find(v=>v.path===pathname).title}</NavBar>
        <div style={{marginTop:45}}>
          <Switch>
            {navList.map(v=>(
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>
        <Navlink data={navList}></Navlink>
      </div>
    )
  }
}
