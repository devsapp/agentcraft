
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、服务名、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# agentcraft 帮助文档
<p align="center" class="flex justify-center">
    <a href="https://www.serverless-devs.com" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=agentcraft&type=packageType">
  </a>
  <a href="http://www.devsapp.cn/details.html?name=agentcraft" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=agentcraft&type=packageVersion">
  </a>
  <a href="http://www.devsapp.cn/details.html?name=agentcraft" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=agentcraft&type=packageDownload">
  </a>
</p>

<description>

快速构建agent 应用的中间层服务，兼容openai规范

</description>

<codeUrl>

- [:smiley_cat: 代码](https://github.com/devsapp/agentcraft)

</codeUrl>
<preview>



</preview>


## 前期准备

使用该项目，您需要有开通以下服务：

<service>



| 服务 |  备注  |
| --- |  --- |
| 函数计算 FC |  部署agentcraft |

</service>

推荐您拥有以下的产品权限 / 策略：
<auth>
</auth>

<remark>

您还需要注意：   
本项目的构建需要依赖 postgresql进行向量化存储，redis 进行历史记忆以及限流等工作，以及需要提前部署好 bert算法的模型服务以及 大语言模型服务

</remark>

<disclaimers>

免责声明：   

1. 该项目的构建镜像及应用模板完全开源，由社区开发者贡献，阿里云仅提供了算力支持；

</disclaimers>

## 部署 & 体验

<appcenter>
   
- :fire: 通过 [Serverless 应用中心](https://fcnext.console.aliyun.com/applications/create?template=agentcraft) ，
  [![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://fcnext.console.aliyun.com/applications/create?template=agentcraft) 该应用。
   
</appcenter>
<deploy>
    
- 通过 [Serverless Devs Cli](https://www.serverless-devs.com/serverless-devs/install) 进行部署：
  - [安装 Serverless Devs Cli 开发者工具](https://www.serverless-devs.com/serverless-devs/install) ，并进行[授权信息配置](https://docs.serverless-devs.com/fc/config) ；
  - 初始化项目：`s init agentcraft -d agentcraft `
  - 进入项目，并进行项目部署：`cd agentcraft && s deploy - y`
   
</deploy>

## 应用详情

<appdetail id="flushContent">

# Agent Craft


步入 AI 时代，我们的世界正以前所未有的速度发展和变化。在这个瞬息万变的时代，你是否曾想过拥有一款可以让你自由创造、定制你的 AI 代理的工具？

这就是 AgentCraft，一个创新的 AI 代理创建平台，它将创造 AI 代理的能力赋予每一个人。无论你是初探 AI 的新手，还是富有经验的专业人士，AgentCraft 都能满足你的需求。

这是一个应用&数据集&模型管理平台，支持用户创建应用，上传数据集，调用兼容 OpenAI API 的模型。通过应用的方式，连接起模型和数据集。结合模型服务可以实现私域智能问答部署，一键打造智能小二。

AgentCraft 的特点：

- 多样性：我们提供各种预设模板，你可以根据需要自由选择和定制，无论是聊天机器人，智能助手，还是复杂的预测系统，AgentCraft 都可以帮你轻松实现。
- 易用性：我们专注于用户体验，无需编程知识，你就可以通过简单的拖拉操作创建你的 AI 代理。
  开放性：我们支持用户分享和交流他们的 AI 代理，你可以从社区中获取灵感，也可以将你的创新分享给世界。
- 安全性：我们重视你的数据安全，所有的数据都将被严格保护，你可以放心使用。
  AgentCraft，让你的想象力飞翔，塑造你的 AI 未来。现在就加入我们，开始你的 AI 创造之旅吧！
- 入参和出参与 OpenAI 完全一致，可以无缝切换
- 服务端缓存历史上下文，防止前端请求恶意注入信息
- 支持向量近似值匹配返回预先定义的回答与大模型整理相关文档再返回给用户两种模式

现已在[RocketMQ 中文社区](https://rocketmq-learning.com/)上线使用，欢迎体验智能问答。

## 使用流程

请求

```bash
curl https://{YOUR_URL}/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AGENT_TOKEN" \
  -d '{
     "messages": [{"role": "user", "content": "Say this is a test!"}],
   }'
```

响应

```json
{
  "id": "{ID}",
  "object": "chat.completion",
  "created": 1677858242,
  "model": "{YOUR_MODEL}",
  "choices": [
    {
      "delta": {
        "role": "assistant",
        "content": "\n\nThis is a test!"
      },
      "finish_reason": "stop",
      "index": 0
    }
  ]
}
```

/chat/completions 的请求只需要包含 messages，而且只有最后一条 message 会被使用，目的是为了防止恶意注入信息，结果会以 EventSourceResponse(media_type=text/event-stream)的形式返回。

## 配置参数

### 应用启动配置参数

```bash
CREATE_TABLES=1 # 是否创建表，如果不需要的话可以不配置
REDIS_HOST=REDIS_URL # Redis的地址
REDIS_PORT=REDIS_PORT # Redis的端口
REDIS_USER=REDIS_USER # Redis的用户名
REDIS_PASSWORD=REDIS_PASSWORD # Redis的密码
REDIS_SOCKET_CONNECT_TIMEOUT=REDIS_SOCKET_CONNECT_TIMEOUT # Redis的超时时间
REDIS_SOCKET_TIMEOUT=REDIS_SOCKET_TIMEOUT # Redis的超时时间
POSTGRES_HOST=POSTGRES_URL # Postgres的地址
POSTGRES_PORT=POSTGRES_PORT # Postgres的端口
POSTGRES_USER=POSTGRES_USER # Postgres的用户名
POSTGRES_PASSWORD=POSTGRES_PASSWORD # Postgres的密码
POSTGRES_DATABASE=POSTGRES_DATABASE # Postgres的数据库名
JWT_SECRET=JWT_SECRET # JWT的密钥，用于生成和验证token
EMBEDDING_URL=EMBEDDING_URL # Embedding服务的地址，例如https://openai.com/v1/embeddings
EMBEDDING_TOKEN=EMBEDDING_TOKEN # Embedding服务的token
EMBEDDING_TIMEOUT=EMBEDDING_TIMEOUT # Embedding服务的超时时间
EMBEDDING_DIM=EMBEDDING_DIM # Embedding服务的向量维度
USE_GREEN_CLIENT=1 # 使用阿里云的内容审核服务，如果不需要可以不配置
AK=YOUR_AK # 阿里云的 Access Key，仅使用内容审核服务时需要
SK=YOUR_SK # 阿里云的 Secret Key，仅使用内容审核服务时需要
```

### 最佳实践

- 建议在创建应用的时候，数据库和应用处于同一个 VPC 内，这样可以降低网络延迟，同时避免产生公网流量，提高安全性。

## 重要信息

- 请注意 Embedding 服务返回的向量维度，[fc-embedding-api](https://github.com/devsapp/fc-embedding-api)返回的向量是 1024 维，OpenAI 是 1536 维，目前默认是 1024，如果需要使用 OpenAI 的模型，请在创建应用的时候，将向量维度设置为 1536。数据库创建表之后，向量维度无法变更。
- 请求字段里的 message，只有最后一条会被使用。
- 在创建应用之前，需要先录入模型信息。
- 所有的分页请求从 0 开始计数。
- 目前支持的文档类型有：HTML, PDF, TXT, Markdown。

### 常数说明

```python
class DatasetType(Enum):
    """Dataset Type"""
    EXACT_SEARCH = 1 # 用于精确搜索的数据集
    FUZZY_SEARCH = 2 # 用于模糊搜索的数据集
```


</appdetail>

## 使用文档
### agent 参数
```json
{
  "name": "mse-opensource", 
  "description": "微服务开源", 
  "prompt_template": "已知信息：{context}。你需要积极，简洁和专业地来回答```中的问题。如果问题和RocketMQ没有关系，或者问题存在争议性，请说 “抱歉，无法回答该问题”，不允许编造。问题是：```{query}```", 
  "app_id": 3, 
  "exact_datasets": [  
    
  ],
  "fuzzy_datasets": [
    4
  ],
  "exact_search_similarity": 0.9,  
  "fuzzy_search_similarity": 0.6, 
  "temperature": 0.5,  
  "top_p": 1, 
  "n_sequences": 1, 
  "max_tokens": 1024, 
  "stop": [ 
  
  ],
  "presence_penalty": 0, 
  "frequency_penalty": 0,
  "logit_bias": "",
  "model_id": 4,  
  "redis_ip_ex": 10, 
  "redis_history_ex": 10, 
  "model_ip_limit": 10000,
  "llm_history_len": 1, 
  "system_message": "你是一个已知问题领域的专家", 
  "exact_search_limit": 1, 
  "fuzzy_search_limit": 1  
}
```
<usedetail id="flushContent">

### 常见问题

</usedetail>


<devgroup>


## 开发者社区

您如果有关于错误的反馈或者未来的期待，您可以在 [Serverless Devs repo Issues](https://github.com/serverless-devs/serverless-devs/issues) 中进行反馈和交流。如果您想要加入我们的讨论组或者了解 FC 组件的最新动态，您可以通过以下渠道进行：

<p align="center">  

| <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407298906_20211028074819117230.png" width="130px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407044136_20211028074404326599.png" width="130px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407252200_20211028074732517533.png" width="130px" > |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| <center>微信公众号：`serverless`</center>                                                                                         | <center>微信小助手：`xiaojiangwh`</center>                                                                                        | <center>钉钉交流群：`33947367`</center>                                                                                           |
</p>
</devgroup>
