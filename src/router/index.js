import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import ReadAllUser from '../components/ReadAllUser'
import ReadById from '../components/ReadById'
import SignUp from '../components/SignUp'
import home from "../components/home";
import Root from "../components/Root";

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: Root
    },
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
