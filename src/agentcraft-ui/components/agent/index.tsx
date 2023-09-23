import React, { useEffect } from "react";

import { Breadcrumbs, Anchor, Button, Box, Table } from '@mantine/core';

import { getAgentList, useGlobalStore, AgentResponseData } from '@/store/agent';
// import styles from './index.module.scss';


interface AgentProps {
    appId: number;
}
function AgentComponent({ appId }: AgentProps) {
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
        getAgentList(appId);
    }, []);

    return (
        <>
            <Box mt={12} >
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
                        <th>提示词模板</th>
                        <th>系统角色</th>
                        <th>创建时间</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
    );
}



export function Agent({ appId }: AgentProps) {

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
            <AgentComponent appId={appId} />
        </>

    );
}
