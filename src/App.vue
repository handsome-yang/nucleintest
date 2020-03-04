<template>
  <div id="app">
    <router-view ref="currentView" v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name:'App',
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return {
      isRouterAlive :true,
      isLoad:false
    }
  },
  methods: {
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true;
        this.isLoad = true
        sessionStorage.setItem('isLoad',true)
      })
      
    }
  },
}
</script>
<style lang="less">
  html,body,#app{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
  #app{
    background-color: #f7f8fa;
  }
 
</style>