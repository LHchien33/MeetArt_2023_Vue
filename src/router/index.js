import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes: [
    {
      path: '/',
      name: 'front',
      component: () => import('../views/FrontLayout.vue'),
      props: (route) => ({
        currentPath: route.fullPath
      }),
      children: [
        {
          path: '',
          name: '前台首頁',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: 'products',
          name: '前台課程列表',
          component: () => import('../views/ProductsView.vue'),
          props: (route) => ({
            query: route.query
          })
        },
        {
          path: 'product',
          name: '前台單一課程',
          component: () => import('../views/ProductLayout.vue'),
          props: (route) => ({
            prodId: route.params.urlPdId || route.matched[1].children[0].path
          }),
          children: [
            {
              path: '-Nb8fXN7LRUba7pY8IhX',
              components: {
                mainContent: () => import('../views/TutorPdMainView.vue'),
                sideBar: () => import('../components/TutorProductInfo.vue')
              }
            },
            {
              path: ':urlPdId',
              components: {
                mainContent: () => import('../views/UsualPdMainView.vue'),
                sideBar: () => import('../components/UsualProductInfo.vue')
              }
            }
          ]
        },
        {
          path: 'checkout',
          name: '前台結帳',
          component: () => import('../views/CheckoutLayout.vue'),
          children: [
            {
              path: 'carts',
              name: '前台結帳_購物列表',
              component: () => import('../views/CartsView.vue'),
            },
            {
              path: 'order',
              name: '前台結帳_填寫資訊',
              component: () => import('../views/OrderView.vue'),
            },
            {
              path: 'payment',
              name: '前台結帳_付款',
              component: () => import('../views/PaymentView.vue'),
            },
            {
              path: 'complete',
              name: '前台結帳_完成付款',
              component: () => import('../views/CheckoutCompleteView.vue'),
            },
          ]
        },
        {
          path: 'articles',
          name: '前台文章列表',
          component: () => import('../views/ArticlesView.vue'),
        },
        {
          path: 'article/:articleId',
          name: '前台單一文章',
          component: () => import('../views/ArticleSingleView.vue'),
          props: (route) => ({
            articleId: route.params.articleId
          })
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
          props: (route) => ({
            query: route.query
          })
        },
        {
          path: 'products',
          name: '後台商品管理',
          children: [
            {
              path: '',
              name: '商品列表',
              component: () => import('../views/AdminProductsView.vue'),
              props: (route) => ({
                query: route.query
              })
            },
            {
              path: ':updateId',
              name: '新增或編輯商品',
              component: () => import('../views/AdminUpdateProdView.vue'),
              props: (route) => ({
                updateId: route.params.updateId
              })
            }
          ]
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
