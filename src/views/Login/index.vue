<template>
  <div class="index">
    <Header></Header>
    <SideBar></SideBar>
    <MainContent></MainContent>
  </div>

</template>

<script>
import Header from "@/views/Login/Header"
import SideBar from "@/views/Login/SideBar"
import MainContent from "@/views/Login/MainContent"
export default {
  name: "indexPage",
  components:{
    Header,
    MainContent,
    SideBar
  }

}
</script>

<style scoped>
.index{
  position: relative;
  width: 100%;
  height: 1000px;
  margin: 0;
}
</style>