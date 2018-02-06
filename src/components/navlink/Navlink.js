import React ,{Component} from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

@connect(
  state=>state.chat,
)
@withRouter
export default class Navlink extends Component{
  static propTypes = {
    data : PropTypes.array.isRequired
  }
  render(){
    const navList = this.props.data.filter(v=>!v.hide)
    const pathname = this.props.location.pathname
    return(
      <TabBar style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        {navList.map(v=>(
          <TabBar.Item
             badge={v.path==='/msg'?this.props.unread:0}
             key={v.path}
             title={v.text}
             icon={{uri:require(`./navimg/${v.icon}.png`)}}
             selectedIcon={{uri:require(`./navimg/${v.icon}-active.png`)}}
             selected={pathname === v.path}
             onPress={()=>{
               this.props.history.push(v.path)
             }}
                       >
          </TabBar.Item>
        ))}
      </TabBar>

    )
  }
}
