<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num">{{totalCount}}</div>
        </div>
        <div class="price">￥{{totalPrice}}元</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay">
          ￥{{minPrice}}元起送
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
    }
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
    // font-size: 0;
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
          .icon-shopping_cart {
            .lh(44);
            .fs(24);
            color: #80858a;
          }
        }
        .num{
          position: absolute;
          top: 0;
          right: 0;
          .w(24);
          .h(16);
          .lh(16);
          text-align: center;
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
        background-color: #2b333b;
      }
    }
  }
}
</style>
