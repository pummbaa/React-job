import React,{Component} from 'react'
import {Card,WhiteSpace, WingBlank} from 'antd-mobile';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {changeRedirectTo} from '../../redux/user.redux'
import {withRouter} from 'react-router-dom'

@connect(
  state=>state,
  {changeRedirectTo}
)
@withRouter
export default class Usercard extends Component{
  static propTypes = {
    userlist : PropTypes.array.isRequired
  }

  handelClick(v){
    this.props.history.push(`/chat/${v._id}`)
    this.props.changeRedirectTo(`/chat/${v._id}`)
  }
  render(){
    return(
        <WingBlank>
        <WhiteSpace/>
        {
          this.props.userlist.map(v => (
          v.avatar?
          <Card style={{zIndex:1}} key={v._id} onClick={()=>this.handelClick(v)}>
            <Card.Header title={v.user} thumb={require(`../../img/${v.avatar}.png`)} extra={<span>{v.title}</span>}/>
            <Card.Body>
              {v.type==='boss'?<div>公司:{v.company}</div>:null}
              {v.desc.split('\n').map(d=>(
                <div key={d}>{d}</div>
              ))}
              {v.type==='boss'?<div>薪资:{v.money}</div>:null}
            </Card.Body>
            <Card.Footer/>
          </Card>:null
          ))
        }
      </WingBlank>
    )
  }
}
