<template>
  <div>
  
    <van-nav-bar
      :title="titleText"
      :left-text="backText"
      :right-text="$store.state.rightText"
      :left-arrow="isShowBack"
      fixed
      @click-left="onClickLeft"
      @click-right="onClickRight"
      class="title-style"
      style="background-color: #5d8eec;"
    />
  <div v-if="!isShowEnclosure && !isShowExamine" class="container">
    <span v-show="applyState" class="apply-title">{{applyState}}</span>
    <van-form @submit="onSubmit" style="margin-bottom:50Px;" class="form-wrap" ref="form">
      <van-cell-group v-for="(item,index) in formDate" :key="index">
        <van-field
          v-model="item.value"
          :name="item.name"
          :label="item.label"
          :placeholder="item.label"
          :right-icon="item.rightIcon"
          :readonly="item.rightIcon || item.pickerDate ? true : false"
          :disabled="isCommited || item.isCommited"
          :rules="item.rules"
          @focus="item.rightIcon || item.pickerDate ? selectValue(item):false"
        />
      </van-cell-group>
      <van-cell-group>
        <van-cell center title="缓冲宿舍区">
          <van-switch slot="right-icon" size="24" @change="livingOutside = !bufferDorm"  v-model="bufferDorm" :disabled="isCommited" />
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell center title="外住">
          <van-switch slot="right-icon" size="24" @change="bufferDorm = !livingOutside;" v-model="livingOutside" :disabled="isCommited" />
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="leavingMessage"
          rows="2"
          autosize
          type="textarea"
          label="留言"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
          :name="messageName"
          :disabled="isCommited"
        />
      </van-cell-group>
      <uploader-model v-show="!isShowStep" :fileList="fileList" @clearFile="clearFile"></uploader-model>
      <van-cell @click="navToFileList" v-if="isShowStep" title="附件" is-link />

      <van-steps v-show="isShowStep" style="padding-bottom:40px;" direction="vertical" :inactive-icon="yqh" :active-icon="activeIcon" :active="signatureList.length-1">
        <van-step v-for="(signature,signatureIndex) in signatureList" :key="signatureIndex" v-show="signature['signatureStatus']">
          <h3 class="step-title"><span v-show="signature.signTime">{{signature.signTime}}</span>&nbsp; <span>{{signature.name}}</span></h3>
          <p class="step-des" v-show="signature.comment">{{signature.comment}}</p>
        </van-step>
      </van-steps>
    </van-form>
    <van-action-sheet v-model="isShowSheet" :actions="sheetaActions" @select="onSelectSheet" />
    <van-calendar v-model="isShowDatePicker" :min-date="minDate" :default-date="currentDate" @confirm="onConfirmDate" />
    <div class="bottom-button" v-show="isShowBottom">
      <van-button  @click="isShowAdvice=true;signatureButton=2;" type="default">拒绝</van-button>
      <van-button @click="isShowAdvice=true;signatureButton=1" type="primary">通过审核</van-button>
    </div>
    <div class="confirm-completion" v-show="isShowConfirmButton">
      <van-button type="primary" @click="confirmOrder" :disabled="forbidden">确认已完成核酸检测</van-button>
    </div>

    <van-dialog v-model="isShowAdvice" class="show-advice" title="请输入审批意见" @cancel="isShowAdvice=false" @confirm="signature(signatureButton)" show-cancel-button>
      <van-field
        v-model="advices"
        rows="4"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入审核意见"
        show-word-limit
      />
    </van-dialog>
  </div>
  <enclosure :currentUser="currentUser" v-if="isShowEnclosure" />
  <examine v-if="isShowExamine" />
</div>
</template>

