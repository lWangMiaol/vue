<template>
  <div class="center">我的</div>
</template>
<script>
import {instance2} from '@/utils/http';
export default {
  //进入center组件之前触发
//   beforeRouteEnter(to,from,next){
//     console.log("beforeRouteEnter",this)
//     next()
//   },
//   //离开center组件的时候触发
//   beforeRouteLeave(to,from,next){
//     console.log("beforeRouteLeave",this)
//     next()
//   }
// 
  // beforeRouteEnter(to,from,next){
  //   if(to.path === "/center"){
  //       if(localStorage.getItem("token")){//判断本地存储有没有token数据
  //           next()
  //       }else{
  //           next("/login")
  //       }
  // }
// }
//发起一个post请求 用来验证当前用户是否处在登录状态，如果等路那么放行否则跳转登录界面
  // created(){
  //   instance2({
  //     method:'post',
  //     url:"/api/user/isloginin",
  //      }).then(res=>{
  //       // console.log(res)
  //     }).catch(res=>{
  //       this.$router.push("/login")    
  //       })
  // }
  beforeRouteEnter(to,from,next){
    instance2({
      method:'post',
      url:"/api/user/isloginin",
       }).then(res=>{
        next()
      }).catch(res=>{
        next("/login")    
        })
  }
}
</script>

<style lang='scss' scoped>

</style>
