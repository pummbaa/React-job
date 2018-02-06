export function getRedirectPath({type,avatar}){
  //根据用户信息返回跳转地址
  //user.type/boss/genius
  //user.avatar/bossinfo/geniusinfo
  let url = (type==='boss')?'/boss':'/genius'
  if(!avatar){
    url += 'info'
  }
  return url
}

export function getChatId(userId,targetId){
  return [userId,targetId].sort().join('_')
}
//1.高阶组件属性代理
// function WrappHello(Comp){
//    class WrappComponent extends Component{
//     render(){
//       return(
//         <div>
//           <div>before hello</div>
//           <Comp name='text' {...this.props}></Comp>
//         </div>
//       )
//     }
//   }
//   return WrappComponent
// }
//
// @WrappHello
// class Hello extends Component{
//   render(){
//     return <h2>Hello world</h2>
//   }
// }
//2.反向继承
// function WrappHello(Comp){
//   class WrapComp extends Comp{
//    修改声明周期
//     componentDidiMount(){
//       console.log('新增声明周期')
//     }
//     render(){
//       return <Comp></Comp>
//     }
//   }
//   return WrapComp
// }
