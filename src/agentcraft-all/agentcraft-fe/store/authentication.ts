
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { request } from '@/utils/clientRequest';
import { AGENT_CRAFT_TOKEN } from '@/constants/index';



export const useAuthenticationStore = create<any>(persist(
    (set) => ({
        token: '',
        setToken: (token: string) => set({ token }),
    }),
    {
        name: AGENT_CRAFT_TOKEN,
    }
))





export async function login(username: string, password: string) {
    const res: any = await request("/api/authentication/login", {
        method: 'POST', 
        body: JSON.stringify({ username, password }), 
        headers: {
            "Content-Type": "application/json",
        }
    });
    return res;
}


export async function register(username: string, password: string) {
    const res: any = await request("/api/authentication/register", {
        method: 'POST', 
        body: JSON.stringify({ username, password }), 
        headers: {
            "Content-Type": "application/json",
        }
    });
    return res;
}