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
    <!-- <a :href="file" ref="aele"></a> -->
    <iframe :src="file" width="100%" height="100%" ref="iframe" id="iframe" class="iframe" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: "preview",
  data() {
    return {
      file: ""
    };
  },
  created() {
    this.file = this.$route.query.url;
    // console.log(document.getElementById('iframe').contentWindow);
    
    // var x = this.$refs["iframe"][0].contentWindow.document.body
    // var y = x.contentWindow || x.contentDocument;
    // console.log(x)
    // y.body.style.backgroundColor = "red";
  },
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../assets/less/navBar.less");
.container {
  height: 100%;
}
.iframe {
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    justify-items: center;
  }
}
</style>