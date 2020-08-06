import Vue from 'vue'
import VueRouter from 'vue-router'
// import Films from "@/views/Films"
// import Center from "@/views/Center"
// import Cinema from "@/views/Cinema"
// import Nowplaying from "@/views/Nowplaying"
// import ComingSoon from "@/views/ComingSoon"
// import Detail from "@/views/Detail"
Vue.use(VueRouter)
const routes = [
    {
        path: '/films',
        component:()=>import("@/views/Films"),
        children: 
            [{
                name:"films",
                path:"/films/nowplaying",//二级路由的两种写法
                component:()=>import("@/views/films/Nowplaying")
            },
            {
                path:"comingsoon",
                component:()=>import("@/views/films/ComingSoon")
            },
            {
                path:"",
                redirect:"/films/nowplaying"//路由的重新定向
            }
        ]
    },
    {
        name:"cinema",
        path: "/cinema",
        component: ()=>import("@/views/Cinema")
    },
    {
        path:"/cinema/search",
        component:()=>import("@/views/Search")
    },
    {
        name:"center",
        path: "/center",
        component: ()=>import("@/views/Center"),
        // beforeEnter(to,from,next){
        //     console.log("进入到center之前触发")
        //     next()
        // }
    },
    {
        path:"/detail/:id",//动态路由
        component:()=>import("@/views/Detail"),
        props:true
    },
    {
        path:"/",
        redirect:"/films/nowplaying"
    },{
        path:"*",
        redirect:"/films/nowplaying"
    },{
        path:"/login",
        component:()=>import("@/views/Login")
    },{
        path:"/cinema/:id",
        component:()=>import("@/views/CinemaHome")
    },{
        path:"/city",
        component:()=>import("@/views/City")
    }
]
let router = new VueRouter({
    // mode:'history',//默认为hash模式
    routes
})
//全局路由守卫钩子：beforeEach    afterEach
//from：当前导航正要离开的路由对象
//to：即将要进入的目标路由对象
//全局的前置路由守卫 路由跳转之前就会执行
// router.beforeEach((to,from,next)=>{
//     // console.log("beforeEach")
//     if(from.path === "/cinema"){
//         console.log("从影院那边来的")
//     };
//     next()//这个方法必须调用
// })
// router.afterEach((to,from)=>{
//     if(to.path ==="/center"){
//         console.log("进入center了")
//     }
// })
// router.beforeEach((to,from,next)=>{
//     if(to.path === "/center"){
//         if(localStorage.getItem("token")){//判断本地存储有没有token数据
//             next()
//         }else{
//             next("/login")
//         }
//     }else{
//         next()
//     }
// })
export default router
//路由配置文件