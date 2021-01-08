/*! (c) Andrea Giammarchi - ISC */var heresy=function(e){"use strict";var t,n,r=WeakMap,s=Event,o=WeakSet,a="-"+Math.random().toFixed(6)+"%",i=!1;try{t=document.createElement("template"),n="tabindex","content"in t&&(t.innerHTML='<p tabindex="'+a+'"></p>',t.content.childNodes[0].getAttribute(n)==a)||(a="_dt: "+a.slice(1,-1)+";",i=!0)}catch(e){}var c="\x3c!--"+a+"--\x3e",l=/^(?:plaintext|script|style|textarea|title|xmp)$/i,u=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
/*! (c) Andrea Giammarchi - ISC */
function f(e){return e.join(c).replace(y,E).replace(v,w)}/*! (c) Andrea Giammarchi - ISC */var h=" \\f\\n\\r\\t",p="[^ \\f\\n\\r\\t\\/>\"'=]+",d="[ \\f\\n\\r\\t]+"+p,g="<([A-Za-z]+[A-Za-z0-9:._-]*)((?:",m="(?:\\s*=\\s*(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|"+p.replace("\\/","")+"))?)",v=new RegExp(g+d+m+"+)(["+h+"]*/?>)","g"),y=new RegExp(g+d+m+"*)(["+h+"]*/>)","g"),b=new RegExp("("+d+"\\s*=\\s*)(['\"]?)"+c+"\\2","gi");function w(e,t,n,r){return"<"+t+n.replace(b,x)+r}function x(e,t,n){return t+(n||'"')+a+(n||'"')}function E(e,t,n){return u.test(t)?e:"<"+t+n+"></"+t+">"}const{isArray:C}=Array,{indexOf:N,slice:A}=[];var k=e=>({get:t=>e.get(t),set:(t,n)=>(e.set(t,n),n)});const $=(e,t)=>111===e.nodeType?1/t<0?t?(({firstChild:e,lastChild:t})=>{const n=document.createRange();return n.setStartAfter(e),n.setEndAfter(t),n.deleteContents(),e})(e):e.lastChild:t?e.valueOf():e.firstChild:e,S=e=>{const{childNodes:t}=e,{length:n}=t;if(n<2)return n?t[0]:e;const r=A.call(t,0);return{ELEMENT_NODE:1,nodeType:111,firstChild:r[0],lastChild:r[n-1],valueOf(){if(t.length!==n){let t=0;for(;t<n;)e.appendChild(r[t++])}return e}}},j=e=>document.createElementNS("http://www.w3.org/1999/xhtml",e),O=(e,t)=>("svg"===t?T:_)(e),_=e=>{const t=j("template");return t.innerHTML=e,t.content},T=e=>{const{content:t}=j("template"),n=j("div");n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>";const{childNodes:r}=n.firstChild;let{length:s}=r;for(;s--;)t.appendChild(r[0]);return t};var L=(e,t,n,r,s)=>{const o=n.length;let a=t.length,i=o,c=0,l=0,u=null;for(;c<a||l<i;)if(a===c){const t=i<o?l?r(n[l-1],-0).nextSibling:r(n[i-l],0):s;for(;l<i;)e.insertBefore(r(n[l++],1),t)}else if(i===l)for(;c<a;)u&&u.has(t[c])||e.removeChild(r(t[c],-1)),c++;else if(t[c]===n[l])c++,l++;else if(t[a-1]===n[i-1])a--,i--;else if(t[c]===n[i-1]&&n[l]===t[a-1]){const s=r(t[--a],-1).nextSibling;e.insertBefore(r(n[l++],1),r(t[c++],-1).nextSibling),e.insertBefore(r(n[--i],1),s),t[a]=n[i]}else{if(!u){u=new Map;let e=l;for(;e<i;)u.set(n[e],e++)}if(u.has(t[c])){const s=u.get(t[c]);if(l<s&&s<i){let o=c,f=1;for(;++o<a&&o<i&&u.get(t[o])===s+f;)f++;if(f>s-l){const o=r(t[c],0);for(;l<s;)e.insertBefore(r(n[l++],1),o)}else e.replaceChild(r(n[l++],1),r(t[c++],-1))}else c++}else e.removeChild(r(t[c++],-1))}return n},M=document.importNode,Z="".trim,R=i?function(e,t){var n=t.join(" ");return t.slice.call(e,0).sort((function(e,t){return n.indexOf(e.name)<=n.indexOf(t.name)?-1:1}))}:function(e,t){return t.slice.call(e,0)};function z(e,t){for(var n=t.length,r=0;r<n;)e=e.childNodes[t[r++]];return e}function P(e,t,n,r){for(var s=e.attributes,o=[],l=[],u=R(s,n),f=u.length,h=0;h<f;){var p,d=u[h++],g=d.value===a;if(g||1<(p=d.value.split(c)).length){var m=d.name;if(o.indexOf(m)<0){o.push(m);var v=n.shift().replace(g?/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*('|")?$/:new RegExp("^(?:|[\\S\\s]*?\\s)("+m+")\\s*=\\s*('|\")[\\S\\s]*","i"),"$1"),y=s[v]||s[v.toLowerCase()];if(g)t.push(B(y,r,v,null));else{for(var b=p.length-2;b--;)n.shift();t.push(B(y,r,v,p))}}l.push(d)}}h=0;for(var w=(0<(f=l.length)&&i&&!("ownerSVGElement"in e));h<f;){var x=l[h++];w&&(x.value=""),e.removeAttribute(x.name)}var E=e.nodeName;if(/^script$/i.test(E)){var C=document.createElement(E);for(f=s.length,h=0;h<f;)C.setAttributeNode(s[h++].cloneNode(!0));C.textContent=e.textContent,e.parentNode.replaceChild(C,e)}}function H(e,t){return{type:"any",node:e,path:t}}function B(e,t,n,r){return{type:"attr",node:e,path:t,name:n,sparse:r}}function D(e,t){return{type:"text",node:e,path:t}}var W=k(new r);function F(e,t){var n=(e.convert||f)(t),r=e.transform;r&&(n=r(n));var s=O(n,e.type);G(s);var o=[];return function e(t,n,r,s){for(var o=t.childNodes,i=o.length,u=0;u<i;){var f=o[u];switch(f.nodeType){case 1:var h=s.concat(u);P(f,n,r,h),e(f,n,r,h);break;case 8:var p=f.textContent;if(p===a)r.shift(),n.push(l.test(t.nodeName)?D(t,s):H(f,s.concat(u)));else switch(p.slice(0,2)){case"/*":if("*/"!==p.slice(-2))break;case"👻":t.removeChild(f),u--,i--}break;case 3:l.test(t.nodeName)&&Z.call(f.textContent)===c&&(r.shift(),n.push(D(t,s)))}u++}}(s,o,t.slice(0),[]),{content:s,updates:function(n){for(var r=[],s=o.length,a=0,i=0;a<s;){var c=o[a++],l=z(n,c.path);switch(c.type){case"any":r.push({fn:e.any(l,[]),sparse:!1});break;case"attr":var u=c.sparse,f=e.attribute(l,c.name,c.node);null===u?r.push({fn:f,sparse:!1}):(i+=u.length-2,r.push({fn:f,sparse:!0,values:u}));break;case"text":r.push({fn:e.text(l),sparse:!1}),l.textContent=""}}return s+=i,function(){var e=arguments.length;if(s!==e-1)throw new Error(e-1+" values instead of "+s+"\n"+t.join("${value}"));for(var o=1,a=1;o<e;){var i=r[o-a];if(i.sparse){var c=i.values,l=c[0],u=1,f=c.length;for(a+=f-2;u<f;)l+=arguments[o++]+c[u++];i.fn(l)}else i.fn(arguments[o++])}return n}}}}function V(e,t){var n=W.get(t)||W.set(t,F(e,t));return n.updates(M.call(document,n.content,!0))}var q=[];function G(e){for(var t=e.childNodes,n=t.length;n--;){var r=t[n];1!==r.nodeType&&0===Z.call(r.textContent).length&&e.removeChild(r)}}
/*! (c) Andrea Giammarchi - ISC *//*! (c) Andrea Giammarchi - ISC */var I=function(){var e=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,t=/([^A-Z])([A-Z]+)/g;return function(e,t){return"ownerSVGElement"in e?function(e,t){var n;t?n=t.cloneNode(!0):(e.setAttribute("style","--hyper:style;"),n=e.getAttributeNode("style"));return n.value="",e.setAttributeNode(n),r(n,!0)}(e,t):r(e.style,!1)};function n(e,t,n){return t+"-"+n.toLowerCase()}function r(r,s){var o,a;return function(i){var c,l,u,f;switch(typeof i){case"object":if(i){if("object"===o){if(!s&&a!==i)for(l in a)l in i||(r[l]="")}else s?r.value="":r.cssText="";for(l in c=s?{}:r,i)u="number"!=typeof(f=i[l])||e.test(l)?f:f+"px",!s&&/^--/.test(l)?c.setProperty(l,u):c[l]=u;o="object",s?r.value=function(e){var r,s=[];for(r in e)s.push(r.replace(t,n),":",e[r],";");return s.join("")}(a=c):a=i;break}default:a!=i&&(o="string",a=i,s?r.value=i||"":r.cssText=i||"")}}}}();const U=(e,t)=>{let n,r=!0;const s=document.createAttributeNS(null,t);return t=>{n!==t&&(n=t,null==n?r||(e.removeAttributeNode(s),r=!0):(s.value=t,r&&(e.setAttributeNodeNS(s),r=!1)))}},J=(e,t)=>n=>{e[t]=n},K=/^(?:form|list)$/i,Q=(e,t)=>e.ownerDocument.createTextNode(t);function X(e){return this.type=e,function(e){var t=q,n=G;return function(r){return t!==r&&(n=V(e,t=r)),n.apply(null,arguments)}}(this)}function Y(e){return e(this)}X.prototype={attribute(e,t,n){const r="svg"===this.type;switch(t){case"class":if(r)return U(e,t);t="className";case"props":return J(e,t);case"aria":return(e=>t=>{for(const n in t){const r="role"===n?n:"aria-"+n,s=t[n];null==s?e.removeAttribute(r):e.setAttribute(r,s)}})(e);case"style":return I(e,n,r);case"ref":return(e=>t=>{"function"==typeof t?t(e):t.current=e})(e);case".dataset":return(({dataset:e})=>t=>{for(const n in t){const r=t[n];null==r?delete e[n]:e[n]=r}})(e);default:return"."===t.slice(0,1)?J(e,t.slice(1)):"on"===t.slice(0,2)?((e,t)=>{let n,r=t.slice(2);return!(t in e)&&t.toLowerCase()in e&&(r=r.toLowerCase()),t=>{const s=C(t)?t:[t,!1];n!==s[0]&&(n&&e.removeEventListener(r,n,s[1]),(n=s[0])&&e.addEventListener(r,n,s[1]))}})(e,t):!(t in e)||r||K.test(t)?U(e,t):((e,t)=>{let n;return r=>{n!==r&&(n=r,e[t]!==r&&(null==r?(e[t]="",e.removeAttribute(t)):e[t]=r))}})(e,t)}},any(e,t){const{type:n}=this;let r,s=!1;const o=a=>{switch(typeof a){case"string":case"number":case"boolean":s?r!==a&&(r=a,t[0].textContent=a):(s=!0,r=a,t=L(e.parentNode,t,[Q(e,a)],$,e));break;case"function":o(a(e));break;case"object":case"undefined":if(null==a){s=!1,t=L(e.parentNode,t,[],$,e);break}default:if(s=!1,r=a,C(a))if(0===a.length)t.length&&(t=L(e.parentNode,t,[],$,e));else switch(typeof a[0]){case"string":case"number":case"boolean":o(String(a));break;case"function":o(a.map(Y,e));break;case"object":C(a[0])&&(a=a.concat.apply([],a));default:t=L(e.parentNode,t,a,$,e)}else"ELEMENT_NODE"in a?t=L(e.parentNode,t,11===a.nodeType?A.call(a.childNodes):[a],$,e):"text"in a?o(String(a.text)):"any"in a?o(a.any):"html"in a?t=L(e.parentNode,t,A.call(O([].concat(a.html).join(""),n).childNodes),$,e):"length"in a&&o(A.call(a))}};return o},text(e){let t;const n=r=>{if(t!==r){t=r;const s=typeof r;"object"===s&&r?"text"in r?n(String(r.text)):"any"in r?n(r.any):"html"in r?n([].concat(r.html).join("")):"length"in r&&n(A.call(r).join("")):"function"===s?n(r(e)):e.textContent=null==r?"":r}};return n}};const{create:ee,freeze:te,keys:ne}=Object,re=X.prototype,se=k(new r),oe=e=>({html:ie("html",e),svg:ie("svg",e),render(t,n){const r="function"==typeof n?n():n,s=se.get(t)||se.set(t,ae()),o=r instanceof ue?ce(e,s,r):r;return o!==s.wire&&(s.wire=o,t.textContent="",t.appendChild(o.valueOf())),t}}),ae=()=>({stack:[],entry:null,wire:null}),ie=(e,t)=>{const n=k(new r);return s.for=(e,r)=>{const o=n.get(e)||n.set(e,ee(null));return o[r]||(o[r]=(e=>function(){return ce(t,e,s.apply(null,arguments))})(ae()))},s.node=function(){return ce(t,ae(),s.apply(null,arguments)).valueOf()},s;function s(){return new ue(e,ge.apply(null,arguments))}},ce=(e,t,{type:n,template:r,values:s})=>{const{length:o}=s;le(e,t,s,o);let{entry:a}=t;if(a&&a.template===r&&a.type===n)a.tag(r,...s);else{const o=new e(n);t.entry=a={type:n,template:r,tag:o,wire:S(o(r,...s))}}return a.wire},le=(e,{stack:t},n,r)=>{for(let s=0;s<r;s++){const r=n[s];r instanceof fe?n[s]=ce(e,t[s]||(t[s]=ae()),r):C(r)?le(e,t[s]||(t[s]=ae()),r,r.length):t[s]=null}r<t.length&&t.splice(r)};function ue(e,t){this.type=e,this.template=t.shift(),this.values=t}te(ue);const fe=ue,{render:he,html:pe,svg:de}=oe(X);function ge(){let e=[],t=0,{length:n}=arguments;for(;t<n;)e.push(arguments[t++]);return e}var me="function"==typeof cancelAnimationFrame,ve=me?cancelAnimationFrame:clearTimeout,ye=me?requestAnimationFrame:setTimeout;function be(e){var t,n,r,s,o;return i(),function(e,i,l){return r=e,s=i,o=l,n||(n=ye(a)),--t<0&&c(!0),c};function a(){i(),r.apply(s,o||[])}function i(){t=e||1/0,n=me?0:null}function c(e){var t=!!n;return t&&(ve(n),e&&a()),t}}
/*! (c) Andrea Giammarchi - ISC */let we=null;const xe=e=>{const t=[];return function n(){const r=we,s=[];we={hook:n,args:arguments,stack:t,i:0,length:t.length,after:s};try{return e.apply(null,arguments)}finally{we=r;for(let e=0,{length:t}=s;e<t;e++)s[e]()}}},Ee=k(new WeakMap),Ce=(e,t,n)=>{e.apply(t,n)},Ne={async:!1,always:!1},Ae=(e,t)=>"function"==typeof t?t(e):t,ke=(e,t,n,r)=>{const s=we.i++,{hook:o,args:a,stack:i,length:c}=we;s===c&&(we.length=i.push({}));const l=i[s];if(l.args=a,s===c){const s="function"==typeof n,{async:a,always:i}=(s?r:n)||r||Ne;l.$=s?n(t):Ae(void 0,t),l._=a?Ee.get(o)||Ee.set(o,be()):Ce,l.f=t=>{const n=e(l.$,t);(i||l.$!==n)&&(l.$=n,l._(o,null,l.args))}}return[l.$,l.f]},$e=new WeakMap,Se=({hook:e,args:t})=>{e.apply(null,t)};function je(e){this.value!==e&&(this.value=e,$e.get(this).forEach(Se))}function Oe({hook:e}){return e===this.hook}const _e=new WeakMap,Te=k(_e),Le=()=>{},Me=e=>(t,n)=>{const r=we.i++,{hook:s,after:o,stack:a,length:i}=we;if(r<i){const s=a[r],{update:i,values:c,stop:l}=s;if(!n||n.some(Be,c)){s.values=n,e&&l(e);const{clean:r}=s;r&&(s.clean=null,r());const a=()=>{s.clean=t()};e?i(a):o.push(a)}}else{const r=e?be():Le,i={clean:null,update:r,values:n,stop:Le};we.length=a.push(i),(Te.get(s)||Te.set(s,[])).push(i);const c=()=>{i.clean=t()};e?i.stop=r(c):o.push(c)}},Ze=e=>{(_e.get(e)||[]).forEach(e=>{const{clean:t,stop:n}=e;n(),t&&(e.clean=null,t())})},Re=_e.has.bind(_e),ze=Me(!0),Pe=Me(!1),He=(e,t)=>{const n=we.i++,{stack:r,length:s}=we;return n===s?we.length=r.push({$:e(),_:t}):t&&!t.some(Be,r[n]._)||(r[n]={$:e(),_:t}),r[n].$};function Be(e,t){return e!==this[t]}let De=null;try{De=new{o(){}}.o}catch(e){}let We=e=>class extends e{};if(De){const{getPrototypeOf:e,setPrototypeOf:t}=Object,{construct:n}="object"==typeof Reflect?Reflect:{construct(e,n,r){const s=[null];for(let e=0;e<n.length;e++)s.push(n[e]);const o=e.bind.apply(e,s);return t(new o,r.prototype)}};We=function(r,s){function o(){return n(s?e(r):r,arguments,o)}return t(o.prototype,r.prototype),t(o,r)}}const Fe={map:{},re:null},Ve=e=>new RegExp(`<(/)?(${e.join("|")})([^A-Za-z0-9:._-])`,"g");let qe=null;const Ge=(e,t)=>{const{map:n,re:r}=qe||t;return e.replace(r,(e,t,r,s)=>{const{tagName:o,is:a,element:i}=n[r];return i?t?`</${a}>`:`<${a}${s}`:t?`</${o}>`:`<${o} is="${a}"${s}`})},Ie=({tagName:e,is:t,element:n})=>n?t:`${e}[is="${t}"]`,Ue=()=>qe,Je=e=>{qe=e},Ke={useCallback:(e,t)=>He(()=>e,t),useContext:e=>{const{hook:t,args:n}=we,r=$e.get(e),s={hook:t,args:n};return r.some(Oe,s)||r.push(s),e.value},useEffect:ze,useLayoutEffect:Pe,useMemo:He,useReducer:ke,useRef:e=>{const t=we.i++,{stack:n,length:r}=we;return t===r&&(we.length=n.push({current:e})),n[t]},useState:(e,t)=>ke(Ae,e,void 0,t)},{render:Qe,html:Xe,svg:Ye}=(e=>{const t=ee(re);return ne(e).forEach(n=>{t[n]=e[n](t[n]||("convert"===n?f:String))}),n.prototype=t,oe(n);function n(){return X.apply(this,arguments)}})({transform:()=>e=>Ge(e,Fe)}),et="_🔥",{defineProperties:tt}=Object,nt=new r,rt=new r,st=new r,ot=new o,at=!0,it="attributeChangedCallback",ct="connectedCallback",lt="dis"+ct,ut=(e,t,n)=>{if(n in e){const r=e[n];t[n]={configurable:at,value(){return Et.call(this),r.apply(this,arguments)}}}else t[n]={configurable:at,value:Et}},ft=e=>{const{prototype:t}=e,n=[],s={html:{configurable:at,get:bt},svg:{configurable:at,get:wt}};if(s["_🔥"]={value:{events:n,info:null}},"handleEvent"in t||(s.handleEvent={configurable:at,value:xt}),"render"in t&&t.render.length){const{oninit:e}=t;tt(t,{oninit:{configurable:at,value(){const t=xe(this.render.bind(this,Ke));tt(this,{render:{configurable:at,value:t}}),this.addEventListener("disconnected",Ze.bind(null,t),!1),e&&e.apply(this,arguments)}}})}"oninit"in t&&(n.push("init"),ut(t,s,"render")),ut(t,s,it),ut(t,s,ct),ut(t,s,lt),[[it,"onattributechanged",Ct],[ct,"onconnected",Nt],[lt,"ondisconnected",kt],[ct,"render",At]].forEach(([e,r,o])=>{if(!(e in t)&&r in t)if("render"!==r&&n.push(r.slice(2)),e in s){const t=s[e].value;s[e]={configurable:at,value(){return t.apply(this,arguments),o.apply(this,arguments)}}}else s[e]={configurable:at,value:o}});const o=e.booleanAttributes||[];o.forEach(e=>{e in t||(s[e]={configurable:at,get(){return this.hasAttribute(e)},set(t){t&&"false"!==t?this.setAttribute(e,t):this.removeAttribute(e)}})});const a=e.observedAttributes||[];a.forEach(e=>{e in t||(s[e]={configurable:at,get(){return this.getAttribute(e)},set(t){null==t?this.removeAttribute(e):this.setAttribute(e,t)}})});(e.mappedAttributes||[]).forEach(e=>{const o=new r,a="on"+e in t;a&&n.push(e),s[e]={configurable:at,get(){return o.get(this)},set(t){if(o.set(this,t),a){const n=ht(e);if(n.detail=t,ot.has(this))this.dispatchEvent(n);else{const e=st.get(this);e?e.push(n):st.set(this,[n])}}}}}),tt(t,s);const i=o.concat(a);return i.length?tt(e,{observedAttributes:{configurable:at,get:()=>i}}):e},ht=e=>new s(e),pt=(...e)=>new fe("html",e);pt.for=Xe.for;const dt=(...e)=>new fe("svg",e);dt.for=Ye.for;const gt=(e,t,n)=>{const s=mt(e,t,new r);return n.set(e,s),s},mt=(e,t,n)=>(r,...s)=>{const o=n.get(r)||((e,t,{info:n})=>{const r=n?Ge(t.join(et),n).split(et):t;return e.set(t,r),r})(n,r,e["_🔥"]);return Qe(e,()=>t(o,...s))};function vt(e){this.addEventListener(e,this)}function yt(e){this.dispatchEvent(e)}function bt(){return nt.get(this)||gt(this,pt,nt)}function wt(){return rt.get(this)||gt(this,dt,rt)}function xt(e){this["on"+e.type](e)}function Et(){if(!ot.has(this)){ot.add(this),this["_🔥"].events.forEach(vt,this),this.dispatchEvent(ht("init"));const e=st.get(this);e&&(st.delete(this),e.forEach(yt,this))}}function Ct(e,t,n){const r=ht("attributechanged");r.attributeName=e,r.oldValue=t,r.newValue=n,this.dispatchEvent(r)}function Nt(){this.dispatchEvent(ht("connected"))}function At(){this.render()}function kt(){this.dispatchEvent(ht("disconnected"))}const{create:$t,defineProperty:St,defineProperties:jt,getOwnPropertyNames:Ot,getOwnPropertySymbols:_t,getOwnPropertyDescriptor:Tt,keys:Lt}=Object,Mt={element:HTMLElement},Zt=new r,Rt=new r,zt=new r,Pt=(e,t)=>("string"==typeof e?Bt(e,t,""):Bt(e.name,e,"")).Class,Ht=e=>{const t=$t(null),n=$t(null),r={prototype:n,statics:t};return Ot(e).concat(_t(e)).forEach(r=>{const s=Tt(e,r);switch(s.enumerable=!1,r){case"extends":r="tagName";case"contains":case"includes":case"name":case"booleanAttributes":case"mappedAttributes":case"observedAttributes":case"style":case"tagName":t[r]=s;break;default:n[r]=s}}),r},Bt=(e,t,n)=>{if(!/^([A-Z][A-Za-z0-9_]*)(<([A-Za-z0-9:._-]+)>|:([A-Za-z0-9:._-]+))?$/.test(e))throw"Invalid name";const{$1:r,$3:s,$4:o}=RegExp;let a=s||o||t.tagName||t.extends||"element";const i="fragment"===a;if(i)a="element";else if(!/^[A-Za-z0-9:._-]+$/.test(a))throw"Invalid tag";let c="",l="";a.indexOf("-")<0?(c=r.replace(/(([A-Z0-9])([A-Z0-9][a-z]))|(([a-z])([A-Z]))/g,"$2$5-$3$6").toLowerCase()+n,c.indexOf("-")<0&&(l="-heresy")):(c=a+n,a="element");const u=c+l;if(customElements.get(u))throw`Duplicated ${u} definition`;const f=We("object"==typeof t?zt.get(t)||((e,t)=>{const{statics:n,prototype:r}=Ht(e),s=We(Mt[t]||(Mt[t]=document.createElement(t).constructor),!1);return jt(s.prototype,r),jt(s,n),zt.set(e,ft(s)),s})(t,a):Zt.get(t)||(e=>{const t=We(e,!1);return Zt.set(e,ft(t)),t})(t),!0),h="element"===a;if(St(f,"new",{value:h?()=>document.createElement(u):()=>document.createElement(a,{is:u})}),St(f.prototype,"is",{value:u}),""===n){const e=(e=>{const{length:t}=e;let n=0,r=0;for(;r<t;)n=(n<<5)-n+e.charCodeAt(r++),n&=n;return n.toString(36)})(c.toUpperCase());Fe.map[r]=Ft(f,a,u,{id:e,i:0}),Fe.re=Ve(Lt(Fe.map))}if(i){const{render:e}=f.prototype;St(f.prototype,"render",{configurable:!0,value(){if(e&&e.apply(this,arguments),this.parentNode){const{firstChild:e}=this;let t=null;if(e){const n=document.createRange();n.setStartBefore(e),n.setEndAfter(this.lastChild),t=n.extractContents(),this.parentNode.replaceChild(t,this)}}}})}const p=[u,f];return h||p.push({extends:a}),customElements.define(...p),{Class:f,is:u,name:r,tagName:a}};let Dt=Math.random();const Wt=e=>{let t=Rt.get(e);if(!t){const n=("Heresy"+ ++Dt).replace(/[^He-y0-9]/g,"");Rt.set(e,t=Pt(n,e))}return()=>t.new()},Ft=(e,t,n,r)=>{const{prototype:s}=e,o=((e,t)=>({tagName:e,is:t,element:"element"===e}))(t,n),a=[Ie(o)],i=e.includes||e.contains;if(i){const e={};Lt(i).forEach(t=>{const n=`-${r.id}-${r.i++}`,{Class:s,is:o,name:c,tagName:l}=Bt(t,i[t],n);a.push(Ie(e[c]=Ft(s,l,o,r)))});const t=Ve(Lt(e)),{events:n}=s["_🔥"],o={events:n,info:{map:e,re:t}};if(St(s,et,{value:o}),"render"in s){const{render:e}=s,{info:t}=o;St(s,"render",{configurable:!0,value(){const n=Ue();Je(t);const r=e.apply(this,arguments);return Je(n),r}})}}return"style"in e&&(e=>{if((e||"").length){const t=document.createElement("style");t.type="text/css",t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e));const n=document.head||document.querySelector("head");n.insertBefore(t,n.lastChild)}})(e.style(...a)),o};return e.contextual=e=>{let t=!0,n=null;const r=xe((function(){return e.apply(n,arguments)}));return function e(){const s=r.apply(n=this,arguments);return t&&(t=!t,Re(r)&&_e.set(e,_e.get(r))),s}},e.createContext=e=>{const t={value:e,provide:je};return $e.set(t,[]),t},e.define=Pt,e.defineHook=(e,t)=>{if(e in Ke)throw new Error("duplicated hook "+e);Ke[e]=t(Ke)},e.html=pt,e.ref=(e,t)=>e?e[t]||(e[t]={current:null}):{current:null},e.render=(e,t)=>Qe(e,"function"==typeof t?t:t instanceof fe?()=>t:Wt(t)),e.svg=dt,e}({});
