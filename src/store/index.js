import Vuex from "vuex"
import Vue from "vue"
import cinema from "./module/cinema"
import tabbar from "./module/tabbar"
import city from "./module/city"
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)
let store = new Vuex.Store({
    plugins: [createPersistedState({
        reducer(data){
            return {
                city:data.city
            }
        }
    })],
    modules:{
        cinema,
        tabbar,
        city
    },

})
export default store;