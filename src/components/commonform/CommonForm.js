import React,{Component} from 'react'

export default function CommonForm(Comp){
  class  newForm extends Component{
    constructor(props){
      super(props)
      this.state={}
      this.handelChange = this.handelChange.bind(this)
    }

    handelChange(key,val){
      this.setState({
        [key]:val
      })
    }

    render(){
      return(
        <Comp handelChange={this.handelChange} {...this.props} state={this.state}/>
      )
    }
  }
  return newForm
}
