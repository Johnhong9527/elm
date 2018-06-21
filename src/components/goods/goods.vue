<template>
  <div class="goods">
    <div class="menu-wrapper" v-if='goods[0]'>{{goods[0].name}}</div>
    <div class="foods-wrapper"></div>
  </div>
</template>
<script>
import axios from 'axios';

const ERR_OK = 0;
export default {
  data() {
    return {
      goods: [],
    };
  },
  props: {
    seller: Object,
  },
  created() {
    const self = this;
    axios.get('/api/goods').then((data) => {
      console.log(data.data.data[0].name);
      if (data.data.errno === ERR_OK) {
        self.goods = data.data.data;
      }
    });
  },
};
</script>
<style lang="less" scoped>
@import url('../../common/css/common.less');
.goods {
  display: flex;
  position: absolute;
  .t(174);
  .b(46);
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 unit(80 / @scale, rem);
    .w(80);
    background-color: #f3f5f7;
  }
  .foods-wrapper {
    flex: 1;
  }
}
</style>

