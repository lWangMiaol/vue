import Vue from "vue"
import moment from "moment"
//定义演员表过滤器
Vue.filter("actorFilter",actors=>{
   return actors.map(item=>item.name).join(" ")
  })
  //定义时间过滤器
Vue.filter("filterDate", time => {
  // time = new Date(time * 1000);
  return (
    // time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate()\
    moment(time*1000).format("YYYY-MM-DD")
  );
});