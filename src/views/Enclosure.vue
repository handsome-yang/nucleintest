<template>
  <div class="container">
    <ul v-if="!isShowFile">
      <li class="list-item" v-for="(fileItem,fileIndex) in fileList" :key="fileIndex" @click="openFile(fileItem.fileUrl)"  >
        <div class="left"><van-icon class="icon" name="column" size="40" /></div>
        <div class="right">
          <p>{{fileItem.fileName}}</p>
          <p>{{fileItem.fileSize+'kb'}}</p>
        </div>
      </li>
    </ul>
      <iframe v-if="isShowFile" :src="file" width="100%" height="100%" ref="iframe" id="iframe" class="iframe" frameborder="0"></iframe>
    
  </div>
</template>
<script>
import Preview from '@/views/Preview'
import {getFileList} from '@/http/http'
export default {
  props:['currentUser'],
  components:{
    Preview
  },
  data() {
    return {
      fileList:[{
        fileName:'xxx.doc',
        fileSize:'128kb'
      }],
      file:'',
      isShowFile:false
    };
  },
  created() {
    let params = {
      token:this['currentUser'].localToken,
      applicationCode:this['currentUser'].appId,
    }
    getFileList(params).then(res => {
      let fileInfo = res.reduce((_arr,currentItem) => [..._arr,{fileName:currentItem.filePath.substring(currentItem.filePath.lastIndexOf('/')+1),fileSize:currentItem.size,fileUrl:currentItem.filePath.substring(1)}],[])
      this.fileList = fileInfo;
    })
  },
  methods:{
    openFile(path){
      let baseUrl = ''
      if(process.env.NODE_ENV == "development"){
        baseUrl = "http://zzz.ngrok.ibanzhuan.cn/Staff_management_app"
      }else if(process.env.NODE_ENV == "production"){
        baseUrl = "https://iot.xiaofuonline.com/Staff_management_app"
      }
      this.isShowFile = true;
      this.file = baseUrl + path;
   
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