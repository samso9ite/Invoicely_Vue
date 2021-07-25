import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../views/SignUp.vue'
import store from '../store'

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path:'/sign-up',
    name:'SignUp',
    component: SignUp
    // component: () => import('../views/SignUp.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/my_account',
    name: 'MyAccount',
    component: () => import('../views/dashboard/MyAccount.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/dashboard/Dashboard.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/dashboard/clients',
    name: 'Clients', 
    component: () => import('../views/dashboard/Clients.vue')
  },
  {
    path: '/dashboard/client/:id',
    name: 'ClientDetail',
    component: () => import('../views/dashboard/ClientDetail.vue')
  }, 
  {
    path: '/dashboard/add_client',
    name: 'AddClient',
    component: () => import('../views/dashboard/AddClient.vue')
  }, 
  {
    path: '/dashboard/edit_client',
    name: 'EditClient',
    component: () => import('../views/dashboard/EditClient.vue')
  },
  {
    path: '/dashboard/edit_team',
    name: 'EditTeam',
    component: () => import('../views/dashboard/EditTeam.vue')
  },
  {
    path: '/dashboard/invoices/',
    name: 'Invoices',
    component: () => import('../views/dashboard/Invoices.vue')
  },
  {
    path: '/dashboard/add_invoice',
    name: 'CreateInvoice',
    component: () => import('../views/dashboard/CreateInvoice.vue')
  },
  {
    path: '/dashboard/invoices/:id',
    name: 'InvoiceDetail',
    component: () => import('../views/dashboard/InvoiceDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
