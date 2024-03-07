


import Router from "next/router";
import { ResponseData, HTTP_STATUS } from 'types/httpStatus';

export async function request(url: string, data?: any): Promise<ResponseData> {
    if (!data) {
        data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
    const res = await fetch(url, data);
    const result: ResponseData = await res.json();
    if (result.code === HTTP_STATUS.UNAUTHORIZED) {
        Router.push('/login');
    }
    return result;
}
