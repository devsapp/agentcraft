import React, { useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router'
import { Anchor, Button, Box, Table, Text, Highlight, LoadingOverlay, Flex } from '@mantine/core';

import { modals } from '@mantine/modals';

import { useFoundationModelStore, getFoundationModelList, deleteFoundationModel } from '@/store/foundationModel';

import FeatureDescription from '@/components/FeatureDescription';

import { FM_NAME_MAP, FM_DOCS } from 'constants/foundation-model';
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
                } catch (e) {
                    console.log(e);
                }
                setLoading(false);
            },
        });

    }
    const rows = foundationModelList.map((element: any) => (
        <tr key={element.name}>
            <td >
                <div style={{ width: 200, wordBreak: 'break-word' }}>
                    <Link href={`/foundationModel/${element.name}/detail`}>{FM_NAME_MAP[element.template]}</Link>
                </div>
                <div style={{ width: 200, wordBreak: 'break-word' }}>
                    {element.name}
                </div>
            </td>
            <td>
                { FM_DOCS[element.template] ? <div>
                    {FM_DOCS[element.template].map((item: any, index: number) => (
                        <div key={index}><Link href={item.url} target="_blank">{item.name}</Link></div>
                    ))}
                </div> : null}
            </td>
            <td>{formatDateTime(parseInt(element.createdTime))}</td>
            <td> <a href={`https://fcnext.console.aliyun.com/applications/${element.name}/env/default?tab=envDetail`} target="_blank">访问云服务</a><Button ml={12} variant="filled" color="red" size="xs" onClick={() => removeFoundationModel(element.name)}>删除</Button></td>
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
        <Box pos="relative" className={'content-container'} pb={124} >
            <LoadingOverlay visible={loading} overlayOpacity={0.3} />
            <Table striped withBorder withColumnBorders mt={12}  >
                <thead>
                    <tr>
                        <th>基础模型</th>
                        <th>使用文档</th>
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
    const router = useRouter()
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
            <FeatureDescription title="基础模型" description="AgentCraft提供了魔搭，huggingface社区精选模型的一键部署使用服务，包含LLM,文本生成，声音生成等模型，您可以通过该页面进行基础模型的创建和管理" />
            <Box mt={12}>
                <Button onClick={() => router.push('/foundationModel/create')}>
                    创建基础模型
                </Button>
            </Box>
            <List />
        </>

    );
}
