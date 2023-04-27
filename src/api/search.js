/**
 * 搜索请求模块
 */
import request from '@/utils/request' 

//请求联想建议列表

export const getSearchSuggestions = q =>{
 return request({
    method:'GET',
    url: '/v1_0/suggestion',
    params:{
        q
    }
 })
}

export const getSearchResult = params =>{
    return request({
       method:'GET',
       url: '/v1_0/search',
       params
    })
   }