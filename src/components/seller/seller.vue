<template>
  <div class="seller" v-if="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <s-star :size='36' :score='seller.score'></s-star>
          <span class="text">{{seller.ratingCount}}</span>
          <span class="text">{{seller.sellCount}}</span>
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
      </div>
    </div>
  </div>
</template>
<script>
import star from 'components/star/star';

export default {
  props: {
    seller: {
      type: Object,
    },
  },
  components: {
    's-star': star,
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
    }
  }
}
</style>