<script>
// import fieldObj from "../http/field";
import UploaderModel from "@/components/UploaderModel";
import Enclosure from '@/views/Enclosure'
import Examine from '@/views/Examine'
import { getSelectList, addFormData, getUserState,getSignatureInfo,setPass,confirmOd } from "@/http/http";
export default {
  name: "Apply",
  inject:['reload'],
  components: {
    UploaderModel,
    Enclosure,
    Examine
  },
  data() {
    return {
      isShowEnclosure:false,
      isShowExamine:false,
      currentUser:{
        localToken:'',
        appId:''
      },
      isShowAdvice:false,
      activeIcon:"",
      isOver:false,
      applyState: "您还未申请，请如实填写以下信息",
      backText:this.$store.state.isOrg ? "返回" : "",
      titleText:"核酸检测申请",
      isShowBack:this.$store.state.isOrg ? true : false,
      isShowSheet: false,
      isShowBottom: false,
      sheetaActions: [],
      isShowStep:false,//是否展示进度条
      activeStep:1,
      wqh:require('../assets/未签核.svg'),
      yqh:require('../assets/已签核.svg'),
      jj:require('../assets/拒绝.svg'),
      currentItem: "",
      isShowDatePicker: false,
      minDate:new Date(2010, 0, 1),
      currentDate: new Date(),
      docType: ".png, .jpg, .jpeg,.doc,.docx,.xml",
      isCommited: false,
      isShowConfirmButton: false, //确认完成核酸检测按钮是否展示
      forbidden: true, //是否禁用 确认完成按钮
      isRead:false,
      // fieldObj,
      formDate: [
        {
          name: "name",
          label: "用户名",
          value: "",
          isCommited:false,
          rules:[{ required: true, message: `请正确填写用户名`}]
        },
        {
          name: "staffId",
          label: "工号",
          value: "",
          isCommited:false,
          rules:[{ required: true, message: `请正确填写工号`}]
        },
        {
          name: "gender",
          label: "性别",
          value: "",
          id:'',
          rightIcon: "arrow-down",
          isCommited:false,
          rules:[{ required: true, message: `请正确填写性别`}]
        },
        {
          name: "age",
          label: "年龄",
          value: "",
          isCommited:false,
          rules:[{ required: true, message: `请正确填写年龄`,validator:this.testAge}]
        },
        {
          name: "group",
          label: "次集团",
          value: "",
          id:'',
          rightIcon: "arrow-down",
          rules:[{ required: true, message: `请正确填写次集团`}]
        },
        {
          name: "area",
          label: "所在厂区",
          value: "",
          id:'',
          rightIcon: "arrow-down",
          rules:[{ required: true, message: `请正确填写所在厂区`}]
        },
        {
          name: "bu",
          label: "事业群",
          value: "",
          id:'',
          rightIcon: "arrow-down",
          rules:[{ required: true, message: `请正确填写事业群`}]
        },
        {
          name: "legelPerson",
          label: "法人",
          value: "",
          id:'',
          rightIcon: "arrow-down",
          rules:[{ required: true, message: `请正确填写法人`}]
        },
        {
          name: "costCode",
          label: "费用代码",
          value: "",
          rules:[{ required: true, message: `请正确填写费用代码`}]
        },
        {
          name: "identityCard",
          label: "身份证号",
          value: "",
          isCommited:false,
          rules:[{ required: true, message: `请正确填写身份证号码`,validator:this.testCardId}]
        },
        {
          name: "phone",
          label: "联系电话",
          value: "",
          isCommited:false,
          rules:[{ required: true, message: `请正确填写手机号码`,validator:this.testPhone}]
        },
        {
          name: "aTime",
          label: "到深日期",
          value: "",
          pickerDate: true,
          rules:[{ required: true, message: `请正确填写到深日期`}]
        },
        {
          name: "isolationDays",
          label: "隔离天数",
          value: "",
          rules:[{ required: true, message: `请正确填写隔离天数`}]
        }
      ],
      bufferDorm: false,
      advices:"",//审核意见
      livingOutside: false,
      leavingMessage: "",
      messageName: "note",
      fileList: [],
      myuploader: "",
      signatureList: [

      ]
    };
  },
  computed: {},

  watch: {},
  beforeCreate() {},
  created() {
    let lastPath = sessionStorage.getItem('lastPath');
    if(lastPath == '/'){//首页进入
      let localInfo = this.$store.state.userInfo
      if(this.$store.state.isFil){//已填写         
          this.$store.commit("changeRightTitle", "");
          this.getOrderData(this.$store.state.localToken,"");//获取已填写的数据
          this.isCommited = true;//禁用表单
          this.isShowStep = true;//显示步骤条
          this.applyState =  "您已提交申请，请等待审核完成后进行核酸检测";
          this.currentUser = {localToken:this.$store.state.localToken,appId:''}
        }else{
          this.$store.commit("changeRightTitle", "提交");
          this.formDate.forEach(item => {
          item.name === 'name' ? item.value = localInfo.name : "";
          item.name === 'staffId' ? item.value = localInfo.staffId : "";
          item.name === 'phone' ? item.value = localInfo.phone : "";
          if(item.name === 'gender'){
            item.value = localInfo.SEX 
            if(localInfo.SEX === "男"){
                item.id = 1
              }else if(localInfo.SEX === "女"){
                item.id = 0
              }
            }
            item.name === 'age' ? item.value = localInfo.AGE : "";
            item.name === 'identityCard' ? item.value = localInfo.IDENTITY_ID || '' : "";
            if(item.value){
              item.isCommited = true
            }
          })
          // this.isShowConfirmButton = false;
          this.applyState = "您还未申请，请如实填写以下信息";
        }
          
    }else if(lastPath == '/approval'){//审批进入
      this.isCommited = true;//禁用表单
      this.isShowStep = true;
      this.getOrderData("",this.$route.query.appId);
      // this.isShowBottom = !this["isOver"];
      this.titleText = "核酸检测审批";
      this.currentUser = {localToken:'',appId:this.$route.query.appId}
      this.$store.commit("changeRightTitle","")
    }

  },

  mounted() {
    //初始化uploader
    this.myuploader = WebUploader.create({
      // swf文件路径
      // swf: "plugins/webuploader-0.1.5/Uploader.swf",
      pick: "#picker-file",
      mimeTypes:
        ".pdf, .doc, .docx, .xml, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .png, .jpeg, .jpg",
      capture: false
    });

    let that = this;
    this.myuploader.on("fileQueued", function(file) {
      that.fileList.push(file);
    });
  },

  destroyed() {},

  methods: {
    testCardId(val){
      let regx = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      return regx.test(val)
    },
    testPhone(val){
      return /^1[3456789]\d{9}$/.test(val)
    },
    testAge(val){
      return /^(?:[1-9][0-9]?|1[01][0-9]|120)$/.test(val)
    },
    onSubmit(values) {
      console.log("submit", values);
      this.formDate.forEach(item =>{
        if(item.id){
          values[item.name] = item.id
        }
      })
      let _formData = new FormData();
      let bufferDorm = this.bufferDorm ? 1 : 0;
      let livingOutside = this.livingOutside ? 1 : 0;
      values["bufferDormitory"] = bufferDorm;
      values["outLive"] = livingOutside;
      values["token"] = this.$store.state.localToken;
      // values["gender"] = values["gender"] === "男" ? 1 : 0

      for (let key in values) {
        _formData.append(key, values[key]);
      }

      this.fileList.forEach((item, index) => {
        _formData.append("file[]", item.source.source);
      });

      addFormData(_formData).then(res => {
        this.$store.commit('changeRightTitle',"");
        this.$store.commit('changeIsFil',1)
        this.$toast(res.reason);
        this.reload()
      });
    },
    selectValue(item) {
      this.currentItem = item;
      if (item.pickerDate) {
        this.isShowDatePicker = true;
      } else {
        if (item.name === "gender") {
          this.sheetaActions = [{ name: "男",id:1 }, { name: "女",id:0 }];
          this.isShowSheet = true;
        } else {
          let params = { opt: item.name,token:this.$store.state.localToken }
          getSelectList(params).then(res => {
            let _sheetaActions = res.reduce(
              (_arr, currentValue) => [..._arr, { name: currentValue.name, id:currentValue.id}],
              []
            );
            this.sheetaActions = _sheetaActions;
            this.isShowSheet = true;
          });
        }
      }
    },
    onSelectSheet(item) {
      this.currentItem.value = item.name;
      this.currentItem.id = item.id
      console.log(this.currentItem)
      this.isShowSheet = false;
    },
    onConfirmDate(date) {
      this.currentItem.value = this.formatDate(date);
      this.isShowDatePicker = false;
    },
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onClickLeft() {
      if(this.isShowEnclosure){
        this.isShowEnclosure = false;
      }else if(this.isShowExamine){
        this.isShowExamine = false
      }else if(this.$store.state.isOrg){
        this.$router.back(-1)
      }else{
        return
      }
    },
    onClickRight() {
      this.$refs["form"].submit();
    },
    getOrderData(token,appId){
      let params = {
        token:token,
        applicationCode:appId
      }
      // 获取已提交订单详情
      getSignatureInfo(params).then(res => {
        this.currentUser.appId = res.appCode;
        this.formDate.forEach((item,index) => {
          item.value = res[item.name]
        })
        this.leavingMessage = res['note']
        this.bufferDorm = res.bufferDormitory == 0 ? false :true
        this.livingOutside = res.outLive == 0 ? false : true
        this.signatureList = res.signatureList;
        let lastele = this.signatureList.slice(-1)[0];
        let stepIconArr = [this.wqh, this.yqh,this.jj]
        let lastStatus = Number(lastele.signatureStatus)
        this.activeIcon = stepIconArr[lastStatus]
        this["isOver"] = lastele.signatureStatus == 1 ? true :false
        console.log(this.$store.state.userInfo.name)
        let _applyStateArr = ["您已提交申请，请等待审核完成后进行核酸检测","审核已完成","审核已被驳回"]
        this.applyState = _applyStateArr[lastStatus]
        if(appId){//审批进入
          let singState = this.signatureList.filter(item => {
            return item.name == this.$store.state.userInfo.name
          })
          this.isShowBottom = singState[0].signatureStatus == 0 ? true : false
        }else{//本机进入
          
          if(this["isOver"] == 1){//审批流程完成
            this.isRead = res.isRead;//记录是否确认流程
            this.forbidden = false;
            this.isShowConfirmButton=!Number(this.isRead);//1.已确认 0.未确认
            if(Number(this.isRead) == 1) {
              this.applyState = "已确认"
              }
          }else{//审批流程 未完成
            this.isShowConfirmButton = true;
          }
        }
       
      })
    },
    signature(status){
      let params = {
          token: this.$store.state.localToken,
          status:status,
          applicationCode:this.currentUser.appId,
          comment:this.advices
        }

      setPass(params).then(res => {
        if(res.nextNum == 0 && status == 1){
          this.isShowBottom = false
          this.isShowExamine = true;
        }else{
          this.reload();
        }
      })
    },
    navToFileList(){
      this.isShowEnclosure = true;
      this.titleText = "附件";
      this.isShowBack = true;
    },
    confirmOrder(){
      let params ={
        token:this.currentUser.localToken,
        applicationCode:this.currentUser.appId,
        isShowBottom:this.isShowBottom
      }
      confirmOd(params).then(res => {
        this.reload()
      })
    },
  clearFile(name,id){
    this.fileList.forEach((item,index) =>{
      if(item.name === name){
        this.fileList.splice(index,1)
        }
      })
      this.myuploader.removeFile(id,true)
    // console.log(name,id)
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../assets/less/navBar.less");
.container {
  // overflow: scroll;
  .apply-title {
    color: rgba(69, 90, 100, 0.6);
    line-height: 80px;
    padding-left: 16px;
  }

  #picker-file {
    margin-top: 40px;
    margin-left: 16px;
  }
  .bottom-button {
    position: fixed;
    bottom: 0;
    z-index: 999;
    width: 100%;
    display: flex;
    button {
      flex: 1;
      // margin: 20px;
    }
  }
  .step-title {
    font-size: 30px;
    margin: 0;
  }
  .step-des {
    font-size: 24px;
    margin: 0;
  }

  .form-wrap {
    & > div:nth-child(1),
    & > div:nth-child(5),
    & > div:nth-child(10) {
      margin-top: 10px;
    }
    & > div:nth-child(17) {
      margin: 10px 0;
    }
  }
  .confirm-completion {
    position: fixed;
    z-index: 999;
    bottom: 10px;
    width: 100%;
    display: flex;
    button {
      width: 80%;
      margin: auto;
      border-radius: 20px;
    }
  }
}

.show-advice{
  background-color:#f7f8fa;
  /deep/.van-dialog__header{
    padding-bottom:24Px;
  }
  /deep/ .van-button{
    background-color:#f7f8fa;
  }
}

/deep/.van-step__icon{
  img{
    width:18px;
    height:18px;
  }
}
</style>