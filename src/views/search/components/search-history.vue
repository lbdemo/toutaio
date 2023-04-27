<template>
    <div class="search-history">
        <van-cell title="搜索历史">
            <div v-if="isDeleteShow">
                <span @click="$emit('clearHistotys')">全部删除</span>
                &nbsp;
                <span @click="isDeleteShow = false">完成</span>
            </div>
            <van-icon v-else name="delete" @click="isDeleteShow = true"/>
        </van-cell>
        <van-cell 
        v-for="(list,index) in searchHistorys"
        :key="index"
        :title="list"
        @click="OnSearchItemClick(list,index)">
            <van-icon name="close" v-if="isDeleteShow" />
        </van-cell>
    </div>
  </template>
  <script>
  export default {
    name: 'SearchHistory',
    components: {},
    props: {
        // Prop 数据
        // Prop 是受父组件影响的
        //   如果是简单数据类型（数字，字符串，布尔值）绝对不能修改
        //   即使改了也不能传给父组件
        //
        //   如果是引用数据类型（数组，对象）
        //    可以修改，改完父组件中的数据也发生变化，例如 [].push(xxx),  对象.xxx=xxx
        //    不可以赋值，例如xxx=[]

        searchHistorys:{
            type: Array,
            required: true
        }
    },
    data () {
      return {
        isDeleteShow: false
      }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
        OnSearchItemClick(list,index){
            if(this.isDeleteShow){
                // 删除状态，点击删除历史记录
                this.searchHistorys.splice(index,1)
            }else{
                // 非删除状态，点击进入搜索
                this.$emit('search',list)
            }
        }
    }
  }
  </script>
  
  <style scoped lang="less"></style>
