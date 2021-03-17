<template>
  <div id="category">
    <van-search
      v-model="searchValue"
      placeholder="商品搜索,299款好物"
      input-align="left"
      shape="round"
    />
    <!-- 左侧目录 -->
    <van-tree-select
      height="cal(100vh - 104px)"
      :items="items"
      :main-active-index.sync="active"
      @click-nav="changeRight"
    >
      <template #content>
        <!-- <van-image
          v-if="active === 0"
          src="https://img01.yzcdn.cn/vant/apple-1.jpg"
        /> -->
        <img class="categoryImg" :src="bannerImg" alt="" />
        <van-grid :column-num="3">
          <van-grid-item
            :icon="item.wap_banner_url"
            :text="item.name"
            v-for="(item, index) in subCategoryList"
            :key="index"
            :to="`/categoryList/${item.id}`"
          />
        </van-grid>
      </template>
    </van-tree-select>
    <tab-Btn />
  </div>
</template>

<script>
import tabBtn from '@/components/tabBtn'
import axios from 'axios'
import api from '@/assets/config/api.js'

export default {
  data() {
    return {
      searchValue: '',
      data: {},
      active: 0,
      subCategoryList: [],
      bannerImg: ''
    }
  },
  computed: {
    // [{ text: '分组 1' }, { text: '分组 2' }]
    items() {
      if (this.data.categoryList == undefined) {
        return []
      } else {
        let arr = []
        this.data.categoryList.forEach((item, index) => {
          item.text = item.name
          arr.push(item)
        })
        return arr
      }
    }
  },
  // 子列表数据
  // 传递参数需要加入params
  watch: {
    //匿名函数需要function
    active: async function () {
      if (this.items.length !== 0) {
        let id = this.items[this.active].id
        let { data: res } = await axios.get(api.CatalogCurrent, {
          params: { id }
        })

        this.subCategoryList = res.data.currentCategory.subCategoryList
        // console.log(res.data)
        this.bannerImg = res.data.currentCategory.img_url
      } else {
        this.subCategoryList = []
      }
    }
  },
  components: {
    tabBtn
  },
  async created() {
    const { data: res } = await axios.get(api.CatalogList)
    this.data = res.data
    this.subCategoryList = this.data.currentCategory.subCategoryList
    this.bannerImg = this.data.currentCategory.img_url
    console.log(this.data)
  },
  methods: {
    changeRight() {}
  }
}
</script>

<style lang='less' scoped>
#category {
  .categoryImg {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
  }
}
</style>