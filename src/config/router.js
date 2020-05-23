import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import RestaurantMenu from '@/components/restaurantMenu/RestaurantMenu'
import Auth from '@/components/auth/Auth'
import AuthRestaurant from '@/components/auth/AuthRestaurant'
import HomeRestaurant from '@/components/restaurant/HomeRestaurant'
import Cart from '@/components/template/Cart'
import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'restaurantMenu',
    path: '/restaurantMenu/:id',
    component: RestaurantMenu
},
// {
//     name: 'adminPages',
//     path: '/admin',
//     component: AdminPages,
//     meta: { requiresAdmin: true }
// },
{
    name: 'auth',
    path: '/auth',
    component: Auth
},{
    name: 'authRestaurant',
    path: '/authRestaurant',
    component: AuthRestaurant
},{
    name: 'homeRestaurant',
    path: '/homeRestaurant',
    component: HomeRestaurant
},
  { 
    name: 'cart',
    path: '/cart',
    component: Cart }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/' })
    } else {
        next()
    }
})

export default router
