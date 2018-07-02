<template>
  <!-- eslint-disable max-len -->
  <div class="goods">
    <div class="menu-wrapper" v-if='goods[0]' ref="menuWrapper">
      <ul>
        <li v-for='(item,index) in goods' :key='index' class="menu-item" :class="{'current': currentIndex === index}" @click='selectMenu(index, $event)' ref='menuList'>
          <span class="text">
            <span v-show="item.type > 0" class="icon" :class='classMap[item.type]'></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref='foodsWrapper'>
      <ul>
        <li v-for='(item,itemIndex) in goods' :key='itemIndex' ref="foodsList" class="food-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFoodItem(food, $event)" v-for="(food,index) in item.foods" :key='index' class="food-item">
              <div class="icon">
                <img :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{ food.sellCount}}%
                  </span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show='food.oldPrice'>￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <s-cartcontrol @add='addFood($event)' v-if="food" :food='food'></s-cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <s-shopcart v-if="seller" ref='shopcart' :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :selectFoods='selectFoods'></s-shopcart>
    <s-food ref='sFood' @add="addFood" :food='selectFood'></s-food>
  </div>
</template>
<script>
import axios from "axios";
import BScroll from "better-scroll";
import shopCart from "components/shopcart/shopcart";
import cartcontrol from "components/cartcontrol/cartcontrol";
import sFood from "components/food/food";

const ERR_OK = 0;
export default {
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectFood: {}
    };
  },
  components: {
    "s-shopcart": shopCart,
    "s-cartcontrol": cartcontrol,
    "s-food": sFood
  },
  props: { seller: Object },
  computed: {
    currentIndex() {
      let self = this;
      for (let i = 0; i < self.listHeight.length; i += 1) {
        const height1 = self.listHeight[i];
        const height2 = self.listHeight[i + 1];
        if (!height2 || (self.scrollY >= height1 && self.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      /* eslint-disable arrow-parens */
      this.goods.forEach(good => {
        /* eslint-disable arrow-parens */
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  created() {
    const self = this;
    self.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    /* eslint-disable arrow-parens */
    axios.get("/api/goods").then(data => {
      if (data.data.errno === ERR_OK) {
        self.goods = data.data.data;
        self.$nextTick(() => {
          self.initScroll();
          self.calculateHeight();
        });
      }
    });
  },
  methods: {
    selectMenu(index, event) {
      /* eslint-disable no-underscore-dangle */
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs.foodsList;
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    selectFoodItem(food, event) {
      /* eslint-disable no-underscore-dangle */
      if (!event._constructed) {
        return;
      }
      this.selectFood = food;
      this.$refs.sFood.show();
    },
    addFood(target) {
      /* eslint-disable no-underscore-dangle */
      if (!event._constructed) {
        return;
      }
      this._drop(target);
    },
    _drop(target) {
      // 体验优化,异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    },
    initScroll() {
      let self = this;
      self.menuScroll = new BScroll(self.$refs.menuWrapper, {
        click: true
      });
      self.foodsScroll = new BScroll(self.$refs.foodsWrapper, {
        probeType: 3,
        click: true
      });
      /* eslint-disable arrow-parens */
      self.foodsScroll.on("scroll", pos => {
        self.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    calculateHeight() {
      let self = this;
      let foodList = this.$refs.foodsList;
      let height = 0;
      self.listHeight.push(height);
      for (let i = 0; i < foodList.length; i += 1) {
        let item = foodList[i];
        height += item.clientHeight;
        self.listHeight.push(height);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../common/css/common.less");

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
      .p-t-l(0, 12);
      .w(56);
      .h(54);
      .lh(14);
      .fs(12);
      &.current {
        position: relative;
        z-index: 10;
        .mt(-1);
        background: #fff;
        font-weight: 700;
        .text {
          .setNoLine();
        }
      }
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
          .bg_image("decrease_3");
        }
        &.discount {
          .bg_image("discount_3");
        }
        &.guarantee {
          .bg_image("guarantee_3");
        }
        &.invoice {
          .bg_image("invoice_3");
        }
        &.special {
          .bg_image("special_3");
        }
      }
      .text {
        display: table-cell;
        .w(56);
        text-align: center;
        vertical-align: middle;
        .setBottomLine(rgba(7, 17, 27, 0.1));
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
      .setBottomLine(rgba(0, 0, 0, 0.1));
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
          .m-around(2, 0, 8, 0);
          .h(14);
          .lh(14);
          .fs(14);
          color: rgb(7, 17, 27);
        }
        .desc,
        .extra {
          .lh(10);
          .fs(10);
          color: rgb(147, 153, 159);
        }
        .desc {
          .mb(8);
          .lh(12);
        }
        .extra {
          .count {
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
        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          .b(12);
        }
      }
    }
  }
}
</style>

