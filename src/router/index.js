import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// 解决重复点击报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "首页"
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../views/Blog.vue'),
    meta: {
      title: "文章"
    }
  },
  {
    path: '/blogdetails/:id',
    name: 'BlogDetails',
    component: () => import('../views/BlogDetails.vue'),
    meta: {
      title: "文章详情"
    }
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/Message.vue'),
    meta: {
      title: "留言"
    }
  }
]

const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 全局路由导航守卫
router.beforeEach((to, from, next) => {
  // to 表示将要访问的路径
  document.title = to.matched[0].meta.title
  next()
})

export default router
