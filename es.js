/*! (c) Andrea Giammarchi - ISC */var heresy=function(e){"use strict";var t,n="-"+Math.random().toFixed(6)+"%",r=!1;try{"content"in(t=document.createElement("template"))&&(t.innerHTML='<p tabindex="'+n+'"></p>',t.content.childNodes[0].getAttribute("tabindex")==n)||(n="_dt: "+n.slice(1,-1)+";",r=!0)}catch(e){}var o="\x3c!--"+n+"--\x3e",s=8,a=1,i=3,c=/^(?:style|textarea)$/i,l=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;function u(e){return e.join(o).replace(v,x).replace(m,b)}var f=" \\f\\n\\r\\t",p="[^"+f+"\\/>\"'=]+",h="["+f+"]+"+p,d="<([A-Za-z]+[A-Za-z0-9:._-]*)((?:",g="(?:\\s*=\\s*(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|"+p.replace("\\/","")+"))?)",m=new RegExp(d+h+g+"+)(["+f+"]*/?>)","g"),v=new RegExp(d+h+g+"*)(["+f+"]*/>)","g"),y=new RegExp("("+h+"\\s*=\\s*)(['\"]?)"+o+"\\2","gi");function b(e,t,n,r){return"<"+t+n.replace(y,w)+r}function w(e,t,r){return t+(r||'"')+n+(r||'"')}function x(e,t,n){return l.test(t)?e:"<"+t+n+"></"+t+">"}var E=(...e)=>e,N=function(e,t){return(t=n.prototype).ELEMENT_NODE=1,t.nodeType=111,t.remove=function(e){var t=this.childNodes,n=this.firstChild,r=this.lastChild;if(this._=null,e&&2===t.length)r.parentNode.removeChild(r);else{var o=this.ownerDocument.createRange();o.setStartBefore(e?t[1]:n),o.setEndAfter(r),o.deleteContents()}return n},t.valueOf=function(e){var t=this._,n=null==t;if(n&&(t=this._=this.ownerDocument.createDocumentFragment()),n||e)for(var r=this.childNodes,o=0,s=r.length;o<s;o++)t.appendChild(r[o]);return t},n;function n(t){var n=this.childNodes=e.call(t,0);this.firstChild=n[0],this.lastChild=n[n.length-1],this.ownerDocument=n[0].ownerDocument,this._=null}}([].slice);const{isArray:k}=Array,A=N.prototype.nodeType;function C(e,t){this.type=e,this.args=t}Object.freeze(C);const $=e=>document.createElementNS("http://www.w3.org/1999/xhtml",e),S=(e,t)=>("svg"===t?M:j)(e),j=e=>{const t=$("template");return t.innerHTML=e,t.content},M=e=>{const{content:t}=$("template"),n=$("div");n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>";const{childNodes:r}=n.firstChild;let{length:o}=r;for(;o--;)t.appendChild(r[0]);return t},{indexOf:O}=[],T=(e,t,n,r,o,s)=>{const a="selectedIndex"in t;let i=a;for(;r<o;){const o=e(n[r],1);if(t.insertBefore(o,s),a&&i&&o.selected){i=!i;let{selectedIndex:e}=t;t.selectedIndex=e<0?r:O.call(t.querySelectorAll("option"),o)}r++}},L=(e,t)=>e==t,_=e=>e,Z=(e,t,n,r,o,s,a)=>{const i=s-o;if(i<1)return-1;for(;n-t>=i;){let i=t,c=o;for(;i<n&&c<s&&a(e[i],r[c]);)i++,c++;if(c===s)return t;t=i+1}return-1},z=(e,t,n,r,o)=>n<r?e(t[n],0):0<n?e(t[n-1],-0).nextSibling:o,W=(e,t,n,r,o)=>{for(;r<o;)R(e(n[r++],-1),t)},D=(e,t,n)=>{let r=1,o=t;for(;r<o;){const t=(r+o)/2>>>0;n<e[t]?o=t:r=t+1}return r},P=(e,t,n,r,o,s,a,i,c,l,u,f,p)=>{((e,t,n,r,o,s,a,i,c)=>{const l=new Map,u=e.length;let f=a,p=0;for(;p<u;)switch(e[p++]){case 0:o++,f++;break;case 1:l.set(r[o],1),T(t,n,r,o++,o,f<i?t(s[f],0):c);break;case-1:f++}for(p=0;p<u;)switch(e[p++]){case 0:a++;break;case-1:l.has(s[a])?a++:W(t,n,s,a++,a)}})(((e,t,n,r,o,s,a)=>{const i=n+s,c=[];let l,u,f,p,h,d,g;e:for(l=0;l<=i;l++){if(l>50)return null;for(g=l-1,h=l?c[l-1]:[0,0],d=c[l]=[],u=-l;u<=l;u+=2){for(f=(p=u===-l||u!==l&&h[g+u-1]<h[g+u+1]?h[g+u+1]:h[g+u-1]+1)-u;p<s&&f<n&&a(r[o+p],e[t+f]);)p++,f++;if(p===s&&f===n)break e;d[l+u]=p}}const m=Array(l/2+i/2);let v=m.length-1;for(l=c.length-1;l>=0;l--){for(;p>0&&f>0&&a(r[o+p-1],e[t+f-1]);)m[v--]=0,p--,f--;if(!l)break;g=l-1,h=l?c[l-1]:[0,0],(u=p-f)===-l||u!==l&&h[g+u-1]<h[g+u+1]?(f--,m[v--]=1):(p--,m[v--]=-1)}return m})(n,r,s,a,i,l,f)||((e,t,n,r,o,s,a,i)=>{let c=0,l=r<i?r:i;const u=Array(l++),f=Array(l);f[0]=-1;for(let e=1;e<l;e++)f[e]=a;const p=new Map;for(let e=s;e<a;e++)p.set(o[e],e);for(let r=t;r<n;r++){const t=p.get(e[r]);null!=t&&-1<(c=D(f,l,t))&&(f[c]=t,u[c]={newi:r,oldi:t,prev:u[c-1]})}for(c=--l,--a;f[c]>a;)--c;l=i+r-c;const h=Array(l);let d=u[c];for(--n;d;){const{newi:e,oldi:t}=d;for(;n>e;)h[--l]=1,--n;for(;a>t;)h[--l]=-1,--a;h[--l]=0,--n,--a,d=d.prev}for(;n>=t;)h[--l]=1,--n;for(;a>=s;)h[--l]=-1,--a;return h})(n,r,o,s,a,i,c,l),e,t,n,r,a,i,u,p)};let R=(e,t)=>{(R="remove"in e?e=>{e.remove()}:(e,t)=>{e.parentNode===t&&t.removeChild(e)})(e,t)};const V=(e,t,n,r)=>{r||(r={});const o=r.compare||L,s=r.node||_,a=null==r.before?null:s(r.before,0),i=t.length;let c=i,l=0,u=n.length,f=0;for(;l<c&&f<u&&o(t[l],n[f]);)l++,f++;for(;l<c&&f<u&&o(t[c-1],n[u-1]);)c--,u--;const p=l===c,h=f===u;if(p&&h)return n;if(p&&f<u)return T(s,e,n,f,u,z(s,t,l,i,a)),n;if(h&&l<c)return W(s,e,t,l,c),n;const d=c-l,g=u-f;let m=-1;if(d<g){if(-1<(m=Z(n,f,u,t,l,c,o)))return T(s,e,n,f,m,s(t[l],0)),T(s,e,n,m+d,u,z(s,t,c,i,a)),n}else if(g<d&&-1<(m=Z(t,l,c,n,f,u,o)))return W(s,e,t,l,m),W(s,e,t,m+g,c),n;return d<2||g<2?(T(s,e,n,f,u,s(t[l],0)),W(s,e,t,l,c),n):d===g&&((e,t,n,r,o,s)=>{for(;r<o&&s(n[r],e[t-1]);)r++,t--;return 0===t})(n,u,t,l,c,o)?(T(s,e,n,f,u,z(s,t,c,i,a)),n):(P(s,e,n,f,u,g,t,l,c,d,i,o,a),n)};var G=document.importNode,I="".trim;function H(e,t){for(var n=t.length,r=0;r<n;)e=e.childNodes[t[r++]];return e}function B(e,t,s,a){for(var i=new Map,c=e.attributes,l=[],u=l.slice.call(c,0),f=u.length,p=0;p<f;){var h,d=u[p++],g=d.value===n;if(g||1<(h=d.value.split(o)).length){var m=d.name;if(!i.has(m)){var v=s.shift().replace(g?/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*('|")?$/:new RegExp("^(?:|[\\S\\s]*?\\s)("+m+")\\s*=\\s*('|\")","i"),"$1"),y=c[v]||c[v.toLowerCase()];if(i.set(m,y),g)t.push(F(y,a,v,null));else{for(var b=h.length-2;b--;)s.shift();t.push(F(y,a,v,h))}}l.push(d)}}p=0;for(var w=(0<(f=l.length)&&r&&!("ownerSVGElement"in e));p<f;){var x=l[p++];w&&(x.value=""),e.removeAttribute(x.name)}var E=e.nodeName;if(/^script$/i.test(E)){var N=document.createElement(E);for(f=c.length,p=0;p<f;)N.setAttributeNode(c[p++].cloneNode(!0));N.textContent=e.textContent,e.parentNode.replaceChild(N,e)}}function q(e,t){return{type:"any",node:e,path:t}}function F(e,t,n,r){return{type:"attr",node:e,path:t,name:n,sparse:r}}function U(e,t){return{type:"text",node:e,path:t}}var J=new WeakMap,K=new WeakMap;function Q(e,t){var r=(e.convert||u)(t),l=e.transform;l&&(r=l(r));var f=S(r,e.type);!function(e){var t=e.childNodes,n=t.length;for(;n--;){var r=t[n];1!==r.nodeType&&0===I.call(r.textContent).length&&e.removeChild(r)}}(f);var p=[];!function e(t,r,l,u){for(var f=t.childNodes,p=f.length,h=0;h<p;){var d=f[h];switch(d.nodeType){case a:var g=u.concat(h);B(d,r,l,g),e(d,r,l,g);break;case s:var m=d.textContent;if(m===n)l.shift(),r.push(c.test(t.nodeName)?U(t,u):q(d,u.concat(h)));else switch(m.slice(0,2)){case"/*":if("*/"!==m.slice(-2))break;case"👻":t.removeChild(d),h--,p--}break;case i:c.test(t.nodeName)&&I.call(d.textContent)===o&&(l.shift(),r.push(U(t,u)))}h++}}(f,p,t.slice(0),[]);var h={content:f,updates:function(n){for(var r=[],o=p.length,s=0,a=0;s<o;){var i=p[s++],c=H(n,i.path);switch(i.type){case"any":r.push({fn:e.any(c,[]),sparse:!1});break;case"attr":var l=i.sparse,u=e.attribute(c,i.name,i.node);null===l?r.push({fn:u,sparse:!1}):(a+=l.length-2,r.push({fn:u,sparse:!0,values:l}));break;case"text":r.push({fn:e.text(c),sparse:!1}),c.textContent=""}}return o+=a,function(){var e=arguments.length;if(o!==e-1)throw new Error(e-1+" values instead of "+o+"\n"+t.join("${value}"));for(var s=1,a=1;s<e;){var i=r[s-a];if(i.sparse){var c=i.values,l=c[0],u=1,f=c.length;for(a+=f-2;u<f;)l+=arguments[s++]+c[u++];i.fn(l)}else i.fn(arguments[s++])}return n}}};return J.set(t,h),h}function X(e,t){var n=J.get(t)||Q(e,t),r=G.call(document,n.content,!0),o={content:r,template:t,updates:n.updates(r)};return K.set(e,o),o}var Y=function(){var e=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,t=/([^A-Z])([A-Z]+)/g;return function(e,t){return"ownerSVGElement"in e?function(e,t){var n;t?n=t.cloneNode(!0):(e.setAttribute("style","--hyper:style;"),n=e.getAttributeNode("style"));return n.value="",e.setAttributeNode(n),r(n,!0)}(e,t):r(e.style,!1)};function n(e,t,n){return t+"-"+n.toLowerCase()}function r(r,o){var s,a;return function(i){var c,l,u,f;switch(typeof i){case"object":if(i){if("object"===s){if(!o&&a!==i)for(l in a)l in i||(r[l]="")}else o?r.value="":r.cssText="";for(l in c=o?{}:r,i)u="number"!=typeof(f=i[l])||e.test(l)?f:f+"px",!o&&/^--/.test(l)?c.setProperty(l,u):c[l]=u;s="object",o?r.value=function(e){var r,o=[];for(r in e)o.push(r.replace(t,n),":",e[r],";");return o.join("")}(a=c):a=i;break}default:a!=i&&(s="string",a=i,o?r.value=i||"":r.cssText=i||"")}}}}();const ee=(e,t)=>e.nodeType===A?1/t<0?t?e.remove(!0):e.lastChild:t?e.valueOf(!0):e.firstChild:e,te=(e,t)=>{let n,r=!1;const o=t.cloneNode(!0);return t=>{n!==t&&(n=t,o.value!==t&&(null==t?(r&&(r=!1,e.removeAttributeNode(o)),o.value=t):(o.value=t,r||(r=!0,e.setAttributeNode(o)))))}},ne=(e,t)=>{let n;return r=>{n!==r&&(n=r,e[t]!==r&&(null==r?(e[t]="",e.removeAttribute(t)):e[t]=r))}},re=/^(?:form|list)$/i,oe=[].slice,se=(e,t)=>e.ownerDocument.createTextNode(t);function ae(e){return this.type=e,t=this,function(e){var n=K.get(t);return null!=n&&n.template===e||(n=X(t,e)),n.updates.apply(null,arguments),n.content};var t}function ie(e){return e(this)}ae.prototype={attribute(e,t,n){switch(t){case"class":if("ownerSVGElement"in e)return te(e,n);t="className";case"data":case"props":return ne(e,t);case"style":return Y(e,n,"ownerSVGElement"in e);case"ref":return(e=>t=>{t.current=e})(e);default:return"."===t.slice(0,1)?((e,t,n)=>n?n=>{e.setAttribute(t,n)}:n=>{e[t]=n})(e,t.slice(1),"ownerSVGElement"in e):"on"===t.slice(0,2)?((e,t)=>{let n,r=t.slice(2);return t.toLowerCase()in e&&(r=r.toLowerCase()),t=>{n!==t&&(n&&e.removeEventListener(r,n,!1),n=t,t&&e.addEventListener(r,t,!1))}})(e,t):t in e&&!("ownerSVGElement"in e||re.test(t))?ne(e,t):te(e,n)}},any(e,t){const n={node:ee,before:e},r="ownerSVGElement"in e?"svg":"html";let o,s=!1;const a=i=>{switch(typeof i){case"string":case"number":case"boolean":s?o!==i&&(o=i,t[0].textContent=i):(s=!0,o=i,t=V(e.parentNode,t,[se(e,i)],n));break;case"function":a(i(e));break;case"object":case"undefined":if(null==i){s=!1,t=V(e.parentNode,t,[],n);break}default:if(s=!1,o=i,k(i))if(0===i.length)t.length&&(t=V(e.parentNode,t,[],n));else switch(typeof i[0]){case"string":case"number":case"boolean":a(String(i));break;case"function":a(i.map(ie,e));break;case"object":k(i[0])&&(i=i.concat.apply([],i));default:t=V(e.parentNode,t,i,n)}else(e=>"ELEMENT_NODE"in e)(i)?t=V(e.parentNode,t,11===i.nodeType?oe.call(i.childNodes):[i],n):"text"in i?a(String(i.text)):"any"in i?a(i.any):"html"in i?t=V(e.parentNode,t,oe.call(S([].concat(i.html).join(""),r).childNodes),n):"length"in i&&a(oe.call(i))}};return a},text(e){let t;const n=r=>{if(t!==r){t=r;const o=typeof r;"object"===o&&r?"text"in r?n(String(r.text)):"any"in r?n(r.any):"html"in r?n([].concat(r.html).join("")):"length"in r&&n(oe.call(r).join("")):"function"===o?n(r(e)):e.textContent=null==r?"":r}};return n}};const{create:ce,keys:le}=Object,ue=new WeakMap,fe=new WeakMap,pe=ae.prototype;let he=null;const de=e=>{const t=xe("html",e),n=xe("svg",e);return{html:t,svg:n,hook:e=>({html:we(e,t),svg:we(e,n)}),render(t,n){const r=Ee.call(this,t,n,e);return fe.get(t)!==r&&(fe.set(t,r),function(e,t){e.textContent="",e.appendChild(t)}(t,r)),t}}},{html:ge,svg:me,render:ve,hook:ye}=de(ae);function be(e,t){return e.nodeType===A?e.valueOf(t):e}function we(e,t){return function(){const n=e(null);return null===n.current&&(n.current=t.for(n)),be(n.current.apply(null,arguments),!1)}}function xe(e,t){const n=new WeakMap;return r.for=(r,o)=>{const s=n.get(r)||function(e){const t={$:null};return n.set(e,t),t}(r);return null==o&&(o="$"),s[o]||function(n,r){let o=[],s=null;const a=new t(e),i=()=>a.apply(null,ke(o,1,1,t));return n[r]=function(){o=E.apply(null,arguments);const e=Ee(a,i,t);return s||(s=Ae(e))}}(s,o)},r;function r(){const n=E.apply(null,arguments);return he?new C(e,n):new t(e).apply(null,n)}}function Ee(e,t,n){const r=he;(he=ue.get(e)||function(e){const t={i:0,length:0,stack:[],update:!1};return ue.set(e,t),t}(e)).i=0;const o=t.call(this);let s;if(o instanceof C){s=be(Ne(o,0,n),he.update);const{i:e,length:t,stack:r,update:a}=he;e<t&&r.splice(he.length=e),a&&(he.update=!1)}else s=be(o,!1);return he=r,s}function Ne(e,t,n){const{i:r,length:o,stack:s}=he,{type:a,args:i}=e,c=r<o;he.i++,c||(he.length=s.push({l:t,kind:a,tag:null,tpl:i[0],wire:null})),ke(i,1,t+1,n);const l=s[r];if(c){const{l:e,kind:n,tag:r,tpl:o,wire:s}=l;if(e===t&&a===n&&o===i[0])return r.apply(null,i),s}const u=new n(a),f=Ae(u.apply(null,i));return l.l=t,l.kind=a,l.tag=u,l.tpl=i[0],l.wire=f,r<1&&(he.update=!0),f}function ke(e,t,n,r){for(const{length:o}=e;t<o;t++){const o=e[t];"object"==typeof o&&o&&(o instanceof C?e[t]=Ne(o,n-1,r):k(o)&&(e[t]=ke(o,0,n++,r)))}return e}function Ae(e){const t=e.childNodes,{length:n}=t;return 1===n?t[0]:n?new N(t):e}let Ce=null;try{Ce=new{o(){}}.o}catch(e){}let $e=e=>(class extends e{});if(Ce){const{getPrototypeOf:e,setPrototypeOf:t}=Object,{construct:n}="object"==typeof Reflect?Reflect:{construct(e,n,r){const o=[null];for(let e=0;e<n.length;e++)o.push(n[e]);const s=e.bind.apply(e,o);return t(new s,r.prototype)}};$e=function(r,o){function s(){return n(o?e(r):r,arguments,s)}return t(s.prototype,r.prototype),t(s,r)}}const Se={map:{},re:null},je=e=>new RegExp(`<(/)?(${e.join("|")})([^A-Za-z0-9:._-])`,"g");let Me=null;const Oe=(e,t)=>{const{map:n,re:r}=Me||t;return e.replace(r,(e,t,r,o)=>{const{tagName:s,is:a,element:i}=n[r];return i?t?`</${a}>`:`<${a}${o}`:t?`</${s}>`:`<${s} is="${a}"${o}`})},Te=({tagName:e,is:t,element:n})=>n?t:`${e}[is="${t}"]`,Le=()=>Me,_e=e=>{Me=e},{render:Ze,html:ze,svg:We}=(e=>{const t=ce(pe);return le(e).forEach(n=>{t[n]=e[n](t[n]||("convert"===n?u:String))}),n.prototype=t,de(n);function n(){return ae.apply(this,arguments)}})({transform:e=>e=>Oe(e,Se)}),De="_🔥",{defineProperties:Pe}=Object,Re=new WeakMap,Ve=new WeakMap,Ge=new WeakSet,Ie="attributeChangedCallback",He="connectedCallback",Be=`dis${He}`,qe=(e,t,n)=>{if(n in e){const r=e[n];t[n]={configurable:!0,value(){return rt.call(this),r.apply(this,arguments)}}}else t[n]={configurable:!0,value:rt}},Fe=e=>{const{prototype:t}=e,n=[],r={html:{configurable:!0,get:et},svg:{configurable:!0,get:tt}};r[De]={value:{events:n,info:null}},"handleEvent"in t||(r.handleEvent={configurable:!0,value:nt}),"oninit"in t&&(n.push("init"),qe(t,r,"render")),qe(t,r,Ie),qe(t,r,He),qe(t,r,Be),[[Ie,"onattributechanged",ot],[He,"onconnected",st],[Be,"ondisconnected",it],[He,"render",at]].forEach(([e,o,s])=>{if(!(e in t)&&o in t)if("render"!==o&&n.push(o.slice(2)),e in r){const t=r[e].value;r[e]={configurable:!0,value(){return t.apply(this,arguments),s.apply(this,arguments)}}}else r[e]={configurable:!0,value:s}});const o=e.booleanAttributes||[];o.forEach(e=>{e in t||(r[e]={configurable:!0,get(){return this.hasAttribute(e)},set(t){t&&"false"!==t?this.setAttribute(e,t):this.removeAttribute(e)}})});const s=e.observedAttributes||[];s.forEach(e=>{e in t||(r[e]={configurable:!0,get(){return this.getAttribute(e)},set(t){null==t?this.removeAttribute(e):this.setAttribute(e,t)}})}),Pe(t,r);const a=o.concat(s);return a.length?Pe(e,{observedAttributes:{configurable:!0,get:()=>a}}):e},Ue=e=>new Event(e),Je=(...e)=>new C("html",e);Je.for=ze.for;const Ke=(...e)=>new C("svg",e);Ke.for=We.for;const Qe=(e,t,n)=>{const r=Xe(e,t,new WeakMap);return n.set(e,r),r},Xe=(e,t,n)=>(r,...o)=>{const s=(e=>e)(r),a=n.get(s)||((e,t,{info:n})=>{const r=n?Oe(t.join(De),n).split(De):t;return e.set(t,r),r})(n,s,e[De]);return Ze(e,()=>t(a,...o))};function Ye(e){this.addEventListener(e,this)}function et(){return Re.get(this)||Qe(this,Je,Re)}function tt(){return Ve.get(this)||Qe(this,Ke,Ve)}function nt(e){this[`on${e.type}`](e)}function rt(){Ge.has(this)||(Ge.add(this),this[De].events.forEach(Ye,this),this.dispatchEvent(Ue("init")))}function ot(e,t,n){const r=Ue("attributechanged");r.attributeName=e,r.oldValue=t,r.newValue=n,this.dispatchEvent(r)}function st(){this.dispatchEvent(Ue("connected"))}function at(){this.render()}function it(){this.dispatchEvent(Ue("disconnected"))}const{create:ct,defineProperty:lt,defineProperties:ut,getOwnPropertyNames:ft,getOwnPropertySymbols:pt,getOwnPropertyDescriptor:ht,keys:dt}=Object,gt={element:HTMLElement},mt=new WeakMap,vt=new WeakMap,yt=e=>{const t=ct(null),n=ct(null),r={prototype:n,statics:t};return ft(e).concat(pt(e)).forEach(r=>{const o=ht(e,r);switch(o.enumerable=!1,r){case"extends":r="tagName";case"contains":case"includes":case"name":case"booleanAttributes":case"observedAttributes":case"style":case"tagName":t[r]=o;break;default:n[r]=o}}),r},bt=(e,t,n)=>{if(!/^([A-Z][A-Za-z0-9_]*)(<([A-Za-z0-9:._-]+)>|:([A-Za-z0-9:._-]+))?$/.test(e))throw"Invalid name";const{$1:r,$3:o,$4:s}=RegExp;let a=o||s||t.tagName||t.extends||"element";if(!/^[A-Za-z0-9:._-]+$/.test(a))throw"Invalid tag";let i="",c="";a.indexOf("-")<0?(i=function(e,t){return e.replace(/([A-Z])([A-Z][a-z])/g,t="$1"+(t||"-")+"$2").replace(/([a-z])([A-Z])/g,t).toLowerCase()}(r)+n).indexOf("-")<0&&(c="-heresy"):(i=a+n,a="element");const l=i+c;if(customElements.get(l))throw`Duplicated ${l} definition`;const u=$e("object"==typeof t?vt.get(t)||((e,t)=>{const{statics:n,prototype:r}=yt(e),o=$e(gt[t]||(gt[t]=document.createElement(t).constructor),!1);return ut(o.prototype,r),ut(o,n),vt.set(e,Fe(o)),o})(t,a):mt.get(t)||(e=>{const t=$e(e,!1);return mt.set(e,Fe(t)),t})(t),!0),f="element"===a;if(lt(u,"new",{value:f?()=>document.createElement(l):()=>document.createElement(a,{is:l})}),lt(u.prototype,"is",{value:l}),""===n){const e=(e=>{const{length:t}=e;let n=0,r=0;for(;r<t;)n=(n<<5)-n+e.charCodeAt(r++),n&=n;return n.toString(36)})(i.toUpperCase());Se.map[r]=wt(u,a,l,{id:e,i:0}),Se.re=je(dt(Se.map))}const p=[l,u];return f||p.push({extends:a}),customElements.define(...p),{Class:u,is:l,name:r,tagName:a}},wt=(e,t,n,r)=>{const{prototype:o}=e,s=((e,t)=>({tagName:e,is:t,element:"element"===e}))(t,n),a=[Te(s)],i=e.includes||e.contains;if(i){const e={};dt(i).forEach(t=>{const n=`-${r.id}-${r.i++}`,{Class:o,is:s,name:c,tagName:l}=bt(t,i[t],n);a.push(Te(e[c]=wt(o,l,s,r)))});const t=je(dt(e)),{events:n}=o[De],s={events:n,info:{map:e,re:t}};if(lt(o,De,{value:s}),"render"in o){const{render:e}=o,{info:t}=s;lt(o,"render",{value(){const n=Le();_e(t);const r=e.apply(this,arguments);return _e(n),r}})}}return"style"in e&&(e=>{if((e||"").length){const t=document.createElement("style");t.type="text/css",t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e));const n=document.head||document.querySelector("head");n.insertBefore(t,n.lastChild)}})(e.style(...a)),s};return e.define=(e,t)=>("string"==typeof e?bt(e,t,""):bt(e.name,e,"")).Class,e.html=Je,e.ref=(e,t)=>e?e[t]||(e[t]={current:null}):{current:null},e.render=(e,t)=>Ze(e,"function"==typeof t?t:()=>t),e.svg=Ke,e}({});
