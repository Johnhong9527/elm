<template>
<!-- eslint-disable max-len -->
<div class="ratings" ref='ratingBox'>
  <div class="ratings-content" v-if='seller'>
    <div class="overview">
      <div class="overview-left">
        <h1 class="score">{{seller.score}}</h1>
        <div class="title">综合评分</div>
        <div class="rank">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="overview-right">
        <div class="score-wrapper">
          <span class="title">服务态度</span>
          <s-star class="title" :size='36' :score='seller.serviceScore'>服务态度</s-star>
          <span class="score">{{seller.serviceScore}}</span>
        </div>
        <div class="score-wrapper">
          <span class="title">商品评分</span>
          <s-star :size="36" :score="seller.foodScore"></s-star>
          <span class="score">{{seller.foodScore}}</span>
        </div>
        <div class="delivery-wrapper">
          <span class="title">送达时间</span>
          <span class="delivery">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <s-split></s-split>
    <s-ratingselect
      @select='selectRating'
      @toggle='toggleContent'
      :selectType="selectType"
      :onlyContent='onlyContent'
      :ratings="ratingArr"></s-ratingselect>
    <div class="rating-wrapper">
      <ul>
        <li v-for='(rating, index) in ratingArr' :key='index'
          v-show='needShow(rating.rateType, rating.text)'
          class='rating-item'>
          <div class="avatar">
            <img :src="rating.avatar" width="28" height="28">
          </div>
          <div class="content">
            <h1 class="name">{{rating.username}}</h1>
            <div class="star-wrapper">
              <s-star :size='24' :score='rating.score'></s-star>
              <span class="delivery" v-show='rating.deliveryTime'>{{rating.deliveryTime}}</span>
            </div>
            <p class="text">{{rating.text}}</p>
            <div class="recommend" v-show='rating.recommend && rating.recommend.length'>
              <span class="icon-thumb_up"></span>
              <span class="item" v-for='(item, index) in rating.recommend' :key='index'>{{item}}</span>
            </div>
            <div class="time">{{rating.rateTime | formatDate}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios';
import BScroll from "better-scroll";
import formatDate from 'common/js/date';
import star from "components/star/star";
import split from "components/split/split";
import ratingselect from "components/ratingselect/ratingselect";

const ALL = 2;
const ERR_OK = 0;
export default {
  data() {
    return {
      ratingArr: [],
      selectType: ALL,
      onlyContent: true
    };
  },
  created() {
    const self = this;
    axios.get('/api/ratings').then((data) => {
      if (data.data.errno === ERR_OK) {
        self.ratingArr = data.data.data;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratingBox, {
            click: true
          });
        });
      }
    });
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    "s-star": star,
    "s-split": split,
    "s-ratingselect": ratingselect
  },
  methods: {
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      }
      return type === this.selectType;
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
  }
};
</script>

<style lang="less" scoped>
@import url("../../common/css/common.less");
.ratings {
  position: absolute;
  .t(174);
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    display: flex;
    .p-t-l(18,0);
    .overview-left {
      flex: 0 0 unit(137 / @scale, rem);
      .p-t-l(6, 0);
      .w(137);
      .setRightLine(rgba(7, 17, 27, 0.1));
      text-align: center;
      @media only screen and (max-width: 320px) {
        flex: 0 0 unit(120 / @scale, rem);
        .w(120);
      }
      .score {
        .mb(6);
        .lh(28);
        .fs(24);
        color: rgb(255, 153, 0);
      }
      .title {
        .mb(8);
        .lh(12);
        .fs(12);
        color: rgb(7, 17, 27);
      }
      .rank {
        .lh(10);
        .fs(10);
        color: rgb(147, 153, 159);
      }
    }
    .overview-right {
      flex: 1;
      .p-around(6,0,6,24);
      @media only screen and (max-width: 320px) {
        .pl(6);
      }
      .score-wrapper {
        .mb(8);
        font-size: 0;
        .title {
          display: inline-block;
          .lh(18);
          vertical-align: top;
          .fs(12);
          color: rgb(7, 17, 27);
        }
        .star {
          display: inline-block;
          .m-t-l(0,12);
          vertical-align: top;
        }
        .score {
          display: inline-block;
          .lh(18);
          vertical-align: top;
          .fs(12);
          color: rgb(255, 153, 0);
        }
      }
      .delivery-wrapper {
        font-size: 0;
        .title {
          .lh(18);
          .fs(12);
          color: rgb(7, 17, 27);
        }
        .delivery {
          .ml(12);
          .fs(12);
          color: rgb(147, 153, 159);
        }
      }
    }
  }
  .rating-wrapper{
    .p-t-l(0,18);
    .rating-item{
      display: flex;
      .p-t-l(18, 0);
      .setBottomLine(rgba(7, 17, 27, 0.1));
      .avatar {
        flex: 0 0 unit(28/@scale, rem);
        .w(28);
        .mr(12);
        img{
          border-radius: 50%;
        }
      }
      .content{
        position: relative;
        flex: 1;
        .name{
          .mb(4);
          .lh(12);
          .fs(10);
          color: rgb(7,17,27);
        }
        .star-wrapper{
          .mb(6);
          font-size: 0;
          .star{
            display: inline-block;
            vertical-align: top;
            .lh(12);
            .fs(10);
            color: rgb(147,153,159);
          }
        }
        .text{
          .mb(8);
          .lh(18);
          color:rgb(7,17,27);
          .fs(12);
        }
        .recommend {
          .lh(16);
          font-size: 0;
          .icon-thumb_up,.item{
            display: inline-block;
            .m-around(0,8,4,0);
            .fs(9);
          }
          .icon-thumb_up{
            color: rgb(0,160,220);
          }
          .item{
            .p-t-l(0,6);
            .setLine(rgba(7,17,27,0.1));
            .br(1);
            color: rgb(147, 153, 159);
            background-color: #fff;
          }
        }
        .time{
          position: absolute;
          top: 0;
          right: 0;
          .lh(12);
          .fs(10);
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>

