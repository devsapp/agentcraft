(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[846],{49737:function(e,t,r){"use strict";r.d(t,{f:function(){return T}});var n=r(67294),o=r(3594),i=r(3241),a=r(56817),l=Object.defineProperty,c=Object.defineProperties,s=Object.getOwnPropertyDescriptors,d=Object.getOwnPropertySymbols,u=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable,p=(e,t,r)=>t in e?l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,h=(e,t)=>{for(var r in t||(t={}))u.call(t,r)&&p(e,r,t[r]);if(d)for(var r of d(t))f.call(t,r)&&p(e,r,t[r]);return e},y=(e,t)=>c(e,s(t)),b=(0,a.k)(e=>({root:y(h({},e.fn.cover()),{display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"})})),g=r(58036),v=r(64523),j=r(20966),m=r(17577),x=Object.defineProperty,w=Object.defineProperties,O=Object.getOwnPropertyDescriptors,k=Object.getOwnPropertySymbols,S=Object.prototype.hasOwnProperty,z=Object.prototype.propertyIsEnumerable,P=(e,t,r)=>t in e?x(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,E=(e,t)=>{for(var r in t||(t={}))S.call(t,r)&&P(e,r,t[r]);if(k)for(var r of k(t))z.call(t,r)&&P(e,r,t[r]);return e},C=(e,t)=>w(e,O(t)),I=(e,t)=>{var r={};for(var n in e)S.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&k)for(var n of k(e))0>t.indexOf(n)&&z.call(e,n)&&(r[n]=e[n]);return r};let N={overlayOpacity:.75,transitionDuration:0,radius:0,zIndex:(0,o.w)("overlay")},T=(0,n.forwardRef)((e,t)=>{let r=(0,i.N4)("LoadingOverlay",N,e),{className:o,visible:a,loaderProps:l,overlayOpacity:c,overlayColor:s,transitionDuration:d,exitTransitionDuration:u,zIndex:f,style:p,loader:h,radius:y,overlayBlur:x,unstyled:w,variant:O,keepMounted:k}=r,S=I(r,["className","visible","loaderProps","overlayOpacity","overlayColor","transitionDuration","exitTransitionDuration","zIndex","style","loader","radius","overlayBlur","unstyled","variant","keepMounted"]),{classes:z,cx:P,theme:T}=b(null,{name:"LoadingOverlay",unstyled:w,variant:O}),B=`calc(${f} + 1)`;return n.createElement(g.u,{keepMounted:k,duration:d,exitDuration:u,mounted:a,transition:"fade"},e=>n.createElement(v.x,E({className:P(z.root,o),style:C(E(E({},e),p),{zIndex:f}),ref:t},S),h?n.createElement("div",{style:{zIndex:B}},h):n.createElement(j.a,E({style:{zIndex:B}},l)),n.createElement(m.a,{opacity:c,zIndex:f,radius:y,blur:x,unstyled:w,color:s||("dark"===T.colorScheme?T.colors.dark[5]:T.white)})))});T.displayName="@mantine/core/LoadingOverlay"},95078:function(e,t,r){"use strict";r.d(t,{i:function(){return I}});var n=r(67294),o=r(3241),i=r(56817),a=r(96768),l=r(14258),c=Object.defineProperty,s=Object.defineProperties,d=Object.getOwnPropertyDescriptors,u=Object.getOwnPropertySymbols,f=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,h=(e,t,r)=>t in e?c(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,y=(e,t)=>{for(var r in t||(t={}))f.call(t,r)&&h(e,r,t[r]);if(u)for(var r of u(t))p.call(t,r)&&h(e,r,t[r]);return e},b=(e,t)=>s(e,d(t)),g=(0,i.k)((e,{captionSide:t,horizontalSpacing:r,verticalSpacing:n,fontSize:o,withBorder:i,withColumnBorders:c})=>{let s=`${(0,a.h)(1)} solid ${"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3]}`;return{root:b(y({},e.fn.fontStyles()),{width:"100%",borderCollapse:"collapse",captionSide:t,color:"dark"===e.colorScheme?e.colors.dark[0]:e.black,lineHeight:e.lineHeight,border:i?s:void 0,"& caption":{marginTop:"top"===t?0:e.spacing.xs,marginBottom:"bottom"===t?0:e.spacing.xs,fontSize:e.fontSizes.sm,color:"dark"===e.colorScheme?e.colors.dark[2]:e.colors.gray[6]},"& thead tr th, & tfoot tr th, & tbody tr th":{textAlign:"left",fontWeight:"bold",color:"dark"===e.colorScheme?e.colors.dark[0]:e.colors.gray[7],fontSize:(0,l.a)({size:o,sizes:e.fontSizes}),padding:`${(0,l.a)({size:n,sizes:e.spacing})} ${(0,l.a)({size:r,sizes:e.spacing})}`},"& thead tr th":{borderBottom:s},"& tfoot tr th, & tbody tr th":{borderTop:s},"& tbody tr td":{padding:`${(0,l.a)({size:n,sizes:e.spacing})} ${(0,l.a)({size:r,sizes:e.spacing})}`,borderTop:s,fontSize:(0,l.a)({size:o,sizes:e.fontSizes})},"& tbody tr:first-of-type td, & tbody tr:first-of-type th":{borderTop:"none"},"& thead th, & tbody td":{borderRight:c?s:"none","&:last-of-type":{borderRight:"none",borderLeft:c?s:"none"}},"& tbody tr th":{borderRight:c?s:"none"},"&[data-striped] tbody tr:nth-of-type(odd)":{backgroundColor:"dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[0]},"&[data-hover] tbody tr":e.fn.hover({backgroundColor:"dark"===e.colorScheme?e.colors.dark[5]:e.colors.gray[1]})})}}),v=r(64523),j=Object.defineProperty,m=Object.defineProperties,x=Object.getOwnPropertyDescriptors,w=Object.getOwnPropertySymbols,O=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable,S=(e,t,r)=>t in e?j(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,z=(e,t)=>{for(var r in t||(t={}))O.call(t,r)&&S(e,r,t[r]);if(w)for(var r of w(t))k.call(t,r)&&S(e,r,t[r]);return e},P=(e,t)=>m(e,x(t)),E=(e,t)=>{var r={};for(var n in e)O.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&w)for(var n of w(e))0>t.indexOf(n)&&k.call(e,n)&&(r[n]=e[n]);return r};let C={striped:!1,highlightOnHover:!1,captionSide:"top",horizontalSpacing:"xs",fontSize:"sm",verticalSpacing:7,withBorder:!1,withColumnBorders:!1},I=(0,n.forwardRef)((e,t)=>{let r=(0,o.N4)("Table",C,e),{className:i,children:a,striped:l,highlightOnHover:c,captionSide:s,horizontalSpacing:d,verticalSpacing:u,fontSize:f,unstyled:p,withBorder:h,withColumnBorders:y,variant:b}=r,j=E(r,["className","children","striped","highlightOnHover","captionSide","horizontalSpacing","verticalSpacing","fontSize","unstyled","withBorder","withColumnBorders","variant"]),{classes:m,cx:x}=g({captionSide:s,verticalSpacing:u,horizontalSpacing:d,fontSize:f,withBorder:h,withColumnBorders:y},{unstyled:p,name:"Table",variant:b});return n.createElement(v.x,P(z({},j),{component:"table",ref:t,className:x(m.root,i),"data-striped":l||void 0,"data-hover":c||void 0}),a)});I.displayName="@mantine/core/Table"},28792:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/app/[id]/knowledgeBase/[knowledgeBaseId]/chatlist",function(){return r(18650)}])},3658:function(e,t,r){"use strict";r.d(t,{Z:function(){return u}});var n=r(85893),o=r(92716),i=r(95117),a=r(64523),l=r(69876),c=r(19236),s=r(91759);function d(e){let{detail:t,title:r}=e,[a,{open:l,close:c}]=(0,s.q)(!1);return(0,n.jsx)(n.Fragment,{children:t?(0,n.jsxs)("div",{children:[(0,n.jsx)(o.d,{opened:a,onClose:c,title:r,children:(0,n.jsx)(i.x,{children:t})}),(0,n.jsx)(i.x,{onClick:()=>l(),children:"信息"})]}):null})}function u(e){let{title:t,description:r,detail:o,mt:s,mb:u}=e;return(0,n.jsxs)(a.x,{mt:s||24,mb:u||24,children:[(0,n.jsxs)(l.k,{mih:20,gap:"md",justify:"flex-start",align:"flex-start",direction:"row",wrap:"wrap",children:[(0,n.jsx)(c.D,{order:2,children:t}),(0,n.jsx)(d,{title:t,detail:o})]}),r?(0,n.jsx)(i.x,{lineClamp:4,children:r}):null]})}},18650:function(e,t,r){"use strict";r.r(t),r.d(t,{__N_SSP:function(){return b},default:function(){return g}});var n=r(85893),o=r(67294),i=r(67841),a=r(64523),l=r(49737),c=r(95078),s=r(54685),d=r(93284),u=r(27342),f=r(98597),p=r(3658);function h(e){let{knowledgeBaseId:t}=e,r=(0,u.aK)().chatList,s=(0,u.aK)().loading,d=(0,u.aK)().setLoading,p=(0,u.aK)().setOpen,h=async e=>{d(!0),await (0,u.Ag)(e),d(!1)},y=r.map(e=>(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:e.id}),(0,n.jsx)("td",{children:(0,n.jsx)("div",{style:{width:100,wordWrap:"break-word"},children:e.question})}),(0,n.jsx)("td",{children:(0,n.jsx)("div",{style:{width:200,wordWrap:"break-word"},children:(0,f.pI)(e.answer)})}),(0,n.jsx)("td",{children:(0,n.jsx)("div",{style:{width:200,wordWrap:"break-word"},children:e.prompt})}),(0,n.jsx)("td",{children:e.ip}),(0,n.jsx)("td",{children:(0,n.jsx)("div",{style:{width:200,wordWrap:"break-word"},children:JSON.stringify((0,f.pI)(e.source))})}),(0,n.jsx)("td",{children:e.model_name}),(0,n.jsx)("td",{children:e.created}),(0,n.jsx)("td",{children:(0,n.jsx)(i.z,{onClick:()=>{p(!0)},size:"xs",children:"编辑"})})]},e.id));return(0,o.useEffect)(()=>{h(t)},[t]),(0,n.jsxs)(a.x,{pos:"relative",children:[(0,n.jsx)(l.f,{visible:s,overlayOpacity:.3}),(0,n.jsxs)(c.i,{striped:!0,withBorder:!0,withColumnBorders:!0,mt:12,children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{children:"编号"}),(0,n.jsx)("th",{children:"问题"}),(0,n.jsx)("th",{children:"答案"}),(0,n.jsx)("th",{children:"完整提示词"}),(0,n.jsx)("th",{children:"访问IP"}),(0,n.jsx)("th",{children:"知识库结果"}),(0,n.jsx)("th",{children:"使用模型"}),(0,n.jsx)("th",{children:"问答创建时间"}),(0,n.jsx)("th",{children:"操作"})]})}),(0,n.jsx)("tbody",{children:y})]})]})}function y(e){let{appId:t,knowledgeBaseId:r}=e,o=(0,u.aK)().loading,i=[{title:"应用列表",href:"/app"},{title:"知识库",href:"/app/".concat(t,"/knowledgeBase")},{title:"问答记录",href:"/app/".concat(t,"/knowledgeBase/").concat(r,"/chatlist")}].map((e,t)=>(0,n.jsx)(s.e,{href:e.href,children:e.title},t));return(0,n.jsxs)(a.x,{pos:"relative",children:[(0,n.jsx)(l.f,{visible:o,overlayOpacity:.3}),(0,n.jsx)(d.O,{children:i}),(0,n.jsx)(p.Z,{title:"问答记录",description:"您可以在此查看该知识库的问答历史记录"}),(0,n.jsx)(h,{knowledgeBaseId:r})]})}var b=!0;function g(e){let{appId:t,knowledgeBaseId:r}=e;return(0,n.jsx)(y,{appId:t,knowledgeBaseId:r})}},27342:function(e,t,r){"use strict";r.d(t,{dr:function(){return y},Ag:function(){return h},aK:function(){return p}});var n=r(33250),o={Error:{Unauthorized:"无权限"}};let i={cn:o},a=Object.keys(i),l=i[function(){let e=function(e){try{return localStorage.getItem(e)}catch(e){return null}}("lang");if(a.includes(null!=e?e:""))return e;let t=function(){try{return navigator.language.toLowerCase()}catch(e){return"cn"}}();for(let e of a)if(t.includes(e))return e;return"cn"}()];!function e(t,r){Object.keys(r).forEach(function(n){if(r[n]&&"object"==typeof r[n]){e(t[n]=t[n]||{},r[n]);return}t[n]=r[n]})}(o,l);var c=r(64529),s=r(61407),d=r(98597),u=r(782),f=r(71791);let p=(0,c.Ue)()((0,u.mW)(e=>({chatList:[],open:!1,loading:!1,isEdit:!1,currentChatItem:{},updateCurrentChatItem:t=>e(e=>({currentChatItem:t})),setEditStatus:t=>e(e=>({isEdit:t})),setLoading:t=>e(e=>({loading:t})),setOpen:t=>e(e=>({open:t})),updateChatList:t=>e(e=>({chatList:t}))})));async function h(e){let t=p.getState(),r=t.updateChatList,n=await (0,f.W)("/api/chat/chatlist?id=".concat(e)),o=n.data;o&&r(o)}async function y(e,t){var r;let i=new AbortController;null===(r=e.onController)||void 0===r||r.call(e,i);let a=await {method:"POST",headers:{"Content-Type":"application/json"},signal:i.signal,body:JSON.stringify(Object.assign({},e,{token:t}))},l=setTimeout(()=>i.abort(),s.tb),c="",u=!1,f=()=>{u||(e.onFinish(c),u=!0)};i.signal.onabort=f,(0,n.L)("/api/chat",{...a,async onopen(e){var t;clearTimeout(l);let r=e.headers.get("content-type");if(console.log("AgentCraft request response content type: ",r),null==r?void 0:r.startsWith("text/plain"))return c=await e.clone().text(),f();if(!e.ok||!(null===(t=e.headers.get("content-type"))||void 0===t?void 0:t.startsWith(n.a))||200!==e.status){let t=[c],r=await e.clone().text();try{let t=await e.clone().json();r=(0,d.Bs)(t)}catch(e){}return 401===e.status&&t.push(o.Error.Unauthorized),r&&t.push(r),c=t.join("\n\n"),f()}},onmessage(t){if("[DONE]"===t.data||u)return f();let r=t.data;try{let t=JSON.parse(r),o=t.choices[0].delta.content;if(o){var n;c+=o,null===(n=e.onUpdate)||void 0===n||n.call(e,c,o)}}catch(e){console.error("[Request] parse error",r,t)}},onclose(){f()},onerror(t){var r;throw null===(r=e.onError)||void 0===r||r.call(e,t),t},openWhenHidden:!0})}},98597:function(e,t,r){"use strict";function n(e){let t=e;try{t=JSON.parse(e)}catch(e){console.error("Invalid URI sequence",e)}return t}function o(e){let t=e;return("string"!=typeof e&&(e=JSON.stringify(e,null,"  ")),"{}"===e)?t.toString():e.startsWith("```json")?e:["```json",e,"```"].join("\n")}r.d(t,{Bs:function(){return o},pI:function(){return n}})},33250:function(e,t,r){"use strict";async function n(e,t){let r;let n=e.getReader();for(;!(r=await n.read()).done;)t(r.value)}function o(){return{data:"",event:"",id:"",retry:void 0}}r.d(t,{a:function(){return a},L:function(){return c}});var i=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)0>t.indexOf(n[o])&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};let a="text/event-stream",l="last-event-id";function c(e,t){var{signal:r,headers:c,onopen:d,onmessage:u,onclose:f,onerror:p,openWhenHidden:h,fetch:y}=t,b=i(t,["signal","headers","onopen","onmessage","onclose","onerror","openWhenHidden","fetch"]);return new Promise((t,i)=>{let g;let v=Object.assign({},c);function j(){g.abort(),document.hidden||S()}v.accept||(v.accept=a),"undefined"==typeof document||h||document.addEventListener("visibilitychange",j);let m=1e3,x=0;function w(){"undefined"==typeof document||h||document.removeEventListener("visibilitychange",j),clearTimeout(x),g.abort()}null==r||r.addEventListener("abort",()=>{w(),t()});let O=null!=y?y:fetch,k=null!=d?d:s;async function S(){var r,a;g=new AbortController;try{let r,i,c,s;let d=await O(e,Object.assign(Object.assign({},b),{headers:v,signal:g.signal}));await k(d),await n(d.body,(a=function(e,t,r){let n=o(),i=new TextDecoder;return function(a,l){if(0===a.length)null==e||e(n),n=o();else if(l>0){let e=i.decode(a.subarray(0,l)),o=l+(32===a[l+1]?2:1),c=i.decode(a.subarray(o));switch(e){case"data":n.data=n.data?n.data+"\n"+c:c;break;case"event":n.event=c;break;case"id":null==t||t(n.id=c);break;case"retry":let s=parseInt(c,10);isNaN(s)||null==r||r(n.retry=s)}}}}(u,e=>{e?v[l]=e:delete v[l]},e=>{m=e}),s=!1,function(e){void 0===r?(r=e,i=0,c=-1):r=function(e,t){let r=new Uint8Array(e.length+t.length);return r.set(e),r.set(t,e.length),r}(r,e);let t=r.length,n=0;for(;i<t;){s&&(10===r[i]&&(n=++i),s=!1);let e=-1;for(;i<t&&-1===e;++i)switch(r[i]){case 58:-1===c&&(c=i-n);break;case 13:s=!0;case 10:e=i}if(-1===e)break;a(r.subarray(n,e),c),n=i,c=-1}n===t?r=void 0:0!==n&&(r=r.subarray(n),i-=n)})),null==f||f(),w(),t()}catch(e){if(!g.signal.aborted)try{let t=null!==(r=null==p?void 0:p(e))&&void 0!==r?r:m;clearTimeout(x),x=setTimeout(S,t)}catch(e){w(),i(e)}}}S()})}function s(e){let t=e.headers.get("content-type");if(!(null==t?void 0:t.startsWith(a)))throw Error(`Expected content-type to be ${a}, Actual: ${t}`)}}},function(e){e.O(0,[121,774,888,179],function(){return e(e.s=28792)}),_N_E=e.O()}]);