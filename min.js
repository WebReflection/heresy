/*! (c) Andrea Giammarchi - ISC */
var heresy=function(e,t){"use strict";function n(e){return(n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function r(e,t){return(r=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function i(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,i=!1,a=void 0;try{for(var o,u=e[Symbol.iterator]();!(r=(o=u.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){i=!0,a=e}finally{try{r||null==u.return||u.return()}finally{if(i)throw a}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var o={};try{o.WeakMap=WeakMap}catch(e){o.WeakMap=function(e,t){var n=t.defineProperty,r=t.hasOwnProperty,i=a.prototype;return i.delete=function(e){return this.has(e)&&delete e[this._]},i.get=function(e){return this.has(e)?e[this._]:void 0},i.has=function(e){return r.call(e,this._)},i.set=function(e,t){return n(e,this._,{configurable:!0,value:t}),this},a;function a(t){n(this,"_",{value:"_@ungap/weakmap"+e++}),t&&t.forEach(o,this)}function o(e){this.set(e[0],e[1])}}(Math.random(),Object)}var u=o.WeakMap;var c={};try{c.Event=new Event(".").constructor}catch(t){try{c.Event=new CustomEvent(".").constructor}catch(t){c.Event=function(t,n){n||(n={});var r=e.createEvent("Event"),i=!!n.bubbles,a=!!n.cancelable;r.initEvent(t,i,a);try{r.bubbles=i,r.cancelable=a}catch(r){}return r}}}var s=c.Event,l={};try{l.WeakSet=WeakSet}catch(e){!function(e){var t=new e,n=r.prototype;function r(n){t.set(this,new e),n&&n.forEach(this.add,this)}n.add=function(e){return t.get(this).set(e,1),this},n.delete=function(e){return t.get(this).delete(e)},n.has=function(e){return t.get(this).has(e)},l.WeakSet=r}(WeakMap)}var f=l.WeakSet,h=!1,p=function(t){var n,r=(n=(e.defaultView.navigator||{}).userAgent,/(Firefox|Safari)\/(\d+)/.test(n)&&!/(Chrom[eium]+|Android)\/(\d+)/.test(n)),i=!("raw"in t)||t.propertyIsEnumerable("raw")||!Object.isFrozen(t.raw);if(r||i){var a={},o=function(e){for(var t=".",n=0;n<e.length;n++)t+=e[n].length+"."+e[n];return a[t]||(a[t]=e)};if(i)p=o;else{var c=new u;p=function(e){return c.get(e)||function(e,t){return c.set(e,t),t}(e,o(e))}}}else h=!0;return v(t)};function v(e){return h?e:p(e)}var d,g="-"+Math.random().toFixed(6)+"%",y=!1;try{"content"in(d=e.createElement("template"))&&(d.innerHTML='<p tabindex="'+g+'"></p>',d.content.childNodes[0].getAttribute("tabindex")==g)||(g="_dt: "+g.slice(1,-1)+";",y=!0)}catch(e){}var m="\x3c!--"+g+"--\x3e",b=8,w=1,E=3,N=/^(?:style|textarea)$/i,x=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;function A(e){return e.join(m).replace(T,P).replace(_,$)}var C=" \\f\\n\\r\\t",j="[^"+C+"\\/>\"'=]+",k="["+C+"]+"+j,O="<([A-Za-z]+[A-Za-z0-9:._-]*)((?:",S="(?:\\s*=\\s*(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|"+j.replace("\\/","")+"))?)",_=new RegExp(O+k+S+"+)(["+C+"]*/?>)","g"),T=new RegExp(O+k+S+"*)(["+C+"]*/>)","g"),M=new RegExp("("+k+"\\s*=\\s*)(['\"]?)"+m+"\\2","gi");function $(e,t,n,r){return"<"+t+n.replace(M,L)+r}function L(e,t,n){return t+(n||'"')+g+(n||'"')}function P(e,t,n){return x.test(t)?e:"<"+t+n+"></"+t+">"}function R(e){for(var t=arguments.length,n=[v(e)],r=1;r<t;)n.push(arguments[r++]);return n}var Z=function(e,t){return(t=n.prototype).ELEMENT_NODE=1,t.nodeType=111,t.remove=function(e){var t=this.childNodes,n=this.firstChild,r=this.lastChild;if(this._=null,e&&2===t.length)r.parentNode.removeChild(r);else{var i=this.ownerDocument.createRange();i.setStartBefore(e?t[1]:n),i.setEndAfter(r),i.deleteContents()}return n},t.valueOf=function(e){var t=this._,n=null==t;if(n&&(t=this._=this.ownerDocument.createDocumentFragment()),n||e)for(var r=this.childNodes,i=0,a=r.length;i<a;i++)t.appendChild(r[i]);return t},n;function n(t){var n=this.childNodes=e.call(t,0);this.firstChild=n[0],this.lastChild=n[n.length-1],this.ownerDocument=n[0].ownerDocument,this._=null}}([].slice),z=Array.isArray,D=Z.prototype.nodeType;function V(e,t){this.type=e,this.args=t}Object.freeze(V);var W=function(e){var t="fragment",n="content"in i("template")?function(e){var t=i("template");return t.innerHTML=e,t.content}:function(e){var n=i(t),a=i("template"),o=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var u=RegExp.$1;a.innerHTML="<table>"+e+"</table>",o=a.querySelectorAll(u)}else a.innerHTML=e,o=a.childNodes;return r(n,o),n};return function(e,a){return("svg"===a?function(e){var n=i(t),a=i("div");return a.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",r(n,a.firstChild.childNodes),n}:n)(e)};function r(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function i(n){return n===t?e.createDocumentFragment():e.createElementNS("http://www.w3.org/1999/xhtml",n)}}(e),H={};try{H.Map=Map}catch(e){H.Map=function(){var e=0,t=[],n=[];return{delete:function(i){var a=r(i);return a&&(t.splice(e,1),n.splice(e,1)),a},forEach:function(e,r){t.forEach(function(t,i){e.call(r,n[i],t,this)},this)},get:function(t){return r(t)?n[e]:void 0},has:function(e){return r(e)},set:function(i,a){return n[r(i)?e:t.push(i)-1]=a,this}};function r(n){return-1<(e=t.indexOf(n))}}}var G=H.Map,I=[].indexOf,F=function(e,t,n,r,i,a){for(var o=("selectedIndex"in t),u=o;r<i;){var c=e(n[r],1);if(t.insertBefore(c,a),o&&u&&c.selected){u=!u;var s=t.selectedIndex;t.selectedIndex=s<0?r:I.call(t.querySelectorAll("option"),c)}r++}},B=function(e,t){return e==t},q=function(e){return e},U=function(e,t,n,r,i,a,o){var u=a-i;if(u<1)return-1;for(;n-t>=u;){for(var c=t,s=i;c<n&&s<a&&o(e[c],r[s]);)c++,s++;if(s===a)return t;t=c+1}return-1},J=function(e,t,n,r,i){return n<r?e(t[n],0):0<n?e(t[n-1],-0).nextSibling:i},K=function(e,t,n,r,i){for(;r<i;)Y(e(n[r++],-1),t)},Q=function(e,t,n){for(var r=1,i=t;r<i;){var a=(r+i)/2>>>0;n<e[a]?i=a:r=a+1}return r},X=function(e,t,n,r,i,a,o,u,c,s,l,f,h){!function(e,t,n,r,i,a,o,u,c){for(var s=new G,l=e.length,f=o,h=0;h<l;)switch(e[h++]){case 0:i++,f++;break;case 1:s.set(r[i],1),F(t,n,r,i++,i,f<u?t(a[f],0):c);break;case-1:f++}for(h=0;h<l;)switch(e[h++]){case 0:o++;break;case-1:s.has(a[o])?o++:K(t,n,a,o++,o)}}(function(e,t,n,r,i,a,o){var u,c,s,l,f,h,p,v=n+a,d=[];e:for(u=0;u<=v;u++){if(u>50)return null;for(p=u-1,f=u?d[u-1]:[0,0],h=d[u]=[],c=-u;c<=u;c+=2){for(s=(l=c===-u||c!==u&&f[p+c-1]<f[p+c+1]?f[p+c+1]:f[p+c-1]+1)-c;l<a&&s<n&&o(r[i+l],e[t+s]);)l++,s++;if(l===a&&s===n)break e;h[u+c]=l}}var g=Array(u/2+v/2),y=g.length-1;for(u=d.length-1;u>=0;u--){for(;l>0&&s>0&&o(r[i+l-1],e[t+s-1]);)g[y--]=0,l--,s--;if(!u)break;p=u-1,f=u?d[u-1]:[0,0],(c=l-s)==-u||c!==u&&f[p+c-1]<f[p+c+1]?(s--,g[y--]=1):(l--,g[y--]=-1)}return g}(n,r,a,o,u,s,f)||function(e,t,n,r,i,a,o,u){var c=0,s=r<u?r:u,l=Array(s++),f=Array(s);f[0]=-1;for(var h=1;h<s;h++)f[h]=o;for(var p=new G,v=a;v<o;v++)p.set(i[v],v);for(var d=t;d<n;d++){var g=p.get(e[d]);null!=g&&-1<(c=Q(f,s,g))&&(f[c]=g,l[c]={newi:d,oldi:g,prev:l[c-1]})}for(c=--s,--o;f[c]>o;)--c;s=u+r-c;var y=Array(s),m=l[c];for(--n;m;){for(var b=m,w=b.newi,E=b.oldi;n>w;)y[--s]=1,--n;for(;o>E;)y[--s]=-1,--o;y[--s]=0,--n,--o,m=m.prev}for(;n>=t;)y[--s]=1,--n;for(;o>=a;)y[--s]=-1,--o;return y}(n,r,i,a,o,u,c,s),e,t,n,r,o,u,l,h)},Y=function(e,t){(Y="remove"in e?function(e){e.remove()}:function(e,t){e.parentNode===t&&t.removeChild(e)})(e,t)},ee=function(e,t,n,r){r||(r={});for(var i=r.compare||B,a=r.node||q,o=null==r.before?null:a(r.before,0),u=t.length,c=u,s=0,l=n.length,f=0;s<c&&f<l&&i(t[s],n[f]);)s++,f++;for(;s<c&&f<l&&i(t[c-1],n[l-1]);)c--,l--;var h=s===c,p=f===l;if(h&&p)return n;if(h&&f<l)return F(a,e,n,f,l,J(a,t,s,u,o)),n;if(p&&s<c)return K(a,e,t,s,c),n;var v=c-s,d=l-f,g=-1;if(v<d){if(-1<(g=U(n,f,l,t,s,c,i)))return F(a,e,n,f,g,a(t[s],0)),F(a,e,n,g+v,l,J(a,t,c,u,o)),n}else if(d<v&&-1<(g=U(t,s,c,n,f,l,i)))return K(a,e,t,s,g),K(a,e,t,g+d,c),n;return v<2||d<2?(F(a,e,n,f,l,a(t[s],0)),K(a,e,t,s,c),n):v===d&&function(e,t,n,r,i,a){for(;r<i&&a(n[r],e[t-1]);)r++,t--;return 0===t}(n,l,t,s,c,i)?(F(a,e,n,f,l,J(a,t,c,u,o)),n):(X(a,e,n,f,l,d,t,s,c,v,u,i,o),n)},te=function(e,t,n,r,i){var a="importNode"in e,o=e.createDocumentFragment();return o.appendChild(e.createTextNode("g")),o.appendChild(e.createTextNode("")),(a?e.importNode(o,!0):o.cloneNode(!0)).childNodes.length<2?function e(t,n){for(var r=t.cloneNode(),i=t.childNodes||[],a=i.length,o=0;n&&o<a;o++)r.appendChild(e(i[o],n));return r}:a?e.importNode:function(e,t){return e.cloneNode(!!t)}}(e),ne="".trim||function(){return String(this).replace(/^\s+|\s+/g,"")};function re(e,t){for(var n=t.length,r=0;r<n;)e=e.childNodes[t[r++]];return e}function ie(t,n,r,i){for(var a=new G,o=t.attributes,u=[],c=u.slice.call(o,0),s=c.length,l=0;l<s;){var f,h=c[l++],p=h.value===g;if(p||1<(f=h.value.split(m)).length){var v=h.name;if(!a.has(v)){var d=r.shift().replace(p?/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*('|")?$/:new RegExp("^(?:|[\\S\\s]*?\\s)("+v+")\\s*=\\s*('|\")[\\S\\s]*","i"),"$1"),b=o[d]||o[d.toLowerCase()];if(a.set(v,b),p)n.push(oe(b,i,d,null));else{for(var w=f.length-2;w--;)r.shift();n.push(oe(b,i,d,f))}}u.push(h)}}l=0;for(var E=(0<(s=u.length)&&y&&!("ownerSVGElement"in t));l<s;){var N=u[l++];E&&(N.value=""),t.removeAttribute(N.name)}var x=t.nodeName;if(/^script$/i.test(x)){var A=e.createElement(x);for(s=o.length,l=0;l<s;)A.setAttributeNode(o[l++].cloneNode(!0));A.textContent=t.textContent,t.parentNode.replaceChild(A,t)}}function ae(e,t){return{type:"any",node:e,path:t}}function oe(e,t,n,r){return{type:"attr",node:e,path:t,name:n,sparse:r}}function ue(e,t){return{type:"text",node:e,path:t}}var ce=new u,se=new u;function le(e,t){var n=(e.convert||A)(t),r=e.transform;r&&(n=r(n));var i=W(n,e.type);!function(e){var t=e.childNodes,n=t.length;for(;n--;){var r=t[n];1!==r.nodeType&&0===ne.call(r.textContent).length&&e.removeChild(r)}}(i);var a=[];!function e(t,n,r,i){for(var a=t.childNodes,o=a.length,u=0;u<o;){var c=a[u];switch(c.nodeType){case w:var s=i.concat(u);ie(c,n,r,s),e(c,n,r,s);break;case b:var l=c.textContent;if(l===g)r.shift(),n.push(N.test(t.nodeName)?ue(t,i):ae(c,i.concat(u)));else switch(l.slice(0,2)){case"/*":if("*/"!==l.slice(-2))break;case"👻":t.removeChild(c),u--,o--}break;case E:N.test(t.nodeName)&&ne.call(c.textContent)===m&&(r.shift(),n.push(ue(t,i)))}u++}}(i,a,t.slice(0),[]);var o={content:i,updates:function(n){for(var r=[],i=a.length,o=0,u=0;o<i;){var c=a[o++],s=re(n,c.path);switch(c.type){case"any":r.push({fn:e.any(s,[]),sparse:!1});break;case"attr":var l=c.sparse,f=e.attribute(s,c.name,c.node);null===l?r.push({fn:f,sparse:!1}):(u+=l.length-2,r.push({fn:f,sparse:!0,values:l}));break;case"text":r.push({fn:e.text(s),sparse:!1}),s.textContent=""}}return i+=u,function(){var e=arguments.length;if(i!==e-1)throw new Error(e-1+" values instead of "+i+"\n"+t.join("${value}"));for(var a=1,o=1;a<e;){var u=r[a-o];if(u.sparse){var c=u.values,s=c[0],l=1,f=c.length;for(o+=f-2;l<f;)s+=arguments[a++]+c[l++];u.fn(s)}else u.fn(arguments[a++])}return n}}};return ce.set(t,o),o}function fe(t){return function(n){var r=se.get(t);return null!=r&&r.template===n||(r=function(t,n){var r=ce.get(n)||le(t,n),i=te.call(e,r.content,!0),a={content:i,template:n,updates:r.updates(i)};return se.set(t,a),a}(t,n)),r.updates.apply(null,arguments),r.content}}var he=function(){var e=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,t=/([^A-Z])([A-Z]+)/g;return function(e,t){return"ownerSVGElement"in e?function(e,t){var n;t?n=t.cloneNode(!0):(e.setAttribute("style","--hyper:style;"),n=e.getAttributeNode("style"));return n.value="",e.setAttributeNode(n),r(n,!0)}(e,t):r(e.style,!1)};function n(e,t,n){return t+"-"+n.toLowerCase()}function r(r,i){var a,o;return function(u){var c,s,l,f;switch(typeof u){case"object":if(u){if("object"===a){if(!i&&o!==u)for(s in o)s in u||(r[s]="")}else i?r.value="":r.cssText="";for(s in c=i?{}:r,u)l="number"!=typeof(f=u[s])||e.test(s)?f:f+"px",!i&&/^--/.test(s)?c.setProperty(s,l):c[s]=l;a="object",i?r.value=function(e){var r,i=[];for(r in e)i.push(r.replace(t,n),":",e[r],";");return i.join("")}(o=c):o=u;break}default:o!=u&&(a="string",o=u,i?r.value=u||"":r.cssText=u||"")}}}}(),pe=function(e,t){return e.nodeType===D?1/t<0?t?e.remove(!0):e.lastChild:t?e.valueOf(!0):e.firstChild:e},ve=function(e,t){var n,r=!1,i=t.cloneNode(!0);return function(t){n!==t&&(n=t,i.value!==t&&(null==t?(r&&(r=!1,e.removeAttributeNode(i)),i.value=t):(i.value=t,r||(r=!0,e.setAttributeNode(i)))))}},de=function(e,t){var n;return function(r){n!==r&&(n=r,e[t]!==r&&(null==r?(e[t]="",e.removeAttribute(t)):e[t]=r))}},ge=/^(?:form|list)$/i,ye=[].slice;function me(e){return this.type=e,fe(this)}function be(e){return e(this)}me.prototype={attribute:function(e,t,n){switch(t){case"class":if("ownerSVGElement"in e)return ve(e,n);t="className";case"data":case"props":return de(e,t);case"style":return he(e,n,"ownerSVGElement"in e);case"ref":return function(e){return function(t){t.current=e}}(e);default:return"."===t.slice(0,1)?function(e,t,n){return n?function(n){try{e[t]=n}catch(r){e.setAttribute(t,n)}}:function(n){e[t]=n}}(e,t.slice(1),"ownerSVGElement"in e):"on"===t.slice(0,2)?function(e,t){var n,r=t.slice(2);return t.toLowerCase()in e&&(r=r.toLowerCase()),function(t){n!==t&&(n&&e.removeEventListener(r,n,!1),n=t,t&&e.addEventListener(r,t,!1))}}(e,t):t in e&&!("ownerSVGElement"in e||ge.test(t))?de(e,t):ve(e,n)}},any:function(e,t){var n,r={node:pe,before:e},i="ownerSVGElement"in e?"svg":"html",a=!1;return function o(u){switch(typeof u){case"string":case"number":case"boolean":a?n!==u&&(n=u,t[0].textContent=u):(a=!0,n=u,t=ee(e.parentNode,t,[function(e,t){return e.ownerDocument.createTextNode(t)}(e,u)],r));break;case"function":o(u(e));break;case"object":case"undefined":if(null==u){a=!1,t=ee(e.parentNode,t,[],r);break}default:if(a=!1,n=u,z(u))if(0===u.length)t.length&&(t=ee(e.parentNode,t,[],r));else switch(typeof u[0]){case"string":case"number":case"boolean":o(String(u));break;case"function":o(u.map(be,e));break;case"object":z(u[0])&&(u=u.concat.apply([],u));default:t=ee(e.parentNode,t,u,r)}else!function(e){return"ELEMENT_NODE"in e}(u)?"text"in u?o(String(u.text)):"any"in u?o(u.any):"html"in u?t=ee(e.parentNode,t,ye.call(W([].concat(u.html).join(""),i).childNodes),r):"length"in u&&o(ye.call(u)):t=ee(e.parentNode,t,11===u.nodeType?ye.call(u.childNodes):[u],r)}}},text:function(e){var t;return function n(r){if(t!==r){t=r;var i=typeof r;"object"===i&&r?"text"in r?n(String(r.text)):"any"in r?n(r.any):"html"in r?n([].concat(r.html).join("")):"length"in r&&n(ye.call(r).join("")):"function"===i?n(r(e)):e.textContent=null==r?"":r}}}};var we=Object.create,Ee=Object.keys,Ne=new u,xe=new u,Ae=me.prototype,Ce=null,je=function(e){var t=Se("html",e),n=Se("svg",e);return{html:t,svg:n,hook:function(e){return{html:Oe(e,t),svg:Oe(e,n)}},render:function(t,n){var r=_e.call(this,t,n,e);return xe.get(t)!==r&&(xe.set(t,r),function(e,t){e.textContent="",e.appendChild(t)}(t,r)),t}}};je(me);function ke(e,t){return e.nodeType===D?e.valueOf(t):e}function Oe(e,t){return function(){var n=e(null);return null===n.current&&(n.current=t.for(n)),ke(n.current.apply(null,arguments),!1)}}function Se(e,t){var n=new u;return r.for=function(r,i){var a=n.get(r)||function(e){var t={$:null};return n.set(e,t),t}(r);return null==i&&(i="$"),a[i]||function(n,r){var i=[],a=null,o=new t(e),u=function(){return o.apply(null,Me(i,1,1,t))};return n[r]=function(){i=R.apply(null,arguments);var e=_e(o,u,t);return a||(a=$e(e))}}(a,i)},r;function r(){var n=R.apply(null,arguments);return Ce?new V(e,n):new t(e).apply(null,n)}}function _e(e,t,n){var r,i,a=Ce;(Ce=Ne.get(e)||(r=e,i={i:0,length:0,stack:[],update:!1},Ne.set(r,i),i)).i=0;var o,u=t.call(this);if(u instanceof V){o=ke(Te(u,0,n),Ce.update);var c=Ce,s=c.i,l=c.length,f=c.stack,h=c.update;s<l&&f.splice(Ce.length=s),h&&(Ce.update=!1)}else o=ke(u,!1);return Ce=a,o}function Te(e,t,n){var r=Ce,i=r.i,a=r.length,o=r.stack,u=e.type,c=e.args,s=i<a;Ce.i++,s||(Ce.length=o.push({l:t,kind:u,tag:null,tpl:c[0],wire:null})),Me(c,1,t+1,n);var l=o[i];if(s){var f=l.l,h=l.kind,p=l.tag,v=l.tpl,d=l.wire;if(f===t&&u===h&&v===c[0])return p.apply(null,c),d}var g=new n(u),y=$e(g.apply(null,c));return l.l=t,l.kind=u,l.tag=g,l.tpl=c[0],l.wire=y,i<1&&(Ce.update=!0),y}function Me(e,t,n,r){for(var i=e.length;t<i;t++){var a=e[t];"object"==typeof a&&a&&(a instanceof V?e[t]=Te(a,n-1,r):z(a)&&(e[t]=Me(a,0,n++,r)))}return e}function $e(e){var t=e.childNodes,n=t.length;return 1===n?t[0]:n?new Z(t):e}var Le=null;try{Le=new function(){}}catch(e){}var Pe=function(e){return function(t){function a(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),i(this,n(a).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&r(e,t)}(a,e),a}()};if(Le){var Re=Object.getPrototypeOf,Ze=Object.setPrototypeOf,ze=("object"==("undefined"==typeof Reflect?"undefined":typeof Reflect)?Reflect:{construct:function(e,t,n){for(var r=[null],i=0;i<t.length;i++)r.push(t[i]);var a=e.bind.apply(e,r);return Ze(new a,n.prototype)}}).construct;Pe=function(e,t){function n(){return ze(t?Re(e):e,arguments,n)}return Ze(n.prototype,e.prototype),Ze(n,e)}}var De={map:{},re:null},Ve=function(e){return new RegExp("<(/)?(".concat(e.join("|"),")([^A-Za-z0-9:._-])"),"g")},We=null,He=function(e,t){var n=We||t,r=n.map,i=n.re;return e.replace(i,function(e,t,n,i){var a=r[n],o=a.tagName,u=a.is;return a.element?t?"</".concat(u,">"):"<".concat(u).concat(i):t?"</".concat(o,">"):"<".concat(o,' is="').concat(u,'"').concat(i)})},Ge=function(e){var t=e.tagName,n=e.is;return e.element?n:"".concat(t,'[is="').concat(n,'"]')},Ie=function(){return We},Fe=function(e){We=e},Be=function(e){var t=we(Ae);return Ee(e).forEach(function(n){t[n]=e[n](t[n]||("convert"===n?A:String))}),n.prototype=t,je(n);function n(){return me.apply(this,arguments)}}({transform:function(e){return function(e){return He(e,De)}}}),qe=Be.render,Ue=Be.html,Je=Be.svg,Ke="_🔥",Qe=Object.defineProperties,Xe=new u,Ye=new u,et=new u,tt=new f,nt="attributeChangedCallback",rt="connectedCallback",it="dis".concat(rt),at=function(e,t,n){if(n in e){var r=e[n];t[n]={configurable:!0,value:function(){return yt.call(this),r.apply(this,arguments)}}}else t[n]={configurable:!0,value:yt}},ot=function(e){var t=e.prototype,n=[],r={html:{configurable:!0,get:vt},svg:{configurable:!0,get:dt}};r[Ke]={value:{events:n,info:null}},"handleEvent"in t||(r.handleEvent={configurable:!0,value:gt}),"oninit"in t&&(n.push("init"),at(t,r,"render")),at(t,r,nt),at(t,r,rt),at(t,r,it),[[nt,"onattributechanged",function(e,t,n){var r=ut("attributechanged");r.attributeName=e,r.oldValue=t,r.newValue=n,this.dispatchEvent(r)}],[rt,"onconnected",function(){this.dispatchEvent(ut("connected"))}],[it,"ondisconnected",function(){this.dispatchEvent(ut("disconnected"))}],[rt,"render",function(){this.render()}]].forEach(function(e){var i=a(e,3),o=i[0],u=i[1],c=i[2];if(!(o in t)&&u in t)if("render"!==u&&n.push(u.slice(2)),o in r){var s=r[o].value;r[o]={configurable:!0,value:function(){return s.apply(this,arguments),c.apply(this,arguments)}}}else r[o]={configurable:!0,value:c}});var i=e.booleanAttributes||[];i.forEach(function(e){e in t||(r[e]={configurable:!0,get:function(){return this.hasAttribute(e)},set:function(t){t&&"false"!==t?this.setAttribute(e,t):this.removeAttribute(e)}})});var o=e.observedAttributes||[];o.forEach(function(e){e in t||(r[e]={configurable:!0,get:function(){return this.getAttribute(e)},set:function(t){null==t?this.removeAttribute(e):this.setAttribute(e,t)}})}),(e.mappedAttributes||[]).forEach(function(e){var i=new u,a="on"+e in t;a&&n.push(e),r[e]={configurable:!0,get:function(){return i.get(this)},set:function(t){if(i.set(this,t),a){var n=ut(e);if(n.detail=t,tt.has(this))this.dispatchEvent(n);else{var r=et.get(this);r?r.push(n):et.set(this,[n])}}}}}),Qe(t,r);var c=i.concat(o);return c.length?Qe(e,{observedAttributes:{configurable:!0,get:function(){return c}}}):e},ut=function(e){return new s(e)},ct=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return new V("html",t)};ct.for=Ue.for;var st=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return new V("svg",t)};st.for=Je.for;var lt=function(e,t,n){var r=ft(e,t,new u);return n.set(e,r),r},ft=function(e,t,n){return function(r){for(var i=arguments.length,a=new Array(i>1?i-1:0),o=1;o<i;o++)a[o-1]=arguments[o];var u=v(r),c=n.get(u)||function(e,t,n){var r=n.info,i=r?He(t.join(Ke),r).split(Ke):t;return e.set(t,i),i}(n,u,e[Ke]);return qe(e,function(){return t.apply(void 0,[c].concat(a))})}};function ht(e){this.addEventListener(e,this)}function pt(e){this.dispatchEvent(e)}function vt(){return Xe.get(this)||lt(this,ct,Xe)}function dt(){return Ye.get(this)||lt(this,st,Ye)}function gt(e){this["on".concat(e.type)](e)}function yt(){if(!tt.has(this)){tt.add(this),this[Ke].events.forEach(ht,this),this.dispatchEvent(ut("init"));var e=et.get(this);e&&(et.delete(this),e.forEach(pt,this))}}var mt=Object.create,bt=Object.defineProperty,wt=Object.defineProperties,Et=Object.getOwnPropertyNames,Nt=Object.getOwnPropertySymbols,xt=Object.getOwnPropertyDescriptor,At=Object.keys,Ct={element:HTMLElement},jt=new u,kt=new u,Ot=new u,St=function(e,t){return("string"==typeof e?Tt(e,t,""):Tt(e.name,e,"")).Class},_t=function(e){var t=mt(null),n=mt(null),r={prototype:n,statics:t};return Et(e).concat(Nt(e)).forEach(function(r){var i=xt(e,r);switch(i.enumerable=!1,r){case"extends":r="tagName";case"contains":case"includes":case"name":case"booleanAttributes":case"mappedAttributes":case"observedAttributes":case"style":case"tagName":t[r]=i;break;default:n[r]=i}}),r},Tt=function(t,n,r){var i;if(!/^([A-Z][A-Za-z0-9_]*)(<([A-Za-z0-9:._-]+)>|:([A-Za-z0-9:._-]+))?$/.test(t))throw"Invalid name";var a=RegExp.$1,o=RegExp.$3,u=RegExp.$4,c=o||u||n.tagName||n.extends||"element",s="fragment"===c;if(s)c="element";else if(!/^[A-Za-z0-9:._-]+$/.test(c))throw"Invalid tag";var l,f="",h="";c.indexOf("-")<0?(f=a.replace(/([A-Z])([A-Z][a-z])/g,l="$1"+(l||"-")+"$2").replace(/([a-z])([A-Z])/g,l).toLowerCase()+r).indexOf("-")<0&&(h="-heresy"):(f=c+r,c="element");var p=f+h;if(customElements.get(p))throw"Duplicated ".concat(p," definition");var v=Pe("object"==typeof n?Ot.get(n)||function(t,n){var r=_t(t),i=r.statics,a=r.prototype,o=Pe(Ct[n]||(Ct[n]=e.createElement(n).constructor),!1);return wt(o.prototype,a),wt(o,i),Ot.set(t,ot(o)),o}(n,c):jt.get(n)||function(e){var t=Pe(e,!1);return jt.set(e,ot(t)),t}(n),!0),d="element"===c;if(bt(v,"new",{value:d?function(){return e.createElement(p)}:function(){return e.createElement(c,{is:p})}}),bt(v.prototype,"is",{value:p}),""===r){var g=function(e){for(var t=e.length,n=0,r=0;r<t;)n=(n<<5)-n+e.charCodeAt(r++),n&=n;return n.toString(36)}(f.toUpperCase());De.map[a]=Lt(v,c,p,{id:g,i:0}),De.re=Ve(At(De.map))}if(s){var y=v.prototype.render;bt(v.prototype,"render",{configurable:!0,value:function(){if(y&&y.apply(this,arguments),this.parentNode){var t=e.createRange();t.setStartBefore(this.firstChild),t.setEndAfter(this.lastChild),this.parentNode.replaceChild(t.extractContents(),this)}}})}var m=[p,v];return d||m.push({extends:c}),(i=customElements).define.apply(i,m),{Class:v,is:p,name:a,tagName:c}},Mt=Math.random(),$t=function(e){var t=kt.get(e);if(!t){var n=("Heresy"+ ++Mt).replace(/[^He-y0-9]/g,"");kt.set(e,t=St(n,e))}return function(){return t.new()}},Lt=function t(n,r,i,a){var o=n.prototype,u=function(e,t){return{tagName:e,is:t,element:"element"===e}}(r,i),c=[Ge(u)],s=n.includes||n.contains;if(s){var l={};At(s).forEach(function(e){var n="-".concat(a.id,"-").concat(a.i++),r=Tt(e,s[e],n),i=r.Class,o=r.is,u=r.name,f=r.tagName;c.push(Ge(l[u]=t(i,f,o,a)))});var f=Ve(At(l)),h={events:o[Ke].events,info:{map:l,re:f}};if(bt(o,Ke,{value:h}),"render"in o){var p=o.render,v=h.info;bt(o,"render",{configurable:!0,value:function(){var e=Ie();Fe(v);var t=p.apply(this,arguments);return Fe(e),t}})}}return"style"in n&&function(t){if((t||"").length){var n=e.createElement("style");n.type="text/css",n.styleSheet?n.styleSheet.cssText=t:n.appendChild(e.createTextNode(t));var r=e.head||e.querySelector("head");r.insertBefore(n,r.lastChild)}}(n.style.apply(n,c)),u};return t.define=St,t.html=ct,t.ref=function(e,t){return e?e[t]||(e[t]={current:null}):{current:null}},t.render=function(e,t){return qe(e,"function"==typeof t?t:t instanceof V?function(){return t}:$t(t))},t.svg=st,t}(document,{});
