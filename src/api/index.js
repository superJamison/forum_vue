import axios from "axios";
import Qs from "qs";
import {use} from 'element-ui/src/locale'


//全局默认配置
axios.defaults.baseURL = "http://localhost:8088";

axios.defaults.withCredentials = true //请求发送cookie



//post传数据用data，get传参数用params
export const getIndexPage = (page, limit) => {
  return axios.get("/forum/getIndexPage?page="+page+"&limit="+limit);
};

//登录
export const login = (username, password) => {
  return axios.post("/forum/user/login", Qs.stringify({username: username, password: password}))
}

//添加问题
export const addQuestion = (question) => {
  return axios.post("/forum/question/addQuestion", Qs.stringify(question))
}

//查询的发起的问题
export const getMyProblemPage = (page, limit, id) => {
  return axios.get("/forum/getMyProblemPage?page="+page+"&limit="+limit+"&id="+id);
};

//根据id获取question
export const getQuestionById = questionId => {
  return axios.post("/forum/question/getQuestionById", Qs.stringify({id: questionId}));
};
