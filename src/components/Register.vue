<template>
  <div>
    <form action="">
      <input type="text" v-model="user.username">
      <input type="password" v-model="user.password">
      <input type="text" v-model="user.email">
      <input type="text" v-model="user.telephone">
      <input type="button" @click="add">
    </form>
    </div>

</template>

<script>
  import {add} from '../api'
  export default {
    name: 'Register',
    data(){
      return {
        user: {
          username: '',
          password: '',
          email: '',
          telephone: ''
        }
      }
    },
    methods: {
      add () {
        if (this.user.username === null || this.user.username === ''){
          alert("用户名不能为空！请填写用户名")
          return
        }
        else if (this.user.password === null || this.user.password === ''){
          alert("密码不能为空！请填写密码")
          return
        }
        else if (this.user.telephone === null || this.user.telephone === ''){
          alert("请您填写您的手机号哦")
          return
        }
        add(this.user)
          .then(function (response) {
            console.log(response.data)
            if (response.data.success){
              this.$message({
                type: 'success',
                message: response.data.message
              });
              this.$router.replace({path: '/login'});
            }else {
              this.$message({
                type: 'error',
                message: response.data.message
              });
            }
          })
          .catch(function (reason) {
            console.log(reason);
          })
      }
    }
  }
</script>

<style scoped>

</style>
