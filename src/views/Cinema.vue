<template>
  <div class="cinena">
    <div class="title">
      <div class="left" @click="toPage('/city')">{{cityName}}</div>
      <div class="center">影院</div>
      <div class="right" @click="toPage('/cinema/search')">
        <i class="iconfont icon-search"></i>
      </div>
    </div>
    <div class="select">
      <div :class="isAreaShow ? 'active':''" @click="isAreaShow = !isAreaShow">{{currentArea}}</div>
      <div>App订票</div>
      <div>最近去看</div>
    </div>
    <!-- 显示影院的区域 -->
    <div class="area" v-show="isAreaShow">
      <ul>
        <li
          v-for="data in cinemaArea"
          :key="data"
          @click="handleArea(data)"
          :class="{active:data ===currentArea}"
        >{{data}}</li>
      </ul>
    </div>
    <div class="cinemaList">
      <ul>
        <Item v-for="data in filterCinemaArea" :key="data.cinemaId" :data="data"></Item>
      </ul>
    </div>
  </div>
</template>

<script>
import { instance } from "@/utils/http";
import { mapState, mapActions, mapMutations } from "vuex";
import Vue from "vue";
import { Toast } from "vant";
import Item from "./cinema/item";
Vue.use(Toast);
export default {
  components: {
    Item
  },
  data() {
    return {
      isAreaShow: false, //显示选择区域
      currentArea: "全城" //初始选中的区域
    };
  },
  methods: {
    ...mapActions("cinema", ["getCinemaListAction"]),
    ...mapMutations("cinema", ["setCinemaList"]),
    toPage(path) {
      if (path === "/city") {
        this.setCinemaList([]);
      }
      this.$router.push(path);
    },
    handleArea(data) {
      this.currentArea = data;
      this.isAreaShow = false; //选择完成区域后自动关闭
    }
  },
  computed: {
    //vuex的辅助函数
    ...mapState("cinema", ["cinemaList"]),
    ...mapState("city", ["cityName", "cityId"]),
    cinemaArea() {
      let newArr = this.cinemaList.map(item => {
        return item.districtName;
      });
      // let arr = Array.from(new Set(newArr))
      // arr.unshift("全城")
      return ["全城", ...Array.from(new Set(newArr))];
      // return arr
    },
    filterCinemaArea() {
      if (this.currentArea === "全城") return this.cinemaList;
      return this.cinemaList.filter(item => {
        return item.districtName === this.currentArea;
      });
    }
  },
  //请求影院列表数据
  created() {
    const toast = Toast.loading({
      duration: 0,
      overlay: true,
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner"
    });
    if (this.cinemaList.length > 0) {
      toast.clear();
    } else {
      this.getCinemaListAction(this.cityId).then(res => {
        toast.clear(); //关闭弹窗
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  background: #fff;
  z-index: 10;
  padding: 0 10px;
  div {
    flex: 1;
  }
  .center {
    text-align: center;
  }
  .right {
    text-align: right;
  }
}
.select {
  position: fixed;
  top: 40px;
  height: 40px;
  width: 100%;
  line-height: 40px;
  display: flex;
  background: #fff;
  z-index: 10;
  .active {
    color: orange;
  }
  div {
    flex: 1;
    text-align: center;
  }
}
.cinemaList {
  position: relative;
  top: 80px;
  // li {
  //   padding: 0.15rem;
  //   p {
  //     overflow: hidden;
  //     text-overflow: ellipsis;
  //     white-space: nowrap;
  //   }
  // }
}
.area {
  position: fixed;
  width: 100%;
  left: 0;
  top: 80px;
  background: #fff;
  z-index: 10;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 22%;
      padding: 0.06rem;
      text-align: center;
      margin: 0.05rem;
      border: 1px solid #e5dcdc;
      &.active {
        border-color: orange;
      }
    }
  }
}
</style>
