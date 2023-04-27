<template>
    <div class="search-result">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
        </van-list>
    </div>
  </template>
  <script>
  import { getSearchResult } from '@/api/search'
  export default {
    name: 'SearchResult',
    components: {},
    props: {
      searchText:{
        type: String,
        required: true
      }
    },
    data () {
      return {
        list: [],
        loading: false,
        finished: false,
        page: 1,
        per_page: 20
      }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
        async onLoad() {
          try {
            // 1.请求获取数据
            const { data } = await getSearchResult({
              page: this.page, // 页数，不传默认为1
              per_page: this.per_page,  // 每页数量，不传由后端决定
              q: this.searchText  // 搜索关键词
            })
            console.log(data)
            // 2.将数组添加到数组列表中
            const { results } = data.data
            this.list.push(...results)
            // 3.将本次加载中的loading关闭
            this.loading = false
            // 4.判断是否还有数据
            //   如果有则更新获取下一个数据的页码
            if(results.length){
              this.page ++
            }else{
              //   如果没有，则将加载状态finished设为结束
              this.finished = true
            }
          } catch (err) {
            this.$toast('数据获取失败，请稍后重试')
          }
        
        },
    }
  }
  </script>
  <style scoped lang="less"></style>
