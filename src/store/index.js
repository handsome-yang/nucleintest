import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageTitle:'',
    rightText:'',
    isOrg:Number,
    localToken:String
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
