(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9fe0de50"],{"18f0":function(t,e,r){"use strict";var s=r("570f"),n=r.n(s);n.a},"570f":function(t,e,r){},9903:function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"my-info"}},[r("b-card",[r("div",{attrs:{slot:"header"},slot:"header"},[r("i",{staticClass:"fa fa-align-justify"}),r("strong",[t._v(" 내 정보")])]),r("b-form",{on:{submit:function(e){return e.preventDefault(),t.modify(e)}}},[t._v("\n        이름 : "+t._s(t.user.name)),r("br"),t._v("\n        나이 : "+t._s(t.user.age)),r("br"),t._v("\n        이메일 : "+t._s(t.user.email)),r("br"),t._v("\n        생성일 : "+t._s(t._f("dateToPritty")(t.user.regDate))+" "),r("br"),r("b-button",{attrs:{type:"submit",size:"sm",variant:"success"}},[t._v("수정하기")])],1)],1),r("b-card",{attrs:{"header-tag":"header","footer-tag":"footer"}},[r("div",{attrs:{slot:"header"},slot:"header"},[r("i",{staticClass:"fa fa-align-justify"}),r("strong",[t._v(" 작성한 게시물 ")]),r("div",{staticClass:"card-header-actions"},[r("a",{staticClass:"card-header-action",attrs:{href:"https://bootstrap-vue.js.org/docs/components/list-group",rel:"noreferrer noopener",target:"_blank"}},[r("small",{staticClass:"text-muted"},[t._v("docs")])])])]),t._l(t.messages,function(e){return r("b-list-group",{key:e.id},[r("b-list-group-item",[t._v("\n          게시판명 : "+t._s(e.board.name)),r("br"),t._v("\n          제목 : "+t._s(e.title)+" "),r("br"),t._v("\n          내용 : "+t._s(e.contents)+" "),r("br"),t._v("  \n          생성일: "+t._s(t._f("dateToPritty")(e.regDate))+" \n          ")])],1)})],2)],1)},n=[],a=r("be94"),o=r("a394"),i=r("2f62"),c=r("c1df"),u=r.n(c),f={name:"my-info",data:function(){return{}},created:function(){this.$store.dispatch("".concat(o["h"]))},computed:Object(a["a"])({},Object(i["b"])(["user","messages","boards"])),methods:{modify:function(){this.$router.push({path:"/modify"})}},filters:{dateToPritty:function(t){return u()(t).local().format("YYYY-MM-DD HH:mm:ss")}}},l=f,d=(r("18f0"),r("2877")),b=Object(d["a"])(l,s,n,!1,null,null,null);b.options.__file="MyInfo.vue";e["default"]=b.exports},be94:function(t,e,r){"use strict";r.d(e,"a",function(){return n});var s=r("ade3");function n(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),n.forEach(function(e){Object(s["a"])(t,e,r[e])})}return t}}}]);
//# sourceMappingURL=chunk-9fe0de50.b6748015.js.map