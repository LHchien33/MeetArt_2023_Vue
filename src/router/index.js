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
          name: '前台首頁',
          component: () => import('../views/HomeView.vue'),
        }
      ]
    },
    {
      path: '/login',
      component: () => import('../views/AdminLoginView.vue')
    },
    {
      path: '/admin',
      component: () => import('../views/AdminLayout.vue'),
      children: [
        {
          path: 'orders',
          name: '後台訂單管理',
          component: () => import('../views/AdminOrdersView.vue'),
        },
        {
          path: 'products',
          name: '後台商品管理',
          component: () => import('../views/AdminProductsView.vue'),
        },
        {
          path: 'coupons',
          name: '後台優惠券管理',
          component: () => import('../views/AdminCouponsView.vue'),
        },
        {
          path: 'articles',
          name: '後台文章管理',
          component: () => import('../views/AdminArticlesView.vue'),
        }
      ]
    },
    // {
    //   name: '預設頁面 404'
    // }
  ]
})

export default router
