<template>
  <div class="container">
    <van-nav-bar
      title="核酸检测"
      fixed
      @click-left="onClickLeft"
      class="title-style"
      style=" background-color: #5d8eec;"
    />
    <van-grid :column-num="3" clickable>
      <van-grid-item
        @click="$router.push(item.url)"
        class="dejan-grid-item"
        v-for="item in itemList"
        :key="item.icon"
      >
        <van-icon size="26" class="iconfont" class-prefix="nucleintest" :name="item.icon" />
        <span>{{item.name}}</span>
      </van-grid-item>
    </van-grid>

  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      itemList: [
        {
          icon: "icon-shenpi",
          name: "我的申请",
          url: "/apply"
        },
        {
          icon: "icon-shenqing",
          name: "审批",
          url: "/approval"
        },
        {
          icon: "icon-mianbaoxie",
          name: "检测结果录入",
          url: "/entryResult"
        }
      ],
      isHr: true,

    };
  },
  created() {
  },
  methods: {
    onClickLeft() {
      // this.$router.back(-1);
      // this.$toast('首页')
      return
    },
  },
};
</script>

<style lang="less" scoped>
@import url('../assets/less/navBar.less');
.container {
  .dejan-grid-item {
    height: 200px;
    /deep/ .van-grid-item__content--center {
      justify-content: space-around;
    }
    /deep/ [class*="van-hairline"]::after {
      border: 0px solid transparent;
    }
    span {
      font-size: 26px;
    }
  }
}
</style>