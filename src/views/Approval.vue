<template>
  <div class="container">
    <van-nav-bar
      title="核酸检测审批"
      left-text="返回"
      left-arrow
      fixed
      @click-left="$router.back(-1)"
      class="title-style"
      style=" background-color: #5d8eec;"
    />
  <van-tabs v-model="activeTab" animated>
    <van-tab v-for="(tab,tabIndex) in tabList" :key="tabIndex" :title="tab.name">
      <van-cell-group
        @click="navToApproval"
        class="dejan-cell-group"
        v-for="(card,cardIndex) in tab.tabData"
        :key="cardIndex"
      >
        <van-cell
          title-class="title-style"
          value-class="value-style"
          title="姓名"
          :value="card.name"
        />
        <van-cell
          title-class="title-style"
          value-class="value-style"
          title="工号"
          :value="card.jobNumber"
        />
        <van-cell
          title-class="title-style"
          value-class="value-style"
          title="到深日期"
          :value="card.arriveDate"
        />
        <van-cell
          title-class="title-style"
          value-class="value-style"
          title="隔离天数"
          :value="card.quarantineDays+'天'"
        />
      </van-cell-group>
    </van-tab>
  </van-tabs>
  </div>
</template>

<script>
export default {
  name: "Approval",
  data() {
    return {
      activeTab: 0,
      tabList: [
        {
          name: "未审核",
          tabData: [
            {
              name: "张三",
              jobNumber: "A888888",
              arriveDate: "2020/02/20",
              quarantineDays: "1"
            },
            {
              name: "张三",
              jobNumber: "A888888",
              arriveDate: "2020/02/20",
              quarantineDays: "1"
            }
          ]
        },
        {
          name: "已审批"
        },
        {
          name: "已确认"
        },
        {
          name: "已完成"
        }
      ]
    };
  },
  created(){
    this.$store.commit("changeTitle", "核酸检测审批");
  },
  methods: {
    navToApproval(){
      this.$router.push({name:'Apply',params:{isShowBottom:true}})
    }
  },
};
</script>

<style lang="less" scoped>
@import url('../assets/less/navBar.less');
.dejan-cell-group {
  margin-top: 10px;
  /deep/.van-cell {
    padding: 5px 25px;
  }
  .value-style {
    text-align: left;
  }
}
</style>