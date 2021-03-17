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
  </div>
</template>

<script>
import axios from 'axios'
import api from '@/assets/config/api.js'

export default {
  props: ['id'],

  data() {
    return {
      // 详情界面的数据
      data: {},
      info: {},
      //  商品参数
      attribute: []
    }
  },
  async created() {
    const { data: res } = await axios.get(api.GoodsDetail, {
      params: { id: this.id }
    })
    this.data = res.data

    this.info = this.data.info
    this.attribute = this.data.attribute

    console.log(this.data)
  },
  computed: {
    images() {
      if (this.data.gallery !== undefined) {
        console.log(this.data.gallery)
        return this.data.gallery
      } else {
        return []
      }
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
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