<template>
    <iframe :src="file" width="100%" height="100%" ref="iframe" id="iframe" class="iframe" frameborder="0"></iframe>
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
  },
  mounted() {},
  methods: {

  }
};
</script>
<style lang="less" scoped>
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