import React, { useEffect, useState } from "react";
import { Table, Box, Text, Highlight, Button, Flex, Modal, TextInput, Textarea, Checkbox } from '@mantine/core';
import Link from 'next/link'

import FeatureDescription from 'components/FeatureDescription';
import { deleteFunctionAiApp } from 'store/functionAI';
import { useAgenticAppStore, getAgenticAppList, deleteAgenticApp, updateAgenticApp } from 'store/agenticApp';
import {
    deleteWorkspace,
    getWorkspaceList
} from 'store/workspace';
import { useForm } from '@mantine/form';
import { formatDateTime } from 'utils/index';

// 新增编辑模态框组件
function EditModal() {
    const { editingApp, setEditingApp, } = useAgenticAppStore();
    const form = useForm({
        initialValues: {
            name: '',
            description: '',
            domain: ''
        },
        validate: {
            name: (value) => (!value ? '名称不能为空' : null),
            description: (value) => (!value ? '描述不能为空' : null),
            domain: (value) => (!value ? '访问地址不能为空' : null),
        },
    });

    useEffect(() => {
        if (editingApp) {
            form.setValues({
                name: editingApp.name,
                description: editingApp.description,
                domain: editingApp.domain
            });
        }
    }, [editingApp]);

    const handleSubmit = async (values: any) => {
        try {
            await updateAgenticApp(editingApp.id, values);
            getAgenticAppList();
            setEditingApp(null);
        } catch (error) {
            console.error('编辑失败:', error);
        }
    };

    return (
        <Modal
            opened={!!editingApp}
            onClose={() => setEditingApp(null)}
            title="编辑应用"
            centered
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    withAsterisk
                    label="应用名称"
                    placeholder="输入应用名称"
                    {...form.getInputProps('name')}
                />
                <Textarea
                    withAsterisk
                    label="应用描述"
                    placeholder="输入应用描述"
                    mt="md"
                    {...form.getInputProps('description')}
                />
                <Textarea
                    withAsterisk
                    label="访问地址"
                    placeholder="输入访问地址"
                    mt="md"
                    {...form.getInputProps('domain')}
                />
                <Button type="submit" fullWidth mt="xl">
                    保存修改
                </Button>
            </form>
        </Modal>
    );
}
function DeleteModal() {
    const {
        currentDeleteApp,
        isDeleteModalOpen,
        isDeleteWorkspace,
        setIsDeleteWorkspace,
        setIsDeleteModalOpen,
    } = useAgenticAppStore();

    if (!currentDeleteApp) return null;
    const hightlightText = currentDeleteApp?.name || '';
    const text = `确定删除 ${hightlightText}? 该操作会清理Agentic AI App元数据，算力资源，删除后应用的数据不可恢复`;
    return (
        <Modal
            opened={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            title="删除AgenticAI应用"
            centered
        >
            <Box>
                <Text size="sm" mb={12}>
                    <Highlight highlight={hightlightText}>{text}</Highlight>
                </Text>
                <Checkbox
                    size="xs"
                    color="red"
                    label="是否删除该应用所依赖的项目空间"
                    description="注：如果项目空间的智能体有对外服务，请务必不要勾选"
                    checked={isDeleteWorkspace}
                    onChange={(e) => setIsDeleteWorkspace(e.currentTarget.checked)}
                />
            </Box>
            <Flex justify="flex-end" gap="md" mt="xl">
                <Button variant="default" onClick={() => {
                    setIsDeleteModalOpen(false);
                    setIsDeleteWorkspace(false);
                }}>取消</Button>
                <Button color="red" onClick={async () => {
                    const { id, project_name, workspace_id } = currentDeleteApp || {}
                    try {

                        await deleteFunctionAiApp(project_name, {}); //删除Function AI 应用
                        if (isDeleteWorkspace) {
                            console.log(workspace_id,'ssss');
                            await deleteWorkspace(workspace_id);
                        }
                    } catch (e) {
                    }

                    await deleteAgenticApp(id); // 删除AgentCraft保存的应用
                    setIsDeleteModalOpen(false); // 关闭删除弹窗
                    setIsDeleteWorkspace(false); // 清理删除默认工作空间的选项
                    getAgenticAppList();
                    getWorkspaceList();
                }}>确认删除</Button>
            </Flex>
        </Modal>
    );
}

export function AgenticAppPage() {

    const { agenticAppList, setEditingApp, setIsDeleteModalOpen, setCurrentDeleteApp } = useAgenticAppStore();

    useEffect(() => {
        getAgenticAppList();
    }, [])

    const removeAgentApp = (agentApp: any) => {
        setCurrentDeleteApp(agentApp);
        setIsDeleteModalOpen(true);
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
                    <Button
                        variant="outline"
                        size="xs"
                        onClick={() => {
                            setEditingApp(app)
                        }}
                    >
                        编辑
                    </Button>
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
                <EditModal />
                <DeleteModal />
            </>
        </>
    );
}


