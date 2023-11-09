export const ALIBABACLOUD_POSTGRESQL_TUTORIAL=`# 数据库获取实践教程



## 数据库资源领取 （1分钟）

新用户建议先领取免费额度，[点击进入freetair](https://free.aliyun.com/?product=9564560&crowd=personal&spm=5176.28055625.J_4VYgf18xNlTAyFFbOuOQe.173.e939154aVMAc9G&scm=20140722.M_9489724._.V_1)

**选择”RDS PostgreSQL Serverless“**

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/38ae4820-2291-4583-9ca9-df897430af87.png)

老用户可以访问[快速创建](https://rdsbuy.console.aliyun.com/fastCreate)
## 数据库创建

### 创建数据库实例 
#### 注意这里是Postgresql Serverless类型
![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/ac313cbc-9864-4945-bd07-721a64cf872d.png)

### 注意：
+ 创建vpc的时候最好保持跟当前服务的vpc一致
+ 如果没找到一致的vpc(函数计算的可用区跟数据库的可用区不完全一致)，可以选择默认的vpc，然后数据库开放公网访问进行测试，后续可以在函数计算服务修改vpc

### 以下是当前服务的vpc信息
+ **vpcName是: {{vpcName}}**
+ **vpcId是: {{vpcId}}** 
+ **交换机的名称是: agentcraft-vpc** 
+ **选择的可用区是:K**


![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/da06561c-711a-40b9-8579-951b74b0ff95.png)

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/1f2b443e-a7a0-47e6-90b3-09719e64dfa3.png)

进入控制台等待实例启动 

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/4a92fc9e-499c-445b-b273-43a66c39d88a.png)

### 创建数据库 

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/55f4970b-eb6f-45f8-b188-c0f47e3c466f.png)

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/8156e7c9-8e46-44d7-abb4-2f270cdb8d73.png)

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/ffbf5c7d-bf75-4e63-a71c-4754d33f06f0.png)

### 创建管理账号

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/3afd1698-654e-490c-8fef-666180bdc228.png)

注意选择高权限账号

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/97f0b2f4-1c11-40cd-80ce-7150be363e88.png)

### 数据库连接测试

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/846b2e73-5bc3-46d7-b668-ffc39307676e.png)

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/342ca780-047c-4e05-a545-7be56d09c10a.png)

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/5f90cd8d-92b3-45f0-9dc8-5b80097c3955.png)

### 开通vector插件，并且准备好配置项

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/33a4eb6a-1fce-49a6-bd62-0c0125223040.png)

## 最终配置

### 数据库连接地址 

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/d0188e29-0ddf-4fdc-9c10-6822cdf0edcd.png)

![image](//alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/8dfb6eb8-9d72-4042-be64-836428e25a08.png)

### 数据库名

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0Ozwjm2eeYlzeE/img/38053222-2c90-4e79-9ebd-d91f9376bcb6.png)

### 数据库账号 

_上面设置的高权限账号_

### 数据库密码 

_上面设置的高权限账号密码_`