<template>
  <div class="container">
    <van-nav-bar
      :title="$store.state.pageTitle"
      left-text="返回"
      :right-text="$store.state.rightText"
      left-arrow
      fixed
      @click-left="onClickLeft"
      @click-right="onClickRight"
      class="title-style"
      style=" background-color: #5d8eec;"
    />
    <span class="apply-title">{{applyState}}</span>
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
          :rules="[{ required: true, message: `请填写${item.label}` }]"
          @focus="item.rightIcon || item.pickerDate ? selectValue(item):false"
        />
      </van-cell-group>
      <van-cell-group>
        <van-cell center title="缓冲宿舍区">
          <van-switch slot="right-icon" size="24" v-model="bufferDorm" :disabled="isCommited" />
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell center title="外住">
          <van-switch slot="right-icon" size="24" v-model="livingOutside" :disabled="isCommited" />
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

      <uploader-model v-if="!isShowStep" :fileList="fileList"></uploader-model>
      <van-cell @click="navToFileList" v-if="isShowStep" title="附件" is-link />

      <van-steps v-if="isShowStep" direction="vertical" :active="1">
        <van-step v-for="(signature,signatureIndex) in signatureList" :key="signatureIndex" v-show="signature.signatureStatus">
          <h3 class="step-title">{{signature.signTime + signature.name}}</h3>
          <p class="step-des" v-show="signature.suggest">{{signature.comment}}</p>
        </van-step>
      </van-steps>
    </van-form>
    <van-action-sheet v-model="isShowSheet" :actions="sheetaActions" @select="onSelectSheet" />
    <van-calendar v-model="isShowDatePicker" :min-date="minDate" @confirm="onConfirmDate" />
    <div class="bottom-button" v-show="isShowBottom">
      <van-button  @click="signature(2)" type="default">拒绝</van-button>
      <van-button @click="signature(1)" type="primary">通过审核</van-button>
    </div>
    <div class="confirm-completion" v-show="isShowConfirmButton">
      <van-button type="primary" @click="confirmOrder" :disabled="forbidden">确认已完成核酸检测</van-button>
    </div>
  </div>
</template>

