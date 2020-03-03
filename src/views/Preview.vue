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
    <a :href="file" ref="aele"></a>
  </div>
</template>

<script>
export default {
  name: "preview",
  data() {
    return {
      file:''
    }
  },
  created() {
    this.file = this.$route.query.url
  },
  mounted() {
    console.log(this.$refs['aele'])
    this.$refs['aele'].click()
  },
  methods:{
    onClickLeft(){

    }
  }
};
</script>
<style lang="less" scoped>
</style>