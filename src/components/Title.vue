<template 
>
  <div class="detailltitle">
    <i @click="back" class="iconfont icon-back"></i>
    <span>
        <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
    methods:{
        back(){
            // this.$router.back()//直接后退至前一页
            this.$emit('handleback')
        }
    },
};
</script>

<style lang='scss' scoped>
.detailltitle {
  height: 0.44rem;
  line-height: 0.44rem;
  text-align: center;
  width: 100%;
  top: 0;
  left: 0;
  background: #fff;
  position: fixed;
  transition: all 1s ease;
  i {
    position: absolute;
    left: 0px;
  }
}
</style>
