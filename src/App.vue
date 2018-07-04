<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div v-if='address'>
      {{address}}
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import urlParse from 'common/js/util';
import header from 'components/header/header';
import axios from 'axios';

const ERR_OK = 0;
export default {
  name: 'App',
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })(),
      },
      address: null,
    };
  },
  created() {
    const self = this;
    /* eslint-disable arrow-parens */
    axios.get('/api/seller').then(data => {
      if (data.data.errno === ERR_OK) {
        // 合并对象(:扩展对象属性)
        self.seller = Object.assign({}, this.seller, data.data.data);
      }
    });
    //
    /* if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        alert(position.coords.latitude);
        alert(position.coords.longitude);
        axios
        .get(`/elm/bgs/poi/reverse_geo_coding?latitude=${
          position.coords.latitude
          }&longitude=${position.coords.longitude}`)
        .then((data) => {
          self.address = data.data;
          alert(`${data.data.name}`);
        });
      });
    } */
  },
  components: { 'v-header': header },
};
</script>

<style lang='less'>
@import url('./common/css/common.less');
.tab {
  display: flex;
  align-items: center;
  .h(40);
  .setBottomLine(rgba(7,17,27,0.1));
  &-item {
    flex: 1;
    text-align: center;
    & > a {
      .fs(14);
      .lh(40);
      display: block;
      color: rgb(77, 85, 93);
      &.active {
        color: rgb(240, 20, 20);
      }
    }
  }
}
</style>
