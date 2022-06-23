import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/SID.vue'
import SBD from './views/SBD.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,

  //about route is not used 
  //home route is for the SID
  //SBD:/:id are the dynamic routes
  routes: [
    {
      path: '/sbd/:id',
      name: 'SBD',
      component: SBD,
  },
    { 
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
