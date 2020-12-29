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
          <el-divider content-position="left"></el-divider>
          <p>
            <span class="tag" v-for="tag in strToTags(this.currentQuestion.tag)">
              <span @click="clickTag(tag)">{{tag}}</span>
            </span>
          </p>
          <!--v-if="this.currentQuestion.user.id === this.$session.get('user').id"-->
          <el-divider  content-position="left"></el-divider>
          <router-link style="color: #606266;" :to="{name:'Publish', params: {id:this.currentQuestion.id}}" >
            <div @click="toQuestionEdit" class="edit">
              <i class="el-icon-edit"></i>编辑
            </div>
          </router-link>

          <el-divider content-position="left"></el-divider>
          {{allReply.length}} 个回复
          <el-divider content-position="left">回复内容</el-divider>
          <ul class="allReply">
            <li class="replyList" v-for="(reply, index) in allReply">
              <div class="left">
                <el-avatar :size="50" >
                  <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                </el-avatar>
                <span class="reply">{{reply.comment.content}}</span>
              </div>
              <p class="star" >
                <span style="cursor: pointer" @click="like(reply.comment.id)">
                  <icon  name="icon-test" :id="'like-'+reply.comment.id"></icon>
                </span>
                <span style="cursor: pointer" @click="subReply(reply.comment.id)">
                  <icon class="commentBtn" :id="'commentBtn'+reply.comment.id" name="entypocomment" ></icon>
                  <span>{{reply.children.length}}</span>
                </span>
                <span class="reply_time">{{formatDateFilter(reply.comment.gmtCreate)}}</span>
              </p>
              <div class="line"  style="position:relative;top: -28px"></div>
              <ul style="list-style: none;" v-show="false" :id="'subReply-'+reply.comment.id">
                <li v-for="childrenReply in reply.children">
                  <div class="left">
                    <el-avatar :size="50" >
                      <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                    </el-avatar>
                    <span class="reply">{{childrenReply.content}}</span>
                  </div>
                  <p class="star">
                    <span style="cursor: pointer" @click="like(childrenReply.id)">
                      <icon  name="icon-test" :id="'like-'+childrenReply.id"></icon>
                    </span>
                    <span class="reply_time">{{formatDateFilter(childrenReply.gmtCreate)}}</span>
                  </p>
                  <div class="line" style="position:relative;top: -28px"></div>
                </li>
                <el-input
                  placeholder="评论一下......"
                  clearable
                  v-model="subReplyContent[index].content"
                >
                </el-input>
                <div class="subCommentBtn">
                  <el-button type="primary" @click="subCommentBtn(reply.comment.id, index)">评论</el-button>
                </div>
              </ul>
            </li>
          </ul>
          <el-divider content-position="left"></el-divider>
          <div class="reply_title">提交回复</div>
          <el-divider content-position="left"></el-divider>
          <div>
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
  import {addViewCount,
    getQuestionById,
    addComment,
    getReplyById,
    addLikeCount} from '../api'
  export default {
    name: 'QuestionDetail',
    inject:['reload'],
    data(){
      return {
        currentQuestion: {
          user: {
            username: ''
          }
        },
        replyComment: '',
        allReply: [],
        subReplyContent: [],//二级评论内容
        oldRouterPath: '',
        newRouterPath: ''
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
        getReplyById(this.getQuestionId())
        .then(response => {
          this.allReply = response.data
          for (let i = 0; i < this.allReply.length; i++){
            this.subReplyContent.push({content: ""})
          }
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
      beforeunloadFn(){
        addViewCount(this.getQuestionId())
      },
      replyCommentSubmit(){
        addComment(1,this.currentQuestion.id, this.replyComment)
        .then(response => {
          if (!response.data.success){
            alert(response.data.message)
          }else {
            this.replyComment = ''
            this.reload()
          }
        })
        .catch(result => {
          console.log(result)
        })

      },
      //展开二级评论
      subReply(id){
        $('#subReply-' + id).toggle()
        if($('#subReply-' + id).is(":hidden")){
          //隐藏
          $("#commentBtn"+id).css("color","#333")
        }else{
          //打开
          $("#commentBtn"+id).css("color","#499ef3")
        }
      },
      subCommentBtn(questionId, index){
        addComment(2,questionId, this.subReplyContent[index].content)
          .then(response => {
            if (!response.data.success){
              alert(response.data.message)
            }else {
              this.subReplyContent[index].content = ''
              this.reload()
            }
          })
          .catch(result => {
            console.log(result)
          })

      },
      like(commentId){ //点赞
        addLikeCount(commentId)
        .then(response => {
          console.log(response.data)
          if (response.data.success){
            console.log($('#like-' + commentId))
            $("#like-"+commentId).addClass("likeActive")
          }else {
            alert(response.data.message)
          }
        })
        .catch(result => {
          console.log(result)
        })
      },
      clickTag(tagContent){
        this.$store.state.searchContent = tagContent
        this.$router.replace({path: '/'});
      }
    },
    created () {
      this.getQuestion()
      this.beforeunloadFn()
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
    }
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
    margin: 1px 0 1px 0;
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
  .allReply{
    list-style: none;
    margin-left: 15px;
  }
  .reply{
    line-height: 50px;
    height: 50px;
    position: relative;
    top: -20px;
    left: 10px;
    display: inline-block;
  }
  .reply_user .reply_user_name{
    line-height: 50px;
    height: 50px;
    position: relative;
    top: -20px;
    left: 10px;
    display: inline-block;
  }
  .star{
    margin-left: 60px;
    position: relative;
    top: -14px;
  }
  .reply_time{
    float: right;
    color: #999999;
    font-size: 14px;
  }
  .reply_btn{
    float: right;
    margin-top: 15px;
  }
  .commentBtn:hover{
    color: #499ef3;
  }
  .subCommentBtn{
    position: relative;
    left: 87%;
    top: 15px;
    margin-bottom: 29px;
  }
  .likeActive{
    color: red;
  }
</style>
