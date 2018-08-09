import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test'
import Blog from '@/components/Blog'
import BlogHome from '@/components/BlogHome'
import Beer from '@/components/Beer'
import BlogWrite from '@/components/BlogWrite'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/blog/:id',
      name: 'blog',
      component: Blog
    },
    {
      path: '/blog-home',
      name: 'blog-home',
      component: BlogHome
    },
    {
      path: '/beer',
      name: 'beer',
      component: Beer
    },
    {
      path: '/write',
      name: 'blog-write',
      component: BlogWrite
    }
  ],
  mode: 'history'
})
