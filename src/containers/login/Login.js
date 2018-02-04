import React ,{Component} from 'react'
import Logo from '../../components/logo/Logo'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {login} from '../../redux/user.redux'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

@connect(
  state=>state.user,
  {login}
)
export default class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      user:'',
      pwd:''
    }
    this.register = this.register.bind(this);
    this.handelLogin = this.handelLogin.bind(this);
  }

  register(){
    this.props.history.push('/register')
  }

  handelChange(key,val){
    this.setState({
      [key]:val
    })
  }

  handelLogin(){
    this.props.login(this.state);
  }
  render(){
    return(
      <div>
        <Logo/>
        {this.props.redirectTo && this.props.redirectTo!=='/login'? <Redirect to={this.props.redirectTo}/> : null}
        <WingBlank>
          {this.props.msg ? <p className="error-msg">{this.props.msg}</p>:''}
          <List>
            <InputItem onChange={(v)=>this.handelChange('user',v)}>用户名</InputItem>
            <InputItem type="password" onChange={v=>this.handelChange('pwd',v)}>密码</InputItem>
          </List>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handelLogin}>登录</Button>
          <WhiteSpace/>
          <Button type="primary" onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}
