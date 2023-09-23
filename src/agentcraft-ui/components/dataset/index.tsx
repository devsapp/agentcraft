import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link'
import { Breadcrumbs, Anchor, Button, Box, Table } from '@mantine/core';
import { getDatasetList, useGlobalStore, DatasetResponseData } from '@/store/dataset';
// import styles from './index.module.scss';
import { formatDateTime } from '@/util/index'


function List() {

    const modelList: DatasetResponseData[] = useGlobalStore().datasetList;
    const rows = modelList.map((element: DatasetResponseData) => (
        <tr key={element.id}>
            <td>{element.id}</td>
            <td><Link href={`/dataset/${element.id}/datasource`}>{element.name}</Link></td>
            <td>{element.dataset_type === 2 ? '文档数据集' : '问答数据集'}</td>
            <td>{element.description}</td>

            <td>{formatDateTime(element.created)}</td>
            <td>{formatDateTime(element.modified)}</td>
        </tr>
    ));
    useEffect(() => {
        getDatasetList();
    }, []);

    return (
        <>
            <Box mt={12} >
                <Button>
                    新建数据集
                </Button>
            </Box>
            <Table striped withBorder withColumnBorders mt={12}  >
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>名称</th>
                        <th>描述</th>
                        <th>类型</th>
                        <th>创建时间</th>
                        <th>修改时间</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
    );
}


export function Dataset() {

    const items = [
        { title: '数据集管理', href: '#' },
        { title: '数据集列表', href: '#' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <>
            <Breadcrumbs>{items}</Breadcrumbs>
            <List />
        </>

    );
}
