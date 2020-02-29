<template>
  <div>
    <van-card
      class="list-item"
      num="2"
      desc="信息"
      :title="fileSize"
      thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
    />
  </div>
</template>
<script>
import {getFileList} from '@/http/http'
export default {
  data() {
    return {
      fileSize:''
    };
  },
  created() {
    console.log(this.$route.query)
    let params = {
      token:this.$route.query.localToken,
      applicationCode:this.$route.query.appId
    }

    getFileList(params).then(res => {
      console.log('====================================');
      console.log(res);
      console.log('====================================');
    })
  },
};
</script>
<style lang="less" scoped>
.list-item{
  .van-card__thumb{}
}
</style>