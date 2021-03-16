<template>
  <!-- //底部导航 -->
  <van-tabbar v-model="tabActive">
    <van-tabbar-item class="iconfont icon-shouye" to="/">首页</van-tabbar-item>
    <van-tabbar-item class="iconfont icon-zhuanti">专题</van-tabbar-item>
    <van-tabbar-item
      class="iconfont icon-leimupinleifenleileibie2"
      to="/category"
      >分类</van-tabbar-item
    >
    <van-tabbar-item class="iconfont icon-gouwucheman">购物车</van-tabbar-item>
    <van-tabbar-item class="iconfont icon-wode">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      tabActive: 0
    }
  },

  mounted() {
    switch (this.$route.path) {
      case '/':
        this.tabActive = 0
        break
      case '/category':
        this.tabActive = 2
        break
      default:
        this.tabActive = 0
    }
  },
  methods: {}
}
</script>

<style lang='less' scoped>
</style>