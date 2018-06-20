<template>
  <div class="header" v-if='seller'>
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support">
          <span class="icon" :class='classMap[seller.supports[0].type]'></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    seller: Object,
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
};
</script>
<style lang="less" scoped>
@import url('../../common/css/common.less');
@import url('../../common/css/mixin.less');
.header {
  color: #fff;
  background: #000;
  .content-wrapper {
    font-size: 0;
    position: relative;
    .pt(24);
    .pl(24);
    .pb(18);
    .avatar {
      display: inline-block;
      vertical-align: top;
      img {
        .w(64);
        .h(64);
        .br(2);
      }
    }
    .content {
      display: inline-block;
      .ml(16);
      .title {
        .mt(2);
        .mb(8);
        .brand {
          display: inline-block;
          vertical-align: bottom;
          .w(30);
          .h(18);
          .bg_image('brand');
          .b_s1(30);
          .b_s2(18);
          background-repeat: no-repeat;
        }
        .name {
          .ml(6);
          .fs(16);
          .lh(18);
          font-weight: bold;
        }
      }
      .description {
        .mb(10);
        .lh(12);
        .fs(12);
      }
      .support {
        .icon {
          display: inline-block;
          vertical-align: bottom;
          .w(12);
          .h(12);
          .mr(4);
          .b_s1(12);
          .b_s2(12);
          background-repeat: no-repeat;
          &.decrease {
            .bg_image('decrease_1');
          }
          &.discount {
            .bg_image('discount_1');
          }
          &.guarantee {
            .bg_image('guarantee_1');
          }
          &.invoice {
            .bg_image('invoice_1');
          }
          &.special {
            .bg_image('special_1');
          }
        }
        .text {
          .lh(12);
          .fs(10);
        }
      }
    }
    .support-count {
      position: absolute;
      .r(12);
      .b(18);
      .pl(8);
      .pr(8);
      .lh(24);
      background-color: rgba(0, 0, 0, 0.2);
      text-align: center;
      .count {
        .fs(10);
      }
      .icon-keyboard_arrow_right {
        .fs(10);
      }
    }
  }
}
</style>
