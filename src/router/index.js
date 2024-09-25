import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/Home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '/Home/HomePage',
        component: () => import('@/views/home/HomePage.vue'),
        name: 'HomePage'
      },
      {
        path: '/Home/BazaarPage',
        component: () => import('@/views/home/BazaarPage.vue'),
        name: 'BazaarPage'
      },
      {
        path: '/Home/OrePage',
        component: () => import('@/views/home/OrePage.vue'),
        name: 'OrePage'
      },
      {
        path: '/Home/MyPage',
        component: () => import('@/views/home/MyPage.vue'),
        name: 'MyPage'
      },
      {
        path: '/Home/RecordPage',
        component: () => import('@/views/home/RecordPage.vue'),
        name: 'RecordPage'
      },{
        path: '/Home/SwapPage',
        component: () => import('@/views/home/SwapPage.vue'),
        name: 'SwapPage'
      },
      {
        path: "/Home",
        redirect: "/Home/HomePage"
      },
    ]
  },
  {
    path: '/',
    redirect: '/Home'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // }
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router
