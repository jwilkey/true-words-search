webpackJsonp([1],{"0KHb":function(e,t){},"61ID":function(e,t){},DbfK:function(e,t){},NHnr:function(e,t,s){"use strict";function n(e){s("61ID")}function a(e){return e.toLowerCase()}function r(e){s("0KHb")}function i(e){s("ffal")}function o(e){s("DbfK"),s("v6p1")}function c(e){s("oQxR")}Object.defineProperty(t,"__esModule",{value:!0});var l=s("7+uW"),u={name:"app"},f=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"theme-back",attrs:{id:"app"}},[s("router-view")],1)},d=[],h={render:f,staticRenderFns:d},v=h,p=s("VU/8"),m=n,_=p(u,v,!1,m,null,null),g=_.exports,y=s("/ocq"),C=s("mtWM"),x=s.n(C),R="https://true-words-server.herokuapp.com",b={headers:{"Content-Type":"application/json","x-truewords-id":window.twid}},w={fetchCrossReferences:function(e){return x.a.post(R+"/cross-reference",{text:e},b).then(function(e){return e.data})},fetchTexts:function(e){return x.a.get(R+"/texts/"+e.join(","),b).then(function(e){return e.data.response.search.result.passages})},search:function(e){return x.a.get(R+"/search/"+e,b).then(function(e){return e.data})},synonyms:function(e,t){var s=t?"?pos="+t:"";return x.a.get(R+"/synonyms/"+e+s,b).then(function(e){return e.data})}},S=this,E=function(e){return a(e.verse_text).includes(a(S.filter))||a(e.book_name).includes(a(S.filter))},k={data:function(){return{query:"",fetchedQuery:"",loading:!1,loadingSynonyms:!1,filter:"",showAdvanced:!1,pos:void 0,results:void 0,synonyms:void 0,synResults:void 0}},computed:{filteredResults:function(){return this.filter?this.results.filter(E):this.results},filteredSynResults:function(){return this.filter?this.synResults.filter(E):this.synResults}},methods:{highlightQuery:function(e){var t=new RegExp("("+this.fetchedQuery+")","gi"),s=new RegExp("("+this.filter+")","gi");return(this.filter?e.replace(s,'<span class="back-blue">$1</span>'):e).replace(t,'<span class="back-orange">$1</span>')},highlightSyns:function(e){var t="("+this.synonyms.join("|")+")",s=new RegExp(t,"gi"),n=new RegExp("("+this.filter+")","gi");return(this.filter?e.replace(n,'<span class="back-blue">$1</span>'):e).replace(s,'<span class="back-red">$1</span>')},togglePos:function(e){this.pos=this.pos===e?void 0:e,this.fetchSynonyms()},posClass:function(e){return this.pos===e?["back-red"]:[]},search:function(){this.loading=!0;var e=this;w.search(this.query).then(function(t){e.fetchedQuery=e.query,e.results=t[1],e.loading=!1}).catch(function(t){e.loading=!1}),this.fetchSynonyms()},fetchSynonyms:function(){var e=this;this.loadingSynonyms=!0,w.synonyms(this.query,this.pos).then(function(t){e.synonyms=t.filter(function(e){return!e.includes("antonym")&&e.length>2}),w.search(e.synonyms.join("|")).then(function(t){e.synResults=t[1],e.loadingSynonyms=!1})}).catch(function(t){e.loadingSynonyms=!1})},verseSelected:function(e){var t="https://spotlight.truewordsapp.com/#/?passage="+e.book_name+e.chapter_id+"&selection="+this.query;window.open(t,"_blank").focus()},toggleAdvanced:function(){this.showAdvanced=!this.showAdvanced}},mounted:function(){this.query=this.$route.query.q,this.query&&this.search()}},T=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"search flex-column"},[s("div",{staticClass:"theme-mid shadow search-form flex-column"},[s("form",{staticClass:"flex-row",on:{submit:function(t){t.preventDefault(),e.search(t)}}},[s("div",{staticClass:"flex-row flex-one align-center"},[e._m(0),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.query,expression:"query"}],staticClass:"hi-bottom flex-one",attrs:{name:"search",keyup:e.search,placeholder:"search",autocomplete:"off",autofocus:""},domProps:{value:e.query},on:{input:function(t){t.target.composing||(e.query=t.target.value)}}})]),e._v(" "),e.results?s("div",{staticClass:"filter flex-row flex-one align-center"},[e._m(1),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.filter,expression:"filter"}],staticClass:"hi-bottom flex-one",attrs:{name:"filter",placeholder:"filter"},domProps:{value:e.filter},on:{input:function(t){t.target.composing||(e.filter=t.target.value)}}}),e._v(" "),s("button",{staticClass:"callout-light font-smaller",on:{click:function(t){t.preventDefault(),e.toggleAdvanced(t)}}},[s("i",{staticClass:"fa fa-gears"})])]):e._e()]),e._v(" "),e.showAdvanced?s("div",{staticClass:"advanced hi-top"},[s("button",{staticClass:"callout-light",class:e.posClass("n"),on:{click:function(t){e.togglePos("n")}}},[e._v("Nouns")]),e._v(" "),s("button",{staticClass:"callout-light",class:e.posClass("a"),on:{click:function(t){e.togglePos("a")}}},[e._v("Adjectives")]),e._v(" "),s("button",{staticClass:"callout-light",class:e.posClass("v"),on:{click:function(t){e.togglePos("v")}}},[e._v("Verbs")])]):e._e()]),e._v(" "),e.results?s("div",{staticClass:"results flex-one flex-row vfull",class:{blur:e.loading}},[s("div",{staticClass:"flex-one flex-column"},[s("p",{staticClass:"title back-orange shadow"},[e._v(e._s(e.results.length)+" verses")]),e._v(" "),s("div",{staticClass:"flex-one substance scrolly"},e._l(e.filteredResults,function(t){return s("div",{staticClass:"verse theme-mid shadow",on:{click:function(s){e.verseSelected(t)}}},[s("span",{staticClass:"reference callout-light alt"},[e._v(e._s(t.book_name)+" "+e._s(t.chapter_id)+":"+e._s(t.verse_id))]),e._v(" "),s("span",{staticClass:"verse-text",domProps:{innerHTML:e._s(e.highlightQuery(t.verse_text))}})])}))]),e._v(" "),e.synResults?s("div",{staticClass:"synonyms flex-one flex-column",class:{faded:e.loadingSynonyms}},[s("p",{staticClass:"title back-red shadow"},[e._v(e._s(e.synonyms.length)+" synonyms, "+e._s(e.synResults.length)+" verses")]),e._v(" "),s("div",{staticClass:"flex-one substance"},e._l(e.filteredSynResults,function(t){return s("div",{staticClass:"verse theme-mid shadow"},[s("span",{staticClass:"reference callout-light alt"},[e._v(e._s(t.book_name)+" "+e._s(t.chapter_id)+":"+e._s(t.verse_id))]),e._v(" "),s("span",{staticClass:"verse-text",domProps:{innerHTML:e._s(e.highlightSyns(t.verse_text))}})])}))]):e._e()]):e._e(),e._v(" "),s("transition",{attrs:{name:"fade"}},[e.loading?s("div",{staticClass:"loading theme-mid"},[s("i",{staticClass:"fa fa-circle-o-notch fa-spin fa-3x callout-light alt"})]):e._e()])],1)},q=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("button",{staticClass:"callout-light",attrs:{type:"submit"}},[s("i",{staticClass:"fa fa-search"})])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("label",{staticClass:"muted",attrs:{for:"filter"}},[s("i",{staticClass:"fa fa-filter blue"})])}],$={render:T,staticRenderFns:q},P=$,A=s("VU/8"),D=r,j=A(k,P,!1,D,null,null),N=j.exports,F=s("Dd8w"),H=s.n(F),Q=s("NYxO"),O={name:"TextDump",data:function(){return{text:""}},methods:H()({},Object(Q.b)(["setCrossReferences"]),{update:function(e){this.text=e},fetchCrossReferences:function(){var e=this;w.fetchCrossReferences(this.text).then(function(t){e.setCrossReferences(t)})}})},V=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"flex-column text-dump"},[s("div",{staticClass:"text-input theme-mid flex-one shadow",attrs:{contenteditable:"true"},on:{input:function(t){e.update(t.target.innerText)}}}),e._v(" "),s("button",{staticClass:"callout-light shadow-long",on:{click:e.fetchCrossReferences}},[e._v("submit")])])},M=[],U={render:V,staticRenderFns:M},K=U,L=s("VU/8"),I=i,W=L(O,K,!1,I,"data-v-30cd58f2",null),J=W.exports,Y=s("gRE1"),z=s.n(Y),B={name:"CrossReferences",data:function(){return{verses:[]}},computed:H()({},Object(Q.c)(["crossReferences"])),watch:{crossReferences:function(){var e=this,t=[];z()(this.crossReferences).forEach(function(e){t=t.concat(e)}),w.fetchTexts(t).then(function(t){e.verses=t})}},methods:{formatted:function(e){return e},verseText:function(e){if(this.verses&&this.verses.length){var t=e.split("-"),s=this.verses.find(function(e){return e.start_verse_id.includes(t[0])&&(2!==t.length||e.end_verse_id.includes(t[1]))});return s?s.text:void 0}}}},G=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"cross-references"},e._l(e.crossReferences,function(t,n){return s("div",{staticClass:"hi-bottom topic-group theme-mid"},[s("p",{staticClass:"topic callout-light"},[e._v(e._s(n))]),e._v(" "),e._l(t,function(t){return s("div",{staticClass:"verse hi-bottom"},[s("p",{staticClass:"verse-ref"},[e._v(e._s(e.formatted(t[0])))]),e._v(" "),s("transition",{attrs:{name:"fade"}},[s("div",{staticClass:"verse-text",domProps:{innerHTML:e._s(e.verseText(t[0]))}})])],1)})],2)}))},X=[],Z={render:G,staticRenderFns:X},ee=Z,te=s("VU/8"),se=o,ne=te(B,ee,!1,se,"data-v-775ebcb8",null),ae=ne.exports,re={name:"TextCrossReference",components:{TextDump:J,CrossReferences:ae}},ie=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"vfull flex-row"},[s("text-dump",{staticClass:"flex-one"}),e._v(" "),s("cross-references",{staticClass:"theme-mid shadow"})],1)},oe=[],ce={render:ie,staticRenderFns:oe},le=ce,ue=s("VU/8"),fe=c,de=ue(re,le,!1,fe,"data-v-9e63360e",null),he=de.exports;l.a.use(y.a);var ve=new y.a({routes:[{path:"/",name:"Search",component:N},{path:"/cross-reference",name:"TextCrossReference",component:he}]});l.a.use(Q.a);var pe={crossReferences:{}},me={crossReferences:function(e){return e.crossReferences}},_e={setCrossReferences:function(e,t){(0,e.commit)("SET_CROSS_REFERENCES",t)}},ge={SET_CROSS_REFERENCES:function(e,t){e.crossReferences=t}},ye=new Q.a.Store({state:pe,getters:me,mutations:ge,actions:_e});l.a.config.productionTip=!1,new l.a({el:"#app",store:ye,router:ve,template:"<App/>",components:{App:g}})},ffal:function(e,t){},oQxR:function(e,t){},v6p1:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.cf0e688d960f16d54cd0.js.map