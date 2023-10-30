import React, { useEffect } from "react";

import { Breadcrumbs, Anchor, Notification } from '@mantine/core';

import { useGlobalStore, AgentResponseData } from '@/store/agent';
import FeatureDescription from '@/components/FeatureDescription';
// import styles from './index.module.scss';


interface AgentProps {
    appId: number;
}

function List({ appId }: AgentProps) {
    const agentList: AgentResponseData[] = useGlobalStore().agentList;
    const rows = agentList.map((element: AgentResponseData) => (
        <tr key={element.id}>
            <td>{element.id}</td>
            <td>{element.name}</td>
            <td>{element.description}</td>
            <td>{element.prompt_template}</td>
            <td>{element.system_message}</td>
            <td>{element.created}</td>
        </tr>
    ));
    useEffect(() => {

    }, []);

    return (
        <>
            {/* <Box mt={12} >
                <Button>
                    新建Agent
                </Button>
            </Box>
            <Table striped withBorder withColumnBorders mt={12}  >
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>名称</th>
                        <th>描述</th>
                        <th>任务规划</th>
                        <th>推理框架</th>
                        <th>工具集</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table> */}
        </>
    );
}



export function AgentPage({ appId }: AgentProps) {

    const items = [
        { title: '应用列表', href: '/app' },
        { title: 'Agent管理', href: `/app/${appId}/agent` },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));
    return (
        <>
            <Breadcrumbs>{items}</Breadcrumbs>
            <FeatureDescription title="Agent" description="Agent是一类包含任务规划、上下文记忆、工具调用和LLM的智能应用，AgentCraft提供可以让人工设计目标规划的功能以及丰富的工具集，确保智能任务的准确执行" />
            <Notification title="说明">
                该功能还在建设中
            </Notification>
            <List appId={appId} />
        </>

    );
}
