<template>
    <div class="my-container">
        <div class="header user-info" v-if="user">
            <div class="base-info">
                <div class="left">
                    <van-image
                    round
                    fit="cover"
                      class="user-img"
                        :src=" userInfo.photo "
                    />
                    <div class="name">{{ userInfo.name }}</div>
                </div>
                <div class="right">
                    <van-button class="set-btn" size="mini" round>编辑资料</van-button>
                </div>
            </div>
            <div class="data-stats">
                <div class="data-item">
                    <span class="text">头条</span>
                    <span class="count">{{ userInfo.art_count }}</span>
                </div>
                <div class="data-item">
                    <span class="text">关注</span>
                    <span class="count">{{ userInfo.follow_count }}</span>
                </div>
                <div class="data-item">
                    <span class="text">粉丝</span>
                    <span class="count">{{ userInfo.fans_count }}</span>
                </div>
                <div class="data-item">
                    <span class="text">获赞</span>
                    <span class="count">{{ userInfo.like_count }}</span>
                </div>
            </div>
        </div>
        <div class="header not-login" v-else>
            <div class="login-btn" @click="$router.push('/login')">
                <img src="@/assets/mobile.png" alt="">
                <div class="login-text">登录/注册</div>
            </div>
        </div>
        
        <!-- 导航 -->
        <van-grid :column-num="2" class="grid-nav" clickable>
            <van-grid-item class="grid-item">
                <i slot="icon" class="iconfont icon-shoucang"></i>
                <span slot="text" class="slot-text">收藏</span>
            </van-grid-item>
            <van-grid-item class="grid-item">
                <i slot="icon" class="iconfont icon-lishi"></i>
                <span slot="text" class="slot-text">历史</span>
            </van-grid-item>
        </van-grid>
        <div class="other">
            <van-cell title="消息通知" class="jianxi" is-link/>
            <van-cell title="燕子同学" is-link/>
            <van-cell v-if="user" clickable title="退出登录" class="exit-btn" @click="onLoginOut"/>
        </div>
        

    </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
    export default {
        name: "MyIndex",
        data(){
            return{
                userInfo:{}, //用户信息
            }
        },
        computed: {
            ...mapState(['user'])
        },
        created(){
            if(this.user)
            this.loadUserInfo();
        },
        methods :{
            onLoginOut(){
                this.$dialog.confirm({
                    title: '退出？',
                    })
                    .then(() => {
                        this.$store.commit('setUser',null)
                    })
                    .catch(() => {
                        console.log(222)
                    });
            },
            async loadUserInfo(){
                try {
                    const { data }= await getUserInfo();
                    console.log(data)
                    this.userInfo = data.data
                } catch (err) {
                    console.log('获取数据失败')
                }
            }
        }
    }
</script>

<style lang="less" scoped>
.header{
    height: 181px;
    background-image: url("~@/assets/banner.png");
    background-size: cover;
}
.not-login{
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        img {
        width: 66px;
        height: 66px;
    }
    .login-text {
        font-size: 20px;
        color: #fff;
    }
    }
}
.user-info {
    .base-info {
        height: 116px;
        padding: 38px 16px 11px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
            display: flex;
            align-items: center;
            .user-img {
                width: 66px;
                height: 66px;
                margin-right: 11px;
                border: 2px solid #fff;
            }
            .name{
                font-size: 15px;
                color: #fff;
            }
        }
        .right {
            .set-btn{
                width: 60px;
            }
        }
    }
    .data-stats {
        display: flex;
        .data-item {
            flex: 1;
            height: 66px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #fff;
            .text{
                font-size: 18px;
            }
            .count{
                font-size: 18px;
            }
        }
    }
}
.grid-nav{
    margin-bottom: 5px;
    .grid-item{
        height: 75px;
        .iconfont{
            font-size: 22px;
        }
        .slot-text{
            font-size: 14px;
        }
        .icon-shoucang{
            color: #eb5253;
        }
        .icon-lishi {
            color: #ff9d1d;
        }
    }
}
.other {
    .jianxi{
        margin-bottom: 1px;
    }
    .exit-btn {
        text-align: center;
        color: #d66969;
        margin-top: 5px;
        height: 50px;
    }
}

</style>