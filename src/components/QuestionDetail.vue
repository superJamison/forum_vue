<template>
    <div class="container-fluid detail">
      <div class="row" style="border: 50px solid #efefef;">
        <div class="main col-lg-9 col-md-12 col-sm-12" >
          <div class="main-top" >
            <div id="fund">
              <span style="float: left;">title</span>
              <p>作者：{{this.$store.state.username}} | 发布时间：2020-12-22 20:44 | 阅读数： 5</p>
            </div>
            <div class="line"></div>
          </div>
          <div class="main-content">
            {{question}}
            content。。。
            <hr>
            spring | github | ide | java
            <hr>
            <div><i class="el-icon-edit"></i>编辑</div>
            <hr>
            2 个回复
            <hr>
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
  import {getQuestionById} from '../api'
  export default {
    name: 'QuestionDetail',
    data(){
      return {
        question: {}
      }
    },
    methods: {
      getQuestion(){
        // 获取传过来的参数
        let questionId = decodeURIComponent(this.$route.params.id);
        questionId = JSON.parse(questionId)
        getQuestionById(questionId)
          .then(response => {
            console.log(response.data)
          })
          .catch(result => {
            console.log(result)
          })


      }
    },
    created () {
      this.getQuestion()
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
    height: 1px;
    background-color: #cccccc;
    float: left;
    margin-top: 10px;
  }
  .question:first-child{
    margin-top: 25px;
  }
  .main-content{
    width: 680px;
  }

  .el-form {
    text-align: left;
  }
</style>
