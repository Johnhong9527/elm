<template>
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
        </div>
        <div class="cartcontrol-wrapper">
          <s-cartcontrol @add='addFood' :food='food'></s-cartcontrol>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import BScroll from "better-scroll";
import cartcontrol from "components/cartcontrol/cartcontrol";

export default {
  data() {
    return {
      showFlag: false
    };
  },
  props: {
    food: {
      type: Object
    }
  },
  components: {
    "s-cartcontrol": cartcontrol
  },
  methods: {
    show() {
      this.showFlag = true;
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
    addFood() {
      
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
  }
}
</style>
