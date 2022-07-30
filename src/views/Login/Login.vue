<template>
<label htmlFor="usermane">用户名：</label><input type="text" id="usermane" v-model="loginForm.username">
<label htmlFor="password">密码：</label><input type="text" id="password" v-model="loginForm.password">
  <button @click="login">登录</button>
</template>

<script>



export default {
  name: "LoginPage",
  data(){
    return{
      loginForm:{
        username:'liwei',
        password:'lw1234'
      }

    }
  },
  methods:{
    login(){
      this.$api.login.login("/login",this.loginForm)
      .then(res=>{
        sessionStorage.setItem("token",res.token)

        this.$api.menu.findNavTree("menu/findNavTree",{'userName': this.loginForm.username})
        .then(res=>{
          console.log("当前用户菜单：", res);
          this.$store.commit("setNavTree",res);
        })
        this.$router.push("/index");
      }).catch(err=>{
        console.log(err);
        this.$router.push("/")
      })
  }
}
}
</script>

<style scoped>

</style>