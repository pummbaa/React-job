export function getRedirectPath(action){
  //根据用户信息返回跳转地址
  //user.type/boss/genius
  //user.avatar/bossinfo/geniusinfo
  let url = (action.data.type==='boss')?'/boss':'genius'
  if(!action.data.avatar){
    url += 'info'
  }
  return url
}
