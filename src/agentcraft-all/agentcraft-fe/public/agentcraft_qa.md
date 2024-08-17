注册登录问题
问题：注册提示成功，但实际上没有成功，数据库也没有表
答案： 核心是因为AgentCraft服务和数据库的连接失败了，可以从以下几点排查问题
● 查看创建的数据库类型
 确保创建的数据库是Postgresql， AgentCraft使用Postgresql,作为关系+向量数据库双能力使用。[点击查看](https://rdsbuy.console.aliyun.com/create/rds_serverless_public_cn/PostgreSQL)。如何创建阿里云PostSql数据库 ![image](https://img.alicdn.com/imgextra/i4/O1CN01tYUcLj1UdMujnLqPZ_!!6000000002540-0-tps-3466-1514.jpg)

● 查看函数计算Vpc+vswitch 和数据库的vpc+vswitch确保二者网络是一致
首先进入函数计算控制台（3.0）函数-> 搜索框输入 agentcraft-backend
![agentcraft](https://img.alicdn.com/imgextra/i4/O1CN01CL7QIM1NZ3sh4EuFN_!!6000000001583-0-tps-3558-1690.jpg),
然后查看agentcraft-backend的网络配置
![agentcraft-backend](https://img.alicdn.com/imgextra/i3/O1CN01KRIDrQ1kFaCJowTZQ_!!6000000004654-0-tps-3550-1766.jpg)
最后查看数据库rds的网络配置
![rds-postgresql](https://img.alicdn.com/imgextra/i3/O1CN01YONu5M1i9y6yqnUaa_!!6000000004371-0-tps-3496-1364.jpg)
让二者一致