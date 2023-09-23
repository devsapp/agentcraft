import React, { useEffect } from "react";
import { Breadcrumbs, Anchor, Button, Box, Table } from '@mantine/core';
import { getModelList, useGlobalStore, ModelResponseData } from '@/store/model';
// import styles from './index.module.scss';
import { formatDateTime } from '@/util/index'
const items = [
    { title: '模型管理', href: '#' },
    { title: '模型列表', href: '#' },
].map((item, index) => (
    <Anchor href={item.href} key={index}>
        {item.title}
    </Anchor>
));



function List() {
    const modelList: ModelResponseData[] = useGlobalStore().modelList;
    const rows = modelList.map((element: ModelResponseData) => (
        <tr key={element.id}>
            <td>{element.id}</td>
            <td>{element.name}</td>
            <td>{element.name_alias}</td>
            <td>{element.description}</td>
            <td>{element.url}</td>
            <td>{element.token}</td>
            <td>{formatDateTime(element.created)}</td>
            <td>{formatDateTime(element.modified)}</td>
        </tr>
    ));
    useEffect(() => {
        getModelList();
    }, []);

    return (
        <>
            <Box mt={12} >
                <Button>
                    新建模型服务
                </Button>
            </Box>
            <Table striped withBorder withColumnBorders mt={12}  >
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>名称</th>
                        <th>别名</th>
                        <th>描述</th>
                        <th>访问地址</th>
                        <th>访问token</th>
                        <th>创建时间</th>
                        <th>修改时间</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
    );
}


export function Model() {

    return (
        <>
            <Breadcrumbs>{items}</Breadcrumbs>
            <List />
        </>

    );
}
