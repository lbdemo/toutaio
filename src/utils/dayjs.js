import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

//配置使用相对时间 relativeTime 插件
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

//定义一个 vue 模板过滤器，然后就可以在任何一个组件的模板中使用了
//其实过滤器就相当于一个全局使用的方法，仅供模板使用
//参数1 ：过滤器名称
//参数2 ：过滤器函数
// 使用方法：{{ 表达式 | 过滤器名称 }}
Vue.filter('relativeTime',value =>{
return dayjs().to(dayjs(value))
})
