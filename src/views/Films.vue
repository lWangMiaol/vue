<template>
  <div class="films">
    <!-- <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="banner in banners" :key="banner.bannerId">
          <img width="100%" :src="banner.imgUrl" />
        </div>
      </div>
    </div> -->
    <SwiperCom cName="films-banner" v-show="banners.length>0">
      <div class="swiper-slide" v-for="banner in banners" :key="banner.bannerId">
          <img width="100%" :src="banner.imgUrl" />
        </div>
    </SwiperCom>
    <div class="nav">
      <router-link v-for="nav in navs" :key="nav.id" :to="nav.path" active-class="active">{{nav.title}}</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// import axios from "axios";
import Swiper from "swiper";
import SwiperCom from "@/components/Swiper"
import {instance,instance2} from "@/utils/http"
import {mapState} from "vuex"
export default {
  name:"films",
  components:{
    SwiperCom
  },
  data() {
    return {
      banners: [],
      navs:[
        {id:1,title:"正在热映",path:"/films/nowplaying"},
        {id:2,title:"即将上映",path:"/films/comingsoon"}
      ]
    };
  },
   computed: {
     ...mapState("city",['cityId'])
  },
  created() {
    instance
      .get(`/gateway?type=2&cityId=${this.cityId}&k=3600501`, {
        headers: {
          "X-Host": "mall.cfg.common-banner"
        }
      })
      .then(res => {
        // console.log(res.data.data);
        // let arr = res.data.data
        // arr.push({bannerId:300,imgUrl:"https://static.maizuo.com/v5/upload/4a8da56010356705571f85b345165ed8.jpg?x-oss-process=image/quality,Q_70"})
        // this.banners = res.data.data
       if(res.data.data) this.banners = [
          ...res.data.data,
          {
            bannerId: 300,
            imgUrl:
              "https://static.maizuo.com/v5/upload/4a8da56010356705571f85b345165ed8.jpg?x-oss-process=image/quality,Q_70"
          }
        ];
        this.$nextTick(() => {
          new Swiper(".swiper-container", {
            loop: true,
            pagination:{
              el:".swiper-pagination"
            }
          });
        });
      });

      // instance2.get("/api/position/find").then(res=>{
      //   // console.log(res)
      //   this.position = res
      // }).catch(err=>{
      //   console.log("position==>",err)
      // })
  }
};
</script>

<style lang="scss" scoped>
.nav{
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-around;
  a{
    border-bottom:1px solid transparent;
    transition: all 1s ;
  }
  .active{
    color:orange;
    border-color:orange ;
  }
}
.films-banner{
  width: 100%;
  height: 2rem;
  img{
    height: 100%;
  }
/deep/ .swiper-pagination-bullet-active{
    background: #ffffff;
  }
}
</style>
