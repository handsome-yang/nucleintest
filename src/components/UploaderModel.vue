<template>
  <div class="file-list">
    <van-grid :column-num="3" square :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(file,index) in fileList"
        :key="index"
        icon="description"
        :text="file.name"
      />
      <!-- <van-grid-item> -->
        <div id="picker-file">上传附件</div>
      <!-- </van-grid-item> -->
    </van-grid>
    
  </div>
</template>

<script>
export default {
  props:{
    fileList:Array
  },
  data() {
    return {

    }
  }
};
</script>
<style lang="less" scoped>
#picker-file{
  float: left;
  margin-top: 10Px;
  padding: 20px;
}
.file-list {
  .grid-item {
    /deep/ .van-grid-item__content--center {
      justify-content: space-between;
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