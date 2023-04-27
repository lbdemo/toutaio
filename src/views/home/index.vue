<template>
    <div class="home-container">

        


        <!-- 头部搜索栏 -->
        <van-nav-bar id="page-nav-bar" fixed >
            <van-button
            class="search-btn" 
            slot="title" 
            size="small" 
            type="info" 
            round 
            icon="search"
            to="/search">搜索</van-button>
        </van-nav-bar>
        <!-- 频道tab栏 -->
        <van-tabs class="channel-tabs" v-model="active" animated>
            <van-tab 
            :title="channel.name" 
            v-for="channel in channels"
            :key="channel.id
            ">
            <!-- 渲染文章列表组件 -->
                <article-list :channel="channel"></article-list>
            </van-tab>
            <div slot="nav-right" class="placeholder"></div>
            <div slot="nav-right" 
            class="hamburger-btn"
            @click="showPopup"
            > 
                <i  class="iconfont icon-gengduo"></i>
            </div>
        </van-tabs>


        <!-- 频道编辑弹出层 -->     
        <van-popup v-model="isChannelEditShow" 
        position="bottom" 
        closeable
        close-icon-position="top-left" 
        :style="{ height: '100%' }"
        >
        <ChannelEdit 
        :MyChannels="channels" 
        :active="active"
        @update-active="onUpdateActive">
        </ChannelEdit>
        </van-popup>
    </div>
</template>
<script>
import {getUserChannels} from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

    export default {
        name: "HomeIndex",
        components:{
            ArticleList,
            ChannelEdit
        },
        computed:{
            ...mapState(['user']),
        },
        data(){
            return{
                active: 0,
                channels:[],
                isChannelEditShow:false
            }
        },
        created(){
            this.loadChannels();
        },
        methods:{
            async loadChannels(){
                try {
                    let channels = [];
                    if(this.user){
                        // 已登录，获取线上的频道数据
                        const { data } = await getUserChannels();
                        channels = data.data.channels;
                        console.log(this.channels)
                    }else{
                        // 未登录，获取默认或者本地的数据
                        const localChannels = getItem('TOUTIAO_CHANNELS');
                        if(localChannels){
                            channels = localChannels;
                        }else{
                            const { data } = await getUserChannels();
                            channels = data.data.channels;
                        }
                        
                    }
                    this.channels = channels
                } catch (err) {
                    this.$toast('请求用户频道失败')
                }
            },
            showPopup() {
                this.isChannelEditShow = true;
                },
            onUpdateActive(index,isChannelEditShow){
                this.active = index
                this.isChannelEditShow = isChannelEditShow
            }
        }
    }
</script>

<style lang="less" scoped>
.home-container {
    padding-bottom: 50px;
    padding-top: 90px;
    .van-nav-bar__title{
        max-width: unset;
    }
    .search-btn {
        width: 222px;
        height: 32px;
        background-color: #5babfb;
        border: none;
        font-size: 14px;
        .van-icon {
            font-size: 18px;
        }
    }
    /deep/.channel-tabs {
        
        .van-tabs__wrap {
            position: fixed;
            top: 46px;
            left: 0;
            right: 0;
            height: 42px;
            z-index: 1;
        }
        .van-tab{
            min-width: 100px;
            border-right: 1px solid #eef1f5;
            font-size: 15px;
            color: #777;
        }
        .placeholder{
            width: 30px;
            height: 45px;
            flex-shrink: 0;
        }
        .hamburger-btn {
            position: fixed;
            right: 0;
            width: 30px;
            height: 45px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            opacity: 0.902;
        }
        .van-tab--active {
            color: #222121;
        }
        .van-tabs__nav--line{
            padding-bottom: 0px;
        }
        .van-tabs__line{
            background-color: #5babfb;
            width: 30px !important;
            height: 4px;
            bottom: 4px;
        }
    }
}
</style>