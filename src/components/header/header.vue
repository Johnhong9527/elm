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
      <div class="support-count" @click='detailShow=true'>
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background around">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name='fade'>
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <s-star :size='48' :score="seller.score"></s-star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="supports-item" v-for="(item,index) in seller.supports" :key='index'>
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{
                  seller.supports[index].description}}</span>
              </li>
            </ul>
              <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click='detailShow=false'>
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import star from '../star/star';

export default {
  data() {
    return {
      detailShow: false,
    };
  },
  props: {
    seller: Object,
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  components: { 's-star': star },
};
</script>
<style lang="less" scoped>
@import url('../../common/css/common.less');
@import url('../../common/css/mixin.less');
.header {
  color: #fff;
  // background: rgba(7, 17, 27, 0.8);
  position: relative;
  overflow: hidden;
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
          vertical-align: top;
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
      .h(24);
      .lh(24);
      .br(14);
      background-color: rgba(0, 0, 0, 0.2);
      text-align: center;
      .count {
        vertical-align: top;
        .fs(10);
      }
      .icon-keyboard_arrow_right {
        .fs(10);
        .lh(24);
        .ml(2);
      }
    }
  }
  .bulletin-wrapper {
    .h(28);
    .lh(28);
    // padding: 0 22px 0 12px;
    .pl(12);
    .pr(22);
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    background: rgba(7, 17, 27, 0.1);
    .bulletin-title {
      display: inline-block;
      vertical-align: top;
      .w(22);
      .h(12);
      .mt(8);
      .bg_image('bulletin');
      .b_s(22,12);
      background-repeat: no-repeat;
    }
    .bulletin-text {
      vertical-align: top;
      .ml(2);
      .mr(4);
      // .fs(10);
      font-size: 10px;
      // display:inline-block;
    }
    .icon-keyboard_arrow_right {
      position: absolute;
      // .fs(10);
      font-size: 10px;
      .r(12);
      .b(7);
    }
  }
  .background {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    filter: blur(10px);
  }
  .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.8);
    &.fade-enter-active, &.fade-leave-active {
      transition: opacity .5s;
    }
    &.fade-enter, &.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
    .detail-wrapper {
      min-height: 100%;
      width: 100%;
      .detail-main {
        .mt(64);
        .pb(64);
        .name {
          .lh(16);
          .fs(16);
          font-weight: 700;
          text-align: center;
        }
        .star-wrapper{
          .mt(18);
          .p-t-l(2, 0);
          text-align: center;
        }
        .title{
          display: flex;
          align-items: center;
          width: 80%;
          .p-t-l(0,14);
          margin: unit(30 / @scale, rem) auto unit(24 / @scale, rem) auto;
          .line{
            flex: 1;
            position: relative;
            border-bottom: 1px solid rgba(255,255,255,0.2);
          }
          .text{
            .fs(14);
            .lh(14);
            .p-t-l(0,12);
            text-align: center;
            font-weight: 700;
          }
        }
        .supports{
          width: 80%;
          margin: 0 auto;
          .supports-item{
            .p-t-l(0,12);
            .mb(12);
            font-size: 0;
            &:last-child{
              margin-bottom: 0;
            }
            .icon{
              display: inline-block;
              .w(16);
              .h(16);
              .fs(12);
              .lh(12);
              .b_s(16,16);
              vertical-align: top;
              .mr(6);
              background-repeat:no-repeat;
              &.decrease{
                .bg_image('decrease_2');
              }
              &.discount{
                .bg_image('discount_2');
              }
              &.special{
                .bg_image('special_2');
              }
              &.invoice{
                .bg_image('invoice_2');
              }
              &.guarantee{
                .bg_image('guarantee_2');
              }
            }
            .text{
              .lh(16);
              .fs(12);
            }
          }
        }
        .bulletin{
          .fs(12);
          .lh(24);
          .p-t-l(0,48);
        }
      }
    }
    .detail-close {
      position: relative;
      .w(32);
      .h(32);
      margin: unit(-64 / @scale, rem) auto 0 auto;
      clear: both;
      .fs(32);
    }
  }
}
</style>