<script>
// import fieldObj from "../http/field";
import UploaderModel from "@/components/UploaderModel";
import { getSelectList, addFormData, getUserState,getSignatureInfo,setPass,confirmOd } from "@/http/http";
export default {
  name: "Apply",

  mixins: [],

  components: {
    UploaderModel
  },

  props: {},
  data() {
    return {
      currentUser:{
        localToken:'',
        appId:''
      },
      applyState: "您还未申请，请如实填写以下信息",
      isShowSheet: false,
      isShowBottom: false,
      sheetaActions: [],
      isShowStep:false,//是否展示进度条
      currentItem: "",
      isShowDatePicker: false,
      minDate:new Date(2010, 0, 1),
      docType: ".png, .jpg, .jpeg,.doc,.docx,.xml",
      isCommited: false,
      isShowConfirmButton: false, //确认完成核酸检测按钮是否展示
      forbidden: false, //是否禁用 确认完成按钮
      // fieldObj,
      formDate: [
        {
          name: "name",
          label: "用户名",
          value: "",
          isCommited:false
        },
        {
          name: "staffId",
          label: "工号",
          value: "",
          isCommited:false
        },
        {
          name: "gender",
          label: "性别",
          value: "",
          id:'',
          rightIcon: "arrow-down",
          isCommited:false
        },
        {
          name: "age",
          label: "年龄",
          value: "",
          isCommited:false
        },
        {
          name: "group",
          label: "次集团",
          value: "",
          id:'',
          rightIcon: "arrow-down"
        },
        {
          name: "area",
          label: "所在厂区",
          value: "",
          id:'',
          rightIcon: "arrow-down"
        },
        {
          name: "bu",
          label: "事业群",
          value: "",
          id:'',
          rightIcon: "arrow-down"
        },
        {
          name: "legelPerson",
          label: "法人",
          value: "",
          id:'',
          rightIcon: "arrow-down"
        },
        {
          name: "costCode",
          label: "费用代码",
          value: ""
        },
        {
          name: "identityCard",
          label: "身份证号",
          value: "",
          isCommited:false
        },
        {
          name: "phone",
          label: "联系电话",
          value: "",
          isCommited:false
        },
        {
          name: "aTime",
          label: "到深日期",
          value: "",
          pickerDate: true
        },
        {
          name: "isolationDays",
          label: "隔离天数",
          value: ""
        }
      ],
      bufferDorm: false,
      livingOutside: false,
      leavingMessage: "",
      messageName: "note",
      fileList: [],
      myuploader: "",
      signatureList: [
        {
          fullName: "陈彦申",
          dateTime: "2020/2/20",
          suggest: "同意"
        },
        {
          fullName: "周铭嘉",
          dateTime: "2020/2/24",
          suggest: "同意"
        },
        {
          fullName: "邓嘉麟",
          dateTime: "2020/2/26"
        }
      ]
    };
  },
  computed: {},

  watch: {},
  beforeCreate() {},
  created() {
    
    if (this.$route.query.isShowBottom != undefined) {
      // 从审批进入,拿该条信息id请求数据，禁用表单
      this.isCommited = true
      let appId = this.$route.query.appId;
      // this['appId'] = appId;
      this.currentUser.appId = appId
      this.getOrderData("",this.currentUser.appId)
      this.$store.commit("changeTitle", "核酸检测审批");
      this.isShowBottom = true;
      this.isShowStep = true;
      this.isShowConfirmButton = false;
      this.$store.commit("changeRightTitle", "");
    } else {
      this.$store.commit("changeTitle", "我的申请");
      // 从主页进入，拿本机token请求验证是否填写
      let localToken = this.$store.state.localToken
      getUserState({token:localToken}).then(res => {
        if (res.isFil && !this.isShowBottom) {
          // 已填写 请求数据接口，设置所有选项为禁用
          this.isCommited = true
          this.$store.commit("changeRightTitle", "");
          this.getOrderData(localToken,"");
          this.currentUser.localToken = localToken;
          this.isShowBottom = false;
          this.isShowConfirmButton = true;
          this.isShowStep = true;
        } else {
          // 未填写
          this.$store.commit("changeRightTitle", "提交");
          this.formDate.forEach(item => {
            item.name === 'name' ? item.value = res.name : "";
            item.name === 'staffId' ? item.value = res.staffId : "";
            item.name === 'phone' ? item.value = res.phone : "";
            item.name === 'gender' ? item.value = res.SEX ||'' : "";
            item.name === 'age' ? item.value = res.AGE ||'' : "";
            item.name === 'identityCard' ? item.value = res.IDENTITY_ID || '' : "";
            if(item.value){
              item.isCommited = true
            }
          })
          this.isShowConfirmButton = false;
        }
      });
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
      that.fileList.push(file.source.source);
    });
  },

  destroyed() {},

  methods: {
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
      values["token"] = "aa47fcf3013c81c35b39dd31821d87da1ded1de7";

      for (let key in values) {
        _formData.append(key, values[key]);
      }

      this.fileList.forEach((item, index) => {
        _formData.append("file[]", item);
      });

      console.log(_formData.getAll("file"));
      addFormData(_formData).then(res => {
        console.log(res);
        
        this.$toast(res.reason);
        this.$router.back(-1)
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
      if (!this.$store.state.isOrg) {
        return;
      } else {
        this.$router.back(-1);
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
        console.log(res)
        this.formDate.forEach((item,index) => {
          item.value = res[item.name]
        })
        this.leavingMessage = res['note']
        this.bufferDorm = res.bufferDormitory == 0 ? false :true
        this.livingOutside = res.outLive == 0 ? false : true
        this.signatureList = res.signatureList;
        if(this.signatureList.slice(-1)[0].signatureStatus == 0){
          
          this.forbidden = true;
        }
      })
    },
    signature(status){
      let params = {
          token: this.$store.state.localToken,
          status:status,
          applicationCode:this.currentUser.appId,
          comment:'同意'
        }
      setPass(params).then(res => {
        if(res.nextNum == 0 && status){
           this.$router.push({path:'/examine',query:this.currentUser})
        }
      })
      if(!status){
        this.$router.back(-1)
      }
    },
    navToFileList(){
      this.$router.push({path:'/enclosure',query:this.currentUser})
    },
    confirmOrder(){
      let params ={
        token:this.currentUser.localToken,
        applicationCode:this.currentUser.appId
      }
      confirmOd(params).then(res => {
        console.log('====================================');
        console.log(res);
        console.log('====================================');
        this.$router.back(-1)
      })
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
</style>