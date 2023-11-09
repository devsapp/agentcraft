export const ALIBABACLOUD_POSTGRESQL_TUTORIAL=`# 数据库获取实践教程



## 数据库资源领取 （1分钟）

新用户建议先领取免费额度，[点击进入freetair](//free.aliyun.com/?product=9564560&crowd=personal&spm=5176.28055625.J_4VYgf18xNlTAyFFbOuOQe.173.e939154aVMAc9G&scm=20140722.M_9489724._.V_1)

**选择”RDS PostgreSQL Serverless“**

![image](//img.alicdn.com/imgextra/i4/O1CN01KIbxFu1MIHkEEpUDj_!!6000000001411-0-tps-3498-1828.jpg)

老用户可以访问[快速创建](//rdsbuy.console.aliyun.com/fastCreate)
## 数据库创建

### 创建数据库实例 
#### 注意这里是Postgresql Serverless类型
![image](//img.alicdn.com/imgextra/i1/O1CN01Xgn67Q1ZQbwxhzzOB_!!6000000003189-0-tps-1678-1842.jpg)

### 注意：
+ 创建vpc的时候最好保持跟当前服务的vpc一致
+ 如果没找到一致的vpc(函数计算的可用区跟数据库的可用区不完全一致)，可以选择默认的vpc，然后数据库开放公网访问进行测试，后续可以在函数计算服务修改vpc

### 以下是当前服务的vpc信息
+ **vpcName是: {{vpcName}}**
+ **vpcId是: {{vpcId}}** 
+ **交换机的名称是: agentcraft-vpc** 
+ **选择的可用区是:K**


![image](//img.alicdn.com/imgextra/i3/O1CN01pjv4jx1zpVUMJjZ7l_!!6000000006763-0-tps-1668-1852.jpg)

![image](//img.alicdn.com/imgextra/i3/O1CN01qVaFvT1ZB2Tysrgu1_!!6000000003155-0-tps-3540-1842.jpg)

进入控制台等待实例启动 

![image](//img.alicdn.com/imgextra/i2/O1CN015UrP3y28SuUMmjbMf_!!6000000007932-0-tps-3558-1722.jpg)

### 创建数据库 

![image](//img.alicdn.com/imgextra/i4/O1CN01OOS1QR1zJuA4P2KLC_!!6000000006694-0-tps-3522-1422.jpg)

![image](//img.alicdn.com/imgextra/i1/O1CN01MCvyQV1J6t2c4oRlH_!!6000000000980-0-tps-3542-1850.jpg)

![image](//img.alicdn.com/imgextra/i3/O1CN01d2lsUT27wOMsvnbPa_!!6000000007861-0-tps-3502-1226.jpg)

### 创建管理账号

![image](//img.alicdn.com/imgextra/i3/O1CN01cEewJA28vlRUoSK6V_!!6000000007995-0-tps-3466-1450.jpg)

注意选择高权限账号

![image](//img.alicdn.com/imgextra/i1/O1CN012WgalA1kLXKoqWmiu_!!6000000004667-0-tps-3380-1642.jpg)

### 数据库连接测试

![image](//img.alicdn.com/imgextra/i3/O1CN01pD2lR626rywIkw6Eu_!!6000000007716-0-tps-3514-1158.jpg)

![image](//img.alicdn.com/imgextra/i4/O1CN01YPNEZC1Ddxx3r0ch9_!!6000000000240-0-tps-3468-1716.jpg)

![image](//img.alicdn.com/imgextra/i1/O1CN01FBkzpE253lu5Zi4xN_!!6000000007471-0-tps-2758-1550.jpg)

### 开通vector插件，并且准备好配置项

![image](//img.alicdn.com/imgextra/i2/O1CN01LgKO1J244OpZ7Tdm4_!!6000000007337-0-tps-3536-1728.jpg)

## 最终配置

### 数据库连接地址 

![image](//img.alicdn.com/imgextra/i2/O1CN01FWVxkg1yVyzP5ZxrG_!!6000000006585-0-tps-1476-432.jpg)

![image](//img.alicdn.com/imgextra/i4/O1CN01WVXB3K205zkJxWzGs_!!6000000006799-0-tps-3546-990.jpg)

### 数据库名

![image](//img.alicdn.com/imgextra/i4/O1CN01Ra3bpd21J6hegBqfz_!!6000000006963-0-tps-3514-454.jpg)

### 数据库账号 

_上面设置的高权限账号_

### 数据库密码 

_上面设置的高权限账号密码_`