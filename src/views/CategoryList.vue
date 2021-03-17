<template>
  <div id="categorylist">
    <!-- 老师是监听v-model="active"变化 -->
    <van-tabs @click="onClick">
      <van-tab
        v-for="(item, index) in cateData"
        :key="index"
        :title="item.name"
        :name="index"
      >
        <h3>{{ item.name }}</h3>
        <p>{{ item.front_name }}</p>
        <!-- 九宫格列表   column-num一行有多少格-->
        <van-grid :border="true" :column-num="2">
          <van-grid-item
            v-for="(item, index) in goodsData"
            :key="index"
            :to="`/product/${item.id}`"
          >
            <van-image :src="item.list_pic_url" />
            <h4 class="van-ellipsis">{{ item.name }}</h4>
            <p class="price">￥{{ item.retail_price }}</p>
          </van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from 'axios'
import api from '@/assets/config/api.js'

export default {
  props: ['id'],
  data() {
    return {
      cateData: [],
      //下面九宫格数据
      goodsData: []
    }
  },
  async created() {
    const { data: res } = await axios.get(api.GoodsCategory, {
      params: { id: this.id }
    })
    this.cateData = res.data.brotherCategory
    // console.log(res)
    this.onClick(0)
  },
  methods: {
    //   点击tab栏
    async onClick(index) {
      //   两个id应该是一样的
      let id = this.cateData[index].id
      //   console.log(id)
      let page = 1
      let size = 20
      const { data: res } = await axios.get(api.GoodsList, {
        //   params中的属性名要和服务器要求的必须一样，否则请求不到
        params: { categoryId: id, page, size }
      })
      this.goodsData = res.data.data
      // console.log(this.goodsData)
    }
  }
}
</script>

<style lang='less' scoped>
#categorylist {
  .van-grid-item {
    overflow: hidden;
    box-sizing: border-box;
  }

  h4 {
    margin-block: 0;
    width: 90%;
    font-size: 14px;
    font-weight: 700;
    padding: 0 10px;
  }
  p {
    margin-block: 0;
  }
  .price {
    color: red;
  }
}
</style>