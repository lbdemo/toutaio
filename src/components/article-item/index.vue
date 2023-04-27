<template>
    <div class="article-item">
        <van-cell-group>
            <van-cell>
                <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
                <div slot="label" class="label">
                    <div v-if="article.cover.type===3" class="cover-wrap" >
                        <div class="cover-item" 
                        v-for="(img,index) in article.cover.images"
                        :key="index">
                            <van-image 
                            :src="img"
                            fit="cover"
                            class="cover-item-img"
                            >
                            </van-image>
                        </div>
                    </div>
                    <div class="label-info-wrap">
                        <span>{{ article.aut_name }}</span>
                        <span>{{ article.comm_count }}评论</span>
                        <span>{{ article.pubdate | relativeTime}}</span>
                    </div> 
                </div>
                <van-image slot="default"
                class="right-cover"
                fit="cover"
                    v-if="article.cover.type===1"
                    :src="article.cover.images[0]"
                ></van-image>
            </van-cell>
        </van-cell-group>
    </div>
</template>
<script>
    export default {
        name:'ArticleItem',
        props :{
            article: {
                type: Object,
                required: true
            }
        },
        data(){
            return{
                
            }
        },
        methods :{

        }
    }
</script>
<style lang="less" scoped>
.title{
    font-size: 16px;
    color: #3a3a3a;

}
.van-cell__value{
    flex: unset;
    width: 136px;
    height: 83px;
    text-align: center;
}
.right-cover{
    width: 116px;
    height: 83px;
    
}
.label-info-wrap span{
    font-size: 11px;
    color: #b4b4b4;
    margin-right: 12px;

}

.van-image__img{
    display: inline-block;
}
.cover-wrap{
    display: flex;
    .cover-item{
        flex: 1;
        height: 73px;
        &:not(:last-child){
            padding-right: 2px;
        }
        .cover-item-img{
            width: 100%;
            height: 73px;
        }
}
}
</style>