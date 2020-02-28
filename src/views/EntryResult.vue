<template>
  <div class="container">
    <van-nav-bar
      title="检测结果录入"
      left-text="返回"
      left-arrow
      fixed
      @click-left="$router.back(-1)"
      class="title-style"
      style=" background-color: #5d8eec;"
    />
    <van-search class="search-input" v-model="searchKeyWord" placeholder="请输入搜索关键词" />
    <p class="enter-title">可录入员工</p>

    <ul class="card-wrap">
      <li class="card-class">
        <div class="left">
          <van-cell title="姓名" value="XXX" />
          <van-cell title="工号" value="A0666666" />
          <van-cell title="检测日期" value="2020/2/20" />
          <div class="result">
            <p>检测结果</p>
            <p>
              <van-radio-group v-model="resultRadio" direction="horizontal">
                <van-radio name="1">阴性</van-radio>
                <van-radio name="2">阳性</van-radio>
              </van-radio-group>
            </p>
          </div>
				</div>
        <div class="right">
					<van-button type="info">点击拍照</van-button>
				</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "EntryResult",
  data() {
    return {
      searchKeyWord: "",
      resultRadio:'1'
    };
  },
  created() {}
};
</script>
<style lang="less" scoped>
@import url('../assets/less/navBar.less');
.container {
  padding-top: 100Px;
  .search-input {
    position: fixed;
    top: 46Px;
    width: 100%;
    // height: 40Px;
  }
  .enter-title {
    text-indent: 1em;
	}
	.card-wrap{
		padding: 0 10Px;
	}
  .card-class {
    width: 100%;
    margin-bottom: 10Px;
    box-sizing: border-box;
    background-color: white;
    display: flex;
    flex-direction: row;
    & > .left {
      flex: 3;
      /deep/.van-cell__title{
         flex: 1;
       }
      /deep/.van-cell__value{
        flex: 2;
        text-align: left;
      }
      &>.result{
        display: flex;
        padding:10Px 16Px;
        box-sizing: border-box;
        font-size: 14Px;
        &>p:first-child{
          flex: 1;
          margin: 0;
        }
        &>p:last-child{
          flex: 2;
          margin: 0;
        }
      }
    }
    & > .right {
			flex: 1;
			display: flex;
			&>button{
				margin: auto;
			}
    }
  }
}
</style>