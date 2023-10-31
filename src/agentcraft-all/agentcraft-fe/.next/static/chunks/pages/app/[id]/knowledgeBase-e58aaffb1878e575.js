(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[470],{95078:function(e,t,r){"use strict";r.d(t,{i:function(){return C}});var i=r(67294),s=r(3241),l=r(56817),o=r(96768),n=r(14258),a=Object.defineProperty,d=Object.defineProperties,c=Object.getOwnPropertyDescriptors,p=Object.getOwnPropertySymbols,h=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable,u=(e,t,r)=>t in e?a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,m=(e,t)=>{for(var r in t||(t={}))h.call(t,r)&&u(e,r,t[r]);if(p)for(var r of p(t))x.call(t,r)&&u(e,r,t[r]);return e},_=(e,t)=>d(e,c(t)),y=(0,l.k)((e,{captionSide:t,horizontalSpacing:r,verticalSpacing:i,fontSize:s,withBorder:l,withColumnBorders:a})=>{let d=`${(0,o.h)(1)} solid ${"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3]}`;return{root:_(m({},e.fn.fontStyles()),{width:"100%",borderCollapse:"collapse",captionSide:t,color:"dark"===e.colorScheme?e.colors.dark[0]:e.black,lineHeight:e.lineHeight,border:l?d:void 0,"& caption":{marginTop:"top"===t?0:e.spacing.xs,marginBottom:"bottom"===t?0:e.spacing.xs,fontSize:e.fontSizes.sm,color:"dark"===e.colorScheme?e.colors.dark[2]:e.colors.gray[6]},"& thead tr th, & tfoot tr th, & tbody tr th":{textAlign:"left",fontWeight:"bold",color:"dark"===e.colorScheme?e.colors.dark[0]:e.colors.gray[7],fontSize:(0,n.a)({size:s,sizes:e.fontSizes}),padding:`${(0,n.a)({size:i,sizes:e.spacing})} ${(0,n.a)({size:r,sizes:e.spacing})}`},"& thead tr th":{borderBottom:d},"& tfoot tr th, & tbody tr th":{borderTop:d},"& tbody tr td":{padding:`${(0,n.a)({size:i,sizes:e.spacing})} ${(0,n.a)({size:r,sizes:e.spacing})}`,borderTop:d,fontSize:(0,n.a)({size:s,sizes:e.fontSizes})},"& tbody tr:first-of-type td, & tbody tr:first-of-type th":{borderTop:"none"},"& thead th, & tbody td":{borderRight:a?d:"none","&:last-of-type":{borderRight:"none",borderLeft:a?d:"none"}},"& tbody tr th":{borderRight:a?d:"none"},"&[data-striped] tbody tr:nth-of-type(odd)":{backgroundColor:"dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[0]},"&[data-hover] tbody tr":e.fn.hover({backgroundColor:"dark"===e.colorScheme?e.colors.dark[5]:e.colors.gray[1]})})}}),j=r(64523),f=Object.defineProperty,g=Object.defineProperties,w=Object.getOwnPropertyDescriptors,b=Object.getOwnPropertySymbols,v=Object.prototype.hasOwnProperty,z=Object.prototype.propertyIsEnumerable,k=(e,t,r)=>t in e?f(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,S=(e,t)=>{for(var r in t||(t={}))v.call(t,r)&&k(e,r,t[r]);if(b)for(var r of b(t))z.call(t,r)&&k(e,r,t[r]);return e},O=(e,t)=>g(e,w(t)),I=(e,t)=>{var r={};for(var i in e)v.call(e,i)&&0>t.indexOf(i)&&(r[i]=e[i]);if(null!=e&&b)for(var i of b(e))0>t.indexOf(i)&&z.call(e,i)&&(r[i]=e[i]);return r};let P={striped:!1,highlightOnHover:!1,captionSide:"top",horizontalSpacing:"xs",fontSize:"sm",verticalSpacing:7,withBorder:!1,withColumnBorders:!1},C=(0,i.forwardRef)((e,t)=>{let r=(0,s.N4)("Table",P,e),{className:l,children:o,striped:n,highlightOnHover:a,captionSide:d,horizontalSpacing:c,verticalSpacing:p,fontSize:h,unstyled:x,withBorder:u,withColumnBorders:m,variant:_}=r,f=I(r,["className","children","striped","highlightOnHover","captionSide","horizontalSpacing","verticalSpacing","fontSize","unstyled","withBorder","withColumnBorders","variant"]),{classes:g,cx:w}=y({captionSide:d,verticalSpacing:p,horizontalSpacing:c,fontSize:h,withBorder:u,withColumnBorders:m},{unstyled:x,name:"Table",variant:_});return i.createElement(j.x,O(S({},f),{component:"table",ref:t,className:w(g.root,l),"data-striped":n||void 0,"data-hover":a||void 0}),o)});C.displayName="@mantine/core/Table"},9049:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/app/[id]/knowledgeBase",function(){return r(5975)}])},5975:function(e,t,r){"use strict";r.r(t),r.d(t,{__N_SSP:function(){return V},default:function(){return X}});var i,s,l=r(85893),o=r(67294),n=r(41664),a=r.n(n),d=r(69876),c=r(19236),p=r(82623),h=r(64523),x=r(80061),u=r(52615),m=r(54777),_=r(71232),y=r(31194),j=r(28855),f=r(14127),g=r(67841),w=r(94491),b=r(92716),v=r(95117),z=r(17789),k=r(88393),S=r(95078),O=r(54685),I=r(49737),P=r(93284),C=r(77248),A=r(24350),D=r(85417),T=r(48847),E=r(77194),L=r(3658),B=r(53483),N=r(61407),q=r(30372),H=r(60062);function Z(e){let{appId:t,containerType:r}=e,i=(0,B.s6)().setOpen,n=(0,B.s6)().isEdit,a=(0,B.s6)().currentKnowledgeBase,w=(0,B.s6)().setLoading,b=(0,A.s6)().modelList,v=(0,D.s6)().dataSetList,z=(0,C.c)({initialValues:{name:"",description:"",prompt_template:"已知信息：【{context}】。你需要积极，简洁和专业地来回答```中的问题。如果问题和已知信息没有关系，或者问题存在争议性，请说 “抱歉，无法回答该问题”，不允许编造。问题是：```{query}```",app_id:parseInt(t),exact_datasets:[],fuzzy_datasets:[],exact_search_similarity:.9,fuzzy_search_similarity:.6,temperature:.5,top_p:1,n_sequences:1,max_tokens:1024,stop:[],presence_penalty:0,frequency_penalty:0,logit_bias:"",model_id:"",redis_ip_ex:0,redis_history_ex:0,model_ip_limit:0,llm_history_len:0,system_message:"",exact_search_limit:1,fuzzy_search_limit:3},validate:{name:e=>e?null:"知识库名必填"}});(0,o.useEffect)(()=>{if((0,A.fZ)(),(0,D.ln)(),n){let e=null==a?void 0:a.datasets;z.setValues({id:null==a?void 0:a.id,name:null==a?void 0:a.name,description:null==a?void 0:a.description,prompt_template:null==a?void 0:a.prompt_template,app_id:null==a?void 0:a.app_id,exact_datasets:null==e?void 0:e.filter(e=>e.dataset_type===E.I.QUESTION).map(e=>e.dataset_id),fuzzy_datasets:null==e?void 0:e.filter(e=>e.dataset_type===E.I.DOCUMENT).map(e=>e.dataset_id),exact_search_similarity:null==a?void 0:a.exact_search_limit,fuzzy_search_similarity:null==a?void 0:a.fuzzy_search_similarity,temperature:null==a?void 0:a.temperature,top_p:null==a?void 0:a.top_p,n_sequences:null==a?void 0:a.n_sequences,max_tokens:null==a?void 0:a.max_tokens,stop:null==a?void 0:a.stop,presence_penalty:null==a?void 0:a.presence_penalty,frequency_penalty:null==a?void 0:a.frequency_penalty,logit_bias:null==a?void 0:a.logit_bias,model_id:null==a?void 0:a.model_id,redis_ip_ex:null==a?void 0:a.redis_ip_ex,redis_history_ex:null==a?void 0:a.redis_history_ex,model_ip_limit:null==a?void 0:a.model_ip_limit,llm_history_len:null==a?void 0:a.llm_history_len,system_message:null==a?void 0:a.system_message,exact_search_limit:null==a?void 0:a.exact_search_limit,fuzzy_search_limit:null==a?void 0:a.fuzzy_search_limit})}},[a]);let k=b.map(e=>({label:e.name_alias,value:e.id})),S=v.filter(e=>e.dataset_type==E.I.DOCUMENT).map(e=>({label:e.name,value:e.id})),O=v.filter(e=>e.dataset_type==E.I.QUESTION).map(e=>({label:e.name,value:e.id}));return(0,l.jsxs)(d.k,{mih:50,gap:"md",justify:"flex-start",align:"flex-start",direction:"column",children:[(0,l.jsxs)(d.k,{mih:50,gap:"md",justify:"flex-start",align:"flex-start",direction:"row",wrap:"nowrap",children:[(0,l.jsxs)("div",{style:{width:"50%"},children:[r!==s.CHAT?(0,l.jsx)(c.D,{order:4,mb:8,children:"基础设置"}):null,(0,l.jsxs)(p.X,{shadow:"xs",p:"md",withBorder:!0,children:[r!==s.CHAT?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(c.D,{order:5,size:"h5",children:"知识库"}),(0,l.jsxs)(h.x,{maw:N.cy,pl:4,pr:4,children:[(0,l.jsx)(x.o,{withAsterisk:!0,label:"名称",placeholder:"输入知识库名称",...z.getInputProps("name")}),(0,l.jsx)(u.g,{label:"描述",placeholder:"输入应用描述",...z.getInputProps("description")})]}),(0,l.jsx)(m.i,{my:"sm"})]}):null,(0,l.jsx)(c.D,{order:5,size:"h5",children:"提示词"}),(0,l.jsxs)(h.x,{maw:N.cy,pl:4,pr:4,children:[(0,l.jsx)(u.g,{label:"系统提示词",placeholder:"输入系统提示词",...z.getInputProps("system_message"),description:"系统提示词作为第一个输入给大语言模型的文本，往往用来设定角色"}),(0,l.jsx)(u.g,{withAsterisk:!0,label:"提示词模板",placeholder:"",...z.getInputProps("prompt_template"),minRows:6,description:"提示词模板可以将检索的结果context和用户的输入query整合到一起，最后整体输入给大语言模型"})]}),(0,l.jsx)(m.i,{my:"sm"}),(0,l.jsx)(c.D,{order:5,size:"h5",children:"数据集"}),(0,l.jsx)(h.x,{maw:N.cy,pl:4,pr:4,children:(0,l.jsxs)(_.Z,{grow:!0,children:[(0,l.jsx)(y.NU,{data:S,description:"文档数据集用来做模型检索",label:"文档数据集",placeholder:"添加模糊数据集",...z.getInputProps("fuzzy_datasets")}),(0,l.jsx)(y.NU,{data:O,description:"问答数据集用来做精确匹配",label:"问答数据集",placeholder:"添加精准数据集",...z.getInputProps("exact_datasets")})]})}),(0,l.jsx)(m.i,{my:"sm"}),(0,l.jsx)(c.D,{order:5,size:"h5",children:"基础模型"}),(0,l.jsx)(h.x,{maw:N.cy,pl:4,pr:4,mb:12,children:(0,l.jsx)(j.Ph,{withAsterisk:!0,data:k,description:"LLM代理是大语言模型的代理服务，通过opneai范式的兼容，可以任意切换不同类型的LLM而不用修改业务代码",label:"LLM代理",placeholder:"",...z.getInputProps("model_id")})}),(0,l.jsx)(m.i,{my:"sm"})]})]}),(0,l.jsxs)("div",{style:{width:"50%"},children:[r!==s.CHAT?(0,l.jsx)(c.D,{order:4,mb:8,children:"高级设置"}):null,(0,l.jsxs)(p.X,{shadow:"xs",p:"md",withBorder:!0,children:[(0,l.jsx)(c.D,{order:5,size:"h5",children:"答案召回"}),(0,l.jsxs)(h.x,{maw:N.cy,pl:4,pr:4,children:[(0,l.jsxs)(_.Z,{grow:!0,children:[(0,l.jsx)(x.o,{withAsterisk:!0,description:"文档数据检索的精度，取值0-1之间，建议取0.6~0.8",label:"文档结果召回精度",placeholder:"",...z.getInputProps("fuzzy_search_similarity")}),(0,l.jsx)(x.o,{withAsterisk:!0,description:"问答数据检索的精度，取值0-1之间，建议取0.9~1",label:"问答结果召回精度",placeholder:"",...z.getInputProps("exact_search_similarity")})]}),(0,l.jsxs)(_.Z,{grow:!0,children:[(0,l.jsx)(f.Y,{withAsterisk:!0,description:"文档结果的召回数量，数量越多信息越丰富，但是首先于LLM上下文长度，不宜过长",label:"文档结果召回数量",placeholder:"",...z.getInputProps("fuzzy_search_limit")}),(0,l.jsx)(f.Y,{withAsterisk:!0,description:"问答结果的召回数量，数量越多信息越丰富，但是首先于LLM上下文长度，不宜过长",label:"问答结果召回数量",placeholder:"",...z.getInputProps("exact_search_limit")})]})]}),(0,l.jsx)(m.i,{my:"sm"}),(0,l.jsx)(c.D,{order:5,size:"h5",children:"大语言模型参数"}),(0,l.jsxs)(h.x,{maw:N.cy,pl:4,pr:4,children:[(0,l.jsxs)(_.Z,{grow:!0,children:[(0,l.jsx)(x.o,{withAsterisk:!0,label:"temperature",placeholder:"",...z.getInputProps("temperature")}),(0,l.jsx)(x.o,{withAsterisk:!0,label:"top_p",placeholder:"",...z.getInputProps("top_p")})]}),(0,l.jsxs)(_.Z,{grow:!0,children:[(0,l.jsx)(x.o,{withAsterisk:!0,label:"n_sequences",placeholder:"",...z.getInputProps("n_sequences")}),(0,l.jsx)(x.o,{withAsterisk:!0,label:"max_tokens",placeholder:"",...z.getInputProps("max_tokens")})]}),(0,l.jsxs)(_.Z,{grow:!0,children:[(0,l.jsx)(x.o,{withAsterisk:!0,label:"presence_penalty",placeholder:"",...z.getInputProps("presence_penalty")}),(0,l.jsx)(x.o,{withAsterisk:!0,label:"frequency_penalty",placeholder:"",...z.getInputProps("frequency_penalty")})]}),(0,l.jsx)(x.o,{label:"logit_bias",placeholder:"",...z.getInputProps("logit_bias"),width:"50%"})]}),(0,l.jsx)(m.i,{my:"sm"})]})]})]}),(0,l.jsx)(h.x,{maw:N.cy,pt:4,style:{textAlign:"center",width:"100%"},children:(0,l.jsx)(g.z,{style:{width:"100%"},onClick:async()=>{if(z.validate(),z.isValid()){w(!0);let e=z.values;n?await (0,B.CH)(e.id,e):await (0,B.uA)(e),await (0,B.Co)(t),i(!1),w(!1)}},children:"确认"})})]})}function M(e){let{appId:t}=e,r=(0,B.s6)().open,i=(0,B.s6)().setOpen,s=(0,B.s6)().isEdit,o=(0,B.s6)().setEditStatus;return(0,l.jsx)(w.u,{opened:r,onClose:()=>{o(!1),i(!1)},title:s?"编辑知识库":"创建知识库",centered:!0,size:"55%",children:(0,l.jsx)(Z,{appId:t})})}function R(e){let{appId:t}=e,r=(0,B.s6)().chatDrawer,i=(0,B.s6)().setChatDrawer;return(0,l.jsx)(b.d,{opened:r,onClose:()=>{i(!1)},title:(0,l.jsxs)("div",{children:[(0,l.jsx)(v.x,{fz:"xl",children:"知识库调试"}),(0,l.jsx)(v.x,{fz:"sm",children:"您可以通过提示词调整，数据集切换，模型服务，以及切换模型参数来调整知识库问答的效果"})]}),position:"right",size:"90%",overlayProps:{opacity:.5,blur:4},children:(0,l.jsxs)(d.k,{mih:50,direction:"row",children:[(0,l.jsxs)("div",{style:{width:"60%"},children:[(0,l.jsx)("div",{style:{marginBottom:12},children:(0,l.jsx)(z.C,{color:"orange",size:"lg",radius:"xs",variant:"filled",children:"知识库参数设置"})}),(0,l.jsx)(Z,{appId:t,containerType:s.CHAT})]}),(0,l.jsxs)("div",{style:{marginLeft:12,borderLeft:"1px solid #eee",paddingLeft:8,width:"40%"},children:[(0,l.jsx)("div",{children:(0,l.jsx)(z.C,{color:"orange",size:"lg",radius:"xs",variant:"filled",children:"知识库问答"})}),(0,l.jsx)(H.Z,{})]})]})})}function U(e){let{appId:t}=e,r=(0,B.s6)().knowledgeBaseList,i=(0,B.s6)().setLoading,s=(0,B.s6)().updateCurrentKnowledgeBase,n=(0,B.s6)().setEditStatus,d=(0,B.s6)().setOpen,c=(0,B.s6)().setChatDrawer,p=async e=>{try{i(!0),await (0,B.g$)(e),await (0,B.Co)(t)}catch(e){console.log(e)}finally{i(!1)}},h=r.map(e=>(0,l.jsxs)("tr",{children:[(0,l.jsx)("td",{style:{width:20},children:e.id}),(0,l.jsx)("td",{style:{width:100},children:(0,l.jsx)(a(),{href:"/app/".concat(t,"/knowledgeBase/").concat(e.id,"/detail"),children:e.name})}),(0,l.jsx)("td",{style:{width:100},children:e.description}),(0,l.jsx)("td",{style:{width:200},children:e.system_message}),(0,l.jsx)("td",{style:{width:300},children:(0,l.jsx)(q.Z,{value:e.prompt_template,content:e.prompt_template})}),(0,l.jsx)("td",{children:e.token?(0,l.jsx)(q.Z,{value:e.token,content:e.token,truncate:!0}):(0,l.jsx)(g.z,{color:"lime",size:"xs",compact:!0,onClick:()=>p(e.id),children:"生成访问令牌"})}),(0,l.jsx)("td",{children:(0,T.o)(e.created)}),(0,l.jsxs)("td",{children:[e.token?(0,l.jsx)(g.z,{color:"grape",variant:"filled",size:"xs",onClick:async()=>{n(!0);let t=await (0,B.IV)(e.id);s(t),c(!0)},mr:4,children:"问答测试"}):(0,l.jsx)(k.u,{label:"需要成访问令牌才可以访问此能力",children:(0,l.jsx)(g.z,{color:"grape",variant:"filled",size:"xs",mr:4,children:"问答测试"})}),(0,l.jsx)(g.z,{variant:"filled",size:"xs",onClick:async()=>{n(!0);let t=await (0,B.IV)(e.id);s(t),d(!0)},mr:4,children:"编辑"}),(0,l.jsx)(g.z,{variant:"filled",color:"red",size:"xs",onClick:()=>{},children:"删除"})]})]},e.id)),x=async()=>{i(!0);try{await (0,B.Co)(t)}catch(e){console.log(e)}i(!1)};return(0,o.useEffect)(()=>{x()},[t]),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(R,{appId:t}),(0,l.jsxs)(S.i,{striped:!0,withBorder:!0,withColumnBorders:!0,mt:12,children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{children:"编号"}),(0,l.jsx)("th",{children:"名称"}),(0,l.jsx)("th",{children:"描述"}),(0,l.jsx)("th",{children:"系统提示词"}),(0,l.jsx)("th",{children:"完整提示词"}),(0,l.jsx)("th",{children:"访问token"}),(0,l.jsx)("th",{children:"创建时间"}),(0,l.jsx)("th",{children:"操作"})]})}),(0,l.jsx)("tbody",{children:h})]})]})}function $(e){let{appId:t}=e,r=(0,B.s6)().loading,i=[{title:"应用列表",href:"/app"},{title:"知识库",href:"/app/".concat(t,"/knowledgeBase")}].map((e,t)=>(0,l.jsx)(O.e,{href:e.href,children:e.title},t)),s=(0,B.s6)().setOpen;return(0,l.jsxs)("div",{style:{position:"relative"},children:[(0,l.jsx)(I.f,{visible:r,overlayOpacity:.3}),(0,l.jsx)(P.O,{children:i}),(0,l.jsx)(L.Z,{title:"知识库",description:"知识库使用RAG(Retrieval-Augmented Generation 检索增强生成)技术来将大语言模型跟数据进行结合，以实现更准确的预测"}),(0,l.jsx)(h.x,{children:(0,l.jsx)(g.z,{onClick:()=>s(!0),children:"新建知识库"})}),(0,l.jsx)(M,{appId:t}),(0,l.jsx)(U,{appId:t})]})}(i=s||(s={}))[i.ADD_OR_UPDATE=1]="ADD_OR_UPDATE",i[i.CHAT=2]="CHAT";var V=!0;function X(e){let{appId:t}=e;return(0,l.jsx)($,{appId:t})}},48847:function(e,t,r){"use strict";function i(e){let t=new Date(e),r=t.getFullYear(),i=(1+t.getMonth()).toString().padStart(2,"0"),s=t.getDate().toString().padStart(2,"0"),l=t.getHours().toString().padStart(2,"0"),o=t.getMinutes().toString().padStart(2,"0"),n=t.getSeconds().toString().padStart(2,"0");return"".concat(r,"-").concat(i,"-").concat(s," ").concat(l,":").concat(o,":").concat(n)}r.d(t,{o:function(){return i}})}},function(e){e.O(0,[121,586,871,664,946,855,683,862,774,888,179],function(){return e(e.s=9049)}),_N_E=e.O()}]);