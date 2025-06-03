import React, { useEffect } from "react";
import { Table, Box, Text, Highlight, Button, Flex } from '@mantine/core';
import Link from 'next/link'
import { modals } from '@mantine/modals';
import FeatureDescription from 'components/FeatureDescription';
import { deleteFunctionAiApp } from '@/store/functionAI';
import { useAgenticAppStore, getAgenticAppList, deleteAgenticApp } from '@/store/agenticApp';
import { formatDateTime } from 'utils/index';


export function AgenticAppPage() {
    const agenticAppList = useAgenticAppStore().agenticAppList;
    useEffect(() => {
        getAgenticAppList();
    }, [])

    const removeAgentApp = (agentApp: any) => {
        const { id, name, project_name } = agentApp;
        const deleteContent = `确定删除 ${name}?, 删除后不可恢复`;
        modals.openConfirmModal({
            title: '删除AI工具',
            centered: true,
            children: (
                <Text size="sm">
                    <Highlight highlight={name}>{deleteContent}</Highlight>
                </Text>
            ),
            labels: { confirm: '确定', cancel: '取消' },
            onCancel: () => console.log('Cancel'),
            confirmProps: { color: 'red' },
            onConfirm: async () => {
                try {
                    await deleteFunctionAiApp(project_name, {});
                } catch (e) {
                }
                await deleteAgenticApp(id);
                getAgenticAppList();
            },
        });

    }

    const renderAgenticAppTable = () => {
        if (!agenticAppList || agenticAppList.length === 0) {
            return <Flex justify="center" align="center" direction="column" h={300}>
                <Text size="lg" mb="md">暂无 Agentic 应用数据</Text>
                <Link href="/overview">
                    前往创建
                </Link>
            </Flex>;
        }

        const rows = agenticAppList.map((app) => (
            <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.name}</td>
                <td style={{ width: 400 }}>{app.description}</td>
                <td>
                    <a href={`http://${app.domain}`} target="_blank" rel="agentic app server">
                        访问地址
                    </a>
                </td>
                <td>{formatDateTime(app.created)}</td>
                <td>{formatDateTime(app.modified)}</td>
                <td>
                    <Button variant="filled"
                        color="red"
                        size="xs"
                        ml={4}
                        onClick={() => removeAgentApp(app)}>删除</Button>
                </td>
            </tr>
        ));

        return (
            <Box pos="relative" className={'content-container'} pb={124}>
                <Table striped withBorder withColumnBorders mt={12}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>名称</th>
                            <th>描述</th>
                            <th>访问链接</th>
                            <th>创建时间</th>
                            <th>更新时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Box>
        );
    };



    return (
        <>
            <FeatureDescription title="Agentic应用" description="Agentic应用是面向垂直场景的多智能体协作应用，将LLM、MCP、生成式UI、工作流等技术方案融合到一起，专注于交付智能服务效果的应用形态" />
            <>
                {renderAgenticAppTable()}
            </>
        </>
    );
}


