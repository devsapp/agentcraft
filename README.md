<div align="center">



# AgentCraft

<p align="center">
  <a href="./README.md">简体中文</a> 
</p>

AgentCraft是一个依托于阿里云Serverless基础设施的开源开放智能体平台，提供Agent能力的编排和业务连接能力，帮助企业或个人开发者快速启动AI能力的建设，如基础模型服务的托管，数据的向量化处理，知识库的构建等，此外可以便捷的将生成的AI能力连接到钉钉机器人，微信以及独立站点

</div>

<p align="center">
 
  <a href="https://fcnext.console.aliyun.com/applications/create?template=AgentCraft" target="_blank">
    <img height="21" src="https://img.shields.io/badge/快速部署体验-7d09f1?style=flat-square" alt="document">
  </a>
  <a href="#local-developement">
    <img height="21" src="https://img.shields.io/badge/本地开发-%23d4eaf7?style=flat-square&logo=xcode&logoColor=7d09f1" alt="development">
  </a>
</p>

## 功能

### 

`1` 基础模型托管及扩展
   - [x] 提供 通义千问、ChatGLM2-6b、ChatGLM3-6b、llama2(in4 量化 13b)、Stable-diffusion等基础模型的一键部署
   - [x] 支持基础模型的公开访问API
   - [x] 支持托管任意模型的代理服务函数比如ChatGPT
   - [x] 提供扩展自定义模型，开放构建模型镜像的源码
   - [ ] 模型服务计费，日志查看等


`2` 数据集
   - [x] 支持精准问答数据集和文档数据集混合使用
   - [x] 支持数据集自动向量化处理
   - [x] 支持多种源文件类型录入
   - [x] 支持手动输入单文档数据源或者QA数据源
   - [ ] url 读取，本地目录上传
   - [ ] mysql, oss等多数据源动态导入

  
`3` 智能体编排和调试
   - [x] 支持实时调试知识库等智能体效果
   - [x] 支持问答记录查询，修正
   - [x] 支持提示词预置模版
   - [x] 支持指令、LLM、数据集自由组合
   - [ ] 指令、LLM、数据集、工具，上下文自由组合
   - [ ] 工具能力在线构建和发布
   - [ ] 可视化编排Agent
   
`4`  API透出
   - [x] 支持 Agent Api token访问
   - [ ] 接入网关增强 安全，限流等能力
  
`5` 客户端连接
   - [x] 提供引导式方案接入钉钉机器人
   - [x] 提供微信个人助手一键部署服务
   - [x] 提供独立web站一键部署服务
   - [ ] 嵌入脚本，sdk等接入方式
   - [ ] 其他平台对接
`6` 生成式UI
   - [x] 支持内置自定义渲染组件
   - [x] 支持自定义组件LUI渲染
   - [ ] 生成式UI能力集成 


## 本地开发
<div id="local-developement">克隆本项目到本地,打开 src/agentcraftall 目录，核心代码在该路径下</div>

src/agentcraft-all 包含前后端两个工程 agentcraft-fe和agentcraft-be
需要启动后端服务和前端服务
### 后端工程 agentcraft-be

+ 配置准备：修改.env.example -> .env
填写好相关的配置，主要依赖  EMBEDDING_URL 和 数据库的配置，其中EMBEDDING_URL 可以访问
https://fcnext.console.aliyun.com/applications/create?template=fc-embedding-api，
创建后获取，
数据库可以创建一个RDS PostgreSQL实例 https://rdsbuy.console.aliyun.com/create/rds/mysql?spm=5176.19907444.0.0.64b11450FHIgeU
+ 依赖安装：
**pip install -r  requirements.txt**
+ 服务启动：
```shell
export PYTHONPATH="${PYTHONPATH}:<your project path>"
python3 -u app/main.py
```
### 前端工程 agentcraft-fe
+ 配置准备：修改.env.example -> .env，将后端服务的域名填写为baseUrl的值，获得阿里云的AK,SK并填写为.env中的值ALIBABA_CLOUD_ACCESS_KEY_ID，ALIBABA_CLOUD_ACCESS_KEY_SECRET（该配置在操作云资源的时候需要，如管理基础模型服务）
+ 依赖安装：
**npm install -f**
+ 服务启动
```
npm run dev
```
### 一些问题
为什么需要 AK,SK? 本项目依赖阿里云基础设施，因此内置了一部分云资源的管理能力，比如基础模型的部署、连接钉钉机器人，微信，独立站的服务，因此需要提供AK,SK 管理云资源，如果您不需要这些能力，可以忽略此项。另外请注意保管自己的AK,SK
## 如何贡献
欢迎为AgentCraft贡献，一起推进AI应用的落地。  欢迎各种方式的贡献，提交代码、问题、新想法、或者分享你的AI应用





## 联系我们

如果您有任何问题、建议或合作意向，可以用以下方式联系我们：
+ GithubRepo 提交 Issue 或 PR
+ 加入Serverless+ AIGC 钉群讨论 
![dingtalk](https://img.alicdn.com/imgextra/i2/O1CN01zGJ4fS21GMJy6Okd8_!!6000000006957-0-tps-470-472.jpg)





## Citation

本软件使用以下开源软件
+ Nextjs  [nodejs]
+ FastApi [python]
+ LangChain

## License 开源协议
Apache2.0协议
