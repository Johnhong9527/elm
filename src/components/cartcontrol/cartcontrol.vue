<template>
  <div class="cartcontrol">
    <transition name='move'>
      <div class="cart-decrease" v-show="food.count>0" @click='decreaseCart($event)'>
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click='addCart($event)'></div>
  </div>
</template>

<script>
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      /* eslint-disable no-underscore-dangle */
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        this.$set(this.food, "count", 1);
      } else {
        /* eslint-disable no-plusplus */
        this.food.count++;
      }
      this.$emit("add", event.target);
    },
    decreaseCart(event) {
      /* eslint-disable no-underscore-dangle */
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        this.food.count -= 1;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../common/css/common.less");
.cartcontrol {
  font-size: 0;
  .cart-decrease {
    // 动画执行结束
    display: inline-block;
    .p(6);
    opacity: 1;
    transform: translate3d(0, 0, 0);
    .inner {
      display: inline-block;
      .lh(24);
      .fs(24);
      color: rgb(0, 160, 220);
      transition: all 0.4s linear;
      transform: rotate(0);
    }
    // 动画执行时
    &.move-enter-active,
    &.move-leave-active {
      transition: all 0.4s linear;
    }
    // 动画开始和结束初始状态
    &.move-enter,
    &.move-leave-to {
      opacity: 0;
      transform: translate3d(24px, 0, 0);
      .inner {
        transform: rotate(180deg);
      }
    }
  }
  .cart-count {
    display: inline-block;
    vertical-align: top;
    text-align: center;
    .w(12);
    .pt(6);
    .lh(24);
    .fs(10);
    color: rgb(147, 153, 159);
  }
  .cart-add {
    display: inline-block;
    .p(6);
    .lh(24);
    .fs(24);
    color: rgb(0, 160, 220);
  }
}
</style>
