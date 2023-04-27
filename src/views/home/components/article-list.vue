<template>
    <div class="article-list">
      <!-- 当组件滚动到底部时，会触发 load 事件并将 loading 设置成 true。
      此时可以发起异步操作并更新数据，数据更新完毕后，将 loading 设置成 false 即可。
      若数据已全部加载完毕，则直接将 finished 设置成 true 即可。 -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <!-- <h4 slot="loosing">爱猪（づ￣3￣）づ╭❤～</h4>
        <h4 slot="loading">更爱你（づ￣3￣）づ╭❤～</h4> -->

        <!-- 释放提示 -->
        <template #loosing>
            <div>爱猪（づ￣3￣）づ╭❤～</div>
        </template>

        <!-- 加载提示 -->
        <template #loading>
            <div>更爱你（づ￣3￣）づ╭❤～</div>
        </template>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :error.sync="error"
            error-text="数据请求失败，点击重新加载"
            @load="onLoad"
            >
            <article-item 
            v-for="(article,index) in list" 
            :key="index"
            :article="article"
            ></article-item>
            
        </van-list>
      </van-pull-refresh>
      
    </div>
</template>
<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
    export default {
        name:'ArticleList',
        components:{
            ArticleItem
        },
        props:{
            channel:{
                type:Object,
                required: true,
            }
        },
        data(){
            return {
                list: [],
                error: false,
                loading: false, // 控制加载中loading的状态
                finished: false, // 控制加载结束的状态
                timestamp: null, // 请求获取下一页数据的时间戳
                isLoading: false // 控制下拉刷新的状态

            }
        },
        methods:{
            async onLoad() {
                try {
                // 1. 请求获取数据
                const { data } = await getArticles({
                    channel_id: this.channel.id,
                    timestamp: this.timestamp || Date.now(),//this.channel.pre_timestamp,
                    with_top:1
                });

                // 模拟随机失败的情况
                // if(Math.random() >=0.5){
                //     JSON.parse('wohfihodbvio')
                // }

                // 2. 把数据添加到 list 数组中
                const { results } = data.data
                this.list.push(...results)
                // 3. 设置本次加载中 loading 状态结束
                this.loading = false
                // 4. 判断数据是否加载结束
                if(results.length){
                    //更新获取下一页数据的时间戳
                    this.timestamp = data.data.pre_timestamp
                }else{
                    //没有数据了，将finished设为true，不在触发load事件
                    this.finished = true
                }
                } catch (err) {
                    //出现错误以后显示错误信息
                    this.error = true,
                    //请求失败后，load也要关闭
                    this.loading = false
                }
            },
            async onRefresh () {
                try {
                // 1. 请求获取数据
                const { data } = await getArticles({
                    channel_id: this.channel.id,
                    timestamp: Date.now(),// 获取的都是最新数据
                    with_top:1
                });
                // 2. 把数据添加到 list 数组的最前面
                const { results } = data.data
                this.list.unshift(...results)
                this.isLoading = false
                // 4. 判断数据是否加载结束
                if(results.length){
                    //更新获取下一页数据的时间戳
                    this.timestamp = data.data.pre_timestamp
                }else{
                    //没有数据了，将finished设为true，不在触发load事件
                    this.finished = true
                }
                } catch (err) {
                    //出现错误以后显示错误信息
                    this.error = true,
                    //请求失败后，load也要关闭
                    this.loading = false
                }
            }
        }
    }
</script>

<style lang="less" scoped>
.article-list{
    height: 79vh;
    overflow-y: auto;
}
</style>