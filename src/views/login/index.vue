<template>
    <div>
        <!-- 导航栏 -->
        <van-nav-bar id="page-nav-bar"
            title="登录"/>
        <!-- 登录表单 -->
            <van-form @submit="onSubmit">
            <van-field
            v-model="user.mobile"
                name="用户名"
                placeholder="请输入手机号">
                <i slot="left-icon" class="iconfont icon-shouji"></i>
            </van-field>
            <van-field
                v-model="user.code"
                name="验证码"
                placeholder="请输入验证码">
                <template #button>
                    <van-button id="sent-btn" round size="small" type="default">获取验证码</van-button>
                </template>
            <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
            </van-field>
            <div class="login-btn-wrap">
                <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
            </div>
            </van-form>
    </div>
    
  </template>
  <script>
  import {login} from "@/api/user"
  export default {
    name: 'LoginIndex',
    components: {},
    props: {},
    data () {
      return {
        user: {
          mobile : "",
          code : "",
        }
      }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
      async onSubmit (){
        const user = this.user
        try{
          const res = await login(user)
          console.log('登陆成功',res)
        }
        catch(err){
          if(err.response.status===400)
          console.log('手机号或验证码错误')
          else {
          console.log('登陆失败，请稍后重试',err)
        }
        } 
        
      }
    }
  }
  </script>
  
  <style scope lang="less">
  .iconfont {
    font-size: 37px;
  }
  #sent-btn{
    background-color: #ededed;
    width: 85px;
    height: 23px;
    line-height: 23px;
    font-size: 10px;
    color: #666;
  }
  .login-btn-wrap{
    padding: 23px 33px;
    .login-btn {
        background-color: #6db4fb;
        border: none;
    }
  }
  </style>