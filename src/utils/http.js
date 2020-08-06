import axios from "axios"
const instance = axios.create({
    baseURL: "https://m.maizuo.com",
    // timeout: 1000,//请求数据延时时间
    headers: {
        "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"1591796149224991861800965","bc":"310100"}',
    }
})
const instance2 = axios.create(
    {
        baseURL:"/info"
    }
)
// axios中的拦截有两种：请求之前的拦截|相应之后于的拦截
instance2.interceptors.request.use(config=>{
    // console.log("config===>",config)
    if(localStorage.getItem("token")){
        config.headers["X-Access-Token"] = localStorage.getItem("token") 
      }
    return config
})
instance2.interceptors.response.use(res=>{
    // console.log("res===>",res)
    if(res.data.flag){
        return res.data.data
    }else{
        return Promise.reject("出错了")
    }
    
})
export {instance,instance2}//解构赋值到处不能使用defalute