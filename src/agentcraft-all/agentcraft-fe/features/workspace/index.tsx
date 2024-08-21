import React from "react";
import { useDisclosure } from '@mantine/hooks';
import { Select, Text, Box, Flex } from '@mantine/core';
import { PageProps } from 'types/page';
import { useLocalWorkspaceStore } from 'store/workspace';
import styles from './index.module.scss';
import Manage from "./manage";


export function WorkSpace({
    workspaceList,
    workspaceId,
    parentPath,
}: PageProps & { parentPath: any }) {
    const [opened, { open, close }] = useDisclosure(false);
    const { setCurrentWorkspace } = useLocalWorkspaceStore();

    return (
        <>
            <Text className={styles.title}>
                {parentPath ? 'Ai' : '爱无限引擎'}
            </Text>
            {parentPath ? (
                <Box mt={12} className={styles['workspace-short']}>
                    {workspaceList[0]?.name?.substring(0, 1)}
                </Box>
            ) : (
                    <Box mt={12} className={styles.workspace}>
                        <Flex justify="space-between">
                            <Text className={styles['workspace-namespace-title']}>
                                工作空间
                            </Text>
                            <Text className={styles['workspace-namespace-setting']} onClick={open}>管理</Text>
                        </Flex>
                        <Select
                            className={styles['workspace-list']}
                            mt={-2}
                            size={'xs'}
                            variant={'unstyled'}
                            value={workspaceId}
                            data={workspaceList.map((item: any) => ({
                                label: item.name,
                                value: item.id
                            }))}
                            onChange={(value: any) => setCurrentWorkspace(value)}
                        />
                    </Box>
            )}
            {opened && <Manage opened={opened} close={close} />}
        </>

    );
}