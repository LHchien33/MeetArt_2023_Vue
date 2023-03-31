import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'front',
      component: () => import('../views/FrontLayout.vue'),
      children: [
        {
          path: '',
          name: '首頁',
          component: () => import('../views/HomeView.vue'),
        }
      ]
    },
  ]
})

export default router
