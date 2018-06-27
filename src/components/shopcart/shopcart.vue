<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left"></div>
      <div class="content-right">
        <div class="logo-wrapper">
          <div class="logo">
            <span class="icon-shopping_cart"></span>
          </div>
        </div>
        <div class="price"></div>
        <div class="desc"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style lang="less" scoped>
@import url('../../common/css/common.less');
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  .h(48);
  .content{
    display: flex;
    background: #141d27;
    .content-left{
      flex: 1;
    }
    .content-right{
      flex: 0 0 unit(105 / @scale, rem);
      .w(105);
    }
  }
}
</style>
