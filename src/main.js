import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入main.scss文件
import "./stylesheets/main.scss"
import "./utils/rem.js"
//引入filter文件
import "./utils/filters"
//公用轮播图样式
import "swiper/css/swiper.min.css"
//引入v-swiper自定义实例化swiper指令
import "./utils/directive.js"
//引入公用头部组件
import "./utils/globalCom"
//引入vuex
import store from "./store"
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,// 目的就是让组件上面可以通关this.$route和this.$router访问路由相关的api
  store,//目的就是为了让组件可以通关this.$store访问vuex相关api
}).$mount('#app')
