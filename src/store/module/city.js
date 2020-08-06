export default {
    namespaced:true,
    state:{
        cityName:"北京" ,
        cityId:"110100"
    },
    mutations:{
       setCityName(state,cityName){
           state.cityName = cityName
       },
       setCityId(state,cityId){
           state.cityId = cityId
       }
    }
}