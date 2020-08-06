import Vue from "vue"
import Swiper from "swiper";
Vue.directive("swiper",{
  inserted(el,binding){
    if(binding.value.index === binding.value.datalist.length-1){
      new Swiper("."+binding.value.cName,{
        // loop:true,
        slidesPerView:binding.value.slides,
        spaceBetween:binding.value.space
      })
    }
  }
})
Vue.directive("title", {
  inserted(el, binding) {
    el.style.opacity = "0";
    window.onscroll = function() {
      let stop =document.body.scrollTop || document.documentElement.scrollTop;
      if (stop > (binding.value || 40)) {
        el.style.opacity = "1";
      } else {
        el.style.opacity = "0";
      }
    };
  },
   //元素解绑时清除侦听
   unbind(){
    window.onscroll = null
  }
});