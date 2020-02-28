<template>
  <div class="container">
    <van-nav-bar
      title="附件"
      left-text="返回"
      left-arrow
      fixed
      @click-left="$router.back(-1)"
      class="title-style"
      style=" background-color: #5d8eec;"
    />
    <van-cell title="检测时间" is-link :value="timeResult" @click="openDatePicker" />
    <van-cell title="检测地点" is-link value="" />
    <van-popup v-model="showDatePicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="selectDate"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
			showDatePicker: false,
			timeResult:''
    };
  },
  created() {
    this.$store.commit("changeTitle", "核酸检测审批");
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
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  /deep/.van-cell__value {
    text-align: center;
  }
}
</style>