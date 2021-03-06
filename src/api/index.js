import axios from "axios";
import Qs from "qs";
import {use} from 'element-ui/src/locale'
import el from 'element-ui/src/locale/lang/el'


//全局默认配置
axios.defaults.baseURL = "http://localhost:8088";

axios.defaults.withCredentials = true //请求发送cookie



//post传数据用data，get传参数用params
export const getIndexPage = (page, limit, searchContent) => {
  return axios.get("/forum/getIndexPage?page="+page+"&limit="+limit+"&searchContent="+searchContent);
};

//登录
export const login = (username, password, validation) => {
  return axios.post("/forum/user/login?validation="+validation, Qs.stringify({username: username, password: password}))
}

//根据token获取user
export const getUserByToken = (token) => {
  return axios.post("/forum/user/getUserByToken", Qs.stringify({token: token}))
}

//添加问题
export const addQuestion = (question) => {
  return axios.post("/forum/question/addQuestion", Qs.stringify(question))
}

//更新问题
export const updateQuestion = (question) => {
  return axios.post("/forum/question/updateQuestion", Qs.stringify(question))
}

//查询的发起的问题
export const getMyProblemPage = (page, limit, id) => {
  return axios.get("/forum/getMyProblemPage?page="+page+"&limit="+limit+"&id="+id);
};

//查询的最新回复
export const getMyNewReplyPage = (page, limit, id) => {
  return axios.get("/forum/getMyNewReplyPage?page="+page+"&limit="+limit+"&id="+id);
};

//根据id获取question
export const getQuestionById = questionId => {
  return axios.post("/forum/question/getQuestionById", Qs.stringify({id: questionId}));
};

//增加浏览量
export const addViewCount = questionId => {
  return axios.post("/forum/question/addViewCount", Qs.stringify({id: questionId}));
};

/**
 * 添加评论
 * @param type 类型 1 一级评论  2 二级评论
 * @param parentId 父id
 * @param content 评论内容
 * @returns {Promise<AxiosResponse<any>>}
 */
export const addComment = (type, parentId, content) => {
  return axios.post("/forum/comment/addComment", Qs.stringify({type: type, parentId:parentId, content:content}));
};

//根据id查询所有的评论
export const getReplyById = (questionId) => {
  return axios.get("/forum/comment/getReplyById?questionId="+questionId);
};

export const addLikeCount = (id) => {
  return axios.post("/forum/comment/addLikeCount", Qs.stringify({id: id}));
};

//头像上传
export function fileUpload(param) {
   return axios({
      url: '/forum/user/upload',
      method: 'post',
      data: Qs.stringify(param),
      headers: {
        'Content-Type':'multipart/form-data'
      }
    })
}

//注册添加
export const add = (user) => {
  return axios.post("/forum/user/add", Qs.stringify(user));
};

//获取热门话题
export const getHotTags = () => {
  return axios.get("/forum/question/getHotTags");
};

//验证码
export const getImg = () => {
  return axios.get("/forum/user/getImage?time="+Math.random())
};


