(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[159],{88301:function(e,s,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/app/[id]/knowledgeBase/[knowledgeBaseId]/detail",function(){return l(11674)}])},11674:function(e,s,l){"use strict";l.r(s),l.d(s,{__N_SSP:function(){return H},default:function(){return M}});var i,t,r=l(85893),n=l(67294),a=l(19236),d=l(82623),o=l(64523),c=l(80061),p=l(52615),h=l(54777),x=l(71232),_=l(31194),u=l(28855),m=l(14127),j=l(67841),y=l(92716),w=l(95117),g=l(69876),f=l(17789),v=l(88393),k=l(54685),z=l(49737),b=l(93284),A=l(77248),I=l(60062),P=l(24350),D=l(85417),C=l(77194),U=l(53483),T=l(61407),B=l(3658),E=l(30372),L=l(31538);function Z(e){let{appId:s,containerType:l}=e;(0,U.s6)().setOpen;let i=(0,U.s6)().currentKnowledgeBase,y=(0,U.s6)().setLoading,w=(0,P.s6)().modelList,g=(0,D.s6)().dataSetList,f=(0,A.c)({initialValues:{name:"",description:"",prompt_template:"已知信息：【{context}】。你需要积极，简洁和专业地来回答```中的问题。如果问题和已知信息没有关系，或者问题存在争议性，请说 “抱歉，无法回答该问题”，不允许编造。问题是：```{query}```",app_id:parseInt(s),exact_datasets:[],fuzzy_datasets:[],exact_search_similarity:.9,fuzzy_search_similarity:.6,temperature:.5,top_p:1,n_sequences:1,max_tokens:1024,stop:[],presence_penalty:0,frequency_penalty:0,logit_bias:"",model_id:"",redis_ip_ex:0,redis_history_ex:0,model_ip_limit:0,llm_history_len:0,system_message:"",exact_search_limit:1,fuzzy_search_limit:3},validate:{name:e=>e?null:"知识库名必填"}});(0,n.useEffect)(()=>{(0,P.fZ)(),(0,D.ln)();let e=null==i?void 0:i.datasets;f.setValues({id:null==i?void 0:i.id,name:null==i?void 0:i.name,description:null==i?void 0:i.description,prompt_template:null==i?void 0:i.prompt_template,app_id:null==i?void 0:i.app_id,exact_datasets:null==e?void 0:e.filter(e=>e.dataset_type===C.I.QUESTION).map(e=>e.dataset_id),fuzzy_datasets:null==e?void 0:e.filter(e=>e.dataset_type===C.I.DOCUMENT).map(e=>e.dataset_id),exact_search_similarity:null==i?void 0:i.exact_search_limit,fuzzy_search_similarity:null==i?void 0:i.fuzzy_search_similarity,temperature:null==i?void 0:i.temperature,top_p:null==i?void 0:i.top_p,n_sequences:null==i?void 0:i.n_sequences,max_tokens:null==i?void 0:i.max_tokens,stop:null==i?void 0:i.stop,presence_penalty:null==i?void 0:i.presence_penalty,frequency_penalty:null==i?void 0:i.frequency_penalty,logit_bias:null==i?void 0:i.logit_bias,model_id:null==i?void 0:i.model_id,redis_ip_ex:null==i?void 0:i.redis_ip_ex,redis_history_ex:null==i?void 0:i.redis_history_ex,model_ip_limit:null==i?void 0:i.model_ip_limit,llm_history_len:null==i?void 0:i.llm_history_len,system_message:null==i?void 0:i.system_message,exact_search_limit:null==i?void 0:i.exact_search_limit,fuzzy_search_limit:null==i?void 0:i.fuzzy_search_limit})},[i]);let v=w.map(e=>({label:e.name,value:e.id})),k=g.filter(e=>e.dataset_type==C.I.DOCUMENT).map(e=>({label:e.name,value:e.id})),z=g.filter(e=>e.dataset_type==C.I.QUESTION).map(e=>({label:e.name,value:e.id}));return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{style:{width:"33%"},children:[l!==t.CHAT?(0,r.jsx)(a.D,{order:4,mb:8,children:"基础设置"}):null,(0,r.jsxs)(d.X,{shadow:"xs",p:"md",withBorder:!0,children:[l!==t.CHAT?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a.D,{order:5,size:"h5",children:"知识库"}),(0,r.jsxs)(o.x,{maw:T.cy,pl:4,pr:4,children:[(0,r.jsx)(c.o,{withAsterisk:!0,label:"名称",placeholder:"输入知识库名称",...f.getInputProps("name")}),(0,r.jsx)(p.g,{label:"描述",placeholder:"输入应用描述",...f.getInputProps("description")})]}),(0,r.jsx)(h.i,{my:"sm"})]}):null,(0,r.jsx)(a.D,{order:5,size:"h5",children:"提示词"}),(0,r.jsxs)(o.x,{maw:T.cy,pl:4,pr:4,children:[(0,r.jsx)(p.g,{label:"系统提示词",placeholder:"输入系统提示词",...f.getInputProps("system_message"),description:"系统提示词作为第一个输入给大语言模型的文本，往往用来设定角色"}),(0,r.jsx)(p.g,{withAsterisk:!0,label:"提示词模板",placeholder:"",...f.getInputProps("prompt_template"),minRows:6,description:"提示词模板可以将检索的结果context和用户的输入query整合到一起，最后整体输入给大语言模型"})]}),(0,r.jsx)(h.i,{my:"sm"}),(0,r.jsx)(a.D,{order:5,size:"h5",children:"数据集"}),(0,r.jsx)(o.x,{maw:T.cy,pl:4,pr:4,children:(0,r.jsxs)(x.Z,{grow:!0,children:[(0,r.jsx)(_.NU,{data:k,description:"文档数据集用来做模型检索",label:"文档数据集",placeholder:"添加模糊数据集",...f.getInputProps("fuzzy_datasets")}),(0,r.jsx)(_.NU,{data:z,description:"问答数据集用来做问题精确匹配",label:"问答数据集",placeholder:"添加精准数据集",...f.getInputProps("exact_datasets")})]})}),(0,r.jsx)(h.i,{my:"sm"}),(0,r.jsx)(a.D,{order:5,size:"h5",children:"模型"}),(0,r.jsx)(o.x,{maw:T.cy,pl:4,pr:4,mb:12,children:(0,r.jsx)(u.Ph,{withAsterisk:!0,data:v,description:"LLM代理是大语言模型的代理服务，通过opneai范式的兼容，可以任意切换不同类型的LLM而不用修改业务代码",label:"LLM代理",placeholder:"",...f.getInputProps("model_id")})}),(0,r.jsx)(h.i,{my:"sm"})]})]}),(0,r.jsxs)("div",{style:{width:"33%"},children:[l!==t.CHAT?(0,r.jsx)(a.D,{order:4,mb:8,children:"高级设置"}):null,(0,r.jsxs)(d.X,{shadow:"xs",p:"md",withBorder:!0,children:[(0,r.jsx)(a.D,{order:5,size:"h5",children:"答案召回"}),(0,r.jsxs)(o.x,{maw:T.cy,pl:4,pr:4,children:[(0,r.jsxs)(x.Z,{grow:!0,children:[(0,r.jsx)(c.o,{withAsterisk:!0,description:"文档数据检索的精度，取值0-1之间，建议取0.6~0.8",label:"文档结果召回精度",placeholder:"",...f.getInputProps("fuzzy_search_similarity")}),(0,r.jsx)(c.o,{withAsterisk:!0,description:"问答数据检索的精度，取值0-1之间，建议取0.9~1",label:"问答结果召回精度",placeholder:"",...f.getInputProps("exact_search_similarity")})]}),(0,r.jsxs)(x.Z,{grow:!0,children:[(0,r.jsx)(m.Y,{withAsterisk:!0,description:"文档结果的召回数量，数量越多信息越丰富，但是首先于LLM上下文长度，不宜过长",label:"文档结果召回数量",placeholder:"",...f.getInputProps("fuzzy_search_limit")}),(0,r.jsx)(m.Y,{withAsterisk:!0,description:"问答结果的召回数量，数量越多信息越丰富，但是首先于LLM上下文长度，不宜过长",label:"问答结果召回数量",placeholder:"",...f.getInputProps("exact_search_limit")})]})]}),(0,r.jsx)(h.i,{my:"sm"}),(0,r.jsx)(a.D,{order:5,size:"h5",children:"大语言模型参数"}),(0,r.jsxs)(o.x,{maw:T.cy,pl:4,pr:4,children:[(0,r.jsxs)(x.Z,{grow:!0,children:[(0,r.jsx)(c.o,{withAsterisk:!0,label:"temperature",placeholder:"",...f.getInputProps("temperature")}),(0,r.jsx)(c.o,{withAsterisk:!0,label:"top_p",placeholder:"",...f.getInputProps("top_p")})]}),(0,r.jsxs)(x.Z,{grow:!0,children:[(0,r.jsx)(c.o,{withAsterisk:!0,label:"n_sequences",placeholder:"",...f.getInputProps("n_sequences")}),(0,r.jsx)(c.o,{withAsterisk:!0,label:"max_tokens",placeholder:"",...f.getInputProps("max_tokens")})]}),(0,r.jsxs)(x.Z,{grow:!0,children:[(0,r.jsx)(c.o,{withAsterisk:!0,label:"presence_penalty",placeholder:"",...f.getInputProps("presence_penalty")}),(0,r.jsx)(c.o,{withAsterisk:!0,label:"frequency_penalty",placeholder:"",...f.getInputProps("frequency_penalty")})]}),(0,r.jsx)(c.o,{label:"logit_bias",placeholder:"",...f.getInputProps("logit_bias"),width:"50%"})]}),(0,r.jsx)(h.i,{my:"sm"})]}),(0,r.jsx)(o.x,{maw:T.cy,pt:24,style:{textAlign:"center",width:"100%"},children:(0,r.jsx)(j.z,{style:{width:"100%"},onClick:async()=>{if(f.validate(),f.isValid()){y(!0);let e=f.values;await (0,U.CH)(e.id,e),y(!1)}},children:"确认修改"})})]})]})}function q(){let e=(0,U.s6)().chatDrawer,s=(0,U.s6)().setChatDrawer;return(0,r.jsx)(y.d,{opened:e,onClose:()=>{s(!1)},title:(0,r.jsxs)("div",{children:[(0,r.jsx)(w.x,{fz:"xl",children:"知识库调试"}),(0,r.jsx)(w.x,{fz:"sm",children:"您可以通过提示词调整，数据集切换，模型服务，以及切换模型参数来调整知识库问答的效果"})]}),position:"right",size:"30%",overlayProps:{opacity:.5,blur:4},children:(0,r.jsx)(g.k,{mih:50,direction:"row",children:(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{children:(0,r.jsx)(f.C,{color:"orange",size:"lg",radius:"xs",variant:"filled",children:"知识库问答"})}),(0,r.jsx)(I.Z,{})]})})})}function N(){let e=(0,U.s6)().currentKnowledgeBase,s=(0,U.s6)().accessUrl,l=(0,U.s6)().setAccessUrl,i=(0,U.s6)().setChatDrawer;(0,n.useEffect)(()=>{(async()=>{let e=await (0,U.Sk)(),s=e.data||{openApiUrl:"",innerApiUrl:""};l(s)})()},[]);let t="curl -X 'POST'     '".concat(s.openApiUrl,"/v1/chat/completions'     -H 'accept: application/json'     -H 'Authorization: Bearer ").concat(null==e?void 0:e.token,'\'     -H \'Content-Type: application/json\'     -d \'{\n      "messages":[\n          {\n              "role": "user",\n              "content": "请问世界最高峰是什么？"\n          }\n      ],\n      "stream": false,\n      "max_tokens": 1024\n  }\'');return(0,r.jsxs)("div",{style:{width:"33%"},children:[(0,r.jsx)(a.D,{order:4,mb:8,children:"访问接入"}),(0,r.jsxs)(d.X,{shadow:"xs",p:"md",withBorder:!0,children:[(0,r.jsx)(a.D,{order:5,size:"h5",children:"API访问"}),(0,r.jsxs)(o.x,{maw:T.cy,pl:4,pr:4,children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("span",{children:[(0,r.jsx)(w.x,{color:"cyan",weight:700,children:"公网API访问地址："}),(0,r.jsx)(E.Z,{value:s.openApiUrl,content:s.openApiUrl})," "]}),(0,r.jsx)("span",{})]}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("span",{style:{wordBreak:"break-all"},children:[(0,r.jsx)(w.x,{color:"cyan",weight:700,children:"API访问token："}),(0,r.jsx)(E.Z,{value:null==e?void 0:e.token,content:null==e?void 0:e.token})]}),(0,r.jsx)("span",{})]}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("span",{style:{wordBreak:"break-all"},children:[(0,r.jsx)(w.x,{color:"cyan",weight:700,children:"API文档访问："}),(0,r.jsx)("a",{href:"".concat(s.openApiUrl,"/docs"),target:"_blank",children:"".concat(s.openApiUrl,"/docs")})]}),(0,r.jsx)("span",{})]})]}),(0,r.jsx)(h.i,{my:"sm"}),(0,r.jsx)(a.D,{order:5,size:"h5",children:"API调用示例"}),(0,r.jsx)(o.x,{maw:T.cy,pl:4,pr:4,children:(0,r.jsx)(L.Z,{textContent:"```shell\n".concat(t),value:t})}),(0,r.jsx)(h.i,{my:"sm"}),(0,r.jsx)(a.D,{order:5,size:"h5",children:"效果测试"}),(0,r.jsx)(o.x,{maw:T.cy,pl:4,pr:4,children:(0,r.jsx)(x.Z,{grow:!0,children:(null==e?void 0:e.token)?(0,r.jsx)(j.z,{color:"grape",variant:"filled",size:"xs",onClick:()=>{i(!0)},mr:4,children:"问答测试"}):(0,r.jsx)(v.u,{label:"需要成访问令牌才可以访问此能力",children:(0,r.jsx)(j.z,{color:"grape",variant:"filled",size:"xs",mr:4,children:"问答测试"})})})})]})]})}function O(e){let{appId:s,knowledgeBaseId:l}=e,i=(0,U.s6)().loading,t=(0,U.s6)().updateCurrentKnowledgeBase,a=[{title:"应用列表",href:"/app"},{title:"知识库",href:"/app/".concat(s,"/knowledgeBase")},{title:"知识库详细",href:"/app/".concat(s,"/knowledgeBase/").concat(l,"/detail")}].map((e,s)=>(0,r.jsx)(k.e,{href:e.href,children:e.title},s));return(0,n.useEffect)(()=>{(async()=>{let e=await (0,U.IV)(l);t(e)})()},[l]),(0,r.jsxs)(o.x,{pos:"relative",children:[(0,r.jsx)(z.f,{visible:i,overlayOpacity:.3}),(0,r.jsx)(b.O,{children:a}),(0,r.jsx)(B.Z,{title:"知识库详情",description:"您可以查看修改知识库内容，以及查看API调用"}),(0,r.jsx)(q,{}),(0,r.jsxs)(g.k,{mih:50,gap:"md",justify:"flex-start",align:"flex-start",direction:"row",wrap:"nowrap",children:[(0,r.jsx)(N,{}),(0,r.jsx)(Z,{appId:s})]})]})}(i=t||(t={}))[i.ADD_OR_UPDATE=1]="ADD_OR_UPDATE",i[i.CHAT=2]="CHAT";var H=!0;function M(e){let{appId:s,knowledgeBaseId:l}=e;return(0,r.jsx)(O,{appId:s,knowledgeBaseId:l})}}},function(e){e.O(0,[121,586,871,946,855,683,862,774,888,179],function(){return e(e.s=88301)}),_N_E=e.O()}]);