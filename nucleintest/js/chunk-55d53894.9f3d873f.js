(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-55d53894"],{1533:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"container"},[i("van-nav-bar",{staticClass:"title-style",staticStyle:{"background-color":"#5d8eec"},attrs:{title:e.$store.state.pageTitle,"left-text":e.backText,"right-text":e.$store.state.rightText,"left-arrow":e.isShowBack,fixed:""},on:{"click-left":e.onClickLeft,"click-right":e.onClickRight}}),i("span",{directives:[{name:"show",rawName:"v-show",value:e.applyState,expression:"applyState"}],staticClass:"apply-title"},[e._v(e._s(e.applyState))]),i("van-form",{ref:"form",staticClass:"form-wrap",staticStyle:{"margin-bottom":"50Px"},on:{submit:e.onSubmit}},[e._l(e.formDate,(function(t,a){return i("van-cell-group",{key:a},[i("van-field",{attrs:{name:t.name,label:t.label,placeholder:t.label,"right-icon":t.rightIcon,readonly:!(!t.rightIcon&&!t.pickerDate),disabled:e.isCommited||t.isCommited,rules:t.rules},on:{focus:function(i){(t.rightIcon||t.pickerDate)&&e.selectValue(t)}},model:{value:t.value,callback:function(i){e.$set(t,"value",i)},expression:"item.value"}})],1)})),i("van-cell-group",[i("van-cell",{attrs:{center:"",title:"缓冲宿舍区"}},[i("van-switch",{attrs:{slot:"right-icon",size:"24",disabled:e.isCommited},slot:"right-icon",model:{value:e.bufferDorm,callback:function(t){e.bufferDorm=t},expression:"bufferDorm"}})],1)],1),i("van-cell-group",[i("van-cell",{attrs:{center:"",title:"外住"}},[i("van-switch",{attrs:{slot:"right-icon",size:"24",disabled:e.isCommited},slot:"right-icon",model:{value:e.livingOutside,callback:function(t){e.livingOutside=t},expression:"livingOutside"}})],1)],1),i("van-cell-group",[i("van-field",{attrs:{rows:"2",autosize:"",type:"textarea",label:"留言",maxlength:"50",placeholder:"请输入留言","show-word-limit":"",name:e.messageName,disabled:e.isCommited},model:{value:e.leavingMessage,callback:function(t){e.leavingMessage=t},expression:"leavingMessage"}})],1),e.isShowStep?e._e():i("uploader-model",{attrs:{fileList:e.fileList}}),e.isShowStep?i("van-cell",{attrs:{title:"附件","is-link":""},on:{click:e.navToFileList}}):e._e(),e.isShowStep?i("van-steps",{staticStyle:{"padding-bottom":"40px"},attrs:{direction:"vertical","active-icon":e.stepIconArr[e.signatureList.slice(-1)[0].signatureStatus],active:e.signatureList.length-1}},e._l(e.signatureList,(function(t,a){return i("van-step",{directives:[{name:"show",rawName:"v-show",value:t.signatureStatus,expression:"signature.signatureStatus"}],key:a},[i("h3",{staticClass:"step-title"},[i("span",{directives:[{name:"show",rawName:"v-show",value:t.signTime,expression:"signature.signTime"}]},[e._v(e._s(t.signTime))]),e._v(" "),i("span",[e._v(e._s(t.name))])]),i("p",{directives:[{name:"show",rawName:"v-show",value:t.suggest,expression:"signature.suggest"}],staticClass:"step-des"},[e._v(e._s(t.comment))])])})),1):e._e()],2),i("van-action-sheet",{attrs:{actions:e.sheetaActions},on:{select:e.onSelectSheet},model:{value:e.isShowSheet,callback:function(t){e.isShowSheet=t},expression:"isShowSheet"}}),i("van-calendar",{attrs:{"min-date":e.minDate,"default-date":e.currentDate},on:{confirm:e.onConfirmDate},model:{value:e.isShowDatePicker,callback:function(t){e.isShowDatePicker=t},expression:"isShowDatePicker"}}),i("div",{directives:[{name:"show",rawName:"v-show",value:e.isShowBottom,expression:"isShowBottom"}],staticClass:"bottom-button"},[i("van-button",{attrs:{type:"default"},on:{click:function(t){return e.signature(2)}}},[e._v("拒绝")]),i("van-button",{attrs:{type:"primary"},on:{click:function(t){return e.signature(1)}}},[e._v("通过审核")])],1),i("div",{directives:[{name:"show",rawName:"v-show",value:e.isShowConfirmButton,expression:"isShowConfirmButton"}],staticClass:"confirm-completion"},[i("van-button",{attrs:{type:"primary",disabled:e.forbidden},on:{click:e.confirmOrder}},[e._v("确认已完成核酸检测")])],1)],1)},s=[],o=(i("99af"),i("4160"),i("13d5"),i("fb6a"),i("b0c0"),i("159b"),i("5530")),n=i("2909"),r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"file-list"},[i("van-grid",{attrs:{"column-num":3,square:"",gutter:10}},[e._l(e.fileList,(function(t,a){return i("van-grid-item",{key:a,staticClass:"grid-item"},[i("van-icon",{staticClass:"file-icon",attrs:{size:"35",name:"description"}}),i("van-icon",{staticClass:"clear-file",attrs:{size:"24",name:"close"},on:{click:function(i){return e.clearFile(t.name)}}}),i("p",{staticClass:"over-auto"},[e._v(e._s(t.name))])],1)})),i("div",{attrs:{id:"picker-file"}},[e._v("上传附件")])],2)],1)},l=[],c=(i("a434"),{props:{fileList:Array},data:function(){return{}},methods:{clearFile:function(e){var t=this;this.fileList.forEach((function(i,a){i.name===e&&t.fileList.splice(a,1)}))}}}),u=c,m=(i("2254"),i("2877")),d=Object(m["a"])(u,r,l,!1,null,"2960bebf",null),h=d.exports,f=i("1c03"),p={name:"Apply",inject:["reload"],components:{UploaderModel:h},data:function(){return{currentUser:{localToken:"",appId:""},applyState:"您还未申请，请如实填写以下信息",backText:"返回",isShowBack:!0,isShowSheet:!1,isShowBottom:!1,sheetaActions:[],isShowStep:!1,activeStep:1,stepIconArr:["clock-o","records","close"],currentItem:"",isShowDatePicker:!1,minDate:new Date(2010,0,1),currentDate:new Date,docType:".png, .jpg, .jpeg,.doc,.docx,.xml",isCommited:!1,isShowConfirmButton:!1,forbidden:!1,formDate:[{name:"name",label:"用户名",value:"",isCommited:!1,rules:[{required:!0,message:"请正确填写用户名"}]},{name:"staffId",label:"工号",value:"",isCommited:!1,rules:[{required:!0,message:"请正确填写工号"}]},{name:"gender",label:"性别",value:"",id:"",rightIcon:"arrow-down",isCommited:!1,rules:[{required:!0,message:"请正确填写性别"}]},{name:"age",label:"年龄",value:"",isCommited:!1,rules:[{required:!0,message:"请正确填写年龄",validator:this.testAge}]},{name:"group",label:"次集团",value:"",id:"",rightIcon:"arrow-down",rules:[{required:!0,message:"请正确填写次集团"}]},{name:"area",label:"所在厂区",value:"",id:"",rightIcon:"arrow-down",rules:[{required:!0,message:"请正确填写所在厂区"}]},{name:"bu",label:"事业群",value:"",id:"",rightIcon:"arrow-down",rules:[{required:!0,message:"请正确填写事业群"}]},{name:"legelPerson",label:"法人",value:"",id:"",rightIcon:"arrow-down",rules:[{required:!0,message:"请正确填写法人"}]},{name:"costCode",label:"费用代码",value:"",rules:[{required:!0,message:"请正确填写费用代码"}]},{name:"identityCard",label:"身份证号",value:"",isCommited:!1,rules:[{required:!0,message:"请正确填写身份证号码",validator:this.testCardId}]},{name:"phone",label:"联系电话",value:"",isCommited:!1,rules:[{required:!0,message:"请正确填写手机号码",validator:this.testPhone}]},{name:"aTime",label:"到深日期",value:"",pickerDate:!0,rules:[{required:!0,message:"请正确填写到深日期"}]},{name:"isolationDays",label:"隔离天数",value:"",rules:[{required:!0,message:"请正确填写隔离天数"}]}],bufferDorm:!1,livingOutside:!1,leavingMessage:"",messageName:"note",fileList:[],myuploader:"",signatureList:[{fullName:"陈彦申",dateTime:"2020/2/20",suggest:"同意"},{fullName:"周铭嘉",dateTime:"2020/2/24",suggest:"同意"},{fullName:"邓嘉麟",dateTime:"2020/2/26"}]}},computed:{},watch:{},beforeCreate:function(){},created:function(){var e=this;if(this.$store.state.isOrg||(this.backText="",this.isShowBack=!1),console.log(this.$route.query),void 0!=this.$route.query.isShowBottom){this.isCommited=!0;var t=this.$route.query.appId;this.currentUser.appId=t,this.getOrderData("",this.currentUser.appId),this.$store.commit("changeTitle","核酸检测审批"),JSON.parse(sessionStorage.getItem("isLoad"))?(this.isShowBottom=!1,sessionStorage.setItem("isLoad",!1)):this.isShowBottom=this.$route.query.isShowBottom,this.isShowStep=!0,this.isShowConfirmButton=!1,this.$store.commit("changeRightTitle",""),this.applyState=""}else{this.$store.commit("changeTitle","我的申请");var i=this.$store.state.localToken;Object(f["g"])({token:i}).then((function(t){t.isFil&&!e.isShowBottom?(e.isCommited=!0,e.$store.commit("changeRightTitle",""),e.getOrderData(i,""),e.currentUser.localToken=i,e.isShowBottom=!1,e.isShowConfirmButton=!0,e.isShowStep=!0,e.applyState="您已提交申请，请等待审核完成后进行核酸检测"):(e.$store.commit("changeRightTitle","提交"),e.formDate.forEach((function(e){"name"===e.name&&(e.value=t.name),"staffId"===e.name&&(e.value=t.staffId),"phone"===e.name&&(e.value=t.phone),"gender"===e.name&&(e.value=t.SEX,"男"===t.SEX?e.id=1:"女"===t.SEX&&(e.id=0)),"age"===e.name&&(e.value=t.AGE),"identityCard"===e.name&&(e.value=t.IDENTITY_ID||""),e.value&&(e.isCommited=!0)})),e.isShowConfirmButton=!1,e.applyState="您还未申请，请如实填写以下信息")}))}},mounted:function(){this.myuploader=WebUploader.create({pick:"#picker-file",mimeTypes:".pdf, .doc, .docx, .xml, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .png, .jpeg, .jpg",capture:!1});var e=this;this.myuploader.on("fileQueued",(function(t){e.fileList.push(t.source.source)}))},destroyed:function(){},methods:{testCardId:function(e){var t=/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;return t.test(e)},testPhone:function(e){return/^1[3456789]\d{9}$/.test(e)},testAge:function(e){return/^(?:[1-9][0-9]?|1[01][0-9]|120)$/.test(e)},onSubmit:function(e){var t=this;console.log("submit",e),this.formDate.forEach((function(t){t.id&&(e[t.name]=t.id)}));var i=new FormData,a=this.bufferDorm?1:0,s=this.livingOutside?1:0;for(var o in e["bufferDormitory"]=a,e["outLive"]=s,e["token"]=this.$store.state.localToken,e)i.append(o,e[o]);this.fileList.forEach((function(e,t){i.append("file[]",e)})),console.log(i.getAll("file")),Object(f["a"])(i).then((function(e){console.log(e),t.$store.state.rightText="",t.$toast(e.reason),t.reload()}))},selectValue:function(e){var t=this;if(this.currentItem=e,e.pickerDate)this.isShowDatePicker=!0;else if("gender"===e.name)this.sheetaActions=[{name:"男",id:1},{name:"女",id:0}],this.isShowSheet=!0;else{var i={opt:e.name,token:this.$store.state.localToken};Object(f["d"])(i).then((function(e){var i=e.reduce((function(e,t){return[].concat(Object(n["a"])(e),[{name:t.name,id:t.id}])}),[]);t.sheetaActions=i,t.isShowSheet=!0}))}},onSelectSheet:function(e){this.currentItem.value=e.name,this.currentItem.id=e.id,console.log(this.currentItem),this.isShowSheet=!1},onConfirmDate:function(e){this.currentItem.value=this.formatDate(e),this.isShowDatePicker=!1},formatDate:function(e){return"".concat(e.getFullYear(),"/").concat(e.getMonth()+1,"/").concat(e.getDate())},onClickLeft:function(){this.$store.state.isOrg&&(console.log(this.$store.state.localToken),this.$router.push({name:"Index",params:{token:this.$store.state.localToken}}))},onClickRight:function(){this.$refs["form"].submit()},getOrderData:function(e,t){var i=this,a={token:e,applicationCode:t};Object(f["e"])(a).then((function(e){console.log(e),i.currentUser.appId=e.appCode,i.formDate.forEach((function(t,i){t.value=e[t.name]})),i.leavingMessage=e["note"],i.bufferDorm=0!=e.bufferDormitory,i.livingOutside=0!=e.outLive,i.signatureList=e.signatureList;var t=i.signatureList.slice(-1)[0];0!=t.signatureStatus&&0!=t.signatureFlag||(i.forbidden=!0)}))},signature:function(e){var t=this,i={token:this.$store.state.localToken,status:e,applicationCode:this.currentUser.appId,comment:"同意"};Object(f["i"])(i).then((function(i){0==i.nextNum&&1==e?t.$router.push({path:"/examine",query:t.currentUser}):t.reload()})),2==e&&this.reload(),sessionStorage.setItem("isLoad",!0)},navToFileList:function(){this.$router.push({path:"/enclosure",query:Object(o["a"])({},this.currentUser,{isShowBottom:this.isShowBottom})})},confirmOrder:function(){var e=this,t={token:this.currentUser.localToken,applicationCode:this.currentUser.appId,isShowBottom:this.isShowBottom};Object(f["b"])(t).then((function(t){console.log("===================================="),console.log(t),console.log("===================================="),e.reload()}))}}},g=p,v=(i("d7d9"),Object(m["a"])(g,a,s,!1,null,"20b84222",null));t["default"]=v.exports},2254:function(e,t,i){"use strict";var a=i("dcfd"),s=i.n(a);s.a},a434:function(e,t,i){"use strict";var a=i("23e7"),s=i("23cb"),o=i("a691"),n=i("50c4"),r=i("7b0b"),l=i("65f0"),c=i("8418"),u=i("1dde"),m=i("ae40"),d=u("splice"),h=m("splice",{ACCESSORS:!0,0:0,1:2}),f=Math.max,p=Math.min,g=9007199254740991,v="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!d||!h},{splice:function(e,t){var i,a,u,m,d,h,b=r(this),w=n(b.length),S=s(e,w),k=arguments.length;if(0===k?i=a=0:1===k?(i=0,a=w-S):(i=k-2,a=p(f(o(t),0),w-S)),w+i-a>g)throw TypeError(v);for(u=l(b,a),m=0;m<a;m++)d=S+m,d in b&&c(u,m,b[d]);if(u.length=a,i<a){for(m=S;m<w-a;m++)d=m+a,h=m+i,d in b?b[h]=b[d]:delete b[h];for(m=w;m>w-a+i;m--)delete b[m-1]}else if(i>a)for(m=w-a;m>S;m--)d=m+a-1,h=m+i-1,d in b?b[h]=b[d]:delete b[h];for(m=0;m<i;m++)b[m+S]=arguments[m+2];return b.length=w-a+i,u}})},b0c0:function(e,t,i){var a=i("83ab"),s=i("9bf2").f,o=Function.prototype,n=o.toString,r=/^\s*function ([^ (]*)/,l="name";!a||l in o||s(o,l,{configurable:!0,get:function(){try{return n.call(this).match(r)[1]}catch(e){return""}}})},cb9c:function(e,t,i){},d7d9:function(e,t,i){"use strict";var a=i("cb9c"),s=i.n(a);s.a},dcfd:function(e,t,i){},fb6a:function(e,t,i){"use strict";var a=i("23e7"),s=i("861d"),o=i("e8b5"),n=i("23cb"),r=i("50c4"),l=i("fc6a"),c=i("8418"),u=i("b622"),m=i("1dde"),d=i("ae40"),h=m("slice"),f=d("slice",{ACCESSORS:!0,0:0,1:2}),p=u("species"),g=[].slice,v=Math.max;a({target:"Array",proto:!0,forced:!h||!f},{slice:function(e,t){var i,a,u,m=l(this),d=r(m.length),h=n(e,d),f=n(void 0===t?d:t,d);if(o(m)&&(i=m.constructor,"function"!=typeof i||i!==Array&&!o(i.prototype)?s(i)&&(i=i[p],null===i&&(i=void 0)):i=void 0,i===Array||void 0===i))return g.call(m,h,f);for(a=new(void 0===i?Array:i)(v(f-h,0)),u=0;h<f;h++,u++)h in m&&c(a,u,m[h]);return a.length=u,a}})}}]);
//# sourceMappingURL=chunk-55d53894.9f3d873f.js.map