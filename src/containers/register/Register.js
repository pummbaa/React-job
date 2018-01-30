import React ,{Component} from 'react';
import Logo from '../../components/logo/Logo'
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile'
import {connect} from 'react-redux';
import {register} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom'
@connect(
  state=>state.user,
  {register}
)
export default class Register extends Component{
  constructor(props){
    super(props);
    this.state = {
      user:'',
      pwd:'',
      repeatpwd:'',
      type:'genius'
    }
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(key,val){
    this.setState({
      [key]:val
    })
  }

  handleRegister(){
    this.props.register(this.state)
  }

  render(){
    const RadioItem = Radio.RadioItem
    return(
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo/>
        <WingBlank >
          {this.props.msg ? <p className="error-msg">{this.props.msg}</p>:''}
          <List>
            <InputItem onChange={v=>this.handleChange('user',v)}>用户名</InputItem><div></div>
            <WhiteSpace/>
            <InputItem type="password" onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
            <WhiteSpace/>
            <InputItem type="password" onChange={v=>this.handleChange('repeatpwd',v)}>确认密码</InputItem>
            <WhiteSpace/>
            <RadioItem  onChange={()=>this.handleChange('type','genius')} checked={this.state.type === 'genius'}>牛人</RadioItem>
            <RadioItem  onChange={()=>this.handleChange('type','boss')} checked={this.state.type === 'boss'}>Boss</RadioItem>
          </List>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}
