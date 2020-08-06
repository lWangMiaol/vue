<template>
  <div class="detail" v-if="filmInfo">
    <!-- <div class="detailltitle" v-title="50">
      <i class="iconfont icon-back"></i>
      <span>阿凡达</span>
    </div> -->
    <m-title @handleback='back' v-title="40">
       {{filmInfo.name}}
    </m-title>
    <img :src="filmInfo.poster" width="100%" />
    <div class="filmInfo-con">
      <h4>
        {{filmInfo.name}}
        <span>{{filmInfo.filmType.name}}</span>
      </h4>
      <p>{{filmInfo.category}}</p>
      <p>{{filmInfo.premiereAt | filterDate}}</p>
      <p>{{filmInfo.nation}} | {{filmInfo.runtime}}分钟</p>
      <p class="grade">{{filmInfo.grade}}</p>
      <p class="synopsis" :class="{hidde:flag}">{{filmInfo.synopsis}}</p>
      <i @click="flag=!flag" class="iconfont" :class="flag?'icon-moreunfold':'icon-less'"></i>
      <h4>演职人员</h4>
      <SwiperCom cName="actors-banner">
        <div
          v-swiper="{slides:4, space:10,index:index,datalist:filmInfo.actors,cName:'actors-banner'}"
          class="swiper-slide"
          v-for="(data,index) in filmInfo.actors"
          :key="data.name"
        >
          <img class="actor-img" :src="data.avatarAddress" alt />
        </div>
      </SwiperCom>
      <h4 @click="isShow=true">剧照</h4>
      <SwiperCom cName="photos-banner">
        <div
          v-swiper="{slides:2.3, space:3,index:index,datalist:filmInfo.photos,cName:'photos-banner'}"
          class="swiper-slide"
          v-for="(data,index) in filmInfo.photos"
          :key="index"
          @click="preview(index)"
        >
          <img class="photo-img" :src="data" alt />
        </div>
      </SwiperCom>
    </div>
    <!-- 显示剧照 -->
    <Photos v-show="isShow" :photos="filmInfo.photos" @change="preview">
      <m-title @handleback='cancel'>剧照({{filmInfo.photos.length}})</m-title>
    </Photos>
  </div>
  <img
    v-else
    width="100%"
    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591938405371&di=86b8486e8ce7c8c03d2893107ca5af45&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F30c617ebaf20069347f448349057ab02e3ca79e94250a-4yIHvK_fw658"
  />
</template>

<script>
import { instance } from "@/utils/http";
import Swiper from "swiper";
import SwiperCom from "@/components/Swiper";
import Photos from "./detail/Photos"
import { ImagePreview } from 'vant';
/* import Vue from "vue"//已经封装为全局指令
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
  元素解绑时清除侦听
  unbind(){
    window.onscroll = null
  }
}); */
export default {
  methods:{
    back(){
      this.$router.back()
    },
    cancel(){
      this.isShow = false
    },
    preview(index){
      ImagePreview({images:this.filmInfo.photos,
      startPosition:index,closeable: true,
      closeIconPosition:'top-left',
      closeIcon:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592455356407&di=77025c665379d3811cd23583d771c33a&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F01%2F41%2F599d0bcc4fd11_610.jpg"});
    }
  },
  components: {
    SwiperCom,
    Photos
  },
  data() {
    return {
      filmInfo: null,
      flag: true,
      isShow:false
    };
  },
  // mounted() {
  //   window.onscroll = function() {
  //     console.log(document.documentElement.scrollTop )
  //  
  //   };
  // },
  // beforeDestroy() {
  //   window.onscroll = null;
  // },
  created() {
    instance(`/gateway?filmId=${this.$route.params.id}&k=998285`, {
      headers: {
        
        "X-Host": "mall.film-ticket.film.info"
      }
    }).then(res => {
      this.filmInfo = res.data.data.film;
      // this.$nextTick(() => {
      //   new Swiper(".actors-banner", {
      //     slidesPerView: 4,
      //     spaceBetween: 10
      //   });
      //   //剧照轮播图
      //   new Swiper(".photos-banner",{
      //     slidesPerView: 2.3,
      //     spaceBetween: 3
      //   })
      // });
    });
  }
};
</script>

<style lang='scss' scoped>
.detail{
  padding-bottom: 60px;
}
.filmInfo-con {
  padding: 0.12rem 0.15rem 0.15rem;
  position: relative;
  .actor-img,
  .photo-img {
    width: 100%;
  }
  h4 {
    color: #191a1b;
    font-size: 18px;
    height: 24px;
    line-height: 24px;
    margin-right: 7px;
    span {
      font-size: 9px;
      background-color: #d2d6dc;
      height: 14px;
      line-height: 14px;
      padding: 0 2px;
      border-radius: 2px;
      display: inline-block;
    }
  }
  .grade {
    position: absolute;
    top: 22px;
    right: 17px;
    font-size: 18px;
    font-style: italic;
    color: #ffb232;
  }
  .synopsis {
    height: 211px;
    overflow: hidden;
    transition: height 0.5s ease;
  }
  i {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .hidde {
    height: 38px !important;
  }
}
// .detailltitle {
//   height: 0.44rem;
//   line-height: 0.44rem;
//   text-align: center;
//   width: 100%;
//   top: 0;
//   left: 0;
//   background: #fff;
//   position: fixed;
//   transition: all 1s ease;
//   i {
//     position: absolute;
//     left: 0px;
//   }
// }
</style>
