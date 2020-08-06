<template>
  <div class="item">
      <li>
          <h4>{{data.name}}</h4>
          <p>{{data.address}}</p>
        </li>
  </div>
</template>

<script>
export default {
  props:["data"]
}

</script>

<style lang='scss' scoped>
li {
    padding: 0.15rem;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
