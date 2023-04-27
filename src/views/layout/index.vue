<template>
    <div class="layout-container">
        <!-- 子路由出口 -->
        <router-view></router-view>
        <!-- 标签导航栏 -->
        <van-tabbar class="layout-tabbar" v-model="active" route>
            <van-tabbar-item to="/">
                <span class="text">首页</span>
                <i slot="icon" class="iconfont icon-shouye"></i>
            </van-tabbar-item>
            <van-tabbar-item to="/question">
                <span class="text">问答</span>
                <i slot="icon" class="iconfont icon-wenda"></i>
                </van-tabbar-item>
            <van-tabbar-item to="/video">
                <span class="text">视频</span>
                <i slot="icon" class="iconfont icon-shipin"></i>
            </van-tabbar-item>
            <van-tabbar-item to="/my">
                <span class="text">{{ $store.state.user ? '我的' : '未登录'  }}</span>
                <i slot="icon" class="iconfont icon-wode"></i>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
export default {
    name:'LayoutIndex',
    data (){
        return{
            active: 'home',
        }
    },


}
</script>
<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    i.iconfont {
      font-size: 20px;
    }
    span.text {
      font-size: 10px;
    }
  }
}
</style>