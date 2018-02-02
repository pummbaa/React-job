import React ,{Component} from 'react';
import { NavBar, Icon ,InputItem ,TextareaItem,Button} from 'antd-mobile'
import AvatarSelector from '../../components/avatar-selector/AvatarSelector'
import {connect} from 'react-redux';
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
  state=>state.user,
  {update}
)
export default class Geniusinfo extends Component{
  constructor(props){
    super(props)
    this.state={
      title:'',
      desc:'',
      money:''
    }
  }

  render(){
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return(
      <div>
        {redirect && redirect !== path ? <Redirect to={redirect} /> :null}
        <NavBar mode="dark" leftContent="Back"
          rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />]}>牛人信息完善页</NavBar>
        <AvatarSelector selectAvtar={(imgname)=>{
            this.setState({
              avatar:imgname
            })
          }}></AvatarSelector>
        <InputItem onChange={(v)=>this.onInputChange('title',v)} >求职岗位</InputItem>
        <TextareaItem onChange={(v)=>this.onInputChange('desc',v)} rows={3} autoHeight title='个人简介'></TextareaItem>
        <Button onClick={()=>{this.props.update(this.state)}} type="primary">保存</Button>
      </div>
    )
  }

  onInputChange(key,val){
    this.setState({
      [key]:val
    })
  }
}
