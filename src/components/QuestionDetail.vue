<template>
  <div class="container-fluid detail">
    <div class="row" style="border: 50px solid #efefef;">
      <div class="main col-lg-9 col-md-12 col-sm-12" >
        <div class="main-top" >
          <div id="fund">
            <div style="float: left;">{{this.currentQuestion.title}}</div>
            <br>
            <p class="authorAndTime">作者：{{this.currentQuestion.user.username}} | 发布时间：{{formatDateFilter(this.currentQuestion.gmtCreate)}} |
              阅读数： {{this.currentQuestion.viewCount}}</p>
          </div>
          <div class="line" style="margin-bottom: 45px;"></div>
        </div>
        <div class="main-content" >
          <div  class="descript">{{currentQuestion.description}}</div>
          <div style="height: 280px"></div>
          <div class="line"></div>
          <p>
            <span class="tag" v-for="tag in strToTags(this.currentQuestion.tag)">{{tag}}</span>
          </p>
          <div class="line"></div>
          <router-link style="color: #606266;" :to="{name:'Publish', params: {id:this.currentQuestion.id}}" >
            <div @click="toQuestionEdit" class="edit">
              <i class="el-icon-edit"></i>编辑
            </div>
          </router-link>

          <div class="line"></div>
          2 个回复
          <div class="line"></div>
          <ul>
            <li class="replyList">
              <div class="left">
                <img src="" alt="">
                <div class="reply"></div>
                <p class="start">
                  点赞
                  评论
                  2020-12-22
                </p>
              </div>
            </li>
          </ul>
          <div class="line"></div>
          <div class="reply_title">提交回复</div>
          <div class="line"></div>
          <div class="reply">
            <div class="reply_user">
              <el-avatar :size="50">
                <img  class="reply_user_img" src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
              </el-avatar>
              <span class="reply_user_name">匿名用户</span>
            </div>
            <el-input v-model="replyComment" class="reply_form" type="textarea" :rows="5" ></el-input>
          </div>
          <div class="reply_btn">
            <el-button type="primary" @click="replyCommentSubmit">回复</el-button>
          </div>


        </div>
      </div>
      <div class="col-lg-3 col-md-12 col-sm-12" style="font-size: 13px;padding: 20px" >
        <h3>问题发起指南</h3>
        • 问题标题: 请用精简的语言描述您发布的问题，不超过25字 <br>
        • 问题补充: 详细补充您的问题内容，并确保问题描述清晰直观, 并提供一些相关的资料： <br>
        • 选择标签: 选择一个或者多个合适的标签，用逗号隔开，每个标签不超过10个字 <br>
        注意阅读格式友好，代码和异常信息请用代码标签格式化张贴； <br>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import {addViewCount, getQuestionById, addComment} from '../api'
  export default {
    name: 'QuestionDetail',
    data(){
      return {
        currentQuestion: {
          user: {
            username: ''
          }
        },
        replyComment: ''
      }
    },
    methods: {
      getQuestion(){
        getQuestionById(this.getQuestionId())
          .then(response => {
            this.currentQuestion = response.data
          })
          .catch(result => {
            console.log(result)
          })
      },
      getQuestionId(){
        // 获取传过来的参数
        let questionId = decodeURIComponent(this.$route.params.id);
        return JSON.parse(questionId)
      },
      padLeftZero(str) {
        return ('00' + str).substr(str.length);
      },
      formatDate(date, fmt) {
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        let o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds()
        };
        for (let k in o) {
          if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
          }
        }
        return fmt;
      },
      formatDateFilter(time) {
        let date = new Date(time);
        return this.formatDate(date, 'yyyy-MM-dd hh:mm');
      },
      toQuestionEdit(){
        this.$router.replace('/publish')
      },
      strToTags(str){
        if ((typeof str) !== "undefined"){
          str = str.replace(/[\uff0c]/g,",")
          return (str || '').split(",");
        }
        return null
      },
      beforeunloadFn () {
        addViewCount(this.getQuestionId())
      },
      replyCommentSubmit(){
        addComment(1,this.currentQuestion.id, this.replyComment)
        .then(response => {
          console.log(response)
        })
        .catch(result => {
          console.log(result)
        })

      }
    },
    created () {
      this.getQuestion()
      this.beforeunloadFn()
    },
    /*mounted() {
      window.addEventListener('beforeunload', () => this.beforeunloadFn())
    },
    destroyed() {
      window.removeEventListener('beforeunload', () => this.beforeunloadFn())
    }*/
  }
</script>

<style scoped>
  .main{
    border-right: 1px solid #cccccc;
    padding: 20px;
    box-sizing: border-box;
  }
  .main-top{
    width: 100%;
    padding-bottom: 10px;
  }
  #fund{
    width: 100%;
    font-size: 20px;
    font-weight: bold;
  }
  .line{
    width: 100%;
    height: .5px;
    background-color: #cccccc;
    float: left;
    margin: 15px 0 15px 0;
  }
  .tag{
    text-decoration-line: none;
    cursor: pointer;
    display: inline-block;
    height: 20px;
    line-height: 16px;
    padding: 2px 5px;
    background-color: #99cfff;
    font-size: 12px;
    color: #fff !important;
    border-radius: 4px;
    margin: 4px;
  }
  .question:first-child{
    margin-top: 25px;
  }
  .main-content{
    width: 100%;

  }

  .el-form {
    text-align: left;
  }
  .detail{
    text-align: left;
  }
  .authorAndTime{
    font-size: 13px;
    font-weight: normal;
    margin-top: 10px;
    color: #999;
  }
  .descript{
    font-size: 14px;
  }
  .edit{
    font-size: 13px;
    color: #999999;
    cursor: pointer;
  }
  .edit:hover{
    color: #4444e2;
  }
  .reply{
    margin-left: 15px;
  }
  .reply_user .reply_user_name{
    line-height: 50px;
    height: 50px;
    position: relative;
    top: -20px;
    left: 10px;
    display: inline-block;
  }
  .reply_btn{
    float: right;
    margin-top: 15px;
  }

</style>
