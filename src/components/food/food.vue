<template>
  <!-- eslint-disable max-len  -->
  <transition name='move'>
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" />
          <div class="back" @click='hide'>
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <s-cartcontrol @add='addFood($event)' :food='food'></s-cartcontrol>
          </div>
          <transition name='fade'>
            <div @click.stop.prevent='addFirst(food,$event)' class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
          </transition>
        </div>
        <s-split v-show="food.info"></s-split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <div class="text">{{food.info}}</div>
        </div>
        <s-split v-show="food.info"></s-split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <s-ratingselect :selectType="selectType" @select="selectRating" @toggle="toggleContent" :onlyContent='onlyContent' :desc="desc" :ratings='food.ratings'></s-ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show='needShow(rating.rateType,rating.text)' v-for="(rating, index) in food.ratings" :key='index' class="rating-item">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" :src="rating.avatar" width="12" height="12">
                </div>
                <div class="time">
                  {{rating.rateTime | formatDate}}
                </div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType === 0,
                    'icon-thumb_down':rating.rateType === 1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show='!food.ratings || !food.ratings.length'>暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import BScroll from "better-scroll";
import formatDate from "common/js/date";
import cartcontrol from "components/cartcontrol/cartcontrol";
import split from "components/split/split";
import ratingselect from "components/ratingselect/ratingselect";
// const POSITIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;

export default {
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: "全部",
        positive: "推荐",
        negative: "吐槽"
      }
    };
  },
  props: {
    food: {
      type: Object
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  components: {
    "s-cartcontrol": cartcontrol,
    "s-split": split,
    "s-ratingselect": ratingselect
  },
  methods: {
    show() {
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = false;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.showFlag = false;
    },
    addFood(target) {
      this.$parent.addFood(target);
    },
    selectRating(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    toggleContent() {
      this.onlyContent = !this.onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    addFirst(food, event) {
      /* eslint-disable no-underscore-dangle */
      if (!event._constructed) {
        return;
      }
      this.$emit("add", event.target);
      this.$set(this.food, "count", 1);
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      }
      return type === this.selectType;
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../common/css/common.less");
.food {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  .b(46);
  z-index: 30;
  background-color: #fff;
  transform: rotate3d(0, 0, 0);
  &.move-enter-active,
  &.move-leave-active {
    transition: all 0.2s linear;
  }
  &.move-enter,
  &.move-leave-active {
    transform: translate3d(100%, 0, 0);
  }
  .image-header {
    /* width: 100vw;
    height: 100vw; */
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .back {
      position: absolute;
      .t(10);
      left: 0;
      .icon-arrow_lift {
        display: block;
        .p(10);
        .fs(20);
        color: #fff;
      }
    }
  }
  .content {
    .p(18);
    position: relative;
    .title {
      .lh(18);
      .mb(8);
      .fs(14);
      font-weight: 700;
      color: rgb(7, 17, 27);
    }
    .detail {
      .mb(18);
      .lh(10);
      .h(10);
      font-size: 0;
      .sell-count,
      .rating {
        .fs(10);
        color: rgb(147, 153, 159);
      }
      .sell-count {
        .mr(12);
      }
    }
    .price {
      font-weight: 700;
      .lh(24);
      .now {
        .mr(8);
        .fs(14);
        color: rgb(240, 20, 20);
      }
      .old {
        text-decoration: line-through;
        .fs(10);
        color: rgb(147, 153, 159);
      }
    }
    .cartcontrol-wrapper {
      position: absolute;
      .r(12);
      .b(12);
    }
    .buy {
      position: absolute;
      .r(18);
      .b(18);
      z-index: 10;
      .h(24);
      .lh(24);
      .p-t-l(0,12);
      box-sizing: border-box;
      .br(12);
      .fs(10);
      color: #fff;
      background-color: rgb(0, 160, 220);
      opacity: 1;
      &.fade-enter-active,
      &.fade-leave-active {
        transition: all 0.2s linear;
      }
      &.fade-enter,
      &.fade-leave-to {
        opacity: 0;
      }
    }
  }
  .info {
    .p(18);
    .title {
      .lh(14);
      .mb(16);
      .fs(14);
      color: rgb(7, 17, 27);
    }
    .text {
      .lh(24);
      .p-t-l(0,8);
      .fs(12);
      color: rgb(77, 85, 93);
    }
  }
  .rating {
    .pt(18);
    .title {
      .lh(14);
      .ml(18);
      .fs(14);
      color: rgb(7, 17, 27);
    }
    .rating-wrapper {
      .p-t-l(0,18);
      .rating-item {
        position: relative;
        .p-t-l(16,0);
        .setBottomLine(rgba(7,17,27,0.1));
        .user {
          position: absolute;
          right: 0;
          .t(16);
          .lh(12);
          font-size: 0;
          .name {
            display: inline-block;
            vertical-align: top;
            .mr(6);
            .fs(10);
            color: rgb(147, 153, 159);
          }
          .avatar {
            border-radius: 50%;
          }
        }
        .time {
          .mb(6);
          .lh(12);
          .fs(10);
          color: rgb(147, 153, 159);
        }
        .text {
          .lh(16);
          .fs(12);
          color: rgb(7, 17, 27);
          .icon-thumb_up,
          .icon-thumb_down {
            .mr(4);
            .lh(16);
            .fs(12);
          }
          .icon-thumb_up {
            color: rgb(0, 160, 220);
          }
          .icon-thumb_down {
            color: rgb(147, 153, 159);
          }
        }
      }
      .no-rating {
        .p-t-l(16,0);
        .fs(12);
        color: rgb(147, 153, 159);
      }
    }
  }
}
</style>
