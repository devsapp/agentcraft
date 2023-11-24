import React from "react";

import { Table } from '@mantine/core';





export default function Scenes({ data  }: any) {

    const _data = data ? data : [{
        name: '零售导购',
        preview: 'https://img.alicdn.com/imgextra/i2/O1CN01UkVIjE1z2xVjSnvvQ_!!6000000006657-0-tps-1792-1024.jpg',
        description: '数字人+领域知识智能体能够作为新一代的零售导购服务增强企业竞争力'
    }, {
        name: 'IT/HR 系统智能问答',
        description: '企业内部 IT/HR 使用手册构建企业领域智能体，企业内部员工可通过该知识库快速解决在 IT/HR 上遇到的问题',
        preview: 'https://img.alicdn.com/imgextra/i1/O1CN01BHtsNp1xmdma5rAPj_!!6000000006486-0-tps-1792-1024.jpg',
    }, {
        name: '电商平台的搜索和问答系统',
        description: '商品信息构建商品数据库，消费者可通过检索+问答的方式快速了解商品的详细信息',
        preview: 'https://img.alicdn.com/imgextra/i1/O1CN01I4Uv1525G8bKfA6Zr_!!6000000007498-0-tps-1792-1024.jpg'
    }, {
        name: '游戏社区自动问答系统',
        description: '游戏的信息（例如游戏介绍，游戏攻略等）构建社区智能体，可根据该知识库自动回复社区成员提供的问题',
        preview: 'https://img.alicdn.com/imgextra/i1/O1CN01SjByFI1eEJOeOxCnQ_!!6000000003839-0-tps-1792-1024.jpg'
    }, {
        name: '智能客户聊天机器人',
        description: '通过与呼叫中心/聊天机器人服务结合，可自动基于企业领域知识智能体就客户提出的问题进行聊天回复',
        preview: 'https://img.alicdn.com/imgextra/i4/O1CN01W1HRn42A7VD46uwG3_!!6000000008156-0-tps-1792-1024.jpg'
    }, {
        name: '智能教育辅导系统',
        description: '使用教材和题库构建不同教育阶段的知识库，模拟和辅助老师/家长对孩子进行教学',
        preview: 'https://img.alicdn.com/imgextra/i3/O1CN0185LQPn1JcwlkTO5NU_!!6000000001050-0-tps-1792-1024.jpg'
    }];
    const rows = _data.map((element: any) => (
        <tr key={element.name}>
            <td>{element.name}</td>
            <td><img src={element.preview} style={{ width: 120, }} /></td>
            <td>{element.description}</td>
        </tr>
    ));
    return (
        <Table>
            <thead>
                <tr>
                    <th style={{ color: '#000' }}>场景</th>
                    <th style={{ color: '#000' }}>场景介绍</th>
                    <th style={{ color: '#000' }}>操作</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
}
