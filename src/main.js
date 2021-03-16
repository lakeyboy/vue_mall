import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.css'

import { Lazyload } from 'vant';
Vue.use(Lazyload);

// import { Grid, GridItem } from 'vant';
// Vue.use(Grid);
// Vue.use(GridItem);

Vue.config.productionTip = false
Vue.use(Vant)

// 引入字体样式
import '@/assets/font/iconfont.css'



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
