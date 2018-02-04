import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import Usercard from '../usercard/Usercard'

@connect(
  state=>state.chatuser,
  {getUserList}
)
export default class Boss extends Component {
  componentDidMount(){
    this.props.getUserList('genius')
  }
  render(){
    return(
      <div>
        <Usercard userlist={this.props.userlist}/>
      </div>
    )
  }
}
