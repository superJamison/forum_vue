<template>
    <div id="login">
      <table style="margin: 30px auto;">
        <div>
          <tr>
            <td>用户名：</td>
            <td><input type="text" v-model="username"></td>
          </tr>
          <tr>
            <td>密码：</td>
            <td><input type="password" v-model="password"></td>
          </tr>
          <tr>
            <input type="button" @click="login" value="登录">
          </tr>
        </div>
      </table>
    </div>
</template>

<script>
  import {login} from './../api/index'
  export default {
    name: 'Login',
    data() {
      return {
        username: 'jamison',
        password: '1234'
      }
    },
    methods: {
      login(){
        login(this.username, this.password)
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
          }else {
            this.$store.state.isLogin = false
          }
        })
        .catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style>
#login{
  width: 100%;
  height: 500px;
  background: #f1f127;
}

</style>
