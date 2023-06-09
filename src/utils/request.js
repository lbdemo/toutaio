import axios from 'axios'
import store from '@/store'

const request = axios.create({
    baseURL: "http://toutiao.itheima.net/",
})
//toutiao.itheima.net/

// 请求拦截器

// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    // config :本次请求的请求配置对象
    const { user } = store.state 
    if(user && user.token ){
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

//   响应拦截器



export default request