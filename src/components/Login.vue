<template>
  <div class="login" >
    <div class='login2'>
      <form>
        <table style="margin: 30px auto;">
          <div class="login-panel">
            <div class="login-title">
              <h2>用户登陆</h2>
            </div>
            <div class="login-container">
              <input type="text" class="input" v-model="username" placeholder="请输入用户名" />
            </div>
            <div class="login-container">
              <input type="password"  class="input" v-model="password" placeholder="请输入密码"/>
            </div>
            <div class="login-container d-flex justify-content-between">
              <div class="login-validation">
                <input type="text" v-model="validation"  class="input " placeholder="请输入验证码"/>
              </div>
              <img id="num" alt="点击换一张" class="img" style="cursor: pointer" :src="imgUrl"  @click="getImg()"  >
            </div>
            <br />
            <br />
            <div class="gcs-login-container">
              <input type="button" value="立即登录" @click="login" class="btn-login" />
            </div>
          </div>
        </table>
      </form>
    </div>
  </div>
</template>

<script>
  import {login, getImg} from './../api/index'
  export default {
    name: 'Login',
    data() {
      return {
        username: 'jamison',
        password: '123456',
        validation: '',
        imgUrl: ''
      }
    },
    methods: {
      login(){
        login(this.username, this.password, this.validation)
        .then(response => {
          if (response.data.login){
            this.$store.state.isLogin = true
            this.$store.state.username = response.data.user.username
            this.$store.state.userId = response.data.user.id
            //设置session
            this.$session.set("user", response.data.user)
            this.$cookies.set("token", response.data.user.token)

            this.$router.replace({path: '/'});
            //window.sessionStorage.setItem("user",JSON.stringify(response.data.user));
            this.$message({
              type: 'success',
              message: '登录成功!'
            });
          }
          else {
            this.$message({
              type: 'error',
              message: response.data.message
            });
            this.getImg()
            this.$store.state.isLogin = false
          }
        })
        .catch(error => {
          console.log(error)
        })
      },
      // 通过axios获取图片信息方法
      getImg(){
        getImg()
          .then(res => {
            this.imgUrl = res.data;
          })
      }
    },
    created () {
      this.getImg()
    }
  }
</script>

<style>
.login{
  position: absolute;
  top: 60px;
  width: 100%;
  height: 94%;
  background-image: url("../assets/img/background.png");
  background-size: cover;
  overflow: hidden;
}
.login2 {
  margin: auto;
  position: absolute;
  right: 40%;
  box-sizing: border-box;
  width: 470px;
  height: 75%;
  bottom: 15%;
  z-index: 100;
  background-color:rgba(0,0,0,0.5);
  border-radius: 10px;
  box-shadow: 2px 2px 10px #909090;
  filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr=#40000000,endColorstr=#40000000);
}
.img{
  height: 46px;
  width: 177px;
  padding-right: 46px;
}
.login2 .login-panel{
  height: 360px;
  position:absolute;
  margin:auto;
  left: 0;
  right: 0;
  top:0;
  bottom: 0;

}
.login2 .login-title {
  text-align: center;
  color: #62a8ea;
}

.login2 .login-title h2 {
  letter-spacing: 10px;
}

.login-container {
  width: 100%;
  box-sizing: border-box;
  width: 100%;
  margin: 20px 0 0;
  text-align: center;

}
.login-container .login-validation{
  padding-left: 22px;
  width: 69%;
}

.login2 .input {
  border: 1px solid white;
  display: inline-block;
  box-sizing: border-box;
  width: 80%;
  height: 46px;
  padding-left: 10px;
  margin: 0 auto;
  font-size: 14px;
  outline: none;
  color:  #76838f;
  border-radius: 10px;

}
.login2 .input:focus {
  outline: none;
  border: 1px solid #62a8ea;
}
.login2 .btn-login {
  background-color: #62a8ea;
  border: none;
  width: 80%;
  height: 45px;
  line-height: 45px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border-radius: 10px;

}

.login2 .btn-login:hover{
  opacity: 0.7;
}

</style>
