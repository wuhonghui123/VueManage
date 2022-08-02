<template>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "MainContent"
}
</script>

<style scoped>
.main{
  width: 85%;
  height: 90%;
  background-color: darksalmon;
  float: left;
}
</style>