FROM alibaba-cloud-linux-3-registry.cn-hangzhou.cr.aliyuncs.com/alinux3/python:3.11.1

# 工作目录
WORKDIR /app

# 将你的代码复制到容器中
COPY ./app/ /app/app
COPY ./requirements.txt /app/requirements.txt

RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --no-cache-dir -r requirements.txt 

# 运行时监听的端口
EXPOSE 8000

ENV PYTHONPATH "${PYTHONPATH}:$(pwd)"

# 运行app.py时的命令及其参数
CMD ["python", "app/main.py"]
