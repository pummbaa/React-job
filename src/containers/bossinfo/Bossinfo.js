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
export default class Bossinfo extends Component{
  constructor(props){
    super(props)
    this.state={
      title:'',
      desc:'',
      company:'',
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
                        <Icon key="1" type="ellipsis" />]}>Boss信息完善页</NavBar>
        <AvatarSelector selectAvtar={(imgname)=>{
            this.setState({
              avatar:imgname
            })
          }}></AvatarSelector>
        <InputItem onChange={(v)=>this.onInputChange('title',v)} >招聘职位</InputItem>
        <InputItem onChange={(v)=>this.onInputChange('company',v)}>公司名称</InputItem>
        <InputItem onChange={(v)=>this.onInputChange('money',v)}>职位薪资</InputItem>
        <TextareaItem onChange={(v)=>this.onInputChange('desc',v)} rows={3} autoHeight title='职位要求'></TextareaItem>
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
