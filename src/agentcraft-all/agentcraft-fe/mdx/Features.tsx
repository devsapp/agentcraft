import React from "react";

import { Table, Button } from '@mantine/core';





export default function Features({ data, userResponseWithUI }: any) {

    const _data = data ? data : [{
        name: '基础模型',
        preview: 'https://img.alicdn.com/imgextra/i1/O1CN01dVgqTD1sMT4RyDXZn_!!6000000005752-0-tps-1024-1024.jpg',
        description: '可以一键部署千问，Chatglm, llama2等模型，并且提供api服务'
    }, {
        name: '数据集',
        description: '支持泛化的文档数据集可以精准问答数据集，支持pdf,html,md等多类型文件，支持单条数据编辑',
        preview: 'https://img.alicdn.com/imgextra/i1/O1CN0136SRFY209ev5A8WvP_!!6000000006807-0-tps-1024-1024.jpg',
    }, {
        name: '智能体编排',
        description: '包括提示词，模型，数据集，LLM调用参数等编排，以及工具能力编排（开发中）',
        preview: 'https://img.alicdn.com/imgextra/i2/O1CN010KZtjI1SVSpynpmfm_!!6000000002252-0-tps-1024-1024.jpg'
    }, {
        name: '生成式UI',
        description: '支持图片，文本，视频，以及自定义UI的输出',
        preview: 'https://img.alicdn.com/imgextra/i2/O1CN01kyU7F11ZM1zf2b4jK_!!6000000003179-0-tps-1024-1024.jpg'
    }, {
        name: '客户端交付',
        description: '支持独立站点web交付，支持接入钉钉机器人等客户端应用，也可以通过微服务网关进行APi交付，交付过程为一引导式的一站式部署',
        preview: 'https://img.alicdn.com/imgextra/i1/O1CN01m5gFMl1HrwVPJkSXQ_!!6000000000812-0-tps-1024-1024.jpg'
    }, {
        name: '工具集能力',
        description: '工具能力是Agent感知与连接世界的重要能力，AgentCraft支持在线工具编写，发布管理（开发中）',
        preview: 'https://img.alicdn.com/imgextra/i1/O1CN01yAOhLG1i36A8vp4fQ_!!6000000004356-0-tps-1024-1024.jpg'
    }];
    const rows = _data.map((element: any) => (
        <tr key={element.name}>
            <td>{element.name}</td>
            <td><img src={element.preview} style={{ width: 120,  overflow: 'hidden' }} /></td>
            <td>{element.description}</td>
            <td>
                <Button onClick={() => {
                    console.log(userResponseWithUI)
                    if (userResponseWithUI) {
                        userResponseWithUI(`请详细介绍一下${element.name}`)
                    }

                }}>介绍特色</Button>
            </td>
        </tr>
    ));
    return (
        <Table>
            <thead>
                <tr>
                    <th style={{ color: '#000' }}>特色名</th>
                    <th style={{ color: '#000' }}>预览图</th>
                    <th style={{ color: '#000' }}>特色说明</th>
                    <th style={{ color: '#000' }}>操作</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
}
