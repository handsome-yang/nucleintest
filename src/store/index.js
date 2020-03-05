import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageTitle:'',
    rightText:'',
    isOrg:Number,
    isFil:Number,
    localToken:String,
    userInfo:Object
  },
  mutations: {
    changeTitle(state,text){
      state.pageTitle = text;
    },
    changeRightTitle(state,text){
      state.rightText = text;
    },
    changeOrgState(state,val){
      state.isOrg = val;
    },
    changeIsFil(state,val){
      state.isFil = val
    },
    changeUserInfo(state,val){
      state.userInfo = val
    },
    // 设置本机token
    setLocalToken(state,localToken){
      state.localToken = localToken
    }
  },
  actions: {
  },
  modules: {
  }
})
