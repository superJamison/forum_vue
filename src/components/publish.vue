<template>
  <div class="container-fluid">
    <div class="row" style="border: 50px solid #efefef;border-bottom: 0">
      <div class="main col-lg-9 col-md-12 col-sm-12" >
        <div class="main-top" >
          <div id="fund">
            <i class="el-icon-s-fold" style="margin-right: 10px;float: left;margin-top: 3px;"></i>
            <span style="float: left;">发起</span>
          </div>
          <div class="line"></div>
        </div>
        <div class="main-content">
          <el-form :label-position="labelPosition" ref="question" :rules="rules" label-width="80px" :model="question">
            <el-form-item label="问题标题（简单扼要）:" prop="title">
              <el-input v-model="question.title"></el-input>
            </el-form-item>
            <el-form-item label="问题补充（必填）:" prop="description">
              <ele-form
                v-model="formData"
                :form-desc="formDesc"
                :is-show-submit-btn="false"
                :is-show-back-btn="false"
                :request-fn="handleRequest"
                :span="22"
                @request-success="handleSuccess"
                class="editor"
                prop="description"
              />
<!--              <el-input type="textarea" :rows="4" v-model="question.description"></el-input>-->
            </el-form-item>
            <el-form-item label="添加标签（逗号隔开）:" prop="tag">
              <el-input v-model="question.tag"></el-input>
            </el-form-item>

            <el-form-item style="float: right">
              <el-button type="primary" @click="submitForm('question')">发布</el-button>
              <el-button @click="resetForm('question')">重置</el-button>
            </el-form-item>
          </el-form>

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
  import {addQuestion, getQuestionById, updateQuestion} from './../api/index'
  export default {
    name: 'Publish',
    props: {

    },
    data(){
      return {
        labelPosition: 'top',
        question: {
          title: '',
          description: '',
          tag: '',
          creator: -1
        },
        rules: {
          title: [
            {required: true, message: '标题不能为空，请输入问题标题！', trigger: 'blur'},
          ],
          description: [
            {required: true, message: '描述不能为空！', trigger: 'blur'}
          ],
          tag: [
            {required: true, message: '请填入标签，标签不能为空！并且标签以逗号隔开', trigger: 'blur'}
          ]
        },
        isUpdate: false,
        formData: {
          content: ''
        },
        formDesc: {
          content: {
            label: '',
            type: 'markdown-editor',
            attrs: {
              action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
              responseFn (response, file) {
                // 因为是 mock 地址, 所以, 总是返回同一张图片的URL, 自己项目使用, 不会
                return response.url
              }
            },

          }
        }
      }
    },
    methods: {
      submitForm(question) {
        this.question.description = this.formData.content
        if (this.isUpdate){
          //更新
          this.$refs[question].validate((valid) => {
            if (valid) {
              updateQuestion(this.question)
                .then(response =>{
                  console.log(response.data)
                  if (response.data.success){
                    this.$message({
                      type: 'success',
                      message: response.data.message
                    });
                  }else {
                    this.$message({
                      type: 'error',
                      message: response.data.message
                    });
                  }
                })
                .catch(result => {
                  console.log(result)
                })
            } else {
              return false;
            }
          });
        }else {
          //添加
          this.$refs[question].validate((valid) => {
            if (valid) {
              addQuestion(this.question)
                .then(response =>{
                  if (response.data.success){
                    this.$message({
                      type: 'success',
                      message: response.data.message
                    });
                    this.question = {
                      title: '',
                      description: '',
                      tag: '',
                      creator: -1
                    }
                    this.formData.content = ''
                  }else {
                    this.$message({
                      type: 'error',
                      message: response.data.message
                    });
                  }
                })
                .catch(result => {
                  console.log(result)
                })
            } else {
              return false;
            }
          });
        }

      },
      resetForm(question) {
        this.formData.content = ''
        this.$refs[question].resetFields();
      },
      getQuestion(){
        // 获取传过来的参数
        let questionId = decodeURIComponent(this.$route.params.id);
        questionId = JSON.parse(questionId)
        if (questionId !== null){
          getQuestionById(questionId)
            .then(response => {
              this.question = response.data
              this.formData.content = this.question.description
            })
            .catch(result => {
              console.log(result)
            })
          this.isUpdate =true
        }else {
          this.isUpdate = false
        }
      },
      handleRequest (data) {
        console.log(data)
        return Promise.resolve()
      },
      handleSuccess () {
        this.$message.success('提交成功')
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
  .editor{
    width: 142%;
  }
</style>
