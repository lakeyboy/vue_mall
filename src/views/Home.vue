<template>
  <div id="home" class="home">
    <van-search
      v-model="value"
      placeholder="商品搜索,299款好物"
      input-align="left"
      shape="round"
    />
    <van-swipe :autoplay="3000" :width="375" :height="200">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img class="swiperimg" v-lazy="image.image_url" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios'
import api from '@/assets/config/api'

export default {
  name: 'Home',
  data() {
    return {
      value: '',
      data: {}
    }
  },
  //计算属性
  computed: {
    images() {
      if (this.data.banner) {
        return this.data.banner
      } else {
        return []
      }
    }
  },
  // 异步请求用于解析promise
  async mounted() {
    const { data: res } = await axios.get(api.IndexUrl)
    this.data = res.data

    console.log(this.data.banner)
  }
}
</script>

<style lang="less" scoped>
#home {
  .swiperimg {
    width: 375px;
    height: 200px;
  }
}
</style>
