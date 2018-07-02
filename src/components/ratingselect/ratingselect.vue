<template>
<!-- eslint-disable max-len -->
  <div class="ratingselect">
    <div class="rating-type">
      <span class="block positive" @click='select(2, $event)'
        :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span class="block positive" @click='select(0, $event)'
        :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span class="block negative" @click='select(1, $event)'
        :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click='toggleContent' class="switch" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span><span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default() {
        return ALL;
      }
    },
    onlyContent: {
      type: Boolean,
      default() {
        return false;
      }
    },
    desc: {
      type: Object,
      default() {
        return {
          all: "全部",
          positive: "满意",
          negative: "不满意"
        };
      }
    }
  },
  computed: {
    positives() {
      /* eslint-disable arrow-body-style */
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      /* eslint-disable arrow-body-style */
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      });
    }
  },
  methods: {
    select(type, event) {
      /* eslint-disable no-underscore-dangle */
      if (!event._constructed) {
        return;
      }
      this.$emit('select', type);
    },
    toggleContent(event) {
      /* eslint-disable no-underscore-dangle */
      if (!event._constructed) {
        return;
      }
      this.$emit('toggle');
    }
  },
};
</script>
<style lang="less" scoped>
@import url("../../common/css/common.less");
.ratingselect {
  .rating-type{
    .p-t-l(18,0);
    .m-t-l(0,18);
    .setBottomLine(rgba(7, 17, 27, 0.102));
    font-size: 0;
    .block{
      display: inline-block;
      .p-t-l(8,12);
      .mr(8);
      .br(1);
      .fs(12);
      .lh(16);
      color: rgb(77, 85, 93);
      &.active{
        color: #fff;
      }
      .count{
        .ml(2);
        .fs(8);
      }
      &.positive{
        background-color: rgba(0, 160, 220, 0.2);
        &.active {
          background-color: rgb(0, 160, 220);
        }
      }
      &.negative{
        background-color: rgba(76, 84, 91, 0.2);
         &.active {
          background-color: rgb(76, 84, 91);
        }
      }
    }
  }
  .switch{
    .p-t-l(12,18);
    .setBottomLine(rgba(7,17,27,0.1));
    color: rgb(147,153,159);
    font-size: 0;
     &.on{
      .icon-check_circle{
        color: #00c850;
      }
     }
   .icon-check_circle{
     display: inline-block;
     vertical-align: top;
     .mr(4);
     .fs(24);
   }
   .text{
     display: inline-block;
     vertical-align: top;
     .fs(12);
     .lh(24);
   }
  }
}
</style>

