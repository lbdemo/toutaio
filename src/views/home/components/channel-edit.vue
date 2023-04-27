<template>
    <div class="channel-edit">
        <van-cell :border="false">
            <div slot="title" class="title-text">我的频道</div>
            <van-button
                type="danger"
                size="mini"
                plain 
                round
                class="edit-btn"
                @click="changeEdit"
                >{{isEdit ? '完成' : '编辑 ' }}
                </van-button>
        </van-cell>
        <van-grid class="my-grid" :gutter="20">
            <van-grid-item 
            class="grid-item" 
            v-for="(channel,index) in MyChannels" 
            :key="index" 
            :class="{ active : active=== index}"
            @click="onMyChannelClick(channel,index)">
            <van-icon 
            slot="icon" 
            v-show="isEdit && !fiexChannels.includes(channel.id)" 
            name="clear" ></van-icon>
            <!-- 通过设置动态类名高亮 -->
            <span slot="text" class="text">{{ channel.name }}</span>
        </van-grid-item>
        </van-grid>
       
        <!-- 频道推荐 -->
        <van-cell :border="false">
            <div slot="title">频道推荐</div>
        </van-cell>
        <van-grid :gutter="20" class="recommend-grid">
            <van-grid-item 
            icon="plus"
            class="grid-item" 
            v-for="(channel,index) in recommendChannels" 
            :key="index" 
            :text="channel.name" 
            @click="onAddChannel(channel)"/>
        </van-grid>
    </div>
  </template>
  <script>
  import { getAllChannels,addUserChannels,deleteUserChannels } from '@/api/channel'
  import { mapState } from 'vuex'
  import { setItem } from '@/utils/storage'

  export default {
    name: 'ChannelEdit',
    components: {},
    props: {
        MyChannels:{
            type:Array,
            required:true
        },
        active:{
            type:Number,
            required:true
        }
    },
    data () {
      return {
        allChannels:[],
        isEdit: false, //控制编辑状态的显示
        fiexChannels: [0,6] //固定不允许删除的频道的id
      }
    },
    computed: {
        // 计算属性会观测内部数据的变化
        // 一旦数据发生了变化，计算属性也要重新计算
        recommendChannels(){
            // const channels = [] 
            // this.allChannels.forEach(channel=>{
            //     //find 遍历数组，找到满足条件的元素项
            //     const res = this.MyChannels.find(MyChannel=>{
            //         return MyChannel.id ===channel.id
            //     })
            //     //如果我的频道里不包括该频道项，则收集到推荐频道中
            //     if(!res){
            //         channels.push(channel)
            //     }
            // })
            // return channels
            return this.allChannels.filter(channel =>{
                //数组的 filter 方法：遍历数组，把符合条件的元素存储到新数组
                return !this.MyChannels.find(MyChannel =>{
                    //数组的 find 方法：遍历数组，把符合条件的 第一个元素返回
                    return MyChannel.id === channel.id
                })
            })
        },
        ...mapState(['user']),
    },
    watch: {},
    created () {
        this.loadAllChannels()
    },
    mounted () {},
    methods: {
        async loadAllChannels(){
            try {
                const { data } = await getAllChannels()
                this.allChannels = data.data.channels
                console.log(this.allChannels)
            } catch (err) {
                this.$toast('数据请求失败')
            }
           
        },
        // 添加频道
        async onAddChannel( channel ){
        this.MyChannels.push(channel)
        // 数据持久化
        if(this.user){
            // 登录，把数据请求接口放到线上
            try {
                await addUserChannels({
                id: channel.id,
                seq: this.MyChannels.length
            })
            } catch (err) {
                this.$toast('保存失败，请稍后重试')
            }
        }else{
            // 未登录，把数据存储到本地
            setItem('TOUTIAO_CHANNELS',this.MyChannels)
        }
        
        
    },
    changeEdit(){
        this.isEdit = !this.isEdit
    },
    onMyChannelClick( channel,index ){
        // 编辑状态，删除频道
        // 非编辑状态，进入频道
        if(this.isEdit){
            if(this.fiexChannels.includes( channel.id )){
                return 
            }
            if( index <= this.active){
                this.$emit('update-active',this.active-1,true)
            }
            // 参数1：起始位置
            // 参数2：删除个数
            this.MyChannels.splice(index,1)

            // 执行数据持久化方法
            this.deleteChannel(channel)
        }else{
            this.$emit('update-active',index,false)
        }
    },


    // 持久化删除
    async deleteChannel(channel){
        if(this.user){
            // 已登录，将数据持久化到线上
            try {
                await deleteUserChannels(channel.id)
            } catch (err) {
                this.$toast('操作失败，请稍后重试')
            }
        }else{
            // 未登录，把数据存储到本地
            setItem('TOUTIAO_CHANNELS',this.MyChannels)
        }
    }
    },
    
  }
  </script>
  
  <style scoped lang="less">
.channel-edit{
padding: 42px 0;
.title-text{
    font-size: 16px;
    color: #333;
}
/deep/.my-grid{
    .van-grid-item__icon-wrapper{
        position: unset;
    }
    .active{
        color: #f85959;
    }
    .grid-item{
        .text {
            font-size: 14px;
        }
        .van-icon-clear{
            position: absolute;
            right: -5px;
            top: -5px;
            font-size: 15px;
            z-index: 2;
            color: #cacaca;
        }
    }
}
.edit-btn{
    width: 52px;
    height: 24px;
    font-size: 13px;
    color: #f85959;
    border: 1px solid #f85959;
}
/deep/.grid-item{
    height: 43px;
    width: 80px;
    .van-grid-item__content{
        white-space: nowrap;
        background-color: #f4f5f6;
        .van-grid-item__text{
            font-size: 14px;
            color: #222;
            margin-top: 0;
        }
    }
}
/deep/.recommend-grid{
    .van-grid-item__content{
        flex-direction: row;
        .van-icon-plus{
            font-size: 14px;
            margin-right: 3px;
        }
        .van-grid-item__text{
            margin-top: 0;
        }
    }
}

}
</style>