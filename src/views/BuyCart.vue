<template>
  <div id="buycart">
    <div class="info">
      <span>30天无忧退换</span>
      <span>48小时退款</span>
      <span>满88元免邮费</span>
    </div>
    <div class="list">
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
      >
        <template #tags>
          <van-tag plain type="danger">标签</van-tag>
          <van-tag plain type="danger">标签</van-tag>
        </template>
        <template #footer>
          <van-button size="mini">按钮</van-button>
          <van-button size="mini">按钮</van-button>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

// 映射state中的数据
let mapStateObj = mapState(['cartList', 'cartTotal'])

export default {
  data() {
    return {}
  },
  //更新数据
  computed: {
    ...mapStateObj
  },
  created() {
    this.$store.dispatch('getCartList')
  },

  //
  mounted() {
    setTimeout(() => {
      console.log(this.cartList)
    }, 1000)

    // console.log(this.cartTotal)
  },

  methods: {}
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
}
</style>