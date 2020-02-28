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
          :disabled="isCommited"
          :rules="[{ required: true, message: `请填写${item.label}` }]"
          @focus="item.rightIcon || item.pickerDate ? selectValue(item):false"
        />
      </van-cell-group>
      <van-cell-group>
        <van-cell center title="缓冲宿舍区">
          <van-switch slot="right-icon" size="24" v-model="bufferDorm" />
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell center title="外住">
          <van-switch slot="right-icon" size="24" v-model="livingOutside" />
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
        />
      </van-cell-group>

      <uploader-model v-if="!isShowBottom" :fileList="fileList"></uploader-model>
      <van-cell v-if="isShowBottom" title="附件" is-link to="enclosure" />

      <van-steps v-if="isShowBottom" direction="vertical" :active="1">
        <van-step v-for="(signature,signatureIndex) in signatureList" :key="signatureIndex">
          <h3 class="step-title">{{signature.dateTime+signature.fullName}}</h3>
          <p class="step-des" v-show="signature.suggest">{{signature.suggest}}</p>
        </van-step>
      </van-steps>
    </van-form>
    <van-action-sheet v-model="isShowSheet" :actions="sheetaActions" @select="onSelectSheet" />
    <van-calendar v-model="isShowDatePicker" @confirm="onConfirmDate" />
    <div class="bottom-button" v-show="isShowBottom">
      <van-button type="default">拒绝</van-button>
      <van-button type="primary">通过审核</van-button>
    </div>
    <div  class="confirm-completion" v-show="isShowConfirmButton">
      <van-button type="primary" :disabled="forbidden">确认已完成核酸检测</van-button>
    </div>
  </div>
</template>

<script>
// import fieldObj from "../http/field";
import UploaderModel from "@/components/UploaderModel";
import { getSelectList, addFormData,getUserState } from "@/http/http";
export default {
  name: "Apply",

  mixins: [],

  components: {
    UploaderModel
  },

  props: {},
  data() {
    return {
      applyState: "您还未申请，请如实填写以下信息",
      isShowSheet: false,
      isShowBottom: false,
      sheetaActions: [],
      currentItem: "",
      isShowDatePicker: false,
      docType: ".png, .jpg, .jpeg,.doc,.docx,.xml",
      isCommited: false,
      isShowConfirmButton:false,//确认完成核酸检测按钮是否展示
      forbidden:false,//是否禁用 确认完成按钮
      // fieldObj,
      formDate: [
        {
          name: "name",
          label: "用户名",
          value: ""
        },
        {
          name: "staffId",
          label: "工号",
          value: ""
        },
        {
          name: "gender",
          label: "性别",
          value: "",
          rightIcon: "arrow-down"
        },
        {
          name: "age",
          label: "年龄",
          value: ""
        },
        {
          name: "group",
          label: "次集团",
          value: "",
          rightIcon: "arrow-down"
        },
        {
          name: "area",
          label: "所在厂区",
          value: "",
          rightIcon: "arrow-down"
        },
        {
          name: "bu",
          label: "事业群",
          value: "",
          rightIcon: "arrow-down"
        },
        {
          name: "legelPerson",
          label: "法人",
          value: "",
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
          value: ""
        },
        {
          name: "phone",
          label: "联系电话",
          value: ""
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
    let params = {
			token: "aa47fcf3013c81c35b39dd31821d87da1ded1de7"
		}
    getUserState(params).then(res => {
			if(res.isFil && !this.isShowBottom){
        // 已填写 请求数据接口，设置所有选项为禁用
        this.isShowConfirmButton = true;
      }else{
        this.isShowConfirmButton = false;
      }
		});
  
    if (this.$route.params.isShowBottom != undefined) {
      this.$store.commit("changeTitle", "核酸检测审批");
      this.isShowBottom = this.$route.params.isShowBottom;
    } else {
      this.$store.commit("changeTitle", "我的申请");
      this.$store.commit("changeRightTitle", "提交");
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
      // console.log("submit", values);
      let _formData = new FormData();
      let bufferDorm = this.bufferDorm ? 1 : 0;
      let livingOutside = this.livingOutside ? 1 : 0;
      values["bufferDormitory"] = bufferDorm;
      values["outLive"] = livingOutside;
      values["token"] = "aa47fcf3013c81c35b39dd31821d87da1ded1de7";
      // values["file"] = this.fileList;
      for (let key in values) {
        _formData.append(key, values[key]);
      }

      this.fileList.forEach((item, index) => {
        _formData.append("file", item);
      });

      console.log(_formData.getAll("file"));
      addFormData(_formData).then(res => {
        console.log(res);
      });
    },
    selectValue(item) {
      this.currentItem = item;
      if (item.pickerDate) {
        this.isShowDatePicker = true;
      } else {
        if (item.name === "gender") {
          this.sheetaActions = [{ name: "男" }, { name: "女" }];
          this.isShowSheet = true;
        } else {
          getSelectList({ opt: item.name }).then(res => {
            let _sheetaActions = res.reduce(
              (_arr, currentValue) => [..._arr, { name: currentValue }],
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
        return
      }else{
        this.$router.back(-1);
      }
    },
    onClickRight() {
      this.$refs["form"].submit();
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
  .confirm-completion{
    position: fixed;
    z-index: 999;
    bottom: 10Px;
    width: 100%;
    display: flex;
    button{
      width: 80%;
      margin: auto;
      border-radius:20Px; 
    }
  }
}
</style>