<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}元</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          <!-- <div class="pay" :class="{'enough':this.totalPrice >= this.minPrice}"> -->
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="(ball,index) in balls" :key="index">
        <transition name="drop" @before-enter='beforeDrop'
        @enter='dropping' @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="(food, index) in selectFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import cartcontrol from "components/cartcontrol/cartcontrol";

export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 10,
            count: 1
          }
        ];
      }
    },
    deliveryPrice: {
      type: Number
    },
    minPrice: Number
  },
  data() {
    return {
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ],
      dropBalls: [],
      fold: false
    };
  },
  computed: {
    totalPrice() {
      let total = 0;
      /* eslint-disable arrow-parens */
      this.selectFoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let conut = 0;
      /* eslint-disable arrow-parens */
      this.selectFoods.forEach(food => {
        conut += food.count;
      });
      return conut;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`;
      }
      return "去结算";
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return "not-enough";
      }
      return "enough";
    },
    listShow() {
      let self = this;
      if (!self.totalCount) {
        self.fold = true;
        return false;
      }
      let show = !self.fold;
      if (show) {
        self.$nextTick(() => {
          if (!this.scroll) {
            self.scroll = new BScroll(self.$refs.listContent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
      return show;
    }
  },
  methods: {
    drop(el) {
      // 获取位置
      for (let i = 0; i < this.balls.length; i += 1) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    // 过渡
    /* eslint-disable no-unused-vars */
    beforeDrop(el) {
      let count = this.balls.length;
      /* eslint-disable no-plusplus */
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          /* eslint-disable no-param-reassign */
          el.style.display = "";
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName("inner-hook")[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    dropping(el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = "translate3d(0,0,0)";
        el.style.transform = "translate3d(0,0,0)";
        let inner = el.getElementsByClassName("inner-hook")[0];
        inner.style.webkitTransform = "translate3d(0,0,0)";
        inner.style.transform = "translate3d(0,0,0)";
        el.addEventListener("transitionend", done);
      });
    },
    afterDrop(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = "none";
      }
    },
    toggleList() {
      let self = this;
      if (!self.totalCount) {
        return;
      }
      self.fold = !self.fold;
    }
  },
  components: {
    cartcontrol
  }
};
</script>

<style lang="less" scoped>
@import url("../../common/css/common.less");
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  .h(48);
  .content {
    display: flex;
    background: #141d27;
    .content-left {
      flex: 1;
      .logo-wrapper {
        display: inline-block;
        position: relative;
        .t(-10);
        .m-t-l(0,12);
        .p(6);
        .w(56);
        .h(56);
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background: #141d27;
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgb(43, 52, 60);
          text-align: center;
          &.highlight {
            background-color: rgb(0, 160, 220);
          }
          .icon-shopping_cart {
            .lh(44);
            .fs(24);
            color: #80858a;
            &.highlight {
              color: #fff;
            }
          }
        }
        .num {
          position: absolute;
          top: 0;
          right: 0;
          top: 0;
          right: 0;
          .w(24);
          .h(16);
          .lh(17);
          text-align: center;
          .br(16);
          .fs(9);
          font-weight: 700;
          color: #fff;
          background-color: rgb(240, 20, 20);
          box-shadow: 0 unit(4 / @scale, rem) unit(8 / @scale, rem) 0
            rgba(0, 0, 0, 0.4);
        }
      }
      .price {
        display: inline-block;
        vertical-align: top;
        .mt(12);
        .lh(24);
        .pr(12);
        box-sizing: border-box;
        .setRightLine(rgba(255,255,255,0.1));
        .fs(16);
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);
        &.highlight {
          color: #fff;
        }
      }
      .desc {
        display: inline-block;
        vertical-align: top;
        .m-around(12,0,0,12);
        .lh(24);
        .fs(10);
        color: rgba(255, 255, 255, 0.4);
      }
    }
    .content-right {
      flex: 0 0 unit(105 / @scale, rem);
      .w(105);
      .pay {
        .h(48);
        .lh(48);
        text-align: center;
        .fs(12);
        color: rgba(255, 255, 255, 0.4);
        font-weight: 700;
        &.not-enough {
          background-color: #2b333b;
        }
        &.enough {
          background-color: #00b43c;
          color: #fff;
        }
      }
    }
  }
  .ball-container {
    @ballTime: 0.5s;
    .ball {
      position: fixed;
      .l(32);
      .b(22);
      z-index: 200;
      transition: all @ballTime cubic-bezier(0.49, -0.29, 0.75, 0.41);
      .inner {
        .w(16);
        .h(16);
        border-radius: 50%;
        background-color: rgb(0, 160, 220);
        transition: all @ballTime linear;
      }
    }
  }
  .shopcart-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
    transition: all 0.3s linear;
    transform: translate3d(0, -100%, 0);
    &.fold-enter-active,
    &.fold-leave-active {
    }
    &.fold-enter,
    &.fold-leave-to {
      transform: translate3d(0, 0, 0);
    }
    .list-header {
      .h(40);
      .lh(40);
      .p-t-l(0,18);
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      background-color: #f3f5f7;
      .title {
        float: left;
        .fs(14);
        color: rgb(7, 17, 27);
      }
      .empty {
        float: right;
        .fs(12);
        color: rgb(0, 160, 220);
      }
    }
    .list-content {
      .p-t-l(0, 18);
      max-height: unit(217 / @scale, rem);
      overflow: hidden;
      background-color: #fff;
      .food {
        position: relative;
        .p-t-l(12, 0);
        box-sizing: border-box;
        .setBottomLine(rgba(7, 17, 27, 0.1));
        .name {
          .lh(24);
          .fs(14);
          color: rgb(7, 17, 27);
        }
        .price {
          position: absolute;
          .r(99);
          .b(12);
          .lh(24);
          .fs(14);
          font-weight: 700;
          color: rgb(200, 20, 20);
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          .b(6);
        }
      }
    }
  }
}
</style>
