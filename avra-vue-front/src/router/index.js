import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Profile from '@/components/Profile'
import Logout from '@/components/Logout'
import Avra from '@/components/Avra'
// import Hello from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/avra',
      name: 'Avra',
      component: Avra
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    }
  ]
})
