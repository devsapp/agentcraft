
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# AgentCraft-CAP 帮助文档
<p align="center" class="flex justify-center">
    <a href="https://www.serverless-devs.com" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=AgentCraft-CAP&type=packageType">
  </a>
  <a href="http://www.devsapp.cn/details.html?name=AgentCraft-CAP" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=AgentCraft-CAP&type=packageVersion">
  </a>
  <a href="http://www.devsapp.cn/details.html?name=AgentCraft-CAP" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=AgentCraft-CAP&type=packageDownload">
  </a>
</p>

<description>

基于Serverless架构的开源智能体平台，可以快速构建构AI ChatBot、AI 知识库、AI智能助手等智能体应用,支持Deepseek满血,通义千问等多种模型

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
| 函数计算 |  AliyunFCFullAccess | [帮助文档](https://help.aliyun.com/product/2508973.html) [计费文档](https://help.aliyun.com/document_detail/2512928.html) |
| 专有网络 |  AliyunFCServerlessDevsRolePolicy | [帮助文档](https://help.aliyun.com/zh/vpc) [计费文档](https://help.aliyun.com/zh/vpc/product-overview/billing) |

</service>

<remark>



</remark>

<disclaimers>



</disclaimers>

## 部署 & 体验

<appcenter>
   
- :fire: 通过 [Serverless 应用中心](https://fcnext.console.aliyun.com/applications/create?template=AgentCraft-CAP) ，
  [![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://fcnext.console.aliyun.com/applications/create?template=AgentCraft-CAP) 该应用。
   
</appcenter>
<deploy>
    
- 通过 [Serverless Devs Cli](https://www.serverless-devs.com/serverless-devs/install) 进行部署：
  - [安装 Serverless Devs Cli 开发者工具](https://www.serverless-devs.com/serverless-devs/install) ，并进行[授权信息配置](https://docs.serverless-devs.com/fc/config) ；
  - 初始化项目：`s init AgentCraft-CAP -d AgentCraft-CAP`
  - 进入项目，并进行项目部署：`cd AgentCraft-CAP && s deploy -y`
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

## 项目预览
![](https://img.alicdn.com/imgextra/i1/O1CN01Q1uh7R1DalJcVZPyq_!!6000000000233-0-tps-3574-1808.jpg)

## 项目介绍
### 应用场景
基于Serverless架构的开源智能体平台，可以快速构建构AI ChatBot、AI 知识库、AI智能助手等智能体应用,支持Deepseek满血,通义千问等多种模型
目前支持DeepSeek满血版的深度对话效果，同时支持打造DS的知识库能力
### 适用人群
泛开发者，即包含专业的开发者，也包含普通用户人群

+ 专业开发者 ，提供构建AI应用的一系列能力，包含基础模型托管部署， 数据集创建，以及更上层的智能体应用的搭建和API调用

+ 普通人群无需编程技术，通过无代码的软件操作，即可完成对话ChatBot以及知识库等应用


## 项目架构图

### 功能架构
![agentcraft](https://img.alicdn.com/imgextra/i4/O1CN01eWiC1A1RHtWBMkOFS_!!6000000002087-0-tps-2774-1322.jpg)
### 阿里云部署架构
![agentcraft](https://img.alicdn.com/imgextra/i1/O1CN01PcY7H31hqjbFN7wM5_!!6000000004329-0-tps-2210-1166.jpg)


</appdetail>

## 使用流程

<usedetail id="flushContent">

### 配置服务
AgentCraft 需要通过配置界面完成数据库，向量模型等配置，之后才能访问功能
+ 1.数据库配置， 这里快速体验可以选择共享数据库，社区提供了一个独立数据库用于简单测试（测试完可以随时删除个人数据），强烈建议您使用自己的专属数据库，这样所有的数据都会由您专属管理，点击“专属数据库”可以查看指引。
![agentcraft config](https://img.alicdn.com/imgextra/i4/O1CN01a2s7HB1XjjO4x0z8Y_!!6000000002960-2-tps-2386-1630.png)
+ 2.部署向量模型，AgentCraft采用的是large-bge向量模型，您可以在这里一键部署，如果不需要使用知识库检索能力，可以直接跳过
![agentcraft config](https://img.alicdn.com/imgextra/i4/O1CN01ogE33T1SuCMRDalyf_!!6000000002306-0-tps-2456-1378.jpg)
+ 3部署齐活后，点击完成
![agentcraft config](https://img.alicdn.com/imgextra/i2/O1CN01baqTjU1wBFy2TOK3H_!!6000000006269-0-tps-2270-1328.jpg)
### 产品使用
#### 注册登录
+ 1. 注册一个虚拟账号（可以随时删除配置的资源），然后登录
![agentcraft config](https://img.alicdn.com/imgextra/i2/O1CN01CBMMSr1SsMmBC4Upv_!!6000000002302-0-tps-1362-900.jpg)
+ 2.配置DeepSeek满血的LLM服务以及通义千问最新版本的LLM服务
![agentcraft config](https://img.alicdn.com/imgextra/i4/O1CN01voVWFB1yYH6bsiMej_!!6000000006590-0-tps-3556-1796.jpg)
![agentcraft config](https://img.alicdn.com/imgextra/i2/O1CN01jUGkGh1fl7W0Ng2D7_!!6000000004046-0-tps-3574-1788.jpg)
![agentcraft config](https://img.alicdn.com/imgextra/i4/O1CN01sY9prh1NsIdkUSSw8_!!6000000001625-0-tps-1388-1394.jpg)

填写百炼的[API-KEY](https://bailian.console.aliyun.com/?apiKey=1#/api-key)
![agentcraft config](https://img.alicdn.com/imgextra/i3/O1CN01rDDmBh1IneXhieH0U_!!6000000000938-0-tps-1446-1312.jpg)
你可以把百炼deepseek-v3, qwen-max-latest 以及 deepseek官方的v3,r1模型按照同样步骤配置（注意需要到deepseek的开放平台获取apikey）
![agentcraft_config](https://img.alicdn.com/imgextra/i3/O1CN01vU874U24Yd6hYxcdY_!!6000000007403-0-tps-3542-1428.jpg)
配置好之后我们开始准备测试

#### ChatBot
创建一个简单问答的智能体
![agentcraft](https://img.alicdn.com/imgextra/i1/O1CN01hYKj4D1DR8zynBrL3_!!6000000000212-0-tps-3568-1788.jpg)
![agentcraft](https://img.alicdn.com/imgextra/i1/O1CN01SUo2VF1iDB0b8iwdm_!!6000000004378-0-tps-3552-1764.jpg)
![agentcraft](https://img.alicdn.com/imgextra/i1/O1CN01pqAGdK1ToX4mPV7u8_!!6000000002429-0-tps-3570-1824.jpg)
对话
![agentcraft](https://img.alicdn.com/imgextra/i2/O1CN01iT2KgP1ei5H2BFqBD_!!6000000003904-0-tps-3566-1804.jpg)

#### 知识库
新建数据集
![agentcraft](https://img.alicdn.com/imgextra/i2/O1CN01msYHfm1ps7jHCHGdM_!!6000000005415-0-tps-3554-1756.jpg)
![agentcraft](https://img.alicdn.com/imgextra/i1/O1CN010k3TKT29PXJyWYdjV_!!6000000008060-0-tps-3554-1800.jpg)
![agentcraft](https://img.alicdn.com/imgextra/i3/O1CN01da1l9e1mzxeplijzH_!!6000000005026-0-tps-3566-1812.jpg)
新建及配置知识库
![agentcraft](https://img.alicdn.com/imgextra/i2/O1CN017fftDI1J53amsGrmr_!!6000000000976-0-tps-3560-1804.jpg)
![agentcraft](https://img.alicdn.com/imgextra/i3/O1CN01bQWuP81PhQT56lpm3_!!6000000001872-0-tps-3574-1814.jpg)
保存后点击右侧“预览”对话测试。
![agentcraft](https://img.alicdn.com/imgextra/i1/O1CN01pqAGdK1ToX4mPV7u8_!!6000000002429-0-tps-3570-1824.jpg)
![agentcraft](https://img.alicdn.com/imgextra/i1/O1CN01y9oJX21H2eHMMpFIK_!!6000000000700-0-tps-3558-1792.jpg)
问答测试



### 更多能力
请访问[官方文档](http://agentcraft-docs.serverless-developer.com/)



</usedetail>

## 注意事项

<matters id="flushContent">

选择共享数据库可以快速体验AgentCraft服务，但是存在数据隐患，包括AI 模型的 token ，以及数据集方面需要格外注意
您可以在体验完成后删除相关的token, 数据集建议不要用私有的数据。
另外强烈建议你使用自己的数据库配置。
您可以选择通过云主机安装postgresql 也可以直接购买阿里云的数据库服务。 
购买阿里云的数据库教程如下：
### 1.创建数据库实例 (postgresql)
[数据库实例购买链接](https://www.aliyun.com/product/rds?spm=5176.28536895.nav-v2-dropdown-menu-1.139.3e18586cAVXbW6)

### 2.创建数据库 
实例创建好之后进行数据库创建

![image](http://img.alicdn.com/imgextra/i4/O1CN01OOS1QR1zJuA4P2KLC_!!6000000006694-0-tps-3522-1422.jpg)

![image](http://img.alicdn.com/imgextra/i1/O1CN01MCvyQV1J6t2c4oRlH_!!6000000000980-0-tps-3542-1850.jpg)

![image](http://img.alicdn.com/imgextra/i3/O1CN01d2lsUT27wOMsvnbPa_!!6000000007861-0-tps-3502-1226.jpg)

### 3.创建管理账号

![image](http://img.alicdn.com/imgextra/i3/O1CN01cEewJA28vlRUoSK6V_!!6000000007995-0-tps-3466-1450.jpg)

注意选择高权限账号

![image](http://img.alicdn.com/imgextra/i1/O1CN012WgalA1kLXKoqWmiu_!!6000000004667-0-tps-3380-1642.jpg)

### 数据库连接测试

![image](http://img.alicdn.com/imgextra/i3/O1CN01pD2lR626rywIkw6Eu_!!6000000007716-0-tps-3514-1158.jpg)

![image](http://img.alicdn.com/imgextra/i4/O1CN01YPNEZC1Ddxx3r0ch9_!!6000000000240-0-tps-3468-1716.jpg)

![image](http://img.alicdn.com/imgextra/i1/O1CN01FBkzpE253lu5Zi4xN_!!6000000007471-0-tps-2758-1550.jpg)

### 最终配置

#### 数据库连接地址 

![image](http://img.alicdn.com/imgextra/i2/O1CN01FWVxkg1yVyzP5ZxrG_!!6000000006585-0-tps-1476-432.jpg)

![image](http://img.alicdn.com/imgextra/i4/O1CN01WVXB3K205zkJxWzGs_!!6000000006799-0-tps-3546-990.jpg)

#### 数据库名

![image](http://img.alicdn.com/imgextra/i4/O1CN01Ra3bpd21J6hegBqfz_!!6000000006963-0-tps-3514-454.jpg)

#### 数据库账号 

_上面设置的高权限账号_

#### 数据库密码 

_上面设置的高权限账号密码_


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


cd agentcraft/src/agentcraft-all/agentcraft-be
cp .env.example .env
python3 -m venv venv
source venv/bin/activate
pip install -r  requirements.txt
export PYTHONPATH="${PYTHONPATH}:$(pwd)"
python3 -u app/main.py
