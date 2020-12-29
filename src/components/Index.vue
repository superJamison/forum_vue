<template>
    <div class="container-fluid">
      <div class="row" style="border: 50px solid #efefef;border-bottom: 0;">
        <div class="col-lg-9 col-md-12 col-sm-12" style="height: 560px;border-right: 1px solid #cccccc;">
          <div class="main-top" >
            <div id="fund">
              <i class="el-icon-s-fold" style="margin-right: 10px;float: left;margin-top: 3px;"></i>
              <span style="float: left;">发现</span>
            </div>
            <div class="line" ></div>
          </div>
          <ul>
            <li v-for="question in questionList"
                class="questions-li"
                >

              <div class="media-left" style="float:left;margin-right: 10px;">
                <el-avatar :size="50" >
                  <img v-if="(typeof question.user.avatarUrl) !== 'undefined'" :src="require('./../assets/images/img/'+question.user.avatarUrl)" alt="picture"/>
                </el-avatar>
              </div>
              <div class="question-right" >
                <router-link   :to="'/questionDetail/'+question.id" style="color: #606266;" > <!--to="/questionDetail"-->
                  <span @click="toDetail(question)" style="color: #155faa;font-size: 15px;cursor:pointer">{{question.title}}</span>
                </router-link>
                 <br>
                <span style="color: #999999;font-size: 14px; ">{{question.description}}</span>
                <br>
                <span style="color: #999999;font-size: 13px; "><span>{{question.likeCount}}</span> 人点赞 •
                  <span>{{question.commentCount}}</span> 个回复 •
                  <span>{{question.viewCount}}</span> 次浏览 •
                  <span>{{ formatDateFilter(question.gmtCreate) }}</span></span>

              </div>
            </li>
          </ul>
          <!--分页-->
          <zpagenav :page="page" :page-size="pageSize" :total="total"
                    :max-link="maxPage" :page-handler="pageHandler"></zpagenav>
        </div>
        <div class="col-lg-3 col-md-12 col-sm-12" >
          <div style="height: 414px;">
            <h3 class="hotTopic">热门话题</h3>
            <div>
              <span class="tag" v-for="tag in strToTags(this.hotTags)">
                <span @click="clickTag(tag)">{{tag}}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {getIndexPage, getHotTags} from '../api'

  export default {
    name: 'Index',
    data() {
      return {
        input: '',
        questionList: [],
        page: 1,
        pageSize: 5,
        total: 0,
        maxPage: 9,
        searchContent: this.$store.state.searchContent,
        user: {},
        hotTags: []
      };
    },
    components: {},
    methods: {
      childe(){
        this.pageHandler(1)
      },
      pageHandler(page) {
        this.user = this.$session.get("user");
        this.page = page
        getIndexPage(page, this.pageSize, this.$store.state.searchContent)
          .then((response) => {
            this.questionList = response.data.data
            console.log(this.questionList)
            for (let i = 0; i < this.questionList.length; i++) {
              this.questionList[i].description = this.stringToShorter(this.questionList[i].description);
            }
            this.total = response.data.total
            this.$store.state.searchContent = ''

          })
          .catch((result) => {
            console.log(result)
          })
        getHotTags()
        .then(response => {
          this.hotTags = response.data
        })
        .catch(result => {
          console.log(result)
        })
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
      stringToShorter(str){
        if (str.length > 30) {
          let new_value = str.substring(0, 50) + '......'
          return new_value
        }
        return str
      },
      toDetail(question){

      },
      strToTags(str){
        if ((typeof str) !== "undefined"){
          str = str.toString()
          str = str.replace(/[\uff0c]/g,",")
          let hotTags = (str || '').split(",")
          hotTags = hotTags.splice(0, hotTags.length - 1)
          function unique(hotTags){
            return [...new Set(hotTags)]
          }
          return unique(hotTags);
        }
        return null
      },
      clickTag(tagContent){
        this.$store.state.searchContent = tagContent
        this.pageHandler(1)
      }
    },
    created() {
      this.pageHandler(1)
    }
  }
</script>

<style>
  .aside{
    border-right: 1px solid #cccccc;
    padding: 20px;
    box-sizing: border-box;
  }
  .main-top{
    width: 100%;
    padding-bottom: 10px;
    margin-top: 10px;
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
    margin-bottom: 5px;
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
  ul{
    padding-top: 5px;
  }
  ul li {
    list-style-type: none;
    border-bottom: 1px solid #cccccc;
  }
  .questions-li{
    text-align: left;
    padding-top: 5px;
  }
  .hotTopic{
    margin-top: 15px;
  }




  /*分页css*/
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .sr-only-focusable:active, .sr-only-focusable:focus {
    position: static;
    width: auto;
    height: auto;
    margin: 0;
    overflow: visible;
    clip: auto;
  }
  .m-r-1 {
    margin-right: 1rem!important;
  }
  .pagination {
    display: inline-block;
    padding-left: 0;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-radius: .25rem;

  }

  .page-item {
    display: inline;
  }

  .page-item:first-child .page-link {
    margin-left: 0;
    border-top-left-radius: .25rem;
    border-bottom-left-radius: .25rem;

  }

  .page-item:last-child .page-link {
    border-top-right-radius: .25rem;
    border-bottom-right-radius: .25rem;
  }

  .page-item.active .page-link, .page-item.active .page-link:focus, .page-item.active .page-link:hover {
    z-index: 2;
    color: #fff;
    cursor: default;
    background-color: #0275d8;
    border-color: #0275d8;
  }

  .page-item.disabled .page-link, .page-item.disabled .page-link:focus, .page-item.disabled .page-link:hover {
    color: #818a91;
    cursor: not-allowed;
    background-color: #fff;
    border-color: #ddd;
  }

  .page-link {
    position: relative;
    float: left;
    padding: .5rem .75rem;
    margin-left: -1px;
    line-height: 1.5;
    color: #0275d8;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #ddd;
  }

  .page-link:focus, .page-link:hover {
    color: #014c8c;
    background-color: #eceeef;
    border-color: #ddd;
  }

  .pagination-lg .page-link {
    padding: .75rem 1.5rem;
    font-size: 1.25rem;
    line-height: 1.333333;
  }

  .pagination-lg .page-item:first-child .page-link {
    border-top-left-radius: .3rem;
    border-bottom-left-radius: .3rem;
  }

  .pagination-lg .page-item:last-child .page-link {
    border-top-right-radius: .3rem;
    border-bottom-right-radius: .3rem;
  }

  .pagination-sm .page-link {
    padding: .275rem .75rem;
    font-size: .875rem;
    line-height: 1.5;
  }

  .pagination-sm .page-item:first-child .page-link {
    border-top-left-radius: .2rem;
    border-bottom-left-radius: .2rem;
  }

  .pagination-sm .page-item:last-child .page-link {
    border-top-right-radius: .2rem;
    border-bottom-right-radius: .2rem;
  }

  .pager {
    padding-left: 0;
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-align: center;
    list-style: none;
  }

  .pager::after {
    display: table;
    clear: both;
    content: "";
  }

  .pager li {
    display: inline;
  }

  .pager li > a,
  .pager li > span {
    display: inline-block;
    padding: 5px 14px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 15px;
  }

  .pager li > a:focus, .pager li > a:hover {
    text-decoration: none;
    background-color: #eceeef;
  }

  .pager .disabled > a, .pager .disabled > a:focus, .pager .disabled > a:hover {
    color: #818a91;
    cursor: not-allowed;
    background-color: #fff;
  }

  .pager .disabled > span {
    color: #818a91;
    cursor: not-allowed;
    background-color: #fff;
  }

  .pager-next > a,
  .pager-next > span {
    float: right;
  }

  .pager-prev > a,
  .pager-prev > span {
    float: left;
  }
</style>
