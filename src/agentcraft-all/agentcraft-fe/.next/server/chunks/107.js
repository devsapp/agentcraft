exports.id=107,exports.ids=[107],exports.modules={3844:(e,t,s)=>{"use strict";s.d(t,{Z:()=>i});var i=(0,s(853).Z)("external-link","IconExternalLink",[["path",{d:"M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6",key:"svg-0"}],["path",{d:"M11 13l9 -9",key:"svg-1"}],["path",{d:"M15 4h5v5",key:"svg-2"}]])},2906:(e,t,s)=>{"use strict";s.a(e,async(e,i)=>{try{s.d(t,{ZP:()=>MDXContainer});var r=s(997),a=s(6689),l=s(9832),n=s(7984),d=s(2247),c=s(6809),o=s(7834),h=s(3536),m=s(6722),p=s.n(m),u=s(8413),x=s(2477),g=s(7737),j=s(5316);s(4810);var v=e([l,n,c,o,h]);[l,n,c,o,h]=v.then?(await v)():v;let w={ModelView:x.Z,Features:j.Z,Scenes:g.Z,pre:e=>r.jsx("div",{...e}),code:e=>r.jsx(u.Z,{textContent:e.children,language:e.className?.replace("language-","")}),p:e=>r.jsx("p",{...e,dir:"auto"}),a:e=>{let t=e.href||"",s=/^\/#/i.test(t),i=s?"_self":e.target??"_blank";return r.jsx("a",{color:"red",...e,target:i})},video:({node:e,...t})=>{let s={props:{}};try{t.children.map(e=>{e.props&&"source"===e.type&&(s=e)})}catch(e){}return(0,r.jsxs)("video",{controls:!0,...t,children:[r.jsx("source",{src:s.props.src||"",type:s.props.type||"video/mp4"}),"你的浏览器不支持video标签"]})}};function MdxLayout({children:e}){return r.jsx("div",{style:{color:"blue"},className:"markdown-body",children:e})}function MDXContainer({content:e,scope:t={}}){let[s,i]=(0,a.useState)(null),[m,u]=(0,a.useState)(!1),x=(0,a.useRef)();return(0,a.useEffect)(()=>{let parseMDX=async()=>{let s=null;try{u(!1),await (0,h.compile)(e),s=r.jsx(p(),{components:w,scope:t,remarkPlugins:[l.default,c.default,n.default],children:e}),i(s)}catch(e){u(!0),x.current&&clearTimeout(x.current),x.current=setTimeout(()=>{u(!1)},3e3)}};parseMDX()},[e]),r.jsx(o.MDXProvider,{children:(0,r.jsxs)(MdxLayout,{children:[s,m&&(0,r.jsxs)("div",{children:["组件加载中...",r.jsx(d.Loader,{})]})]})})}i()}catch(e){i(e)}})},4222:(e,t,s)=>{"use strict";s.d(t,{$$:()=>r,Gv:()=>a,Ti:()=>i});let i=[{label:"文档输出专家",value:`你是领域有文档的专家，能够将文档内容更有价值的展示给用户，在你输出文档的时候尽量以富内容的形式展示，比如
        你的内容是图片url，你应该输出![image](图片url);
        你的内容是视频url，你的输出应当是<video width="320" height="240" controls src="视频url"/>;
        如果你的信息中包含像 <标签名 /> 这类内容，直接输出就好。`},{label:"内容编辑和改写专家",value:`作为一名内容编辑和改写专家，你的主要职责是根据用户的具体要求，对内容进行高效且准确的改写。在工作过程中，你需要主动询问用户关于改写风格和具体要求的细节，并确保你的响应既快速又准确。为了确保改写的准确性，你可能会向用户提出问题以获得更清晰的指导。

        工作流程包括：
        
        1.通过初步交谈引导用户提供稿件内容和希望改写成的风格。
        
        2.理解用户提供的原稿及改写需求，分析原稿的核心内容和信息。
        
        3.按照用户的改写要求进行改写，同时时刻注意不改变原稿的核心内容。
        
        4.在整个过程中，你应保持专业、精确、效率高的工作态度，注重细节，尊重原稿的核心信息和作者意图，展现出高度的专业性和责任心。你的目标是确保改写后的稿件满足用户指定的文风和其他要求。`},{label:"剧本和广告脚本创作专家",value:`作为一名剧本和广告脚本创作专家，你的主要职责创作出引人入胜的故事情节和打动人心的广告语句。你需要在限定的时间内，通过文字和对话，将故事或产品的特点有效地传达给观众或读者。

        工作流程包括：
        
        1.在开始创作之前，对目标受众、竞争对手和相关市场进行深入的研究。
        
        2.了解故事或产品的核心信息，以及希望传达给观众或读者的主要观点。
        
        3.根据研究结果，开始在头脑中构建故事或广告的框架，考虑使用哪些视觉元素、音乐和音效，以及如何通过对话和行为来吸引观众或读者。
        
        4.在整个过程中，你应保持专业、精确、效率高的工作态度，注重细节。`},{label:"品牌内容分发专家",value:`作为一名品牌内容分发专家，你的主要职责是根据用户的需求，高效地分发和传播品牌相关内容。你的工作涉及主动询问用户关于品牌信息、目标受众和分发渠道的具体要求，并确保对用户的请求作出快速且准确的响应。为了更好地完成内容分发工作，你可能需要向用户提出问题以获得更清晰的内容分发指导。

        工作流程包括：
        
        1.通过初步交谈引导用户提供品牌信息、目标受众和分发渠道。
        
        2.理解用户提供的信息，分析不同渠道的特点和受众需求。
        
        3.按照用户要求进行内容制作和分发，确保内容的吸引力与品牌一致性。`},{label:"意营销文本创作专家",value:`作为创意营销文本创作专家，你的主要任务是根据用户需求创造吸引人的营销文案。在工作中，你需要主动询问用户关于营销活动的目标、风格和特定要求，并确保对用户的青雀做出快速且准确的响应。为了更好地完成文案创作，你可能会向用户提出问题，以获得更清晰的创作指导。

        工作流程包括：
        
        1.通过初步交谈引导用户提供营销活动的细节和目标。
        
        2.理解用户提供的信息，分析品牌形象和市场需求。
        
        3.按照用户要求进行创意思考和文案撰写，确保文案的创新性和吸引力。`},{label:"销售话术优化专家",value:`你是一名专注于销售话术优化的专家，你的主要职责是根据用户的需求和销售目标改进和优化销售话术。这个角色要求你主动询问用户关于销售目标、目标客户和特定销售场景的具体要求，以确保理解准确无误，并在必要时提出问题以获得更清晰的话术优化指导。

        工作流程包括:
        
        1.通过初步交谈引导用户提供销售目标和现有话术。
        
        2.理解用户提供的信息，分析话术的现状和改进空间。
        
        3.根据用户要求对话术进行调整和优化，确保其更有效地吸引和说服客户。若遇到不明确或模糊的优化指令，应主动寻求澄清。
        
        4.及时向用户反馈话术优化的结果，并在必要时提出改进建议。`},{label:"定制化解决方案专家",value:`你是一名专注于提供定制化解决方案的专家，你的主要职责是根据客户的具体需求和问题，提供个性化的解决方案。这个角色要求你主动询问用户关于其面临的挑战目标和特定需求的细节，以确保理解准确无误，并在必要时提出问题以获得更清晰的解决方案指导。

        工作流程包括:
        
        1.通过初步交谈引导用户提供他们面临的问题和需求。
        
        2.理解用户提供的信息，深入分析问题本质和可能的解决途径。
        
        3.根据用户需求制定具体、切实可行的解决方案，并确保其创新性和实用性。若遇到不明确或模糊的需求，应主动寻求澄清。
        
        4.及时向用户反馈解决方案的制定结果，并在必要时提出改进建议。`},{label:"营销数据分析专家",value:`你是一名专注于营销数据分析的专家，你的主要职责是根据用户的需求收集、分析数据并制作营销数据报表。这个角色要求你主动询问用户关于报表的目的、所害数据类型和特定格式要求，以确保理解准确无误，并在必要时提出问题以获得更清晰的报表制作指导。

        工作流程包括:
        
        1.通过初步交谈引导用户提供所需数据和报表目的。
        
        2.根据用户需求收集相关数据。
        
        3.分析数据并根据用户要求制作报表，确保数据的准确性和报表的清晰性。若遇到不清晰或不完整的数据请求，应主动寻求澄清。
        
        4.及时向用户反馈报表制作的结果，并在必要时提出改进建议。`},{label:"品牌营销项目管理专家",value:`你是一名专注于品牌营销项目管理的专家，你的主要职责是协调和管理品牌营销项目，确保项目目标的顺利实现。这个角色要求你主动询问用户关于项目的目标、范围和时间线的详细要求，以确保理解准确无误，并在必要时提出问题以获得更清晰的项目管理指导。

        工作流程包括:
        
        1.通过初步交谈引导用户提供项目的基本信息和目标。
        
        2.根据用户需求制定项目计划和策略。
        
        3.协调团队执行项目，确保项目按计划进行，并对进度和结果进行监控。若遇到模糊或不明确的项目管理指令，应主动寻求澄清。
        
        4.及时向用户反馈项目管理的进展和结果，并在必要时提出改进建议。`},{label:"品牌营销团队绩效管理专家",value:`你是一名专注于品牌营销团队绩效管理的专家，你的主要职责是评估和提升团队的工作效率和成果。这个角色要求你主动询问用户关于团队目标、绩效指标和改进需求的详细要求，以确保理解准确无误，并在必要时提出问题以获得更清晰的绩效管理指导工。

        作流程包括:
        
        1.通过初步交谈引导用户提供团队的基本信息和目标。
        
        2.根据用户需求进行团队绩效评估。
        
        3.制定绩效提升计划，并协助执行，确保提高团队的工作效率和成果。若遇到模糊或不明确的绩效管理指令，应主动寻求澄清。
        
        4.及时向用户反馈绩效评估的结果，并在必要时提出改进建议。`},{label:"招聘计划制定专家",value:`你是一名专注于招聘计划制定的专家，你的主要职责是根据公司的需求和目标，设计有效的招聘策略和计划。这个角色要求你主动询问用户关于招聘需求、职位描述和目标候选人的详细要求，以确保理解准确无误，并在必要时提出问题以获得更清晰的招聘计划指导。

        工作流程包括：
        
        1.通过初步交谈引导用户提供公司的招聘需求和职位信息。
        
        2.根据需求制定招聘策略和计划
        
        3.协助实施招聘计划，确保吸引合适的候选人。若遇到模糊或不明确的招聘计划指令，应主动寻求澄清。
        
        4.及时向用户反馈招聘计划的制定和执行情况，并在必要时提出改进建议。`},{label:"招聘广告撰写专家",value:`你是一名专注于招聘告撰写的专家，你的主要职责是创作吸引人才的招聘广告文案。这个角色要求你主动询问用户关于招聘职位的细节、公司文化和目标候选人的特征，以确保理解准确无误，并在必要时提出问题以获得更清晰的广告撰写指导。

        工作流程包括:
        
        1.通过初步交谈引导用户提供职位要求和公司信息。
        
        2.根据提供的信息，构思广告内容和框架。
        
        3.创作并优化广告文案，确保其吸引目标候选人且符合公司品牌。若遇到模糊或不明确的广告撰写指令，应主动寻求澄清。
        
        4.及时向用户反馈广告撰写的结果，并在必要时提出改进建议。`},{label:"规章制度起草专家",value:`你是一名专注于规章制度起草的专家，你的主要职责是根据公司的需求和目标，草拟有效的公司规章制度这个角色要求你主动询问用户关于制度起草的具体目标、公司文化和法律要求，以确保理解准确无误，并在必要时提出问题以获得更清晰的制度起草指导。

        工作流程包括:
        
        1.通过初步交谈引导用户提供公司的需求和背景信息。
        
        2.根据需求和法律要求，规划制度的框架和内突。
        
        3.起草规章制度，并根据反馈进行必要的修订，确保其合法性和有效性。若遇到模糊或不明确的起草指令应主动寻求澄清。
        
        4.及时向用户反馈起草的结果，并在必要时提出改进建议。`},{label:"会议与活动策划专家",value:`你是一名专注于会议与活动规划的专家，你的主要职责是设计有效的会议和活动流程，确保活动的顺利进行。这个角色要求你主动询问用户关于会议或活动的目标、规模和特定需求，以确保理解准确无误，并在必要时提出问题以获得更清晰的规划指导。

        工作流程包括:
        
        1.通过初步交谈引导用户提供会议或活动的基本信息和目标。
        
        2.根据用户需求制定详细的会议或活动流程。
        
        3.协助实施流程，并确保活动按计划进行。若遇到模糊或不明确的规划指令，应主动寻求澄清。
        
        4.及时向用户反馈规划的结果，并在必要时提出改进建议。`},{label:"企业文化设计专家",value:`你是一名专注于企业文化设计的专家，你的主要职责是帮助公司构建和发展其独特的企业文化。这个角色要求你主动询问用户关于公司的愿景、价值观和员工特性，以确保理解准确无误，并在必要时提出问题以获得更清晰的文化设计指导。

        工作流程包括:
        
        1.通过初步交谈引导用户提供公司的基本信息和当前文化状态。
        
        2.根据用户需求和公司状况设计企业文化策略。
        
        3.执行文化设计计划，并定期评估其效果和员工反馈。若遇到模糊或不明确的设计指令，应主动寻求澄清。
        
        4.及时向用户反馈设计的结果，并在必要时提出改进建议。`},{label:"自媒体内容策划专家",value:`你是一名专注于自媒体内容策划的专家，你的主要职责是搭建和管理一个内突丰富、吸引人的自媒体选题库。这个角色要求你主动询问用户关于目标受众、内突方向和主题范围，以确保理解准确无误，并在必要时提出问题以获得更清晰的选题库构建指导。

        工作流程包括:
        
        1.通过初步交谈引导用户提供目标受众和内突偏好。
        
        2.根据目标受众和趋势策划选题方向。
        
        3.创建和不断更新选题库，确保内容的新鲜性和吸引力。若遇到模糊或不明确的指令，应主动寻求澄清。
        
        4.及时向用户反馈选题库的构建和维护情况，并在必要时提出改进建议。`}],r=`你是领域有文档的专家，能够将文档内容更有价值的展示给用户，在你输出文档的时候尽量以富内容的形式展示，比如
你的内容是图片url，你应该输出![image](图片url);
你的内容是视频url，你的输出应当是<video width="320" height="240" controls src="视频url"/>;
如果你的信息中包含像 <标签名 /> 这类内容，直接输出就好。`,a=`已知信息：【{context}】。你需要积极，简洁和专业地来回答\`\`\`中的问题。如果问题和已知信息没有关系，或者问题存在争议性，请说 “抱歉，无法回答该问题”，不允许编造。问题是：\`\`\`{query}\`\`\``},5509:(e,t,s)=>{"use strict";s.a(e,async(e,i)=>{try{s.d(t,{Z:()=>Home});var r=s(997),a=s(6689),l=s(2247),n=s(3274),d=s(2906),c=s(5641),o=s(6102),h=s(9235),m=s(2245),p=s.n(m),u=e([n,d,c,h]);function Home(){let e=(0,h.I1)().currentKnowledgeBase,[t,s]=(0,a.useState)(""),[i,m]=(0,a.useState)(!1),[u,x]=(0,a.useState)([{message:`你好！我是智能体小助手，请问有什么可以帮助您的`,sourceIdx:-1,type:o.Cs.SYSTEM,showFeedback:!1,liked:!1,disLiked:!1}]),g=(0,a.useRef)(null),j=(0,a.useRef)(null);(0,a.useEffect)(()=>{let e=g.current;e.scrollTop=e.scrollHeight},[u]),(0,a.useEffect)(()=>{j.current.focus()},[]);let handleError=e=>{x(t=>[...t,{message:e.message,type:o.Cs.ASSISTANT,sourceIdx:-1,showFeedback:!1,liked:!1,disLiked:!1}]),m(!1),s("")},handleSubmit=i=>{if(i.preventDefault(),""===t.trim())return;let r=[...u,{message:t,type:o.Cs.USER,sourceIdx:-1,showFeedback:!1,liked:!1,disLiked:!1}];m(!0),x(r);try{let t=JSON.parse(JSON.stringify(r)),i={message:"",type:"assistant",sourceIdx:-1,showFeedback:!1,liked:!1,disLiked:!1};s("");let a=r.map(e=>({role:e.type,content:e.message}));(0,c.dr)({messages:a,config:{stream:!0,max_tokens:1024},onFinish:e=>{m(!1)},onUpdate:(e,s)=>{i.message+=s,x([...t,i])}},e.token)}catch(e){handleError(e)}},userResponseWithUI=t=>{let i=[...u,{message:t,type:o.Cs.USER,sourceIdx:-1,showFeedback:!1,liked:!1,disLiked:!1}];m(!0),x(i);try{let r=JSON.parse(JSON.stringify(i)),a={message:"",type:"assistant",sourceIdx:-1,showFeedback:!1,liked:!1,disLiked:!1};s(""),(0,c.dr)({messages:[{role:"user",content:t}],config:{stream:!0,max_tokens:1024},onFinish:e=>{m(!1)},onUpdate:(e,t)=>{a.message+=t,x([...r,a])}},e.token)}catch(e){handleError(e)}};return r.jsx(r.Fragment,{children:(0,r.jsxs)("main",{className:p().main,children:[r.jsx("div",{className:p().cloud,children:r.jsx("div",{ref:g,className:p().messagelist,children:u.map((e,t)=>(0,r.jsxs)("div",{className:e.type===o.Cs.USER&&i&&t===u.length-1?p().usermessagewaiting:e.type!==o.Cs.USER?p().apimessage:p().usermessage,children:[e.type!==o.Cs.USER?r.jsx("div",{className:p().system_avatar,children:r.jsx("img",{src:"https://img.alicdn.com/imgextra/i1/O1CN01Ag2hWp1uz3fbGtWqB_!!6000000006107-2-tps-1024-1024.png",style:{width:"100%",height:"100%"}})}):r.jsx("div",{className:p().user_avatar,children:r.jsx("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"3538",width:"24",height:"24",children:r.jsx("path",{d:"M858.5 763.6c-18.9-44.8-46.1-85-80.6-119.5-34.5-34.5-74.7-61.6-119.5-80.6-0.4-0.2-0.8-0.3-1.2-0.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-0.4 0.2-0.8 0.3-1.2 0.5-44.8 18.9-85 46-119.5 80.6-34.5 34.5-61.6 74.7-80.6 119.5C146.9 807.5 137 854 136 901.8c-0.1 4.5 3.5 8.2 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c0.1 4.4 3.6 7.8 8 7.8h60c4.5 0 8.1-3.7 8-8.2-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z","p-id":"3539"})})}),r.jsx("div",{className:p().markdownanswer,children:e.type==o.Cs.USER?r.jsx(n.Z,{textContent:e.message}):r.jsx(d.ZP,{content:e.message,scope:{userResponseWithUI}})})]},t))})}),r.jsx("div",{className:p().center,children:r.jsx("div",{className:p().cloudform,children:(0,r.jsxs)("form",{style:{width:"100%"},onSubmit:handleSubmit,children:[r.jsx("textarea",{disabled:i,onKeyDown:e=>{13===e.keyCode&&t?!e.shiftKey&&t&&handleSubmit(e):"Enter"===e.key&&e.preventDefault()},ref:j,autoFocus:!1,rows:1,id:"userInput",name:"userInput",placeholder:i?"等待回复中":"请输入你的问题，如AgentCraft的使用场景有哪些？ ",value:t,onChange:e=>s(e.target.value),className:p().textarea}),r.jsx("button",{type:"submit",disabled:i,className:p().generatebutton,children:i?r.jsx(l.Loader,{mt:-8}):r.jsx("svg",{viewBox:"0 0 20 20",className:p().svgicon,xmlns:"http://www.w3.org/2000/svg",children:r.jsx("path",{d:"M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"})})})]})})})]})})}[n,d,c,h]=u.then?(await u)():u,i()}catch(e){i(e)}})},5316:(e,t,s)=>{"use strict";s.d(t,{Z:()=>Features});var i=s(997);s(6689);var r=s(2247);function Features({data:e,userResponseWithUI:t}){let s=(e||[{name:"基础模型",preview:"https://img.alicdn.com/imgextra/i1/O1CN01dVgqTD1sMT4RyDXZn_!!6000000005752-0-tps-1024-1024.jpg",description:"可以一键部署千问，Chatglm, llama2等模型，并且提供api服务"},{name:"数据集",description:"支持泛化的文档数据集可以精准问答数据集，支持pdf,html,md等多类型文件，支持单条数据编辑",preview:"https://img.alicdn.com/imgextra/i1/O1CN0136SRFY209ev5A8WvP_!!6000000006807-0-tps-1024-1024.jpg"},{name:"智能体编排",description:"包括提示词，模型，数据集，LLM调用参数等编排，以及工具能力编排（开发中）",preview:"https://img.alicdn.com/imgextra/i2/O1CN010KZtjI1SVSpynpmfm_!!6000000002252-0-tps-1024-1024.jpg"},{name:"生成式UI",description:"支持图片，文本，视频，以及自定义UI的输出",preview:"https://img.alicdn.com/imgextra/i2/O1CN01kyU7F11ZM1zf2b4jK_!!6000000003179-0-tps-1024-1024.jpg"},{name:"客户端交付",description:"支持独立站点web交付，支持接入钉钉机器人等客户端应用，也可以通过微服务网关进行APi交付，交付过程为一引导式的一站式部署",preview:"https://img.alicdn.com/imgextra/i1/O1CN01m5gFMl1HrwVPJkSXQ_!!6000000000812-0-tps-1024-1024.jpg"},{name:"工具集能力",description:"工具能力是Agent感知与连接世界的重要能力，AgentCraft支持在线工具编写，发布管理（开发中）",preview:"https://img.alicdn.com/imgextra/i1/O1CN01yAOhLG1i36A8vp4fQ_!!6000000004356-0-tps-1024-1024.jpg"}]).map(e=>(0,i.jsxs)("tr",{children:[i.jsx("td",{children:e.name}),i.jsx("td",{children:i.jsx("img",{src:e.preview,style:{width:120,overflow:"hidden"}})}),i.jsx("td",{children:e.description}),i.jsx("td",{children:i.jsx(r.Button,{onClick:()=>{console.log(t),t&&t(`请详细介绍一下${e.name}`)},children:"介绍特色"})})]},e.name));return(0,i.jsxs)(r.Table,{children:[i.jsx("thead",{children:(0,i.jsxs)("tr",{children:[i.jsx("th",{style:{color:"#000"},children:"特色名"}),i.jsx("th",{style:{color:"#000"},children:"预览图"}),i.jsx("th",{style:{color:"#000"},children:"特色说明"}),i.jsx("th",{style:{color:"#000"},children:"操作"})]})}),i.jsx("tbody",{children:s})]})}},2477:(e,t,s)=>{"use strict";s.d(t,{Z:()=>ModelView});var i=s(997);s(6689);var r=s(2247),a=s(4173),l=s(3844),n=s(6384);function FoundationModelTab(){return i.jsx(r.Flex,{mih:50,gap:"md",justify:"flex-start",align:"flex-start",direction:"column",wrap:"wrap",children:n.Go.map((e,t)=>(0,i.jsxs)(r.Card,{shadow:"sm",padding:"lg",radius:"md",withBorder:!0,style:{width:"100%"},children:[i.jsx(r.Card.Section,{children:i.jsx("img",{src:e.icon,style:{margin:"10px auto",width:160,height:160,display:"block"},height:160,width:160,alt:e.tag.join("")})}),(0,i.jsxs)(r.Group,{position:"apart",mt:"md",mb:"xs",children:[i.jsx(r.Text,{weight:500,children:e.name}),e.githubLink?i.jsx("a",{href:e.githubLink,target:"_blank",children:i.jsx(a.Z,{})}):null]}),i.jsx("div",{children:e.tag.map(e=>i.jsx(r.Badge,{color:"green",variant:"light",mr:4,children:e},`template-${t}-${e}`))}),i.jsx(r.Text,{size:"sm",color:"dimmed",children:e.description}),i.jsx("a",{target:"_blank",href:e.fcLink,children:i.jsx(r.Button,{variant:"light",color:"yellow",fullWidth:!0,mt:"md",radius:"md",style:{width:"100%"},children:(0,i.jsxs)(r.Flex,{align:"center",children:["查看模型信息",i.jsx(l.Z,{})]})})})]},`template-${t}`))})}function ModelView(){return i.jsx(FoundationModelTab,{})}},7737:(e,t,s)=>{"use strict";s.d(t,{Z:()=>Scenes});var i=s(997);s(6689);var r=s(2247);function Scenes({data:e}){let t=(e||[{name:"零售导购",preview:"https://img.alicdn.com/imgextra/i2/O1CN01UkVIjE1z2xVjSnvvQ_!!6000000006657-0-tps-1792-1024.jpg",description:"数字人+领域知识智能体能够作为新一代的零售导购服务增强企业竞争力"},{name:"IT/HR 系统智能问答",description:"企业内部 IT/HR 使用手册构建企业领域智能体，企业内部员工可通过该知识库快速解决在 IT/HR 上遇到的问题",preview:"https://img.alicdn.com/imgextra/i1/O1CN01BHtsNp1xmdma5rAPj_!!6000000006486-0-tps-1792-1024.jpg"},{name:"电商平台的搜索和问答系统",description:"商品信息构建商品数据库，消费者可通过检索+问答的方式快速了解商品的详细信息",preview:"https://img.alicdn.com/imgextra/i1/O1CN01I4Uv1525G8bKfA6Zr_!!6000000007498-0-tps-1792-1024.jpg"},{name:"游戏社区自动问答系统",description:"游戏的信息（例如游戏介绍，游戏攻略等）构建社区智能体，可根据该知识库自动回复社区成员提供的问题",preview:"https://img.alicdn.com/imgextra/i1/O1CN01SjByFI1eEJOeOxCnQ_!!6000000003839-0-tps-1792-1024.jpg"},{name:"智能客户聊天机器人",description:"通过与呼叫中心/聊天机器人服务结合，可自动基于企业领域知识智能体就客户提出的问题进行聊天回复",preview:"https://img.alicdn.com/imgextra/i4/O1CN01W1HRn42A7VD46uwG3_!!6000000008156-0-tps-1792-1024.jpg"},{name:"智能教育辅导系统",description:"使用教材和题库构建不同教育阶段的知识库，模拟和辅助老师/家长对孩子进行教学",preview:"https://img.alicdn.com/imgextra/i3/O1CN0185LQPn1JcwlkTO5NU_!!6000000001050-0-tps-1792-1024.jpg"}]).map(e=>(0,i.jsxs)("tr",{children:[i.jsx("td",{children:e.name}),i.jsx("td",{children:i.jsx("img",{src:e.preview,style:{width:120}})}),i.jsx("td",{children:e.description})]},e.name));return(0,i.jsxs)(r.Table,{children:[i.jsx("thead",{children:(0,i.jsxs)("tr",{children:[i.jsx("th",{style:{color:"#000"},children:"场景"}),i.jsx("th",{style:{color:"#000"},children:"场景介绍"}),i.jsx("th",{style:{color:"#000"},children:"操作"})]})}),i.jsx("tbody",{children:t})]})}},6102:(e,t,s)=>{"use strict";var i,r;s.d(t,{Cs:()=>i}),function(e){e.SYSTEM="system",e.USER="user",e.ASSISTANT="assistant"}(i||(i={})),function(e){e[e.NOTLABELED=0]="NOTLABELED",e[e.NEUTRAL=2]="NEUTRAL",e[e.POSITIVE=1]="POSITIVE"}(r||(r={}))},4810:()=>{}};