import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import { Breadcrumbs, Anchor, Button, Box, Table } from '@mantine/core';
import { getDatasourceList, useGlobalStore, DatasourceResponseData } from '@/store/datasource';
// import styles from './index.module.scss';
import { formatDateTime } from '@/util/index'


interface DatasourceProps {
    datasetId: number;
}

function List({ datasetId }: DatasourceProps) {
    const datasourceList: DatasourceResponseData[] = useGlobalStore().datasourceList;
    const rows = datasourceList.map((element: DatasourceResponseData) => (
        <tr key={element.id}>
            <td>{element.id}</td>
            <td>{element.title}</td>
            <td>{element.url}</td>
            <td>{element.doc_chunk}</td>
            <td>{element.token_size}</td>
            <td>{formatDateTime(element.created)}</td>
            <td>{formatDateTime(element.modified)}</td>
        </tr>
    ));
    useEffect(() => {
        getDatasourceList(datasetId, 2);
    }, []);

    return (
        <>
            <Box mt={12} >
                <Button>
                    新建数据源
                </Button>
            </Box>
            <Table striped withBorder withColumnBorders mt={12}  >
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>标题</th>
                        <th>源访问地址</th>
                        <th>文档内容</th>
                        <th>切片大小</th>
                        <th>创建时间</th>
                        <th>修改时间</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
    );
}


export function Datasource({ datasetId }: DatasourceProps) {


    const items = [
        { title: '数据集管理', href: '/dataset' },
        { title: '数据源列表', href: `/dataset/${datasetId}/datasource` },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));
    return (
        <>
            <Breadcrumbs>{items}</Breadcrumbs>
            <List datasetId={datasetId} />
        </>

    );
}
