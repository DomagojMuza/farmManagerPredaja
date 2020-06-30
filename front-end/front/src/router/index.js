import jwt from 'jsonwebtoken';
import store from '@/store'

import Vue from 'vue'
import VueRouter from 'vue-router'

import Weather from '@/views/Weather'
import SignUp from '@/views/SignUp'
import Login from '@/views/Login'
import PasswordReset from '@/views/PasswordReset'
import Profile from '@/views/Profile'
import AddField from '@/views/AddField'
import Fields from '@/views/Fields'
import FieldEdit from '@/views/FieldEdit'
import AddActivity from '@/views/AddActivity'
import Activities from '@/views/Activities'
import ActivityEdit from '@/views/ActivityEdit'
import Report from '@/views/Report'
import News from '@/views/News'



Vue.use(VueRouter)

const routes = [
    {
        path:'/weather',
        name : 'Weather',
        component: Weather,
        beforeEnter: guardMyroute
    },
    {
        path:'/signup',
        name : 'SignUp',
        component: SignUp
    },
    {
        path:'/',
        name : 'Login',
        component: Login
    },
    {
        path:'/profile',
        name : 'Profile',
        component: Profile,
        beforeEnter: guardMyroute
    },
    {
        path:'/passwordreset/:token',
        name : 'PasswordReset',
        component: PasswordReset
    },
    {
        path:'/addfield',
        name : 'AddField',
        component: AddField,
        beforeEnter: guardMyroute
    },
    {
        path:'/fields',
        name : 'Fields',
        component: Fields,
        beforeEnter: guardMyroute
    },
    {
        path:'/fields/:_id',
        name : 'FieldEdit',
        component: FieldEdit,
        beforeEnter: guardMyroute
    },
    {
        path:'/addactivity',
        name : 'AddActivity',
        component: AddActivity,
        beforeEnter: guardMyroute
    },
    {
        path:'/activities',
        name : 'Activities',
        component: Activities,
        beforeEnter: guardMyroute
    },
    {
        path:'/activities/:_id',
        name : 'ActivityEdit',
        component: ActivityEdit,
        beforeEnter: guardMyroute
    },
    {
        path:'/report',
        name : 'Report',
        component: Report,
        beforeEnter: guardMyroute
    },
    {
        path:'/news',
        name : 'News',
        component: News,
        beforeEnter: guardMyroute
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

function guardMyroute(to, from, next)
{
    store.token = localStorage.getItem('token')
    if(store.token === null || store.token === undefined) next('/')  

    if(jwt.verify(store.token, 'webappprojekt')){
        next()
    }else {
        localStorage.clear()
        next('/');
    }
    
}

export default router