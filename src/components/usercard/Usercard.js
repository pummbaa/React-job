import React,{Component} from 'react'
import {Card,WhiteSpace, WingBlank} from 'antd-mobile';

export default class Usercard extends Component{
  render(){
    return(
        <WingBlank>
        <WhiteSpace/>
        {
          this.props.userlist.map(v => (
          v.avatar?
          <Card key={v._id}>
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
