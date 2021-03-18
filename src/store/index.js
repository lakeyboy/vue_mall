import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
import api from '@/assets/config/api.js'

export default new Vuex.Store({
  state: {
    cartTotal: {
      checkedGoodsAmount: 0,
      checkedGoodsCount: 0,
      goodsAmount: 0,
      goodsCount: 0
    },
    cartList: []

  },
  mutations: {
    //购物车里面商品详细数据
    setCartList(state, cartList) {
      state.cartList = cartList
    },
    //购物车图标总计数据
    setCartTotal(state, cartTotal) {
      state.cartTotal = cartTotal
      // console.log(state.cartTotal);

    }
  },
  //可以执行异步操作
  actions: {
    async getCartList(content) {
      let { data: { data: cartResult } } = await axios.get(api.CartList)
      // console.log(cartResult);
      
      content.commit("setCartList", cartResult.cartList)
      content.commit("setCartTotal", cartResult.cartTotal)
    }
  },
  modules: {
  }
})
