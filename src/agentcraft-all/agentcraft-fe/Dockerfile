FROM anolis-registry.cn-zhangjiakou.cr.aliyuncs.com/openanolis/node:18.17.1-23

ENV NODE_MOULES_PATH = '/opt/nodejs/node_modules/.bin'
ENV PATH=${NODE_MOULES_PATH}:$PATH
# 工作目录
WORKDIR /app

COPY . /app/


RUN npm i --registry=https://registry.npmmirror.com --force
RUN npm run build

# 运行时监听的端口
EXPOSE 3000

# 运行
# CMD ["/app/node_modules/.bin/next", "dev"]

CMD ["npm", "start"]
