import React, { useEffect } from "react";
import { Table, Box, Text, Highlight, Button, Flex } from '@mantine/core';
import Link from 'next/link'
import { modals } from '@mantine/modals';
import FeatureDescription from 'components/FeatureDescription';
import { deleteFunctionAiApp } from 'store/functionAI';
import { useMcpStore, getMcpList, deleteMcp } from 'store/mcp';
import { formatDateTime } from 'utils/index';


export function McpPage() {
    const mcpList = useMcpStore().mcpList;
    useEffect(() => {
        getMcpList();
    }, [])

    const removeMcp = (agentApp: any) => {
        const { id, name, project_name } = agentApp;
        const deleteContent = `确定删除 ${name}?, 删除后不可恢复`;
        modals.openConfirmModal({
            title: '删除MCP',
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
                await deleteMcp(id);
                getMcpList();
            },
        });

    }

    const renderAgenticAppTable = () => {
        if (!mcpList || mcpList.length === 0) {
            return <Flex justify="center" align="center" direction="column" h={300}>
                <Text size="lg" mb="md">暂无 MCP数据</Text>
                <Link href="/overview">
                    前往创建
                </Link>
            </Flex>;
        }

        const rows = mcpList.map((mcp) => (
            <tr key={mcp.id}>
                <td>{mcp.id}</td>
                <td>{mcp.name}</td>
                <td style={{ width: 200 }}>{mcp.description}</td>
                <td>{mcp.endpoint}</td>
                <td>{formatDateTime(mcp.created)}</td>
                <td>{formatDateTime(mcp.modified)}</td>
                <td>
                    <Button variant="filled"
                        color="red"
                        size="xs"
                        ml={4}
                        onClick={() => removeMcp(mcp)}>删除</Button>
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
                            <th>访问地址</th>
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
            <FeatureDescription title="MCP" description="AgentCraft的智能体可以无缝集成MCP Server, 实现智能应用快速扩展" />
            <>
                {renderAgenticAppTable()}
            </>
        </>
    );
}


