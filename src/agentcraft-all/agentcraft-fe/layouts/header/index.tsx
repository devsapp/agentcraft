import { Box, Header as MantineHeader, Text, Flex, Anchor } from '@mantine/core';
import { modals } from '@mantine/modals';

import { useUserStore, getUserInfo } from '@/store/user';
import { useRouter } from 'next/router';
import { useAuthenticationStore } from '@/store/authentication';
import styles from './index.module.scss';
import { useEffect } from 'react';

export function Header() {
    const user = useUserStore().userInfo;
    const setToken = useAuthenticationStore().setToken;
    const router = useRouter();
    const logout = () => {
        modals.openConfirmModal({
            title: '登出确认',
            centered: true,
            children: (
                <Text size="sm">
                    确定退出本次登录么？
                </Text>
            ),
            labels: { confirm: '确定', cancel: '取消' },
            onCancel: () => console.log('Cancel'),
            onConfirm: () => {
                setToken('');
                router.push('/login');
            },
        });

    }
    useEffect(() => {
        if (!user.username) getUserInfo();
    }, []);

    return <div className={styles['agentcraft-header']}>
            <Box ml={5}
            >

                <Flex align="center">
                    <Anchor href="https://agentcraft.serverless-developer.com/" color="white" target={'_blank'} mr={24}>访问官网</Anchor>
                </Flex>

            </Box>
            {user.username ?
                <div className={styles['user']}>
                    <div className={styles['user-content']}>您好：{user.username}</div>
                    <a className={styles['logout']} onClick={logout}>登出</a>
                </div> : null}
        </div>
 
    // return <MantineHeader height={60} p="xs">
    //     <div className={styles['agentcraft-header']}>

    //         <Box ml={5}
    //         >

    //             <Flex align="center">
    //                 <Anchor href="https://agentcraft.serverless-developer.com/" color="white" target={'_blank'} mr={24}>访问官网</Anchor>
    //             </Flex>

    //         </Box>

    //         {user.username ?
    //             <div className={styles['user']}>
    //                 <div className={styles['user-content']}>您好：{user.username}</div>
    //                 <a className={styles['logout']} onClick={logout}>登出</a>
    //             </div> : null}

    //     </div>
    // </MantineHeader>
}