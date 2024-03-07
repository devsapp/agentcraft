import request from 'utils/serverRequest';

export async function list(req: any) {
    const page = 0;
    const limit = 200;
    const { cookies } = req;
    const token = cookies.token;
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const result = await request.get('/app/list?page=${page}&limit=${limit}', { params: { page, limit } });
    return result.data;
}