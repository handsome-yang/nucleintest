<template>
  <div class="file-list">
    <van-grid :column-num="3" square :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(file,index) in fileList"
        :key="index"
      > 

        <van-icon class="file-icon" size="35" name="description" />
        <van-icon @click="send(file.name,file.id)" class="clear-file" size="24" name="close" />
        <p class="over-auto">{{file.name}}</p>
      </van-grid-item>
      <!-- <van-grid-item> -->
        <div id="picker-file">上传附件</div>
      <!-- </van-grid-item> -->
    </van-grid>
    
  </div>
</template>

<script>
export default {
  props:{
    fileList:Array,
  },
  data() {
    return {

    }
  },
  created() {
  },
  methods: {
    send(name,id){
      // this.fileList.forEach((item,index) =>{
      //   if(item.name === name){
      //     this.fileList.splice(index,1)
      //   }
      // })
      this.$emit("clearFile",name,id)
  }
  },
};
</script>
<style lang="less" scoped>
#picker-file{
  float: left;
  margin-top: 10Px;
  padding: 10Px;
}
.file-list {
  .grid-item {
    /deep/ .van-grid-item__content--center {
      justify-content: space-between;
    }
    .clear-file{
      position:absolute;
      right:0;
      top:0;
    }
    .over-auto{
      width:100%;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
  }
}
/deep/ .webuploader-pick {
  background-color: #07c160;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  div{
    width: 300Px !important;
    height: 300Px !important;
  }
}
</style>