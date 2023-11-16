import axios from 'axios';

const request = axios.create({
    baseURL: process.env.baseUrl || '',
    headers: {
        // 'Authorization': `Bearer ${process.env.token || ''}`,
        'Content-Type': 'application/json'
    }
});
// 响应拦截器, 处理服务端的异常
request.interceptors.response.use(
    response => {
        return Promise.resolve(response);
    },
    error => {
        if (error.response.status) {
            console.log('from backend server:', error);
            const { status, data } = error.response;
            return Promise.resolve({ status, data: { code: status, message: data.detail } });
        }
    }
);
export default request;