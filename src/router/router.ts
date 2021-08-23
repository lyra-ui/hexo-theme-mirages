import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () =>
      import(/* webpackChunkName: "categories" */ '../views/Category.vue')
  },
  {
    path: '/archives',
    name: 'Archives',
    component: () =>
      import(/* webpackChunkName: "archives" */ '../views/Archives.vue')
  },
  {
    path: '/tags',
    name: 'Tags',
    component: () => import(/* webpackChunkName: "tags" */ '../views/Tag.vue')
  },
  {
    path: '/post/:slug*',
    name: 'Post',
    component: () => import(/* webpackChunkName: "post" */ '../views/Post.vue')
  },
  {
    path: '/page/:slug*',
    name: 'Page',
    component: () => import(/* webpackChunkName: "page" */ '../views/Page.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
    // hidden: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
