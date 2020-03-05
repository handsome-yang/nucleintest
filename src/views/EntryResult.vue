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
    <van-search class="search-input" v-model="searchKeyWord" @search="onSearch" placeholder="请输入搜索关键词" />
    <p class="enter-title">{{titleText}}</p>

    <ul class="card-wrap">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
        <li class="card-class" v-for="(item,index) in dataList" :key="index">
          <div class="left">
            <van-cell title="姓名" :value="item.name" />
            <van-cell title="工号" :value="item.staffId" />
            <van-cell title="检测日期" :value="item.checkTime" />
            <div class="result">
              <p>检测结果</p>
              <p>
                <van-radio-group v-model="item.resultRadio" direction="horizontal">
                  <van-radio name="1">阴性</van-radio>
                  <van-radio name="2">阳性</van-radio>
                </van-radio-group>
              </p>
            </div>
          </div>
          <div class="right">
            <div @click="setCurrentItem(item)">
              <van-uploader style="width:100px;" :after-read="readFile">
                <van-button class="uploader-button" style="width:100px;" type="info" >{{item.currentButtonText}}</van-button>
              </van-uploader>
            </div>

            <van-button style="width:100px" type="info" @click="enterResult(item)">确认录入</van-button>
          </div>
        
        </li>
      </van-list>
    </ul>
  </div>
</template>
<script>
import {getSignatureList ,updateCheckResult} from '@/http/http'
export default {
  name: "EntryResult",
  inject:['reload'],
  data() {
    return {
      searchKeyWord: "",
      resultRadio:'1',
      currentPage:1,
      buttonText:'上传证明',
      currentItem:'',
      dataList:[

      ],
      finished:false,
      loading:false,
      titleText:"可录入员工"
    };
  },
  created() {
   
  },
  methods: {
    setCurrentItem(item){
      this.currentItem = item;
    },
    readFile(file){
      this.currentItem.file.push(file.file);
      this.currentItem.currentButtonText = file.file.name
    },
    enterResult(item){
      console.log(item)
      let fd = new FormData()

      fd.append("token",this.$store.state.localToken)
      fd.append("applicationCode",item.applicationCode)
      fd.append("result",item.resultRadio)
      fd.append("file[]",item.file[0])
      updateCheckResult(fd).then(res => {
        this.reload();
      })
    },
    onLoad(search){
      let params = {
        token:this.$store.state.localToken,
        type:3,
        page:this.currentPage,
        size:10,
        search:this.searchKeyWord
      }
      console.log(params)
      getSignatureList(params).then(res => {
        if(res.list.length > 0){
          let objArr = res.list;
          objArr.forEach(item => {
            item["resultRadio"] = "1"
            item["file"] = []
            item["currentButtonText"] = "上传证明"
          });
          if(search){
            this.dataList = objArr
          }else{
            this.dataList.push(...objArr);
          }
          this.loading = false;
          this.currentPage++
        }else if(res.list.length == 0){
            this.finished = true;
        }
    })
    },
    onSearch(){
      this.onLoad(true)
    },
  },
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
          font-size: 14Px;
        }
      }
    }
    & > .right {
			flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
			&>button{
        margin: auto;
        text-align: center;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
      .uploader-button{
        text-align: center;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
    }
  }
}
</style>