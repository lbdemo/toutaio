import Vue from 'vue'
import Vuex from 'vuex'
import {setItem,getItem} from '@/utils/storage.js'

Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    //存储用户相关信息，例如身份令牌token等数据
    user: getItem(TOKEN_KEY),
  },
  mutations: {
    setUser(state,data){
      state.user = data
      //本地存储  持久化token
      setItem(TOKEN_KEY,state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
