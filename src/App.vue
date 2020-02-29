<template>
  <div id="app">
    
    <router-view ref="currentView" />
  </div>
</template>

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