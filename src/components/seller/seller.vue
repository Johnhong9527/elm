<template>
  <div class="seller" v-if="seller" ref='sellerContent'>
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <s-star :size='36' :score='seller.score'></s-star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite($event)">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <s-split></s-split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="(item,index) in seller.supports" :key='index'>
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <s-split></s-split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <!-- 设置宽度为100%;当内部元素超过可视区域,设置overflow: hidden; -->
        <div class="pic-wrapper" ref="picWrapper">
          <!-- 设置列表元素的父级元素的宽度 (子元素的宽度 + 外边距) * 子元素的宽度 -->
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for='(pic, index) in seller.pics' :key='index'>
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <s-split></s-split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="(info, index) in seller.infos" :key="index">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import { saveToLocal, loadFromLocal } from 'common/js/store';
import star from 'components/star/star';
import split from 'components/split/split';

export default {
  data() {
    return {
      /* eslint-disable arrow-body-style */
      favorite: (() => {
        return loadFromLocal(this.seller.id, 'favorite', false);
      })(),
    };
  },
  props: {
    seller: {
      type: Object,
    },
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏';
    },
  },
  watch: {
    seller() {
      this.$nextTick(() => {
        /* eslint-disable no-underscore-dangle */
        this._initScroll();
        this._initPics();
      });
    },
  },
  mounted() {
    if (this.seller) {
      this.$nextTick(() => {
        /* eslint-disable no-underscore-dangle */
        this._initScroll();
        this._initPics();
      });
    }
  },
  methods: {
    toggleFavorite(event) {
      if (!event._constructed) {
        return;
      }
      this.favorite = !this.favorite;
      saveToLocal(this.seller.id, 'favorite', this.favorite);
    },
    /* eslint-disable no-underscore-dangle */
    _initScroll() {
      let self = this;
      if (!self.scroll) {
        self.scroll = new BScroll(self.$refs.sellerContent, {
          click: true,
        });
      } else {
        self.scroll.refresh();
      }
    },
    /* eslint-disable no-underscore-dangle */
    _initPics() {
      if (this.seller.pics) {
        let picWidth = 120; // 定义图片的宽度
        let margin = 6;
        /* eslint-disable no-mixed-operators */
        let width = (picWidth + margin) * this.seller.pics.length - margin; // 计算总宽度
        this.$refs.picList.style.width = `${width}px`;
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical', // 保留垂直滑动
            });
          } else {
            this.picScroll.refresh();
          }
        });
      }
    },
  },
  components: {
    's-star': star,
    's-split': split,
  },
};
</script>
<style lang="less" scoped>
@import url('../../common/css/common.less');
.seller {
  position: absolute;
  .t(174);
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    .p(18);
    position: relative;
    .title {
      .mb(8);
      .lh(14);
      color: rgb(7, 17, 27);
      .fs(14);
    }
    .desc {
      .pb(18);
      .setBottomLine(rgba(7,17,27,0.1));
      font-size: 0;
      .star {
        display: inline-block;
        .mr(8);
        vertical-align: top;
      }
      .text {
        display: inline-block;
        .mr(12);
        .lh(18);
        vertical-align: top;
        .fs(10);
        color: rgb(77, 85, 93);
      }
    }
    .remark {
      display: flex;
      .pt(18);
      .block {
        flex: 1;
        text-align: center;
        .setRightLine(rgba(7,17,27,0.1));
        &:last-child {
          .setNoLine();
        }
        h2 {
          .mb(4);
          .lh(10);
          .fs(10);
          color: rgb(147, 153, 159);
        }
        .content {
          .lh(24);
          .fs(10);
          color: rgb(7, 17, 27);
          .stress {
            .fs(24);
          }
        }
      }
    }
    .favorite {
      position: absolute;
      .w(50);
      .r(11);
      .t(18);
      text-align: center;
      .fs(0);
      .icon-favorite {
        display: block;
        .mb(4);
        .lh(24);
        .fs(24);
        color: #d4d6d9;
        &.active {
          color: rgb(240, 20, 20);
        }
      }
      .text {
        .lh(10);
        .fs(10);
        color: rgb(77, 85, 93);
      }
    }
  }
  .bulletin {
    .p-around(18,18,0,18);
    .title {
      .mb(8);
      .lh(14);
      color: rgb(7, 17, 27);
      .fs(14);
    }
    .content-wrapper {
      .p-around(0,12,16,12);
      .setBottomLine(rgba(7,17,27,0.1));
      .content {
        .lh(24);
        .fs(12);
        color: rgb(240, 20, 20);
      }
    }
    .supports {
      .support-item {
        .p-t-l(16,12);
        .setBottomLine(rgba(7,17,27,0.1));
        font-size: 0;
        &:last-child {
          .setNoLine();
        }
        .icon {
          display: inline-block;
          .w(16);
          .h(16);
          vertical-align: top;
          .mr(6);
          .lh(12);
          .b_s(16,16);
          background-repeat: no-repeat;
          &.decrease {
            .bg_image('decrease_4');
          }
          &.discount {
            .bg_image('discount_4');
          }
          &.special {
            .bg_image('special_4');
          }
          &.invoice {
            .bg_image('invoice_4');
          }
          &.guarantee {
            .bg_image('guarantee_4');
          }
        }
        .text {
          .lh(16);
          .fs(12);
          color: rgb(7, 17, 27);
        }
      }
    }
  }
  .pics {
    .p(18);
    .title {
      .mb(12);
      .lh(14);
      color: rgb(7, 17, 27);
      .fs(14);
    }
    .pic-wrapper {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      .pic-list {
        font-size: 0;
        .pic-item {
          display: inline-block;
          .mr(6);
          .w(120);
          .h(90);
          &:list-child {
            .setNoLine();
          }
        }
      }
    }
  }
  .info {
    .p-around(18, 18,0,18);
    color: rgb(7, 17, 27);
    .title {
      .pb(12);
      .lh(14);
      .setBottomLine(rgba(7,17,27,0.1));
      .fs(12);
    }
    .info-item {
      .p-t-l(16,12);
      .lh(16);
      .setBottomLine(rgba(7,17,27,0.1));
      .fs(12);
      &:last-child {
        .setNoLine();
      }
    }
  }
}
</style>

