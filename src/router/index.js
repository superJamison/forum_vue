
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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/publish',
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
