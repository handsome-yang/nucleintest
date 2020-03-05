<template>
  <div class="container">
    <van-cell title="检测时间" is-link :value="timeResult" @click="openDatePicker" />
    <van-cell title="检测地点" @click="isShowLocation = true" is-link :value="location.name" />
    <van-button type="info" class="confirm-button" @click="confirm">确认</van-button>
    <van-popup v-model="showDatePicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="selectDate"
      />
    </van-popup>
    <van-action-sheet v-model="isShowLocation" :actions="actionsLocation" @select="onSelect" />
  </div>
</template>
<script>
import {setCheckInfo ,getSelectList} from '@/http/http'
export default {
  data() {
    return {
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
			showDatePicker: false,
      timeResult:'',
      isShowLocation:false,
      location:'',
      actionsLocation:[
      ]
    };
  },
  created() {
    this.$store.commit("changeTitle", "核酸检测审批");
    this['currentUser'] = this.$route.query;
    let params = { opt: 'location',token:this.$store.state.localToken }
    getSelectList(params).then(res => {
      this.actionsLocation = res
    })
  },
  methods: {
    openDatePicker() {
      this.showDatePicker = true;
    },
    selectDate(value) {
      let date_value =
        value.getFullYear() +
        "-" +
        (value.getMonth() + 1) +
        "-" +
        value.getDate() +
        " " +
        this.checkTime(value.getHours()) +
        ":" +
        this.checkTime(value.getMinutes()) +
        ":" +
        this.checkTime(value.getSeconds());
      this.timeResult = date_value;
      this.showDatePicker = false;
    },
    checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },
    backClick(){
      this.$router.push({path:'/apply',query:{isShowBottom:false,appId:this['currentUser'].appId}})
    },
    confirm(){
      let params = {
        token:this.$store.state.localToken,
        applicationCode:this.currentUser.appId,
        checkTime:this.timeResult,
        location:this.location.id
      }
      setCheckInfo(params).then(res => {
        console.log(res);
        //  this.$router.push({path:'/apply',query:{appId:this['currentUser'].appId,isShowBottom:false}})
        this.$router.back(-1)
      })
    },
    onSelect(item){
      this.location = item;
      this.isShowLocation = false;
    }
  }
};
</script>
<style lang="less" scoped>
@import url('../assets/less/navBar.less');
.container {
  display: flex;
  flex-direction: column;
  /deep/.van-cell__value {
    text-align: center;
  }
  .confirm-button{
    width:400px;
    margin:auto;
    margin-top:30px;
  }
}
</style>