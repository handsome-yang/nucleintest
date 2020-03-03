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
  <van-tabs v-model="activeTab" animated @change="checkTab">
    <van-tab v-for="(tab,tabIndex) in tabList" :key="tabIndex" :title="tab.name">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >

        <van-cell-group
          @click="navToApproval(card.applicationCode)"
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
            :value="card.staffId"
          />
          <van-cell
            title-class="title-style"
            value-class="value-style"
            title="到深日期"
            :value="card.aTime"
          />
          <van-cell
            title-class="title-style"
            value-class="value-style"
            title="隔离天数"
            :value="card.isolationDays+'天'"
          />
        </van-cell-group>
      </van-list>
    </van-tab>
  </van-tabs>
  </div>
</template>

<script>
import {getSignatureList} from '@/http/http.js'
export default {
  name: "Approval",
  data() {
    return {
      activeTab: 0,
      loading: false,
      finished: false,
      tabList: [
        {
          name: "未审核",
          tabData: [
          
          ],
          currenPage:1
        },
        {
          name: "已审批",
          tabData:[],
          currenPage:1
        },
        {
          name: "已确认",
          tabData:[],
          currenPage:1
        },
        {
          name: "已完成",
          tabData:[],
          currenPage:1
        }
      ]
    };
  },
  created(){
    this.$store.commit("changeTitle", "核酸检测审批");
  },
  methods: {
    navToApproval(appId){
      if(this.activeTab == 0 ){
        this.$router.push({path:'/apply',query:{isShowBottom:true,appId:appId}})
      }else{
       this.$router.push({path:'/apply',query:{isShowBottom:false,appId:appId}}) 
      }
    },
    onLoad(){
      let currentPage = this.tabList[this.activeTab].currenPage;//当前标签页的currentPage
      let params = {
        token:this.$store.state.localToken,
        type:this.activeTab + 1,
        page:currentPage,
        size:10
      }
      getSignatureList(params).then(res => {
        
        if(res.list.length>0){
          this.tabList[this.activeTab].tabData.push(...res.list);
          this.tabList[this.activeTab].currenPage++
          this.loading = false;
        }else if(res.list.length == 0){
          this.finished = true;
        }
      })
    },
    checkTab(){
      console.log(this.activeTab);
      this.onLoad()
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