
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init --project ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

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

Serverless架构的Agent平台，可以构建知识库智能体，工具集智能体等

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
| 函数计算 FC |  托管核心的AgentCraft服务以及基础模型服务 |

</service>

推荐您拥有以下的产品权限 / 策略：
<auth>
</auth>

<remark>

您还需要注意：   
该项目需要前置依赖RDS PostgreSQL 作为关系型数据库和向量数据库，因此需要提前准备好相应的资源，同时需要依赖向量的算法服务，该服务可以在函数计算的应用市场获得
该项目目前还在beta开发阶段，上生产需谨慎

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
  - 初始化项目：`s init --project AgentCraft -d AgentCraft`
  - 进入项目，并进行项目部署：`cd AgentCraft && s deploy -y`
   
</deploy>

## 应用详情

<appdetail id="flushContent">

## AgentCraft

### AgentCraft是什么？

**AgentCraft** 是一个LLMOps 平台，也是智能体（Agent）的构建平台，为了解决AI应用交付最后一公里的问题，主要包含以下能力：

*   基础模型管理
    
*   数据集处理
    
*   内容上下文向量化
    
*   提示词工程
    
*   知识库构建，Agent构建
    
*   客户端侧对接
    
*   生成式UI渲染能力 
    
*   标准的API服务
    

### AgentCraft的使用场景

面向开发者交付智能体如知识交付类应用，以及企业构建AI应用开发能力的场景。包括不限于：

*   零售导购，数字人+领域知识智能体能够作为新一代的零售导购服务增强企业竞争力
    
*   IT/HR 系统智能问答 ，企业内部 IT/HR 使用手册构建企业领域智能体，企业内部员工可通过该知识库快速解决在 IT/HR 上遇到的问题
    
*   电商平台的搜索和问答系统，商品信息构建商品数据库，消费者可通过检索+问答的方式快速了解商品的详细信息
    
*   游戏社区自动问答系统，游戏的信息（例如游戏介绍，游戏攻略等）构建社区智能体，可根据该知识库自动回复社区成员提供的问题
    
*   智能客户聊天机器人，通过与呼叫中心/聊天机器人服务结合，可自动基于企业领域知识智能体就客户提出的问题进行聊天回复。
    
*   智能教育辅导系统，使用教材和题库构建不同教育阶段的知识库，模拟和辅助老师/家长对孩子进行教学。
    

AgentCraft可以快速交付领域智能体，满足上述要求，其大致使用流程指引如下

