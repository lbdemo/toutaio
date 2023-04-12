<template>
  <div id="app">
    <i class="iconfont icon-shouye"></i>
    <router-view/>
    <van-button type="primary">主要按钮</van-button>
    <div class="box"></div>
  </div>
  
</template>

<style lang="less">
.box {
  width: 200px;
  height: 200px;
  background-color: palegreen;
}


</style>
