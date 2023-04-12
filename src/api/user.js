import request from '@/utils/request'

// 用户相关模块

// 用户登录
export const login = data =>{
    return request({
    method: 'POST',
    url:  '/v1_0/authorizations',
    data
})
}