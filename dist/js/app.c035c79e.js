(function(){"use strict";var e={5821:function(e,t,n){var o=n(9242),r=n(3396),l=n(7139);const s={class:"container"},i={class:"container"},c={class:"settings"},d=(0,r._)("button",{class:"button"},"Конвертировать",-1),a={ref:"hiddenHTML",class:"hiddenHTML"};function u(e,t,n,o,u,b){const p=(0,r.up)("CodeEditor"),f=(0,r.up)("DropdownSelect");return(0,r.wg)(),(0,r.iD)("div",null,[(0,r._)("div",s,[(0,r.Wm)(p,(0,r.dG)({languages:[["HTML","HTML"]],modelValue:u.content,"onUpdate:modelValue":t[0]||(t[0]=e=>u.content=e),wrap_code:!0},b.getTextareaAttrs),null,16,["modelValue"]),(0,r.Wm)(p,(0,r.dG)({languages:[["HTML","HTML"]],modelValue:u.result,"onUpdate:modelValue":t[1]||(t[1]=e=>u.result=e),wrap_code:!0},b.getTextareaAttrs),null,16,["modelValue"])]),(0,r._)("div",i,[(0,r._)("div",c,[(0,r._)("button",{class:"button",onClick:t[2]||(t[2]=(...e)=>b.addAttributess&&b.addAttributess(...e))},"Проставить атрибуты"),d,(0,r.Wm)(f,{blockTypes:u.blockTypes,selectedBlockType:u.selectedBlockType,onSelectType:b.selectType},{default:(0,r.w5)((()=>[(0,r.Uk)((0,l.zw)(u.selectedBlockType),1)])),_:1},8,["blockTypes","selectedBlockType","onSelectType"])])]),(0,r._)("div",a,null,512)])}var b=n(7393);const p={class:"dropdown-select"},f={class:"dropdown-select__menu"},g=["onClick"];function m(e,t,n,s,i,c){return(0,r.wg)(),(0,r.iD)("div",p,[(0,r._)("button",{class:(0,l.C_)(["dropdown-select__text",{open:i.dropdownOpened}]),onClick:t[0]||(t[0]=(...e)=>c.toggleDropdown&&c.toggleDropdown(...e)),onBlur:t[1]||(t[1]=e=>i.dropdownOpened=!1)},[(0,r.WI)(e.$slots,"default")],34),(0,r.Wm)(o.uT,{name:"slide"},{default:(0,r.w5)((()=>[(0,r.wy)((0,r._)("div",f,[(0,r._)("ul",null,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(n.blockTypes,(t=>((0,r.wg)(),(0,r.iD)("li",{class:(0,l.C_)([{active:t==this.selectedBlockType},"dropdown-select__item"]),key:t,onClick:n=>e.$emit("selectType",t)},(0,l.zw)(t),11,g)))),128))])],512),[[o.F8,i.dropdownOpened]])])),_:1})])}var h={name:"DropdownSelect",props:{blockTypes:Array,selectedBlockType:String},data(){return{dropdownOpened:!1}},methods:{toggleDropdown(){this.dropdownOpened=!this.dropdownOpened}}},v=n(89);const w=(0,v.Z)(h,[["render",m]]);var y=w;function T(){function e(e,t){t=t||"abcdefghijklmnopqrstuvwxyz0123456789";var n="",o=0;while(o<e){let e=Math.floor(Math.random()*t.length);n+=t.substring(e,e+1),o++}return n}return"el"+e(5,null).toLowerCase()}function k(){const e=document.querySelector(".hiddenHTML"),t=e.querySelectorAll("*");let n=[];return t.forEach((e=>{let t=null,o=e.childNodes;const r=/\bDIV\b|\bP\b|\bSPAN\b|\bH1\b|\bH2\b|\bH3\b|\bH4\b|\bH5\b|\bH6\b|\bB\b|\bSTRONG\b|\bBLOQUOTE\b|\bI\b|\bLABEL\b|\bQ\b|\bS\b/;e.hasAttribute("elementid")?t=e.getAttribute("elementid"):(t=T(),e.setAttribute("elementid",t));for(let l=0;l<o.length;l++)if(3==o[l].nodeType&&""!=o[l].textContent.trim()&&e==o[l].parentNode&&e.children.length>0){const e=document.createElement("span");o[l].after(e),e.appendChild(o[l]),console.log(e),n.push(e)}e.setAttribute("ng-class",`sitecontent['${t}']['classes']`),e.setAttribute("ng-style",`sitecontent['${t}']['style']`),e.setAttribute("ng-attr-modelid",`{{sitecontent['${t}']['modelid']}}`),"A"===e.tagName&&(e.setAttribute("ng-href",`{{sitecontent['${t}']['href']}}`),e.setAttribute("ng-attr-target",`{{sitecontent['${t}']['target']}}`)),"IMG"===e.tagName&&e.setAttribute("ng-src",`{{sitecontent['${t}']['src']}}`),e.tagName.match(r)&&e.children.length>0&&e.setAttribute("ng-model",`sitecontent['${t}']['text']`)})),console.log(n),n.forEach((e=>{let t=T();e.setAttribute("ng-class",`sitecontent['${t}']['classes']`),e.setAttribute("ng-style",`sitecontent['${t}']['style']`),e.setAttribute("ng-attr-modelid",`{{sitecontent['${t}']['modelid']}}`),e.setAttribute("ng-model",`sitecontent['${t}']['text']`)})),e.innerHTML}var _={name:"ForuGenerator",components:{CodeEditor:b.Z,DropdownSelect:y},data(){return{blockTypes:["Табы","Обложка","Цены","Подвал"],selectedBlockType:"Табы",content:'<div onclick="alert(1)" class="trade__form-input" tabindex="0">\n    Текстовый узел\n    <input elementid="elmqbeaq2562osaqdsokq9wr" type="number" value="45271.59">\n    <label ng-class="sitecontent[\'elmqbeaq2562osaqdsokq9wr\'][\'classes\']">Цена</label>\n    <div class="trade__form-input-tooltip">\n        Введите объем <b>покупки</b>\n    </div>\n    <a href="vk.com">Ссылка</a>\n\t<img/>\n</div>',result:""}},computed:{getTextareaAttrs(){return{width:"100%",height:"400px",border_radius:"8px"}}},methods:{selectType(e){this.selectedBlockType=e},addAttributess(){this.$refs.hiddenHTML.innerHTML=this.content,this.result=k()}}};const A=(0,v.Z)(_,[["render",u]]);var O=A;(0,o.ri)(O).mount("#app")}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var l=t[o]={exports:{}};return e[o](l,l.exports,n),l.exports}n.m=e,function(){var e=[];n.O=function(t,o,r,l){if(!o){var s=1/0;for(a=0;a<e.length;a++){o=e[a][0],r=e[a][1],l=e[a][2];for(var i=!0,c=0;c<o.length;c++)(!1&l||s>=l)&&Object.keys(n.O).every((function(e){return n.O[e](o[c])}))?o.splice(c--,1):(i=!1,l<s&&(s=l));if(i){e.splice(a--,1);var d=r();void 0!==d&&(t=d)}}return t}l=l||0;for(var a=e.length;a>0&&e[a-1][2]>l;a--)e[a]=e[a-1];e[a]=[o,r,l]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,l,s=o[0],i=o[1],c=o[2],d=0;if(s.some((function(t){return 0!==e[t]}))){for(r in i)n.o(i,r)&&(n.m[r]=i[r]);if(c)var a=c(n)}for(t&&t(o);d<s.length;d++)l=s[d],n.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return n.O(a)},o=self["webpackChunkforu_generator"]=self["webpackChunkforu_generator"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(5821)}));o=n.O(o)})();
//# sourceMappingURL=app.c035c79e.js.map