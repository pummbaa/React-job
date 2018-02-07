import React, {Component} from 'react'
import {List,Badge} from 'antd-mobile'
import {connect} from 'react-redux'

@connect(state => state)
export default class Msg extends Component {

  getLast(arr) {
    return arr[arr.length - 1]
  }

  render() {
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup)
    .sort((a,b)=>{
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last - a_last
    })
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const userinfo = this.props.chat.users
    return (
      <div id="msg-page">
      {
        chatList.map(v => {
          const lastItem = this.getLast(v)
          const targetid = lastItem.from === userid ? lastItem.to : lastItem.from
          const unreadNum = v.filter(v=>!v.read&&v.to===userid).length
          if (!userinfo[targetid]) {
            return null
          }
          return (
            <List key={lastItem._id}>
              <Item
                 extra={<Badge text={unreadNum}></Badge>}
                 style={{zIndex: 1}}
                 thumb={require(`../../img/${userinfo[targetid].avatar}.png`)}
                 onClick={() => {
                   this.props.history.push(`/chat/${targetid}`)
                 }}
                 arrow="horizontal"
              >
                {lastItem.content}
                <Brief>{userinfo[targetid].name}</Brief>
              </Item>
            </List>)
        })
      }
    </div>)
  }
}
