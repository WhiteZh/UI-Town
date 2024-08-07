import { createRouter, createWebHistory } from 'vue-router'
import BrowseView from '../views/BrowseView.vue'
import CodeView from '@/views/CodeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'browse',
      }
    },
    {
      path: '/browse',
      name: 'browse',
      component: BrowseView
    },
    {
      path: '/create',
      name: 'create',
      component: CodeView,
      meta: {
        mode: 'create',
      }
    },
    {
      path: '/view/:id',
      name: 'view',
      component: CodeView,
      meta: {
        mode: 'view'
      }
    }
  ]
})

export default router
