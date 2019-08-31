import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/home'
import Login from './views/login'
import Home from './views/home'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login
  }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //               import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
