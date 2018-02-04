import React,{Component} from 'react'
import {connect} from 'react-redux'
import { Result, List , WhiteSpace, Button ,Modal } from 'antd-mobile';
import browserCookie from 'browser-cookies';
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
@connect(
  state=>state.user,
  {logoutSubmit}
)
export default class User extends Component{
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout(){
    const alert = Modal.alert
    alert('注销登录',"确认退出？",[
      {text:'取消'},
      {text:'确认',onPress:()=>{
        browserCookie.erase('userid')
        this.props.logoutSubmit()
      }}
    ])
  }

  render(){
    const props = this.props
    const Item = List.Item
    const Brief = List.Item.Brief

    return props.user? (
      <div>
        <Result
          img={<img src={require(`../../img/${props.avatar}.png`)} style={{width:50}} alt=""/>}
          title={props.user}
          message={props.type==='boss'? props.company : props.desc}
        />

        <List renderHeader={()=>'简介'}>
          <Item mutipleline="true" wrap>
            {props.title}
            {props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
            {props.money?<Brief>薪资：{props.money}</Brief>:null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
          <Button style={{zIndex:1}} onClick={this.logout}>退出登录</Button>
      </div>
    ):<Redirect to={this.props.redirectTo}/>
  }
}
