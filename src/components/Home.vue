<template>
  <div>
    <el-container>
      <el-header style="background-color: #499ef3;">
        <div class="top" style="color: #ffffff">
          <span class="title" @click="forumCenter" style="float: left;line-height: 40px;cursor:pointer"><router-link style="color: #ffffff;text-decoration: none;" to="/">PTY论坛</router-link></span>
            <el-input v-model="$store.state.searchContent" placeholder="请搜索内容..." style="width: 300px;height: 30px;float: left;margin-left: 30px;"></el-input>
          <el-button type="success" style="float: left;margin-left: 10px;" @click="searchBtn">搜索</el-button>

          <div class="right" >
            <span v-if="!$store.state.isLogin" style="margin-right: 10px;cursor:pointer"><router-link style="color: #606266;" to="/register">注册</router-link></span>
            <span v-if="!$store.state.isLogin" style="margin-right: 10px;cursor:pointer"><router-link style="color: #606266;" to="/login">登录</router-link></span>
            <span v-if="$store.state.isLogin" style="margin-right: 10px;cursor:pointer"><router-link style="color: #606266;" :to="{name:'Publish', params: {id:null}}" >发布</router-link>
            </span>
            <el-dropdown v-if="$store.state.isLogin" >
            <span class="el-dropdown-link" style="cursor:pointer">
              {{$store.state.username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><router-link style="color: #606266;" to="/my">我的</router-link></el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" @click="logout">退出</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <router-view ref="Childmain" v-if="isRouterAlive"></router-view>
      <Footer></Footer>
    </el-container>
  </div>
</template>

<script>
import Footer from './../components/Footer'
import {getUserByToken} from './../api/index'
  export default {
  name: "Home",
    provide(){
    return {
      reload: this.reload
    }
    },
    components: {
      Footer
    },
  data() {
    return {
      isRouterAlive: true,
      oldRouterPath: '',
      newRouterPath: '/'
    };
  },
  methods: {
    //验证是否已经登录过了，如果登录过了就会显用户信息
    isLogin: function () {
      //et user=JSON.parse(sessionStorage.getItem("user"));
      let user = this.$session.get('user')
      if (user != null) {
        this.$store.state.isLogin = true
        this.$store.state.username = user.username
        this.$store.state.id = user.id
      }
      let token = this.$cookies.get("token")
      if (token !== 'null' && token !== ''){
        getUserByToken(token)
        .then(response => {
          this.$store.state.isLogin = true
          this.$store.state.username = response.data.user.username
          this.$store.state.userId = response.data.user.id
          //设置session
          this.$session.set("user", response.data.user)
        })
        .catch(result => {
          console.log(result)
        })
      }
    },
    logout(){
      this.$confirm('您确定退出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$store.state.isLogin = false
        this.$store.state.username = ''
        this.$store.state.userId = ''
        // 清空登录信息session，user变量
        this.$session.set("user", null)
        this.$cookies.set("token", null)
        //sessionStorage.removeItem("user");
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
        this.$router.replace({path: '/'});
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });
      });


    },
    goBack(){
      //回退
      //TODO 默认暂时返回的是首页，但后续要实现的是返回到上一个页面
      console.log(this.newRouterPath)
      if (this.newRouterPath !== "/"){
        this.$router.replace({path: '/'});
      }
    },
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true

      })
    },
    searchBtn(){
      if (this.newRouterPath !== "/") {
        this.$router.replace({path: '/'});
      }else {
        this.$refs['Childmain'].childe()
      }
    },
    forumCenter(){
      this.$store.state.searchContent = ''
      this.$refs['Childmain'].childe()
    }
  },
    created () {
      this.isLogin()
    },
    mounted () {
    if(window.history&&window.history.pushState){
      history.pushState(null,null,document.URL)
      window.addEventListener('popstate', this.goBack, false);
    }
  },
  destroyed(){
    window.removeEventListener('popstate',this.goBack,false);
  },
    watch: {
      $route: {
        handler: function(val, oldVal){
          this.oldRouterPath = oldVal.path
          this.newRouterPath = val.path
        },
        // 深度观察监听
        deep: true
      }
    },

};
</script>

<style>

  .top{
    padding: 10px;
    box-sizing: border-box;
  }
  .right{
    float: right;
    margin-top: 10px;
    margin-right: 20px;
    color: #606266;
    font-size: 14px;
  }


</style>
