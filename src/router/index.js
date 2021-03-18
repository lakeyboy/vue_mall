import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import CategoryList from '../views/CategoryList.vue'
import Product from '../views/Product.vue'
import BuyCart from '../views/BuyCart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  //下面就是组件按需加载，不是直接导入的
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/category',
    component: Category
  },
  {
    path: '/categorylist/:id',
    component: CategoryList,
    props: true
  },
  {
    path: '/product/:id',
    component: Product,
    props: true
  },
  {
    path: '/buycart',
    component: BuyCart
  }
]

const router = new VueRouter({
  routes
})

export default router
