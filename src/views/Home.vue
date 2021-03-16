<template>
  <div id="home" class="home">
    <van-search
      v-model="searchValue"
      placeholder="商品搜索,299款好物"
      input-align="left"
      shape="round"
    />
    <van-swipe :autoplay="3000" :width="375" :height="200">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img class="swiperimg" v-lazy="image.image_url" />
      </van-swipe-item>
    </van-swipe>

    <van-grid :column-num="5">
      <van-grid-item
        v-for="(item, index) in channel"
        :key="index"
        :icon="item.icon_url"
        :text="item.name"
      >
      </van-grid-item>
    </van-grid>

    <!-- 品牌直销 -->
    <div class="brandlist">
      <van-cell title="品牌制作商直供" />
      <van-grid :border="false" :column-num="2">
        <van-grid-item v-for="(item, index) in brandDate" :key="index">
          <van-image :src="item.new_pic_url" />
          <h4 class="title">{{ item.name }}</h4>
          <p class="price">{{ item.floor_price }}元起</p>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 新品首发 -->
    <div class="newGoodlist">
      <van-cell title="新品首发" />
      <van-grid :border="false" :column-num="2">
        <van-grid-item v-for="(item, index) in newGoodData" :key="index">
          <van-image :src="item.list_pic_url" />
          <h4 class="title van-ellipsis">{{ item.name }}</h4>
          <p class="price van-ellipsis">{{ item.retail_price }}元</p>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 热门商品-->
    <div class="hotlist">
      <van-cell title="热门商品" />
      <van-card
        v-for="(item, index) in hotGoodsList"
        :key="index"
        num="2"
        :price="item.retail_price"
        :desc="item.goods_brief"
        :title="item.name"
        :thumb="item.list_pic_url"
      />
    </div>
    <tab-Btn />
  </div>
</template>

<script>
import tabBtn from '@/components/tabBtn'
// @ is an alias to /src
import axios from 'axios'
import api from '@/assets/config/api'

export default {
  name: 'Home',
  data() {
    return {
      searchValue: '',
      data: {}
    }
  },
  components: {
    tabBtn
  },
  //计算属性
  computed: {
    //轮播图
    images() {
      if (this.data.banner) {
        return this.data.banner
      } else {
        return []
      }
    },
    // 导航图
    channel() {
      if (this.data.channel) {
        return this.data.channel
      } else {
        return []
      }
    },
    //品牌直供
    brandDate() {
      if (this.data.brandList) {
        return this.data.brandList
      } else {
        return []
      }
    },

    //新品首发
    newGoodData() {
      if (this.data.newGoodsList) {
        return this.data.newGoodsList
      } else {
        return []
      }
    },
    // 热门商品
    hotGoodsList() {
      if (this.data.hotGoodsList) {
        return this.data.hotGoodsList
      } else {
        return []
      }
    }
  },
  // 异步请求用于解析promise
  async mounted() {
    const { data: res } = await axios.get(api.IndexUrl)
    this.data = res.data

    // console.log(this.data)
  }
}
</script>

<style lang="less" scoped>
#home {
  .swiperimg {
    width: 375px;
    height: 200px;
  }
  //直销
  .brandlist {
    .van-image {
      margin: -16px -8px;
    }

    h4 {
      margin-block: 0;
    }
    p {
      margin-block: 0;
    }
    .van-grid-item__content {
      color: red;
    }

    .title {
      position: absolute;
      top: 50px;
      left: 10px;
    }
    .price {
      position: absolute;
      top: 80px;
      left: 10px;
    }
  }
  //新品
  .newGoodlist {
    .title {
      position: absolute;
      bottom: 0px;
      width: 90%;
    }
    .price {
      position: absolute;
      bottom: -18px;
    }
  }
  // 热门
  .hotlist {
    margin: 0 0 50px;
    .van-card__content {
      justify-content: center;

      text-align: left;
      .van-card__title {
        padding: 5px 0;
        font-weight: 900;
        color: #333;
        font-size: 16px;
      }
      .van-card__price {
        color: red;
      }
    }
  }
}
</style>
