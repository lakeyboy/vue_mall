<template>
  <div id="buycart">
    <div class="info">
      <span>30天无忧退换</span>
      <span>48小时退款</span>
      <span>满88元免邮费</span>
    </div>
    <div class="list">
      <div class="cartItem" v-for="(item, index) in cartList" :key="index">
        <van-checkbox
          @change="checkEvent($event, item)"
          v-model="item.checked"
        ></van-checkbox>
        <van-image
          fit="cover"
          width="100"
          height="100"
          :src="item.list_pic_url"
        />
        <div class="proInfo">
          <div class="title">
            <span class="name">{{ item.goods_name }}</span>
            <span class="num">x{{ item.number }}</span>
          </div>
          <p class="brief">{{ item.goods_specifition_name_value }}</p>
          <p class="price">￥{{ item.retail_price }}</p>
        </div>
      </div>
    </div>
    <!-- 底部统计 -->
    <van-submit-bar
      :price="cartTotal.checkedGoodsAmount * 100"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checkedAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import api from '@/assets/config/api.js'

// 映射state中的数据
let mapStateObj = mapState(['cartList', 'cartTotal'])

export default {
  data() {
    return {}
  },
  //更新数据
  computed: {
    checkedAll: {
      set(val) {
        console.log(val)
      },
      get() {
        if (this.cartTotal.goodsCount == this.cartTotal.checkedGoodsCount) {
          return true
        } else {
          return false
        }
      }
    },
    ...mapStateObj
  },
  created() {
    this.$store.dispatch('getCartList')
  },

  //
  mounted() {
    setTimeout(() => {
      console.log(this.cartTotal)
    }, 1000)

    // console.log(this.cartTotal)
  },

  methods: {
    // 提交订单
    onSubmit() {},
    async checkEvent(event, item) {
      let {
        data: { data: res }
      } = await axios.post(api.CartChecked, {
        isChecked: Number(event),
        productIds: item.product_id
      })
      // console.log(res)
      this.$store.commit('setCartList', res.cartList)
      this.$store.commit('setCartTotal', res.cartTotal)
    }
  }
}
</script>

<style lang='less' scoped>
#buycart {
  .info {
    display: flex;
    justify-content: space-around;
    font-size: 12px;
    height: 24px;
    line-height: 24px;
    background: #efefef;
    span {
      position: relative;
    }
    span:before {
      content: '';
      //   display: block;
      position: absolute;
      left: -10px;
      top: 8px;
      width: 4px;
      height: 4px;
      border-radius: 2px;
      border: 2px solid red;
    }
  }
  .cartItem {
    display: flex;
    align-items: center;
    padding: 10px 5px;
    .van-checkbox {
      margin: 0 5px;
    }
    .van-img {
      background: #efefef;
    }
    .proInfo {
      // 占据剩余空间
      flex: 1;
      display: flex;
      // 设置垂直方向
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      height: 100px;
      padding: 0 10px;

      .title {
        font-size: 14px;
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      .brief {
        color: #999;
        font-size: 12px;
      }
    }
  }
}
</style>