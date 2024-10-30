
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# AgentCraft 帮助文档
<p align="center" class="flex justify-center">
    <a href="https://www.serverless-devs.com" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=AgentCraft&type=packageType">
  </a>
  <a href="http://www.devsapp.cn/details.html?name=AgentCraft" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=AgentCraft&type=packageVersion">
  </a>
  <a href="http://www.devsapp.cn/details.html?name=AgentCraft" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=AgentCraft&type=packageDownload">
  </a>
</p>

<description>

基于Serverless架构的开源智能体平台，可以快速构建构内容提取、知识库、图文生成助手等智能应用

</description>

<codeUrl>



</codeUrl>
<preview>



</preview>


## 前期准备

使用该项目，您需要有开通以下服务并拥有对应权限：

<service>



| 服务/业务 |  权限  | 相关文档 |
| --- |  --- | --- |
| 函数计算 |  创建函数 | [帮助文档](https://help.aliyun.com/product/2508973.html) [计费文档](https://help.aliyun.com/document_detail/2512928.html) |

</service>

<remark>



</remark>

<disclaimers>



</disclaimers>

## 部署 & 体验

<appcenter>
   
- :fire: 通过 [Serverless 应用中心](https://fcnext.console.aliyun.com/applications/create?template=AgentCraft) ，
  [![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://fcnext.console.aliyun.com/applications/create?template=AgentCraft) 该应用。
   
</appcenter>
<deploy>
    
- 通过 [Serverless Devs Cli](https://www.serverless-devs.com/serverless-devs/install) 进行部署：
  - [安装 Serverless Devs Cli 开发者工具](https://www.serverless-devs.com/serverless-devs/install) ，并进行[授权信息配置](https://docs.serverless-devs.com/fc/config) ；
  - 初始化项目：`s init AgentCraft -d AgentCraft`
  - 进入项目，并进行项目部署：`cd AgentCraft && s deploy -y`
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

基于本案例，您可以将  [AgentCraft](https://agentcraft-docs.serverless-developer.com/) 快速部署到函数计算FC，拥有一个专属的类似GPTS、COZE 的智能体平台，可以自由构建内容提取改写、RAG知识库、绘本制作、图文文案生成等智能应用。

[AgentCraft](https://agentcraft-docs.serverless-developer.com/) 是一个开源的智能体构建平台，致力于推进AI原生应用在业务场景的落地。提供了基础模型、数据集、AI工具、智能体构建、客户端接入等能力。可以帮助开发者快速构建，知识问答，智能助手等应用，能够极大的节省AI原生应用的开发成本。

构建AI Agent平台 是一个非常复杂的工程，需要完成RAG, AgentRuntime的核心研发，以及权限管控、API管理、前端交互等， 借助Serverless开发平台，简单、方便地将 AgentCraft 这个Agent平台部署成独立服务，拥有AI时代强大的生产力工具。

</appdetail>

## 使用流程

<usedetail id="flushContent">

### 创建及部署AgentCraft应用
1.访问Serverless开发平台, 选择 AgentCraft 应用模板进行部署

2.在应用创建详情，根据指引进行授权操作
![AgentCraft应用授权](https://img.alicdn.com/imgextra/i2/O1CN01pLPCyi1EcQGJODr2h_!!6000000000372-0-tps-3576-1836.jpg)
资源配置部分请注意“AgentCraft的JWT认证秘钥”, 填写您容易记住的秘钥，该秘钥可以在您创建另外一个版本的AgentCraft的时候使用，可以保证前后两个版本数据访问一致性（比如您应用程序是两个版本的代码，但是数据库还是连接同一个）
![AgentCraft应用资源配置](https://img.alicdn.com/imgextra/i1/O1CN01AkEPzx1c7mXkfDlYE_!!6000000003554-0-tps-3414-1148.jpg)
配置好之后请点击按钮“创建应用”,接下来您只需要等待一分钟即可完成AgentCraft的服务部署，部署过程的日志您可以随时查看
![AgentCraft应用部署](https://img.alicdn.com/imgextra/i2/O1CN01sXIM9Y1EF43pABXvf_!!6000000000321-0-tps-3546-1828.jpg)
### 访问及配置AgentCraft服务
当部署完成，您可以获取两个域名，（页面上另外一个域名被隐藏在+1后面），AgentCraft是由一系列的服务构成，其中核心的就是前端的管控页面和后端的api服务，当您需要完全定制自己的界面的时候可以以后端的Api服务为主（那个被隐藏的），对于新手而言我们访问开放出来的域名即可
![AgentCraft前端页面](https://img.alicdn.com/imgextra/i3/O1CN01jnMH0L1QLjDMZpvNH_!!6000000001960-0-tps-3544-1836.jpg)
之后进入AgentCraft的系统配置页面
![AgentCraft系统配置](https://img.alicdn.com/imgextra/i3/O1CN01jgT7gh1MP9iTjofN1_!!6000000001426-0-tps-2404-1720.jpg)
#### 配置数据库（必须）
您需要填写您的 ***Postgresql*** 配置,如果您已经有相应的数据库，可以将相应的配置进行填写，如果您还没有对应的数据库，在阿里云上有两种方式获得

1. 免费的数据库服务，如果您是数据库的新用户，可以访问阿里云的具体可以查看[这里](https://free.aliyun.com/?product=1384)
![函数计算免费资源包](https://img.alicdn.com/imgextra/i2/O1CN01oFRh8s25zTpwmbdm3_!!6000000007597-0-tps-3710-1894.jpg)

2. 购买阿里云的数据库服务，这部分的引导方案在AgentCraft已经内置，您可以点击 “快速获取”按钮进行查看，这里我们已经将购买的流程做了极简的优化，另外实例购买最低可以按天付费，您可以以最低成本进行体验
![阿里云数据库购买](https://img.alicdn.com/imgextra/i3/O1CN01go4Gu425XXg4HPZyi_!!6000000007536-0-tps-3180-1900.jpg)
![AgentCraft数据库引导](https://img.alicdn.com/imgextra/i4/O1CN01DUTtAB1RZkxhZ1GRR_!!6000000002126-0-tps-3352-1856.jpg)

AgentCraft的数据库创建引导详细的展示了如何获取 数据库连接地址、数据库名、数据库账号、数据库密码 的配置项，建议仔细阅读

#### 向量转化服务(非必填)
向量转化服务可以将文本内容进行向量化处理，用于知识库搜索中的RAG技术，该部分作为并非必须的选项，（在通用Prompt提示场景和Agent场景并不是必须），因此您可以选择性的配置使用，
![AgentCraft向量转化服务配置"](https://img.alicdn.com/imgextra/i3/O1CN01t4EiBP23rZlr4gasa_!!6000000007309-0-tps-2372-1228.jpg)
如果您的确需要一个embedding服务，您可以点击“快速获取embedding服务”，需要注意的是，该服务依赖于阿里云的NAS文件存储，因为我们利用NAS进行了模型的存储（使用的是bge-lagre-zh模型，大约1.4个G）,所以您还需要对相关的NAS服务进行开通，[NAS服务的免费领取](https://free.aliyun.com/?product=1358)
![AgentCraft向量转化服务配置"](https://img.alicdn.com/imgextra/i2/O1CN01cGwkQb1dAMOAorBfi_!!6000000003695-0-tps-2878-1554.jpg)
![免费领取NAS服务](https://img.alicdn.com/imgextra/i2/O1CN01n3SbZI1T4jMZRdf6D_!!6000000002329-0-tps-3802-1886.jpg)

当一些准备就绪之后您可以点击"下一步"以及最后的“完成”，接下来我们进入”快速使用体验AgentCraft“的教程
### 使用教程
访问 [AgentCraft 使用教程 ](https://agentcraft-docs.serverless-developer.com/quick-start/quick-use) 进行查看

</usedetail>

## 注意事项

<matters id="flushContent">
</matters>


<devgroup>


## 开发者社区

您如果有关于错误的反馈或者未来的期待，您可以在 [Serverless Devs repo Issues](https://github.com/serverless-devs/serverless-devs/issues) 中进行反馈和交流。如果您想要加入我们的讨论组或者了解 FC 组件的最新动态，您可以通过以下渠道进行：

<p align="center">  

| <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407298906_20211028074819117230.png" width="130px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407044136_20211028074404326599.png" width="130px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407252200_20211028074732517533.png" width="130px" > |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| <center>微信公众号：`serverless`</center>                                                                                         | <center>微信小助手：`xiaojiangwh`</center>                                                                                        | <center>钉钉交流群：`33947367`</center>                                                                                           |
</p>
</devgroup>
