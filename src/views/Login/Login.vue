<template>
  <div class="loginbody">
    <div class="login">
      <div class="mylogin" align="center">
        <h4>后台管理</h4>
        <el-form
            :model="loginForm"
            :rules="loginRules"
            ref="loginForm"
            label-width="0px"
        >
          <el-form-item
              label=""
              prop="account"
              style="margin-top:10px;"
          >
            <el-row>
              <el-col :span='2'>
                <span class="el-icon-s-custom"></span>
              </el-col>
              <el-col :span='22'>
                <el-input
                    class="inps"
                    placeholder='账号'
                    v-model="loginForm.username">
                </el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item
              label=""
              prop="passWord"
          >
            <el-row>
              <el-col :span='2'>
                <span class="el-icon-lock"></span>
              </el-col>
              <el-col :span='22'>
                <el-input
                    class="inps"
                    type="password"
                    placeholder='密码'
                    v-model="loginForm.password"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item style="margin-top:55px;">
            <el-button
                type="primary"
                round
                class="submitBtn"
                @click="login"
            >登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
<!--<label htmlFor="usermane">用户名：</label><input type="text" id="usermane" v-model="loginForm.username">-->
<!--<label htmlFor="password">密码：</label><input type="text" id="password" v-model="loginForm.password">-->
<!--  <button @click="login">登录</button>-->
</template>

<script>



export default {
  name: "LoginPage",
  data(){
    return{
      loginForm:{
        username:'10086',
        password:'123456'
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
.loginbody {
  overflow: scroll;
  overflow-y: hidden;
  overflow-x: hidden;
}

.login {
  width: 100vw;
  padding: 0;
  margin: 0;
  height: 100vh;
  font-size: 16px;
  background-position: left top;
  background-color: #242645;
  color: #fff;
  font-family: "Source Sans Pro",serif;
  position: relative;
  background-image: url('@/assets/guet.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.mylogin {
  width: 240px;
  height: 280px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 15px;
  padding: 50px 40px 40px 40px;
  box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
  opacity: 1;
  background: linear-gradient(
      230deg,
      rgba(53, 57, 74, 0) 0%,
      rgb(0, 0, 0) 100%
  );
}

.inps input {
  border: none;
  color: #fff;
  background-color: transparent;
  font-size: 12px;
}

.submitBtn {
  background-color: transparent;
  color: #39f;
  width: 200px;
}
</style>
