import React, { useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Breadcrumbs, Anchor, Button, Box, Table, Text, Highlight, LoadingOverlay, Flex } from '@mantine/core';

import { modals } from '@mantine/modals';

import { useClientAccessStore, getClientAccessList, deleteClientAccess } from 'store/clientAccess';

import FeatureDescription from 'components/FeatureDescription';
import { CLIENTACCESS_NAME_MAP } from 'constants/client-access';
import { formatDateTime } from 'utils/index';



function List() {
    const clientAccessList: any[] = useClientAccessStore().clientAccessList;
    const setLoading = useClientAccessStore().setLoading;
    const loading: boolean = useClientAccessStore().loading;
    const removeFoundationModel = (appName: string) => {
        const deleteContent = `确定删除${appName},该资源会被彻底清除，请仔细检查相关的依赖项?`;
        modals.openConfirmModal({
            title: '删除客户端接入',
            centered: true,
            children: (
                <Text size="sm">
                    <Highlight highlight={appName}>{deleteContent}</Highlight>
                </Text>
            ),
            labels: { confirm: '确定', cancel: '取消' },
            onCancel: () => console.log('Cancel'),
            confirmProps: { color: 'red' },
            onConfirm: async () => {
                setLoading(true);
                try {
                    await deleteClientAccess(appName);
                    await getClientAccessList();
                } catch (e) {
                    console.log(e);
                }
                setLoading(false);
            },
        });

    }
    const rows = clientAccessList.map((element: any) => (
        <tr key={element.name}>
            <td >
                <div style={{ width: 200, wordBreak: 'break-word' }}>
                    {CLIENTACCESS_NAME_MAP[element.template]}
                </div>
                <div style={{ width: 200, wordBreak: 'break-word' }}>
                    {element.name}
                </div>
            </td>
            <td>{element.description}</td>
            <td>{formatDateTime(parseInt(element.createdTime))}</td>
            <td> <a href={`https://fcnext.console.aliyun.com/applications/${element.name}/env/default?tab=envDetail`} target="_blank">访问云服务</a><Button ml={12} variant="filled" color="red" size="xs" onClick={() => removeFoundationModel(element.name)}>删除</Button></td>
        </tr>
    ));
    async function getAllClientAccess() {
        setLoading(true);
        try {
            await getClientAccessList();
        } catch (e) {
            console.log(e)
        }
        setLoading(false);
    }
    useEffect(() => {
        getAllClientAccess();
    }, []);

    return (
        <Box pos="relative" >
            <LoadingOverlay visible={loading} overlayOpacity={0.3} />
            <Table striped withBorder withColumnBorders mt={12}  >
                <thead>
                    <tr>
                        <th>客户端接入服务</th>
                        <th>描述</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </Box>
    );
}


export function ClientAccess() {
    const router = useRouter()
    const items = [
        { title: 'AgentCraft', href: `/` },
        { title: '客户端接入', href: `/clientAccess` },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <>
            {/* <Breadcrumbs>{items}</Breadcrumbs> */}
            <FeatureDescription title="客户端接入" description="AgentCraft可以通过构建客户端接入服务，帮助您将智能服务接入到独立的web服务， 钉钉，微信机器人，以及嵌入您的网站" />
            <Box >
                <Flex
                    mih={50}
                    gap="md"
                    justify="flex-start"
                    align="flex-start"
                    direction="row"
                    wrap="wrap"
                >
                    <Button onClick={() => router.push('/clientAccess/create')}>
                        创建基础客户端接入
                    </Button>
                </Flex>
            </Box>
            <List />
        </>

    );
}
