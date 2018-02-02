import React,{Component} from 'react';
import {Grid,List} from 'antd-mobile';

export default class AvatarSelector extends Component{
  constructor(props){
    super(props)
    this.state={

    }
  }
  render(){
    const avatarList = 'boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'
                        .split(',')
                        .map(v=>({
                          icon:require(`../../img/${v}.png`),
                          text:v
                        }))
    const gridHeader = this.state.icon
                      ? (<div>
                          <span>已选的头像</span>
                          <img style={{width:20}} src={this.state.icon} alt=""></img>
                        </div>)
                      : <div>请选择头像</div>
    return(
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid data={avatarList}
            columnNum={5}
            onClick={elm=>{
              this.setState(elm)
              this.props.selectAvtar(elm.text)
            }}
            头像选择
            />
        </List>
      </div>
    )
  }
}
