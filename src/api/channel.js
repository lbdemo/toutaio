/**
 * 频道请求模块
 */
import request from '@/utils/request' 
//请求频道列表

export const getAllChannels = () =>{
 return request({
    method:'GET',
    url: '/v1_0/channels',
 })
}

//添加用户列表
export const addUserChannels = channel =>{
   return request({
      method:'PATCH',
      url: '/v1_0/user/channels',
      data:{
         channels:[channel]
      }
   })
  }

// 删除指定用户频道
export const deleteUserChannels = channelId =>{
   return request({
      method:'DELETE',
      url: `/v1_0/user/channels/${ channelId }`,
   })
  }