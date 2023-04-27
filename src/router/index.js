import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/index.vue'
import layout from '@/views/layout/index.vue'
import question from '@/views/question/index.vue'
import home from '@/views/home/index.vue'
import video from '@/views/video/index.vue'
import my from '@/views/my/index.vue'
import search from '@/views/search/index.vue'


Vue.use(VueRouter)

const routes = [
  {
    path :"/login",
    name :"login",
    component : login,
  },
  {
    path :"/search",
    name :"search",
    component : search,
  },
  {
    path :"/",
    // name :"layout",
    component :layout,
    children :[
        {
          path :"", // 默认子路由
          name :"home",
          component : home,
        },
        {
          path :"question",
          name :"question",
          component : question,
        },
        {
          path :"video",
          name :"video",
          component : video,
        },
        {
          path :"my",
          name :"my",
          component : my,
        }
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
