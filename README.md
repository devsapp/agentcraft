<div align="center">



# AgentCraft

<p align="center">
  <a href="./README.md">简体中文</a>  | 
  <a href="http://agentcraft-docs.serverless-developer.com/" target="_blank">使用文档</a> 
</p>
<video controls width="640" height="360">
  <source src="https://cloud.video.taobao.com/play/u/null/p/1/e/6/t/1/447331749716.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

AgentCraft是一个开放的智能体构建平台，致力于推进AI原生应用在业务场景的落地。目前提供了基础模型、数据集、执行工具、智能体构建、客户端接入等能力。可以帮助开发者快速构建，知识问答，智能助手等应用，能够极大的节省AI原生应用的开发成本



</div>

<p align="center">
 
  <a href="https://agentcraft-docs.serverless-developer.com/quick-start/cloud-deploy" target="_blank">
    <img height="21" src="https://img.shields.io/badge/云端部署-7d09f1?style=flat-square" alt="document">
  </a>
  <a href="#docker-compose-deploy">
    <img height="21" src="https://img.shields.io/badge/私有化部署-7d09f1?style=flat-square" alt="document">
  </a>
  <a href="#local-developement">
    <img height="21" src="https://img.shields.io/badge/本地开发-%23d4eaf7?style=flat-square&logo=xcode&logoColor=7d09f1" alt="development">
  </a>
</p>

## 演示示例
基础指令
![AgentCraft 论文翻译](https://img.alicdn.com/imgextra/i2/O1CN01ske5Dk1i36BX2m4BE_!!6000000004356-1-tps-1777-893.gif)

知识库问答
![AgentCraft 知识库问答](https://img.alicdn.com/imgextra/i3/O1CN010RtRR01mbgYUUIp8w_!!6000000004973-1-tps-1777-893.gif)
执行工具
![AgentCraft 函数智能助手](https://img.alicdn.com/imgextra/i2/O1CN01AnUGbS1jfOvNDtIx4_!!6000000004575-1-tps-1777-893.gif)
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
   - [x] 指令、LLM、数据集、工具，上下文自由组合
   - [x] 工具能力在线构建和发布
   - [x] 可视化编排Agent
   
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
   - [x] 生成式UI能力集成 

## 部署
+ 云端
AgentCraft 基于Serverless架构构建，在[阿里云函数计算](https://www.aliyun.com/product/fc)上提供一键部署应用的模版，帮助您快速部署专属的服务，您可以随时进行公共服务转化，[详情参考](https://agentcraft-docs.serverless-developer.com/quick-start/cloud-deploy)
+ <div id="docker-compose-deploy">私有化</div>

  使用[docker-compose.yml](./docker-compose.yml) 一键部署AgentCraft 服务，请确保已经安装了[Docker](https://docs.docker.com/get-docker/) 和 [Docker Compose](https://docs.docker.com/compose/install/)
  如果您需要访问插件扩展能力以及接入钉钉微信登能力，需要补充docker-compose.yml 中阿里云环境变量相关的信息 如 
  MAIN_ACCOUNT_ID、
  ALIBABA_CLOUD_ACCESS_KEY_ID、
  ALIBABA_CLOUD_ACCESS_KEY_SECRET
  不需要请直接执行
```
   docker compose up -d
```
## <div id="local-developement">开发</div>
克隆本项目到本地
```
git clone https://github.com/devsapp/agentcraft.git
```
### 启动后端服务 agentcraft-be
部署后端服务需要先准备好embedding 和 pg
#### embedding

+ 云端创建，访问函数计算[embedding应用模版](https://fcnext.console.aliyun.com/applications/create?template=fc-embedding-api)一键创建,并获取域名
+ 本地创建, 执行```docker-compose up embedding -d```, 该服务地址为 http://localhost:8001/embedding

#### pg
+ 云端创建， 通过RDS PostgreSQL实例 https://rdsbuy.console.aliyun.com/create/rds/mysql?spm=5176.19907444.0.0.64b11450FHIgeU 获取，[相关教程参考](https://agentcraft-docs.serverless-developer.com/quick-start/cloud-deploy)
+ 本地创建，执行```docker-compose up pg -d```

```shell
cd agentcraft/src/agentcraft-all/agentcraft-be
cp .env.example .env
python3 -m venv venv
source venv/bin/activate
pip install -r  requirements.txt
export PYTHONPATH="${PYTHONPATH}:$(pwd)"
python3 -u app/main.py

```

### 启动前端服务 agentcraft-fe

```
cd agentcraft/src/agentcraft-all/agentcraft-fe
cp .env.example .env
npm install -f
npm run dev
```

### 一些问题
为什么需要 AK,SK? 本项目依赖阿里云基础设施，因此内置了一部分云资源的管理能力，比如基础模型的部署、连接钉钉机器人，微信，独立站的服务，因此需要提供AK,SK 管理云资源，如果您不需要这些能力，可以忽略此项。另外请注意保管自己的AK,SK
## 如何贡献
欢迎为AgentCraft贡献，一起推进AI应用的落地。  欢迎各种方式的贡献，提交代码、问题、新想法、或者分享你的AI应用





## 联系我们

如果您有任何问题、建议或合作意向，可以用以下方式联系我们：
+ GithubRepo 提交 Issue 或 PR
+ 加入AgentCraft 项目交流钉群讨论 
![dingtalk](https://img.alicdn.com/imgextra/i4/O1CN01MQDcxF1dqxEHfmE60_!!6000000003788-2-tps-472-462.png)





## Citation

本软件使用以下开源软件
+ Nextjs  [nodejs]
+ FastApi [python]
+ LangChain

## License 开源协议
Apache2.0协议
