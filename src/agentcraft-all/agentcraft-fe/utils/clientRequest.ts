


import Router from "next/router";
import { ResponseData, HTTP_STATUS } from 'types/httpStatus';
import { useAuthenticationStore } from 'store/authentication';

export async function request(url: string, data?: any): Promise<ResponseData> {
    const { token } = useAuthenticationStore.getState();
    if (!data) {
        data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
    if (token) {
        data.headers['Authorization'] = `Bearer ${token || ''}`;
    }
    const res = await fetch(url, data);
    const result: ResponseData = await res.json();
    if (result.code === HTTP_STATUS.UNAUTHORIZED) {
        Router.push('/login');
    }
    return result;
}
