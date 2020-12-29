
import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import Publish from '../components/Publish'
import Login from '../components/Login'
import Register from '../components/Register'
import My from '../components/My'
import MyQuestion from '../components/MyQuestion'
import NewReply from '../components/NewReply'
import QuestionDetail from '../components/QuestionDetail'
import PerCenter from '../components/PerCenter'

Vue.use(Router)


// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/publish/:id',
      name: 'Publish',
      component: Publish
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/my',
      name: 'My',
      component: My,
      children: [
        {
          path: 'perCenter',
          component: PerCenter
        },
        {
          path: 'myQuestion',
          component: MyQuestion
        },
        {
          path: 'newReply',
          component: NewReply
        }
      ]
    },
    {
      path: '/questionDetail/:id',
      name: 'QuestionDetail',
      component: QuestionDetail
    }
  ]
})
