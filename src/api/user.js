import request from '@/utils/request'
// import store from '@/store'

// 用户相关模块

// 用户登录
export const login = data =>{
    return request({
    method: 'POST',
    url:  '/v1_0/authorizations',
    data
})
}

// 发送短信验证码
export const sendSms = mobile =>{
    return request({
        method:'GET',
        url: `/v1_0/sms/codes/${mobile}`, 
    })
}

// 获取用户自己的信息
export const getUserInfo = () =>{
    return request({
        method:'GET',
        url:  '/v1_0/user' 
        // headers :{
        //     Authorization:`Bearer ${store.state.user.token}`
        // }
    })
}
export const getUserChannels = () =>{
    return request({
        method:'GET',
        url:  '/v1_0/user/channels' 
        // headers :{
        //     Authorization:`Bearer ${store.state.user.token}`
        // }
    })
}