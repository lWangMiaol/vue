<template>
  <div>
    <ul>
      <router-link tag="li" v-for='data in datalist' :key="data.filmId" :to="'/detail/'+data.filmId">
        <img :src="data.poster" alt="">
        <div class="content">
          <h4>{{data.name}}</h4>
          <p>观众评分: <span class="grade">{{data.grade}}</span></p>
          <!-- <p>主演：<span v-for="item in data.actors" :key="item.name">{{item.name}}</span></p> -->
          <p>主演：{{data.actors | actorFilter}}</p>
          <p>{{data.nation}} | {{data.runtime}}</p>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
import { instance } from "@/utils/http";
import {mapState} from "vuex";
export default {
  data() {
    return {
      datalist: null
    };
  },
  computed:{
    ...mapState("city",["cityId"])
  },
  created() {
    instance
      .get(`/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=5269819`, {
        headers: {
          "X-Host": "mall.film-ticket.film.list"
        }
      })
      .then(res => {
        this.datalist = res.data.data.films;
      })
  }
};
</script>

<style lang='scss' scoped>
li{
  display: flex;
  padding: 10px;
  img{
    width: 0.66rem;
    height: 0.9rem;
  }
  .content{
    margin-left:14px ;
  }
  h4{
    color: #191a1b;
    font-size:16px;
  }
  .grade{
    color: #ffb232;
    font-size: 14px;
  }
}
</style>
