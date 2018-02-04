import React ,{Component} from 'react';
import Logo from '../../components/logo/Logo'
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile'
import {connect} from 'react-redux';
import {register} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom'
import CommonForm from '../../components/commonform/CommonForm'

@connect(
  state=>state.user,
  {register}
)
@CommonForm
export default class Register extends Component{
  constructor(props){
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }
  componentDidMount(){
    this.props.handelChange('type','genius')
  }
  handleRegister(){
    this.props.register(this.props.state)
  }

  render(){
    const RadioItem = Radio.RadioItem
    return(
      <div>
        {this.props.redirectTo && this.props.redirectTo!== '/register' ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo/>
        <WingBlank >
          {this.props.msg ? <p className="error-msg">{this.props.msg}</p>:''}
          <List>
            <InputItem onChange={v=>this.props.handelChange('user',v)}>用户名</InputItem><div></div>
            <WhiteSpace/>
            <InputItem type="password" onChange={v=>this.props.handelChange('pwd',v)}>密码</InputItem>
            <WhiteSpace/>
            <InputItem type="password" onChange={v=>this.props.handelChange('repeatpwd',v)}>确认密码</InputItem>
            <WhiteSpace/>
            <RadioItem  onChange={()=>this.props.handelChange('type','genius')} checked={this.props.state.type === 'genius'}>牛人</RadioItem>
            <RadioItem  onChange={()=>this.props.handelChange('type','boss')} checked={this.props.state.type === 'boss'}>Boss</RadioItem>
          </List>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}
