import axios from 'axios';

const request = axios.create({
    baseURL: process.env.baseUrl || '',
    headers: {
        'Authorization': `Bearer ${process.env.token || ''}`,
        'Content-Type': 'application/json'
    },
});

export default request;