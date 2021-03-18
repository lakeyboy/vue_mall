<template>
  <div id="product">
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 轮播 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img class="swipeImg" v-lazy="image.img_url" />
      </van-swipe-item>
    </van-swipe>
    <div class="info">
      <span>30天无忧退换</span>
      <span>48小时退款</span>
      <span>满88元免邮费</span>
    </div>
    <div class="proinfo">
      <h3 class="title">{{ info.name }}</h3>
      <p class="brief">{{ info.goods_brief }}</p>
      <p class="price">￥{{ info.retail_price }}</p>
    </div>

    <van-cell title="请选择规格数量" is-link />
    <!-- 商品参数 -->
    <div class="proparams">
      <h3>商品参数</h3>
      <div
        class="proparamsItem"
        v-for="(item, index) in attribute"
        :key="index"
      >
        <span class="title">{{ item.name }}</span>
        <span class="value">{{ item.value }}</span>
      </div>
    </div>
    <!-- 商品详情 -->
    <!-- v-html 可以解析标签 -->
    <div class="proDetail" v-html="info.goods_desc"></div>
    //购物车界面
    <van-goods-action>
      <van-goods-action-icon
        :info="
          $store.state.cartTotal.goodsCount == 0
            ? ''
            : $store.state.cartTotal.goodsCount
        "
        icon="cart-o"
        text="购物车"
        to="/buycart"
      />
      <van-goods-action-icon icon="star-o" text="已收藏" color="" />
      <van-goods-action-button
        @click="choseSku"
        type="warning"
        text="加入购物车"
      />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>

    <!-- 选择商品规格 -->
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>

<script>
import axios from 'axios'
import api from '@/assets/config/api.js'
let sku = {
  // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
  // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
  tree: [],
  // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
  list: [
    {
      id: 2259, // skuId
      's-1': '2', // 规格类目 k_s 为 s1 的对应规格值 id
      's-2': '3', // 规格类目 k_s 为 s2 的对应规格值 id
      price: 100000, // 价格（单位分）
      stock_num: 110 // 当前 sku 组合对应的库存
    },
    {
      id: 2260, // skuId
      's-1': '1', // 规格类目 k_s 为 s1 的对应规格值 id
      's-2': '4', // 规格类目 k_s 为 s2 的对应规格值 id
      price: 100, // 价格（单位分）
      stock_num: 110 // 当前 sku 组合对应的库存
    }
  ],
  price: '1.00', // 默认价格（单位元）
  stock_num: 227 // 商品总库存
}
let goods = {
  // 默认商品 sku 缩略图
  picture: ''
  // 没有名字
}

export default {
  props: ['id'],

  data() {
    return {
      // 详情界面的数据
      data: {},
      info: {},
      //  商品参数
      attribute: [],
      // 显示
      show: false,
      // 购物车数据
      sku,
      goods
    }
  },
  async created() {
    this.$store.dispatch('getCartList')
    const { data: res } = await axios.get(api.GoodsDetail, {
      params: { id: this.id }
    })
    this.data = res.data

    this.info = this.data.info
    this.attribute = this.data.attribute

    this.goods.picture = this.info.primary_pic_url
    this.sku.price = this.info.retail_price
    this.sku.stock_num = this.info.goods_number
    //sku数据
    let tree = []

    this.data.specificationList.forEach((item) => {
      // 遍历内部的value
      let arr = []
      item.valueList.forEach((element) => {
        arr.push({
          id: element.id, // skuValueId：规格值 id
          name: element.value // skuValueName：规格值名称
        })
      })

      tree.push({
        k: item.name, // skuKeyName：规格类目名称
        k_s: 's-' + item.specification_id, // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
        v: arr
      })
    })
    this.sku.tree = tree

    // console.log(this.data)
  },
  computed: {
    images() {
      if (this.data.gallery !== undefined) {
        // console.log(this.data.gallery)
        return this.data.gallery
      } else {
        return []
      }
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    // 点击购买
    onBuyClicked() {},
    // 加入购物车
    async onAddCartClicked(skuData) {
      this.show = false
      // console.log(skuData)
      let chooseConent =
        skuData.selectedSkuComb['s-1'] + '_' + skuData.selectedSkuComb['s-2']
      let resultPro = this.data.productList.filter((item, index) => {
        // if (item.goods_specification_ids == chooseConent) {
        //   return true
        // } else {
        //   return false
        // }
        return item.goods_specification_ids == chooseConent
      })
      // console.log(resultPro)
      // 出现多层数据解构赋值
      let {
        data: { data: cartResult }
      } = await axios.post(api.CartAdd, {
        goodsId: resultPro[0].goods_id,
        number: skuData.selectedNum,
        productId: resultPro[0].id
      })
      // console.log(cartResult)

      this.$store.commit('setCartList', cartResult.cartList)
      this.$store.commit('setCartTotal', cartResult.cartTotal)
    },
    // 选择商品规格
    choseSku() {
      this.show = true
    }
  }
}
</script>

<style lang='less' scoped>
#product {
  .swipeImg {
    width: 100%;
  }
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
  .proinfo {
    .title {
      font-weight: 500;
      margin-block: 0;
      padding: 10px 0 5px;
    }
    .brief {
      font-size: 12px;
      color: #999;
      margin-block: 0;
    }
    .price {
      font-size: 16px;
      margin-block: 0;
      color: red;
    }
  }
  .van-cell__title {
    text-align: left;
  }
  .proparams {
    padding-bottom: 20px;
    h3 {
      padding: 5px 0;
    }
    .proparamsItem {
      width: 90%;
      margin: 0 auto;
      display: flex;
      //   用于设置子元素
      justify-content: space-between;
      height: 24px;
      line-height: 24px;
      color: #999;
      font-size: 12px;
      background: #efefef;
      text-align: left;
      //   span中有某个类
      span.title {
        width: 45px;
        padding: 0 10px;
        border-right: 1px solid #ccc;
      }
      span.value {
        width: 260px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  //   解决scoped的影响，
  /deep/ .proDetail {
    width: 100%;
    p {
      margin: 0;
      padding: 0;
      display: flex;
      img {
        width: 100%;
      }
    }
  }
}
</style>