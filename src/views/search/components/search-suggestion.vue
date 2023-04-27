<template>
    <div class="search-suggestion">
      <van-cell 
      v-for="(text,index) in suggestions"
      :key="index"
      icon="search"
      @click="$emit('search',text)"> 
      <div slot="title" v-html="highlight(text)"></div> 
      </van-cell>
    </div>
    
  </template>
  <script>
  import { getSearchSuggestions } from '@/api/search'
  import { debounce } from 'lodash'
  export default{
    name: 'SearchSuggestion',
    components: {},
    props: {
      searchText:{
        type: String,
        required: true,
      }
    },
    data () {
      return {
        suggestions:[],
      }
    },
    computed: {},
    watch: {
      searchText:{
        // watch 侦听器的另一种写法
        // 当searchText发生变化时，会执行handler函数
        // handler 是固定名称
        // immediate可以让网页打开时就触发一次handler函数
        // debounce 函数是lodash工具库的一个防抖函数
        handler:debounce(function(value){
          this.loadSearchSuggestions(value)
        },300),
        immediate: true
      }
    },
    created () {},
    mounted () {},
    methods: {
      async loadSearchSuggestions(value){
        try {
          const { data } = await getSearchSuggestions(value)
          this.suggestions = data.data.options 
          console.log(this.suggestions)
        } catch (err) {
          this.$toast('搜索失败，请稍后重试')
        }
       
      },
      // 让匹配字段高亮的函数highlight
      highlight(text){
         // 正则表达式中的一切内容都会当做字符串使用，所以replace里不能直接写带变量的正则表达式
         // 这里可以 new RegExp 方式根据字符串创建一个正则表达式
         // RegExp 是原生 JavaScript 的内置构造函数
         // 参数1：字符串，注意，这里不要加 //
         // 参数2：匹配模式，g 全局，i 忽略大小写
        const highlightStr = `<span class="active">${ this.searchText }</span>`
        const reg = new RegExp(this.searchText,'gi')
        return (text || '').replace(reg,highlightStr)
      }
    }
  }
  </script>
  
  <style scoped lang="less">
.search-suggestion{
/deep/ span.active{
color: #3296fa;
}
}
</style>
