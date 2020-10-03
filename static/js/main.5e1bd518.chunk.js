(this["webpackJsonpantd-demo"]=this["webpackJsonpantd-demo"]||[]).push([[0],{161:function(e,t,n){e.exports=n(296)},166:function(e,t,n){},167:function(e,t,n){},296:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(27),c=n.n(r),i=(n(166),n(157)),l=n(81),u=n.n(l),s=n(132),m=n(133),y=n(154),p=n(158),h=n(108),d=n(302),f=n(304),g=n(298),v=n(299),k=n(303),b=n(51),C=n(300),T=n(301),E=(n(167),d.a.TabPane);function I(e){console.log(e)}function B(e,t){var n={};n[e]=t,chrome.storage.sync.set(n,(function(){console.log("Saved configuration: ".concat(e," -> ").concat(t)),chrome.storage.sync.get(["teamcityUrl","teamcityToken","teamcityBuildTypeId","matchPattern"],(function(e){console.log("After set: ",e)}))}))}var S={labelCol:{span:4},wrapperCol:{span:16}},w=[{title:"Url",dataIndex:"url"},{title:"Title",dataIndex:"title"}],x={onChange:function(e,t){console.log("selectedRowKeys: ".concat(e),"selectedRows: ",t)},getCheckboxProps:function(e){return{disabled:"Disabled User"===e.name,name:e.name}}};function U(e){return P.apply(this,arguments)}function P(){return(P=Object(h.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Submitting urls: ",t),e.next=3,new Promise((function(e,n){chrome.runtime.sendMessage({action:"submitAll",urls:t},(function(t){console.log("Received response from background: ",t),e(t.urls)}))}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var O=function(e){Object(p.a)(n,e);var t=Object(y.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).state={urls:[],teamcityUrl:null,teamcityToken:null,teamcityBuildTypeId:null,matchPattern:""},a}return Object(m.a)(n,[{key:"onTeamCityUrlInputChange",value:function(e){this.setState({teamcityUrl:e.target.value})}},{key:"onTeamcityTokenInputChange",value:function(e){this.setState({teamcityToken:e.target.value})}},{key:"onTeamcityBuildTypeIdInputChange",value:function(e){this.setState({teamcityBuildTypeId:e.target.value})}},{key:"componentDidMount",value:function(){var e=this;chrome&&chrome.storage?(console.log("Running in a Chrome Extension environment"),chrome.storage.sync.get(["teamcityUrl","teamcityToken","teamcityBuildTypeId","matchPattern"],(function(t){console.log(t),e.setState(t),chrome.runtime.sendMessage({action:"getMatchedTab"},(function(t){if(null!==t&&void 0!==t){var n=t.urls;e.setState({urls:n})}}))}))):console.warn("Not running in a Chrome Extension environment")}},{key:"componentWillUnmount",value:function(){}},{key:"onSubmitButtonClick",value:function(){var e=Object(h.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("onSubmitButtonClick"),e.next=3,U(t);case 3:n=e.sent,f.b.info("".concat(n.length," pages are submitted to TeamCity!"));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"onFilterButtonClick",value:function(e){console.log("onFilterButtonClick"),B("matchPattern",this.state.matchPattern)}},{key:"onMatchPatternValueChange",value:function(e){this.setState({matchPattern:e.target.value})}},{key:"onOptionsTabSubmitButtonClick",value:function(e){var t=this.state,n=t.teamcityUrl,a=t.teamcityToken,o=t.teamcityBuildTypeId;B("teamcityUrl",n),B("teamcityToken",a),B("teamcityBuildTypeId",o)}},{key:"render",value:function(){var e=this,t=this.state,n=t.urls,a=t.teamcityUrl,r=t.teamcityToken,c=t.teamcityBuildTypeId,l=t.matchPattern,u=new RegExp(l),s=n.filter((function(e){return u.test(e)}));console.log("setState():filteredUrls: ",s);var m=1,y=s.map((function(e){return{key:""+m++,url:e,title:""}}));return console.log("render(): ",y),o.a.createElement("div",{className:"App"},o.a.createElement(d.a,{defaultActiveKey:"1",onChange:I},o.a.createElement(E,{tab:"Batch Submission",key:"batch-submission"},o.a.createElement(g.a,{style:{margin:"10px"}},o.a.createElement(v.a,{span:8},o.a.createElement(k.a,{placeholder:"",value:l,onChange:function(t){return e.onMatchPatternValueChange(t)}})),o.a.createElement(v.a,{span:2},o.a.createElement(b.a,{type:"primary",onClick:function(t){return e.onFilterButtonClick(t)}},"Filter")),o.a.createElement(v.a,{span:12}),o.a.createElement(v.a,{span:2},o.a.createElement(b.a,{type:"primary",onClick:function(){return e.onSubmitButtonClick(s)}},"Submit"))),o.a.createElement("div",null,o.a.createElement(C.a,{rowSelection:Object(i.a)({type:"checkbox"},x),columns:w,dataSource:y,size:"small"}))),o.a.createElement(E,{tab:"Options",key:"options"},o.a.createElement(T.a,S,o.a.createElement(T.a.Item,{label:"TeamCity Url"},o.a.createElement(k.a,{placeholder:"http://teamcity.example.com",value:a,onChange:function(t){return e.onTeamCityUrlInputChange(t)}})),o.a.createElement(T.a.Item,{label:"TeamCity Token"},o.a.createElement(k.a,{placeholder:"",value:r,onChange:function(t){return e.onTeamcityTokenInputChange(t)}})),o.a.createElement(T.a.Item,{label:"TeamCity Build Type Id"},o.a.createElement(k.a,{placeholder:"",value:c,onChange:function(t){return e.onTeamcityBuildTypeIdInputChange(t)}})),o.a.createElement(T.a.Item,null,o.a.createElement(b.a,{type:"primary",onClick:function(t){return e.onOptionsTabSubmitButtonClick(t)}},"Submit"))))))}}]),n}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(O,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[161,1,2]]]);
//# sourceMappingURL=main.5e1bd518.chunk.js.map