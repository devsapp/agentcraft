
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { request } from 'utils/clientRequest';

export interface UserInfo {
    username: string,
    created: string
}
interface UserStore {
    userInfo: UserInfo,
    setUserInfo: (userInfo: UserInfo) => void


}

export const useUserStore = create<UserStore>()(devtools((set) => ({
    userInfo: { username: '', created: '' },
    setUserInfo: (userInfo: UserInfo) => set((_state: any) => ({ userInfo }))
})));


export async function getUserInfo() {
    const state = useUserStore.getState();
    const res = await request("/api/user");
    const userInfo = await res.data;
    if (userInfo) {
        state.setUserInfo(userInfo);
    }

}

