(function(e){function n(n){for(var r,a,c=n[0],i=n[1],s=n[2],f=0,l=[];f<c.length;f++)a=c[f],Object.prototype.hasOwnProperty.call(u,a)&&u[a]&&l.push(u[a][0]),u[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);d&&d(n);while(l.length)l.shift()();return o.push.apply(o,s||[]),t()}function t(){for(var e,n=0;n<o.length;n++){for(var t=o[n],r=!0,a=1;a<t.length;a++){var c=t[a];0!==u[c]&&(r=!1)}r&&(o.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},a={app:0},u={app:0},o=[];function c(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-51762102":"3726366e","chunk-5aff528e":"6973cb8f","chunk-66dd3396":"7da7116f","chunk-cae1053a":"4b091c70","chunk-ce9a16e4":"ec4294a5"}[e]+".js"}function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-51762102":1,"chunk-5aff528e":1,"chunk-66dd3396":1,"chunk-cae1053a":1,"chunk-ce9a16e4":1};a[e]?n.push(a[e]):0!==a[e]&&t[e]&&n.push(a[e]=new Promise((function(n,t){for(var r="css/"+({}[e]||e)+"."+{"chunk-51762102":"5d8880a6","chunk-5aff528e":"e4c68c61","chunk-66dd3396":"22072aab","chunk-cae1053a":"4ff3b802","chunk-ce9a16e4":"6ac42932"}[e]+".css",u=i.p+r,o=document.getElementsByTagName("link"),c=0;c<o.length;c++){var s=o[c],f=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(f===r||f===u))return n()}var l=document.getElementsByTagName("style");for(c=0;c<l.length;c++){s=l[c],f=s.getAttribute("data-href");if(f===r||f===u)return n()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=n,d.onerror=function(n){var r=n&&n.target&&n.target.src||u,o=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete a[e],d.parentNode.removeChild(d),t(o)},d.href=u;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){a[e]=0})));var r=u[e];if(0!==r)if(r)n.push(r[2]);else{var o=new Promise((function(n,t){r=u[e]=[n,t]}));n.push(r[2]=o);var s,f=document.createElement("script");f.charset="utf-8",f.timeout=120,i.nc&&f.setAttribute("nonce",i.nc),f.src=c(e);var l=new Error;s=function(n){f.onerror=f.onload=null,clearTimeout(d);var t=u[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",l.name="ChunkLoadError",l.type=r,l.request=a,t[1](l)}u[e]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:f})}),12e4);f.onerror=f.onload=s,document.head.appendChild(f)}return Promise.all(n)},i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],f=s.push.bind(s);s.push=n,s=s.slice();for(var l=0;l<s.length;l++)n(s[l]);var d=f;o.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"1c03":function(e,n,t){"use strict";t.d(n,"g",(function(){return l})),t.d(n,"d",(function(){return d})),t.d(n,"a",(function(){return p})),t.d(n,"e",(function(){return h})),t.d(n,"f",(function(){return m})),t.d(n,"i",(function(){return g})),t.d(n,"c",(function(){return b})),t.d(n,"b",(function(){return v})),t.d(n,"h",(function(){return y})),t.d(n,"j",(function(){return k}));t("d3b7"),t("e7e5");var r,a=t("d399"),u=t("bc3a"),o=t.n(u),c=t("4328"),i=t.n(c),s=t("2b0e");function f(e,n){return new Promise((function(t,r){o.a.post(e,n).then((function(e){t(e.data)})).catch((function(e){r(e.data)}))}))}s["a"].use(a["a"]),o.a.defaults.baseURL="https://iot.xiaofuonline.com/Staff_management_app/home/NucleicAcid",o.a.defaults.timeout=6e4,o.a.interceptors.request.use((function(e){return r=a["a"].loading({duration:1e4,forbidClick:!0,loadingType:"spinner",message:"加载中..."}),e}),(function(e){return Promise.reject(e)})),o.a.interceptors.response.use((function(e){return e.data["reason"]&&Object(a["a"])(e.data.reason),1==e.data.success?(r.clear(),e):void 0}),(function(e){return Object(a["a"])("请求失败，请稍后重试！"),Promise.reject(e)}));var l=function(e){return f("/getNatApplicationInfo",i.a.stringify(e)).then((function(e){return e.data}))},d=function(e){return f("/getOption",i.a.stringify(e)).then((function(e){return e.data}))},p=function(e){return f("/createNatApplication",e,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){return e}))},h=function(e){return f("/getSignatureInfo",i.a.stringify(e)).then((function(e){return e.data}))},m=function(e){return f("/getSignatureList",i.a.stringify(e)).then((function(e){return e.data}))},g=function(e){return f("/signatureNAT",i.a.stringify(e)).then((function(e){return e.data}))},b=function(e){return f("/getAttachmentList",i.a.stringify(e)).then((function(e){return e.data}))},v=function(e){return f("/confirm",i.a.stringify(e)).then((function(e){return e}))},y=function(e){return f("/setCheckInfo",i.a.stringify(e)).then((function(e){return e.data}))},k=function(e){return f("/updateCheckResult",e,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){return e}))}},2395:function(e,n,t){},"31f4":function(e,n,t){},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var r=t("2b0e"),a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[e.isRouterAlive?t("router-view",{ref:"currentView"}):e._e()],1)},u=[],o={name:"App",provide:function(){return{reload:this.reload}},data:function(){return{isRouterAlive:!0}},methods:{reload:function(){this.isRouterAlive=!1,this.$nextTick((function(){this.isRouterAlive=!0}))}}},c=o,i=(t("7c55"),t("2877")),s=Object(i["a"])(c,a,u,!1,null,null,null),f=s.exports,l=(t("d3b7"),t("8c4f")),d=(t("a9e3"),t("2f62"));r["a"].use(d["a"]);var p=new d["a"].Store({state:{pageTitle:"",rightText:"",isOrg:Number,localToken:String},mutations:{changeTitle:function(e,n){e.pageTitle=n},changeRightTitle:function(e,n){e.rightText=n},changeOrgState:function(e,n){e.isOrg=n},setLocalToken:function(e,n){e.localToken=n}},actions:{},modules:{}}),h=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"container"},[t("van-nav-bar",{staticClass:"title-style",staticStyle:{"background-color":"#5d8eec"},attrs:{title:"核酸检测","left-text":"返回","left-arrow":"",fixed:""},on:{"click-left":e.onClickLeft}}),t("van-grid",{attrs:{"column-num":3,clickable:""}},e._l(e.itemList,(function(n){return t("van-grid-item",{key:n.icon,staticClass:"dejan-grid-item",on:{click:function(t){return e.$router.push(n.url)}}},[t("van-icon",{staticClass:"iconfont",attrs:{size:"26","class-prefix":"nucleintest",name:n.icon}}),t("span",[e._v(e._s(n.name))])],1)})),1)],1)},m=[],g={name:"Index",data:function(){return{itemList:[{icon:"icon-shenpi",name:"我的申请",url:"/apply"},{icon:"icon-shenqing",name:"审批",url:"/approval"},{icon:"icon-mianbaoxie",name:"检测结果录入",url:"/entryResult"}],isHr:!0}},created:function(){},methods:{onClickLeft:function(){this.$router.back(-1)}}},b=g,v=(t("e720"),Object(i["a"])(b,h,m,!1,null,"0a18a9c3",null)),y=v.exports,k=t("1c03");t("4160"),t("caad"),t("c975"),t("ac1f"),t("2532"),t("1276"),t("159b");function w(e){var n=location.href,t=n.indexOf("?");n=n.substr(t+1);var r=n.split("&"),a="";return r.forEach((function(n){n.includes("".concat(e,"="))&&(a=n.split("=")[1])})),a}r["a"].use(l["a"]);var O=[{path:"/",name:"Index",component:y},{path:"/approval",name:"Approval",component:function(){return t.e("chunk-51762102").then(t.bind(null,"71ff"))}},{path:"/enclosure",name:"Enclosure",component:function(){return t.e("chunk-ce9a16e4").then(t.bind(null,"5a8d"))}},{path:"/apply",name:"Apply",component:function(){return t.e("chunk-cae1053a").then(t.bind(null,"1533"))}},{path:"/examine",name:"Examine",component:function(){return t.e("chunk-66dd3396").then(t.bind(null,"4719"))}},{path:"/entryResult",name:"EntryResult",component:function(){return t.e("chunk-5aff528e").then(t.bind(null,"c55f"))}}],x=new l["a"]({mode:"history",base:"",routes:O});x.beforeEach((function(e,n,t){if("/"===e.path){var r=w("token");p.commit("setLocalToken",r),Object(k["g"])({token:r}).then((function(e){p.commit("changeOrgState",e.isOrg),e.isOrg?t():t("/apply")}))}else t()}));var T=x,j=(t("2994"),t("2bdd")),_=(t("4ddd"),t("9f14")),A=(t("a44c"),t("e27c")),C=(t("5852"),t("d961")),S=(t("8a58"),t("e41f")),E=(t("d1cf"),t("ee83")),L=(t("e7e5"),t("d399")),P=(t("1f87"),t("510b")),N=(t("77f8"),t("dc0f")),R=(t("9cb7"),t("66fd")),$=(t("bda7"),t("5e46")),I=(t("da3c"),t("0b33")),q=(t("5246"),t("6b41")),M=(t("e930"),t("8f80")),B=(t("6d73"),t("473d")),D=(t("2cbd"),t("ab2c")),H=(t("b000"),t("1a23")),J=(t("0653"),t("34e9")),U=(t("c194"),t("7744")),z=(t("be7f"),t("565f")),F=(t("38d5"),t("772a")),K=(t("c3a6"),t("ad06")),V=(t("0ec5"),t("21ab")),G=(t("3df5"),t("2830")),Q=(t("66b9"),t("b650"));r["a"].use(Q["a"]),r["a"].use(G["a"]),r["a"].use(V["a"]),r["a"].use(K["a"]),r["a"].use(F["a"]),r["a"].use(z["a"]),r["a"].use(U["a"]),r["a"].use(J["a"]),r["a"].use(H["a"]),r["a"].use(D["a"]),r["a"].use(B["a"]),r["a"].use(M["a"]),r["a"].use(q["a"]),r["a"].use(I["a"]),r["a"].use($["a"]),r["a"].use($["a"]),r["a"].use(R["a"]),r["a"].use(N["a"]),r["a"].use(P["a"]),r["a"].use(L["a"]),r["a"].use(E["a"]),r["a"].use(S["a"]),r["a"].use(C["a"]),r["a"].use(A["a"]),r["a"].use(_["a"]),r["a"].use(j["a"]),r["a"].prototype.$toast=L["a"];t("31f4");r["a"].config.productionTip=!1,new r["a"]({router:T,store:p,render:function(e){return e(f)}}).$mount("#app")},"63e2":function(e,n,t){},"7c55":function(e,n,t){"use strict";var r=t("2395"),a=t.n(r);a.a},e720:function(e,n,t){"use strict";var r=t("63e2"),a=t.n(r);a.a}});
//# sourceMappingURL=app.6cc4a4ab.js.map