<template>
  <div class="goods">
    <div class="menu-wrapper" v-if='goods[0]' ref="menuWrapper">
      <ul>
        <li v-for='(item,index) in goods' :key='index' class="menu-item">
          <span class="text">
            <span v-show="item.type > 0" class="icon"
              :class='classMap[item.type]'></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref='foodsWrapper'>
      <ul>
        <li v-for='(item,itemIndex) in goods' :key='itemIndex' class="good-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food,index) in item.foods" :key='index' class="food-item">
              <div class="icon">
                <img :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.sellCount}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show='food.oldPrics'>￥{{food.oldPrics}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import BScroll from 'better-scroll';

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
    self.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    axios.get('/api/goods').then((data) => {
      console.log(data.data.data[0].name);
      if (data.data.errno === ERR_OK) {
        self.goods = data.data.data;
        self.initScroll();
      }
    });
  },
  methods: {
    tab(type) {
      console.log(type);
    },
    initScroll() {
      console.log(this.$refs);
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {});
      // this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {});
    },
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
    .menu-item {
      display: table;
      .p-t-l(0,12);
      .w(56);
      .h(54);
      .lh(14);
      .fs(12);
      .icon {
        display: inline-block;
        vertical-align: top;
        .w(12);
        .h(12);
        .mr(2);
        .b_s1(12);
        .b_s2(12);
        background-repeat: no-repeat;
        &.decrease {
          .bg_image('decrease_3');
        }
        &.discount {
          .bg_image('discount_3');
        }
        &.guarantee {
          .bg_image('guarantee_3');
        }
        &.invoice {
          .bg_image('invoice_3');
        }
        &.special {
          .bg_image('special_3');
        }
      }
      .text {
        display: table-cell;
        .w(56);
        text-align: center;
        vertical-align: middle;
        .setBottomLine(rgba(7,17,27,0.1));
        .fs(12);
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    .title {
      .pl(14);
      .lh(26);
      .h(26);
      border-left: 2px solid #d9dde1;
      .fs(12);
      color: rgb(147, 153, 159);
      background-color: #f3f5f7;
    }
    .food-item {
      display: flex;
      .m(18);
      .pb(18);
      .setBottomLine(rgba(0,0,0,0.1));
      &:last-child {
        margin-bottom: 0;
        .setNoLine();
      }
      .icon {
        flex: 0 0 unit(57 / @scale, rem);
        .mr(10);
        img {
          .w(70);
        }
      }
      .content {
        flex: 1;
        .name {
          .m-around(2,0,8,0);
          .h(14);
          .lh(14);
          .fs(14);
          color: rgb(7, 17, 27);
        }
        .desc {
          .mb(8);
        }
        .desc,
        .extra {
          .lh(10);
          .fs(10);
          color: rgb(147, 153, 159);
        }
        .extra {
          &.count {
            .mr(12);
          }
        }
        .price {
          font-weight: 700;
          .lh(24);
          .now {
            .mr(8);
            .fs(14);
            color: rgb(240, 20, 20);
          }
          .old {
            text-decoration: line-through;
            .fs(10);
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }
}
</style>

