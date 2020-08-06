<template>
  <div id="app">
    <transition name="app" mode="out-in" appear>
    <!-- <keep-alive include="films"> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
    </transition>
    <Tabbar v-show="isTabbarShow"></Tabbar>
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
import {mapState} from "vuex"
export default {
  computed:mapState("tabbar",["isTabbarShow"]),
  components: {
    Tabbar
  },
  created() {
  }
};
</script>

<style lang='scss'>
  *{
    margin: 0;
    padding: 0;
  }
  .app-enter-active{
    animation: move 0.5s;
  }
  .app-leave-active{
    animation: move 0.5s reverse;
  }
  @keyframes move{
    0%{
      transform:translateY(40px);
      opacity: 0;
    }
    100%{
      transform:translate(0px);
      opacity: 1;
    }
  }
</style>
