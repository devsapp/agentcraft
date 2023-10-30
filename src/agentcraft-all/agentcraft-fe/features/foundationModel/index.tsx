import React, { useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router'
import { Breadcrumbs, Anchor, Button, Box, Table, Text, Highlight, LoadingOverlay, Flex } from '@mantine/core';

import { modals } from '@mantine/modals';

import { useFoundationModelStore, getFoundationModelList, deleteFoundationModel } from '@/store/foundationModel';

import FeatureDescription from '@/components/FeatureDescription';


import { formatDateTime } from 'utils/index';
// import { FORM_WIDTH } from 'constants/index';
// import styles from './index.module.scss';



function List() {
    const foundationModelList: any[] = useFoundationModelStore().foundationModelList;
    const setLoading = useFoundationModelStore().setLoading;
    const loading: boolean = useFoundationModelStore().loading;
    const removeFoundationModel = (appName: string) => {
        const deleteContent = `确定删除${appName},该资源会被彻底清除，请仔细检查相关的依赖项?`;
        modals.openConfirmModal({
            title: '删除基础模型服务',
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
                    await deleteFoundationModel(appName);
                    await getFoundationModelList();
                }catch(e) {
                    console.log(e);
                }
                setLoading(false);
            },
        });

    }
    const rows = foundationModelList.map((element: any) => (
        <tr key={element.name}>
            <td><div style={{ width: 100, wordBreak: 'break-word' }}>  <Link href={`/foundationModel/${element.name}/detail`}>{element.name}</Link></div></td>
            <td ><div style={{ width: 200, wordBreak: 'break-word' }}>{element.template}</div></td>
            <td>{formatDateTime(parseInt(element.createdTime))}</td>
            <td><a href={`https://fcnext.console.aliyun.com/applications/${element.name}/env/default?tab=envDetail`} target="_blank">云资源访问地址</a> <Button ml={12} variant="filled" color="red" size="xs" onClick={() => removeFoundationModel(element.name)}>删除</Button></td>
        </tr>
    ));
    async function getAllFoundationModel() {
        setLoading(true);
        try {
            await getFoundationModelList();
        } catch (e) {
            console.log(e)
        }
        setLoading(false);
    }
    useEffect(() => {
        getAllFoundationModel()
    }, []);

    return (
        <Box pos="relative" >
            <LoadingOverlay visible={loading} overlayOpacity={0.3} />
            <Table striped withBorder withColumnBorders mt={12}  >
                <thead>
                    <tr>
                        <th>基础模型服务名称</th>
                        <th>部署使用的模版</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </Box>
    );
}


export function FoundationModel() {
    const loading: boolean = useFoundationModelStore().loading;
    const router = useRouter()
    const { query } = router;
    const items = [
        { title: 'AgentCraft', href: `/` },
        { title: '基础模型', href: `/foundationModel` },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <>
            <Breadcrumbs>{items}</Breadcrumbs>
            <FeatureDescription title="基础模型" description="AgentCraft可以构建通义千问的商业化大语言模型服务也能够对魔搭社区，huggingface社区的开源模型进行托管。由此构建的基础模型服务可以作为您的AIGC应用的核心" />
            <Box >
                <Flex
                    mih={50}
                    gap="md"
                    justify="flex-start"
                    align="flex-start"
                    direction="row"
                    wrap="wrap"
                >
                    <Button onClick={() => router.push('/foundationModel/create')}>
                        创建基础模型
                    </Button>
                </Flex>
            </Box>
            <List />
        </>

    );
}
