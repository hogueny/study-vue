import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import ReadAllUser from '../components/ReadAllUser'
import ReadById from '../components/ReadById'
import SignUp from '../components/SignUp'
import home from "../components/home";

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    }
    ,{
      path: '/find',
      name: 'ReadAllUser',
      component: ReadAllUser
    },
    {
      path: '/find/:id',
      name: 'ReadById',
      component: ReadById
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