![image](https://img.alicdn.com/imgextra/i1/O1CN01vS9Zso1ZEFG8c0L76_!!6000000003162-2-tps-1968-1378.png)

### AgentCraft的特色有哪些？

相较于其他的Agent平台，基于阿里云底层能力构建的AgentCraft 集成了算力，模型，数据，工具，交付等全套的AI应用落地能力，并且提供了极简的云端部署方式

## 知识交付场景的展示

下面对知识交付也就是我们常说的智能知识库场景做一个简单的demo

<video width="680" height="340" controls src="https://cloud.video.taobao.com/play/u/null/p/1/e/6/t/1/436856476412.mp4" />

在知识交付领域，AgentCraft除了集成大语言模型，以及使用增强检索技术对答案进行精准度优化之外，还引入了生成式UI技术，使得我们的问答不再仅仅局限在文本，对于视频，图片，甚至是可交互式的UI组件都可以支持。

## 如何拥有一个自己的AgentCraft平台

**答案是有一个阿里云的账号即可**，AgentCraft是一个完全开源的项目，开发者和企业都可以根据文档在本地进行开发，但最终是需要进行服务化的部署，但是因为平台涉及非常多的资源依赖，比如计算，网络，数据库等基础设施，也涉及前置的一些准备工作，比如Embedding算法模型，LLM算法模型的托管和部署，为了能够极简化AgentCraft的交付，我们做了大量的工作，下面就一步一步的为大家演示如何快速的获得一个自己的Agent平台。

### Step1 新客开通阿里云函数计算、Nas、SLS服务并且进行授权（已开通请忽略）

#### FC开通

可以直接访问 [https://fcnext.console.aliyun.com/overview](https://fcnext.console.aliyun.com/overview) 进行服务开通

![image](https://img.alicdn.com/imgextra/i2/O1CN01ehiPgL1sKdU5kHMRs_!!6000000005748-2-tps-3748-1836.png)

对于新客您还可以领取我们的免费套餐，包含了cpu,gpu等各种资源

![image](https://img.alicdn.com/imgextra/i1/O1CN01HAg7cB1Zwfg5C3uTK_!!6000000003259-2-tps-3752-1836.png)

授权访问，函数计算为了帮您处理其他的资源依赖需要进行资源的访问授权，这里点击"确定"即可

![image](https://img.alicdn.com/imgextra/i4/O1CN01X1Azcx1HfZo8vWUgH_!!6000000000785-2-tps-3806-1866.png)

根据流程进行角色创建

![image](https://img.alicdn.com/imgextra/i3/O1CN01fgYCZW1JjohyfOH6q_!!6000000001065-2-tps-3826-1820.png)

![image](https://img.alicdn.com/imgextra/i2/O1CN01g5oSOU1MkDuIkBSH4_!!6000000001472-2-tps-3540-1588.png)

下面试创建AgentCraft 需要授权的选项，根据指引点击授权即可

![image](https://img.alicdn.com/imgextra/i4/O1CN0192HI3w24k4sJrdyoC_!!6000000007428-2-tps-3564-1850.png)

#### NAS开通

访问[https://nasnext.console.aliyun.com/introduction](https://nasnext.console.aliyun.com/introduction)

![image](https://img.alicdn.com/imgextra/i2/O1CN01pS3ZSL1rjXOutgE8x_!!6000000005667-2-tps-3642-1786.png)

#### SLS开通

[https://sls.console.aliyun.com/lognext/open](https://sls.console.aliyun.com/lognext/open)

![image](https://img.alicdn.com/imgextra/i3/O1CN01fk8Dwx20HReIbuBQN_!!6000000006824-2-tps-3514-1498.png)

#### TIPS:为什么需要依赖这几个云服务？

依赖函数计算进行AgentCraft的服务托管，依赖Nas进行基础模型的文件存储，SLS则是对服务日志进行查看，这三者都是按量进行付费

### Step2 AgentCraft应用创建

访问 [https://fcnext.console.aliyun.com/applications](https://fcnext.console.aliyun.com/applications) 列表，选择“大语言模型应用开发平台AgentCraft”，鼠标上浮，点击“立即创建”,进入配置详细页面

![image](https://img.alicdn.com/imgextra/i4/O1CN01vjsqNZ1YAIE2a5KBW_!!6000000003018-2-tps-3772-1910.png)

根据指引，您还需要一些额外权限，比如这里需要AliyunFCFullAccess，点击前往授权获取即可,授权后，点击“创建并部署默认环境”，接下来就是等待服务部署即可，您可以喝杯咖啡进行等待

![image](https://img.alicdn.com/imgextra/i2/O1CN01DBuuf41Y7XqcZx41K_!!6000000003012-2-tps-3740-1900.png)

成功后访问生成的域名

![image](https://img.alicdn.com/imgextra/i1/O1CN01yuM0vD1CHEgL3cvBw_!!6000000000055-2-tps-3756-1938.png)

### Step3 AgentCraft系统配置

在构建Agent之前我们还需要对系统进行一些初始化的配置工作，AgentCraft已经准备了引导式的接入方案

##### 向量服务配置

首先构建一个embedding服务，用来进行后续的数据向量化处理，这里如果您已经有了相应的服务，填写地址即可，如果没有，点击“快速获取embedding服务”按钮

![image](https://img.alicdn.com/imgextra/i3/O1CN017TX2gG1nnQIk7b49G_!!6000000005134-2-tps-3604-1766.png)

![image](https://img.alicdn.com/imgextra/i4/O1CN0112LigN1hOnJ2Ns8Ar_!!6000000004268-2-tps-2664-1596.png)

等待过程中，可以进行服务的部署情况查看

成功后点击下一步

![image](https://img.alicdn.com/imgextra/i3/O1CN01CrtZYY1W7QW0Uk3L6_!!6000000002741-2-tps-2660-1322.png)

##### 数据库服务配置

我们还需要配置一个数据库，作为关系型和向量存储双功能使用。具体的获取方式，点击“查看如何免费获取”有详细的教程

![image](https://img.alicdn.com/imgextra/i3/O1CN01NJOyTz1SKTKkE4CyN_!!6000000002228-2-tps-3646-1836.png)

这里补充一个新手创建数据库实例的细节问题， 构建完AgentCraft服务后，需要数据库的实例跟其保持同一个VPC,但是因为两个产品可用区未完全一致（数据库有J，K, L），FC可能是其他，所以这里出现虚拟交换机无法选择的问题

![image](https://img.alicdn.com/imgextra/i2/O1CN01gPHMWE25Jnli9HKTz_!!6000000007506-2-tps-1580-564.png)

这时我们可以单独创建一个交换机

![image](https://img.alicdn.com/imgextra/i1/O1CN01IVLAth28DnQDRfHjz_!!6000000007899-2-tps-3760-1760.png)

之后可以正常进行

![image](https://img.alicdn.com/imgextra/i3/O1CN01WKVukg1TXaHw4ghAs_!!6000000002392-2-tps-3788-1092.png)

数据库实例的创建花费时间5分钟左右，耐心等待一下即可

![image](https://img.alicdn.com/imgextra/i3/O1CN01WKVukg1TXaHw4ghAs_!!6000000002392-2-tps-3788-1092.png)

数据库信息准备好之后填入面板，AgentCraft会自动完成数据库的初始化

![image](https://img.alicdn.com/imgextra/i2/O1CN01XBUpap1oxKTxpK0N9_!!6000000005291-2-tps-2442-1820.png)

++**注：数据库的vpc网络环境是比较容易出错的环节，请仔细检查FC，RDS的vpc和vswitch配置，测试阶段可以考虑将数据库开放公网**++

### Step4 AgentCraft 创建领域知识智能体

首先注册登录

![image](https://img.alicdn.com/imgextra/i4/O1CN01cqQ7021vhwUEgBisn_!!6000000006205-2-tps-2938-1420.png)

进入快速开始页面

![image](https://img.alicdn.com/imgextra/i1/O1CN01uI89FU1GUkpuJf7vK_!!6000000000626-2-tps-3800-1872.png)

创建基础模型和AgentCraft代理服务，我们使用通义千问qwen-plus模型，进入模型服务灵积平台获得API-KEY

![image](https://img.alicdn.com/imgextra/i1/O1CN013k5Wqb1lVRWEcwvnk_!!6000000004824-2-tps-3698-1916.png)

![image](https://img.alicdn.com/imgextra/i1/O1CN01j5PEFc1rqPLUDcR53_!!6000000005682-2-tps-3606-1728.png)

开始创建基础模型和LLM代理

![image](https://img.alicdn.com/imgextra/i2/O1CN01Vfv0ut1Y5iGUARfhe_!!6000000003008-2-tps-3684-1838.png)

创建数据集

![image](https://img.alicdn.com/imgextra/i3/O1CN012ou8sf1fdKeD3kYcV_!!6000000004029-2-tps-3678-1850.png)

创建智能体应用

![image](https://img.alicdn.com/imgextra/i2/O1CN01dh1LFa21XIyyunKuK_!!6000000006994-2-tps-3718-1830.png)

### Step5 测试知识库智能体服务

![image](https://img.alicdn.com/imgextra/i3/O1CN01fNP0yC1S7Bqdjgmso_!!6000000002199-2-tps-3768-1654.png)

首先生成一个访问令牌，点击绿色按钮"生成访问令牌"，然后点击问答测试

![image](https://img.alicdn.com/imgextra/i3/O1CN01faybny1BzNEjbjcdP_!!6000000000016-2-tps-3748-1380.png)

![image](https://img.alicdn.com/imgextra/i2/O1CN01riFOKO1UDij3JxT5b_!!6000000002484-2-tps-3800-1950.png)

进入访问页面

![image](https://img.alicdn.com/imgextra/i4/O1CN013I98D61o5k8wfKfyn_!!6000000005174-2-tps-3838-1896.png)

![image](https://img.alicdn.com/imgextra/i4/O1CN01gCWpL51Yob4ngupIt_!!6000000003106-2-tps-3716-1880.png)

## 如何增强知识智能体的交付效果 

AgentCraft提供了基础的RAG能力，更好的效果需要业务做进一步的研发定制，下面给出一些效果优化的建议

1.   测试使用不同的基础LLM模型，基础模型效果有非常大的决定性作用
    
2.   单条录入，AgentCraft支持单条知识录入，也可以基于已有的数据进行修改
    
3.   调整提示词，调整调用参数
    
4.   深化RAG源码，数据预处理强化，增加召回能力，如模糊查询，多路召回等
    

## 如何交付业务

AgentCraft 提供可以直接调用的APi，每一个知识库对一个可访问的API 令牌

![image](https://img.alicdn.com/imgextra/i2/O1CN017ittr91GtUDt58ffv_!!6000000000680-2-tps-3834-1908.png)

目前计划开发对接WEB，钉群机器人的能力，可以直接接入业务

</appdetail>

## 使用文档

<usedetail id="flushContent">

## 常见问题

### 数据库连接不上？
请检查vpc网络环境，保证部署到FC 的AgentCraft服务跟数据库实例在同一个网络环境，设置数据库密码的时候请不要使用@符号

### 基础模型如何自定义
可以基于我们提供的基础镜像进行调整，使用FC托管模型服务

### 问答结果不准
AgentCraft 提供基本的RAG能力支持，但是详细的优化依然需要开发者自己调试，比如对数据进行更精准的切片处理，
对结果检索精度进行调整，优化模型本身，以及人工反馈优化结果

### 如何对接业务的系统

可以使用AgentCraft生成的API token 进行外部访问，目前对接客户端的准备有 钉钉，web，正在进行建设

### 如何加强内容安全
确保您使用的基础模型已经经过安全的评审，此外可以使用绿网等安全内容过滤服务进行内容输入输出处理

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
