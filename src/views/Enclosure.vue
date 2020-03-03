<template>
  <div class="container">
    <van-nav-bar
      title="附件"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
      class="title-style"
      style=" background-color: #5d8eec;"
    />
    <ul>
      <li class="list-item" v-for="(fileItem,fileIndex) in fileList" :key="fileIndex">
        <div class="left"><van-icon class="icon" name="column" size="40" /></div>
        <div class="right">
          <p>{{fileItem.fileName}}</p>
          <p>{{fileItem.fileSize+'kb'}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {getFileList} from '@/http/http'
export default {
  data() {
    return {
      fileList:[{
        fileName:'xxx.doc',
        fileSize:'128kb'
      }]
    };
  },
  created() {
    this['currentUser'] = this.$route.query;
    let params = {
      token:this['currentUser'].localToken,
      applicationCode:this['currentUser'].appId
    }

    getFileList(params).then(res => {
      console.log('====================================');
      console.log(res);
      console.log('====================================');
      let fileInfo = res.reduce((_arr,currentItem) => [..._arr,{fileName:currentItem.filePath.substring(currentItem.filePath.lastIndexOf('/')+1),fileSize:currentItem.size}],[])
      this.fileList = fileInfo
    })
  },
  methods:{
    onClickLeft(){
      if(this.currentUser.appId){
        //  this.$router.push({path:'/apply',query:{appId:this['currentUser'].appId}})
        this.$router.back(-1)
      }else{
        this.$router.push('/')
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url('../assets/less/navBar.less');
.list-item{
  width: 100%;
  height: 80px;
  background-color:white;
  border-bottom: 1px solid #ebedf0;
  display: flex;
  flex-direction: row;
  font-size: 24px;
  .left{
    flex:1;
    display: flex;
    .icon{
      margin: auto;
    }
  }
  .right{
    flex: 5;
    display: flex;
    flex-direction: column;
    p{
      flex: 1;
      margin: 0;
    }
  }
}
</style>