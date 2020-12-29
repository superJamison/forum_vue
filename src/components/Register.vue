<template>
  <div>
    <!--头部-->
    <div class="All">
      <div style="width: 100%; height: 90px; padding-top: 10px; padding-left: 5px; display: inline-block">
        <h3 class="justify-content-between" style="padding-right: 120px; padding-top: 20px;"></h3>
        <div style="color: dimgrey; font-size: 25px;margin: 30px 0 0 50px;"></div>
      </div>

      <div class="alert alert-warning alert-dismissible fade show advertisement" role="alert" style="width: 150px;height:500px;">
        <a href="#"></a>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="alert alert-warning alert-dismissible fade show advertisement1" role="alert" style="width: 150px; height:500px;">
        <a href="#"></a>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="center justify-content-center d-flex">
        <div class="center-left">
          <h4>注册登录PTY论坛</h4>
          <img src=".././assets/img/QRcode.png" alt="" style="width: 70%; padding-top: 15px;">
          <p style="padding-top: 10px;">支付宝扫码</p>
          <p>扫码关注公众号登录注册</p>
          <img src=".././assets/img/icon.png" alt="" style="width: 55%; padding-top: 20px;">
          <p><a href="">注册即代表同意《服务条款》</a></p>
        </div>
        <div class="center-right">
          <form class="sui-form form-horizontal">
            <div class="control-group">
              <label class="control-label">登录名（不可修改）：</label>
              <div class="controls">
                <input type="text" v-model="user.username" placeholder="登录名" class="input-xfat input-xlarge">
              </div>
            </div>

            <div class="control-group">
              <label class="control-label">登录密码：</label>
              <div class="controls">
                <input type="password" v-model="user.password" placeholder="登录密码" class="input-xfat input-xlarge">
              </div>
            </div>

            <div class="control-group">
              <label class="control-label">联系人EMAIL：</label>
              <div class="controls">
                <input type="text" v-model="user.email" placeholder="联系人EMAIL" class="input-xfat input-xlarge">
              </div>
            </div>

            <div class="control-group">
              <label class="control-label">联系人手机：</label>
              <div class="controls">
                <input type="text" v-model="user.telephone" placeholder="联系人手机" class="input-xfat input-xlarge">
              </div>
            </div>

            <div class="control-group">
              <label class="control-label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <div class="controls">
                <input name="m1" type="checkbox" value="2" checked=""><span>同意协议并注册  <a href="sampling.html">《胖头鱼论坛注册协议》</a></span>
              </div>
            </div>

            <div class="control-group">

              <div class="controls btn-reg justify-content-center">
                <input type="button" class="sui-btn btn-block btn-xlarge btn-success border-radius:5px" value="申请注册"  @click="add()"  target="_blank"/>
              </div>
              <router-link   to="/login" style="color: #606266;" > <!--to="/questionDetail"-->
                <p class="text-warning">注册申请<span class="go">我有账号，去<a href="#" class="text-success">登录</a></span></p>
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="py-container copyright">
      <ul class="d-flex list-unstyled justify-content-between py-container-ul" style="padding-left: 500px; padding-right: 500px;">
        <li><a href="#">关于我们</a></li>
        <li><a href="#">联系我们</a></li>
        <li><a href="#">人才招聘</a></li>
        <li><a href="#">商家入驻</a></li>
        <li><a href="#">广告服务</a></li>
        <li><a href="#">友情链接</a></li>
        <li><a href="#">销售联盟</a></li>
        <li><a href="#">商家社区</a></li>
      </ul>
    </div>
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
        console.log(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.user.telephone))
        console.log(!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.user.email))
        if (this.user.username === null || this.user.username === ''){
          this.$message({
            type: 'error',
            message: "用户名不能为空！请填写用户名！"
          });
          return
        }
        else if (this.user.password === null || this.user.password === ''){
          this.$message({
            type: 'error',
            message: "密码不能为空！请填写密码！"
          });
          return
        }
        else if (this.user.telephone === null || this.user.telephone === ''){
          this.$message({
            type: 'error',
            message: "请您填写您的手机号哦！"
          });
          return
        }
        else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.user.telephone)){
          this.$message({
            type: 'error',
            message: "手机号填写错误！"
          });
          return
        }
        else if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.user.email)){
          this.$message({
            type: 'error',
            message: "邮箱格式有误！"
          });
          return
        }
        add(this.user)
          .then(response => {
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
          .catch(reason => {
            console.log(reason);
          })
      }
    }
  }
</script>

<style scoped>
  a{
    font-size: 12px;
    line-height: 1.5em;
    font-family: "Microsoft YaHei","arial","sans-serif" !important;
    color: #000;
    text-decoration: none !important;
  }
  .py-container{
    position: relative;
    bottom: 0;
    background-color: rgba(168, 168, 168, 0.33);
  }
  .py-container-ul{
    margin-bottom: 0;
    margin: auto;
  }
  .py-container-ul li{
    border:none;
  }
  .control-group controls{
    margin-bottom: 100px;
  }
  .btn-reg{
    line-height: 40px;
    width: 100%;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .btn-reg button{
    width: 150px;
    margin: 0 auto;
    border-radius:5px;
    border-radius: 1-4 length|% / 1-4 length|%;
  }
  .advertisement{
    background:url(".././assets/img/aside.png") ;
    background-size: 100% 100%;
    position: absolute;
    margin-top: 10px;
    background-color: #fff;
    border: none;
  }
  .advertisement1{
    background:url(".././assets/img/aside.png") ;
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    margin-top: 10px;
    background-color: #fff;
    border: none;
  }
  .center-left{
    border: 2px solid #000;
    width: 25%;
    margin: 0 auto;
    padding-bottom: 10px;
    border-radius: 1.5pc;
    padding-top: 10px;
    background-color: #fff;
  }
  .center-left p{
    margin: 0;
  }
  .center-left h4{
    padding-top: 40px;
  }
  .center-right{
    border: 2px solid #000;
    width: 25%;
    margin: 0 auto;
    padding-bottom: 10px;
    border-radius: 1.5pc;
    padding-top: 10px;
    background-color: #fff;
  }

  .All{
    background: url(".././assets/img/Niu5.png");
    background-size: cover;
    height: 700px;
  }
</style>
