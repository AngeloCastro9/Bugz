import Vue from 'vue'
import Router from 'vue-router'
import Home from './componentes/autenticacao/Abas.vue'
import posLogin from './componentes/Pos-login/Home.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
        path: '/welcome',
        name: 'welcome',
        component: posLogin
    },
  ]
})