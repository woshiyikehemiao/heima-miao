import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login'
import Home from './views/home'
import Main from './views/home/main.vue'

Vue.use(Router)
export default new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children: [{
      path: '',
      component: Main
    }, {
      path: 'comment',
      component: () => import('./views/comment')
    }, {
      path: 'meterial',
      component: () => import('./views/meterial')
    }, {
      path: 'articles',
      component: () => import('./views/articles')
    }, {
      path: 'publish',
      component: () => import('./views/publish')
    }, {
      path: 'publish/:articleId',
      component: () => import('./views/publish')
    }, {
      path: 'account',
      component: () => import('./views/account')
    }]
  },
  {
    path: '/login',
    component: Login
  }, {
    path: '*',
    component: () => import('./views/404.vue')
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
