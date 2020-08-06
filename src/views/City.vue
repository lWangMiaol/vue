<template>
  <div class="city">
    <van-index-bar :index-list="indexList">
      <div v-for="(data,index) in dataList" :key="index">
        <van-index-anchor :index="data.index" />
        <van-cell
          @click="clickCity(item)"
          v-for="(item,index) in data.list"
          :key="index"
          :title="item.name"
        ></van-cell>
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import Vue from "vue";
import { instance } from "@/utils/http";
import { IndexBar, IndexAnchor, Cell } from "vant";
import {mapMutations} from "vuex"
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell);
export default {
  data() {
    return {
      dataList: [],
      indexList: []
    };
  },
  created() {
    instance("/gateway?k=9320082", {
      headers: {
        "X-Host": "mall.film-ticket.city.list"
      }
    }).then(res => {
      this.filterDataList(res.data.data.cities);
    });
  },

  methods: {    
    ...mapMutations("city",["setCityName","setCityId"]),    
    clickCity(item) {
        this.setCityName(item.name);
        this.setCityId(item.cityId)
        this.$router.back()
    },
    filterDataList(cities) {
      let letterArr = []; //创建26个字母的数组数据
      let cityArr = [];
      for (var i = 65; i < 91; i++) {
        letterArr.push(String.fromCharCode(i));
      }
      // 遍历城市获取每个对象的拼音首字母大写跟letterarr匹配
      for (var i = 0; i < letterArr.length; i++) {
        var tempArr = cities.filter(
          item => item.pinyin.substring(0, 1).toUpperCase() === letterArr[i]
        );
        if (tempArr.length > 0) {
          cityArr.push({
            index: letterArr[i],
            list: tempArr
          });
          this.indexList.push(letterArr[i]);
        }
      }
      this.dataList = cityArr;
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
