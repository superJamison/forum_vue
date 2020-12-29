<template>
    <div style="height: 414px;padding-top: 20px;">
      <el-upload
        class="upload-demo"
        ref="upload"
        action="http://localhost:8088/forum/user/upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :data="{id: user.id}"
        :on-success="successMethods"
        :multiple="false"
        :limit="1"
        :drag="true"
        :on-progress="progressUpload"
        :on-exceed="exceedLimit"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选择头像</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">头像大小只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
</template>

<script>
  export default {
    name: 'PerCenter',
    data(){
      return {
        imageUrl: '',
        fileList: [],
        user: {}
      }
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
      },
      successMethods(result){
        if (result.success){
          alert("头像修改成功！")
        }else {
          alert("头像修改失败！")
        }
      },
      getUser(){
        this.user = this.$session.get("user");
      },
      exceedLimit(files, fileList){
        alert("您只能选择一个头像上传哦！")
      },
      progressUpload(event, file, fileList){
        console.log(file)
      }
    },
    created () {
      this.getUser();
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
