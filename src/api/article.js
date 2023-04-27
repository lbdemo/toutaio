/**
 * 文章请求模块
 */
import request from '@/utils/request' 
//请求文章列表

export const getArticles = params =>{
 return request({
    method:'GET',
    url: '/v1_0/articles',
    params
 })
}

