(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45397734"],{"1a3c":function(t,e,n){},4719:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("van-nav-bar",{staticClass:"title-style",staticStyle:{"background-color":"#5d8eec"},attrs:{title:"核酸检测审批","left-text":"返回","left-arrow":"",fixed:""},on:{"click-left":t.backClick}}),n("van-cell",{attrs:{title:"检测时间","is-link":"",value:t.timeResult},on:{click:t.openDatePicker}}),n("van-cell",{attrs:{title:"检测地点","is-link":"",value:t.location.name},on:{click:function(e){t.isShowLocation=!0}}}),n("van-button",{staticClass:"confirm-button",attrs:{type:"info"},on:{click:t.confirm}},[t._v("确认")]),n("van-popup",{attrs:{position:"bottom"},model:{value:t.showDatePicker,callback:function(e){t.showDatePicker=e},expression:"showDatePicker"}},[n("van-datetime-picker",{attrs:{type:"datetime","min-date":t.minDate,"max-date":t.maxDate},on:{confirm:t.selectDate},model:{value:t.currentDate,callback:function(e){t.currentDate=e},expression:"currentDate"}})],1),n("van-action-sheet",{attrs:{actions:t.actionsLocation},on:{select:t.onSelect},model:{value:t.isShowLocation,callback:function(e){t.isShowLocation=e},expression:"isShowLocation"}})],1)},o=[],a=n("1c03"),c={data:function(){return{minDate:new Date(2010,0,1),maxDate:new Date(2025,10,1),currentDate:new Date,showDatePicker:!1,timeResult:"",isShowLocation:!1,location:"",actionsLocation:[{name:"选项"},{name:"选项"},{name:"选项"}]}},created:function(){var t=this;this.$store.commit("changeTitle","核酸检测审批"),this["currentUser"]=this.$route.query;var e={opt:"location",token:this.$store.state.localToken};Object(a["d"])(e).then((function(e){t.actionsLocation=e}))},methods:{openDatePicker:function(){this.showDatePicker=!0},selectDate:function(t){var e=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" "+this.checkTime(t.getHours())+":"+this.checkTime(t.getMinutes())+":"+this.checkTime(t.getSeconds());this.timeResult=e,this.showDatePicker=!1},checkTime:function(t){return t<10&&(t="0"+t),t},backClick:function(){this.$router.push({path:"/apply",query:{isShowBottom:!0,appId:this["currentUser"].appId}})},confirm:function(){var t={token:this.$store.state.localToken,applicationCode:this.currentUser.appId,checkTime:this.currentDate,location:this.location.id};Object(a["h"])(t).then((function(t){console.log(t)}))},onSelect:function(t){this.location=t,this.isShowLocation=!1}}},s=c,r=(n("a504"),n("2877")),l=Object(r["a"])(s,i,o,!1,null,"4d3cae4b",null);e["default"]=l.exports},a504:function(t,e,n){"use strict";var i=n("1a3c"),o=n.n(i);o.a}}]);
//# sourceMappingURL=chunk-45397734.98ab8ab7.js.map