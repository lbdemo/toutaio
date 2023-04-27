<template>
    <div>
        <!-- 导航栏 -->
        <van-nav-bar id="page-nav-bar"
            title="登录1"
            >
            <template #left>
              <van-icon name="arrow-left" size="18" @click="$router.back()"/>
            </template>
          </van-nav-bar>
        <!-- 登录表单 -->
            <van-form @submit="onSubmit" ref="loginForm">
            <van-field
                v-model="user.mobile"
                name="mobile"
                placeholder="请输入手机号"
                :rules=userFormRules.mobile
                type="number">
                <i slot="left-icon" class="iconfont icon-shouji"></i>
            </van-field>
            <van-field
                v-model="user.code"
                name="code"
                placeholder="请输入验证码"
                :rules=userFormRules.code
                type="number">
                
                <template #button>
                    <van-count-down v-if="isCountDownShow" :time="1000 * 10" format="ss s" @finish="isCountDownShow=false"/>
                    <van-button v-else native-type="button" id="sent-btn" round size="small" type="default" @click="onSendSms">
                      获取验证码
                    </van-button>
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
  import {login,sendSms} from "@/api/user"

  export default {
    name: 'LoginIndex',
    components: {},
    props: {},
    data () {
      return {
        user: {
          mobile : "",
          code : "",
        },
        userFormRules: {
          mobile: [{ required: true,
                     message: '手机号不能为空',
                     },
                    { pattern: /^1[3/5/7/8/9]\d{9}$/,
                      message: '格式错误'}],
          code:  [{ required: true,
                     message: '验证码不能为空',
                     },
                    { pattern: /^\d{6}$/,
                      message: '格式错误'}],
        },
        isCountDownShow : false
      }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
      async onSubmit (){
        //1.获取表单数据
        const user = this.user
        //2.表单验证
        // 在组件中必须使用this.$toast来调用Toast组件
        this.$toast.loading({
            message: '努力中...',
            forbidClick: true, //禁用背景点击
             duration:0   //持续时间，默认是2000，如果为0则一直持续，直到下一个toast方法出现
          });   


          //3.提交表单请求登录
        try{
          const res = await login(user);
          this.$toast.success('登录成功');
          console.log(res)
          this.$store.commit('setUser',res.data.data)
          this.$router.back();
        }
        catch(err){
          if(err.response.status===400)
          this.$toast.fail('手机号或验证码错误');
          else {
          this.$toast.fail('登陆失败，请稍后重试');
        }
        } 
        //4.根据请求响应结果处理后续操作
        
      },
      async onSendSms (){
        console.log(111)
        //1.校验手机
        try {
          await this.$refs.loginForm.validate('mobile') 
          console.log('验证通过')
        } catch (err) {
          return console.log('校验失败',err)
        }
        //2.校验通过，显示倒计时
        this.isCountDownShow = true

        try {
          //3.发送验证码
        await sendSms(this.user.mobile)
        console.log('22222')
        this.$toast('发送成功')
        } catch (err) {
          this.isCountDownShow = false 
          if(err.response.status===429)
             this.$toast('发送太频繁了，请稍后重试')
          else
             this.$toast('发送失败')
        }
        
      }
    }
  }
  </script>
  
  <style scope lang="less">
  input:-internal-autofill-selected{
    background-color: #fff!important;
  }
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