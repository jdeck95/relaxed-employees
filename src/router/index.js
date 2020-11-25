import Vue from 'vue'
import VueRouter from 'vue-router'
import Overview from '../components/Overview.vue'
import Edit from '../components/Edit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Overview',
    component: Overview
  },
  {
    path: '/edit/:employee_id',
    name: 'Edit',
    component: Edit,
    props: true,
  },
]

const router = new VueRouter({
  routes
})

export default router
