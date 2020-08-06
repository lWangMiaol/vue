<template>
  <div class="photos">
    <slot></slot>
    <ul>
        <li v-for="(item,index) in photos" :key="index" @click="preview(index)">
            <img :src="item" alt="">
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["photos"],
  methods:{
    preview(index){
      this.$emit("change",index)
    }
  }
};
</script>
<style lang='scss' scoped>
.photos {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fff;
  top: 0;
  left: 0;
  z-index: 10;
  ul{
      position: relative;
      display: flex;
      flex-wrap: wrap;
      top: 50px;
      li{
          width: 33.33%;
          padding: 5px;
          height: 0.8rem;
      }
      img{
          width: 100%;
            height: 100%;
      }
  }
}
</style>
