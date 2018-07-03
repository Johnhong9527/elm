<template>
  <div class="star" :class="startType">
    <span class="star-item" v-for="(itemClass,index) in itemClasses" :key=index :class='itemClass'></span>
  </div>
</template>
<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
  data() {
    return {};
  },
  computed: {
    itemClasses() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let hasDecimal = score % 1 !== 0;
      let integer = Math.floor(score);
      for (let i = 0; i < integer; i += 1) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    },
    startType() {
      return `start-${this.size}`;
    },
  },
  props: {
    size: Number,
    score: Number,
  },
};
</script>
<style lang="less" scoped>
@import url('../../common/css/common.less');
.star {
  font-size: 0;
  &-item {
    display: inline-block;
    background-repeat: no-repeat;
  }
  &.start-48 {
    .star-item {
      .w(20);
      .h(20);
      .mr(22);
      .b_s(20,20);
      &:last-child {
        margin-right: 0;
      }
      &.on {
        .bg_image('star48_on');
      }
      &.half {
        .bg_image('star48_half');
      }
      &.off {
        .bg_image('star48_off');
      }
    }
  }
  &.start-36 {
    .star-item {
      .w(15);
      .h(15);
      .mr(6);
      .b_s(15,15);
      &:last-child {
        margin-right: 0;
      }
      &.on {
        .bg_image('star36_on');
      }
      &.half {
        .bg_image('star36_half');
      }
      &.off {
        .bg_image('star36_off');
      }
    }
  }
  &.start-24 {
    .star-item {
      .w(10);
      .h(10);
      .mr(3);
      .b_s(10,10);
      &:last-child {
        margin-right: 0;
      }
      &.on {
        .bg_image('star24_on');
      }
      &.half {
        .bg_image('star24_half');
      }
      &.off {
        .bg_image('star24_off');
      }
    }
  }
}
</style>
