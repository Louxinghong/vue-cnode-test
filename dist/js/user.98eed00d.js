(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["user"],{"0331":function(t,a,e){},"37c2":function(t,a,e){"use strict";var s=e("0331"),n=e.n(s);n.a},"65d2":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"collection"},[t.lists.length>0?e("p",[t._v("个人收藏")]):e("p",[t._v("暂无收藏")]),e("topic-list",{attrs:{lists:t.lists,loading:t.loading}})],1)},n=[],r=(e("96cf"),e("89ba")),i=e("8533"),c=e("c24f"),l={name:"UserCollection",setup:function(t,a){var e=Object(i["h"])([]),s=Object(i["h"])(!1);return Object(i["d"])(Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return s.value=!0,t.next=3,Object(c["a"])(a.root.$route.params.loginname).then((function(t){e.value=t.data.data,s.value=!1})).catch((function(){s.value=!1}));case 3:case"end":return t.stop()}}),t)})))),{lists:e,loading:s}}},o=l,u=(e("37c2"),e("2877")),p=Object(u["a"])(o,s,n,!1,null,"989a1a56",null);a["default"]=p.exports},"7ccf":function(t,a,e){},c24f:function(t,a,e){"use strict";e.d(a,"b",(function(){return n})),e.d(a,"a",(function(){return r}));var s=e("a27e");function n(t){return s["a"].get("https://cnodejs.org/api/v1/user/".concat(t))}function r(t){return s["a"].get("https://cnodejs.org/api/v1/topic_collect/".concat(t))}},e382:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"user"},[e("div",{staticClass:"user-info"},[e("img",{staticClass:"avatar",attrs:{src:t.userDetail.avatar_url,alt:""}}),e("span",{staticClass:"name"},[t._v(t._s(t.userDetail.loginname))]),e("span",{staticClass:"score"},[t._v(t._s(t.userDetail.score)+"积分")]),e("span",{staticClass:"create-date"},[t._v("创建于"+t._s(t._f("dateFormat")(t.userDetail.create_at,"YYYY-MM-DD")))]),e("router-link",{staticClass:"title",attrs:{to:{name:"UserCollection",params:{loginname:t.userDetail.loginname}}}},[e("span",[t._v("查看收藏的话题")])])],1),e("div",{staticClass:"user-topic-reply"},[e("div",{staticClass:"topic-content"},[e("p",[t._v("创建的话题")]),e("div",{staticClass:"topics"},[e("ul",t._l(t.userDetail.recent_topics,(function(a,s){return e("li",{key:s},[e("img",{attrs:{src:a.author.avatar_url,alt:""}}),e("router-link",{staticClass:"title",attrs:{to:{name:"Topic",params:{id:a.id}}}},[e("span",[t._v(t._s(a.title))])]),t.isMobile?e("span",{staticClass:"last-time"},[t._v(t._s(t._f("dateFormat")(a.last_reply_at,"YYYY-MM-DD")))]):e("span",{staticClass:"last-time"},[t._v("上一次回复于"+t._s(t._f("dateFormat")(a.last_reply_at,"YYYY-MM-DD HH:mm:ss")))])],1)})),0)])]),e("div",{staticClass:"reply-content"},[e("p",[t._v("参与的话题")]),e("div",{staticClass:"replies"},[e("ul",t._l(t.userDetail.recent_replies,(function(a,s){return e("li",{key:s},[e("img",{attrs:{src:a.author.avatar_url,alt:""}}),e("router-link",{staticClass:"title",attrs:{to:{name:"Topic",params:{id:a.id}}}},[e("span",[t._v(t._s(a.title))])]),t.isMobile?e("span",{staticClass:"last-time"},[t._v(t._s(t._f("dateFormat")(a.last_reply_at,"YYYY-MM-DD")))]):e("span",{staticClass:"last-time"},[t._v("上一次回复于"+t._s(t._f("dateFormat")(a.last_reply_at,"YYYY-MM-DD HH:mm:ss")))])],1)})),0)])])])])},n=[],r=(e("96cf"),e("89ba")),i=e("c24f"),c=e("8533"),l=e("3800"),o={name:"User",setup:function(t,a){var e=Object(c["h"])(!1),s=Object(c["h"])({}),n=Object(c["h"])(!1);return Object(c["d"])(Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.value=!0,t.next=3,Object(i["b"])(a.root.$route.params.loginname).then((function(t){e.value=!1,s.value=t.data.data})).catch((function(){e.value=!1}));case 3:case"end":return t.stop()}}),t)})))),Object(c["i"])((function(){return l["b"].isMobile}),(function(t){n.value=t})),{userDetail:s,isMobile:n}}},u=o,p=(e("f96f"),e("2877")),_=Object(p["a"])(u,s,n,!1,null,"30de2490",null);a["default"]=_.exports},f96f:function(t,a,e){"use strict";var s=e("7ccf"),n=e.n(s);n.a}}]);
//# sourceMappingURL=user.98eed00d.js.map