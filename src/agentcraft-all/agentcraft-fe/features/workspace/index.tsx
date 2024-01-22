import React, { useEffect } from "react";
import Link from 'next/link'
import { Select, Button, Box, Table, Modal, TextInput, Text, Highlight, LoadingOverlay, Textarea } from '@mantine/core';
import { PageProps } from 'types/page';
import { useLocalWorkspaceStore } from 'store/workspace';
import styles from './index.module.scss';


// interface AppForm {
//     name: string,
//     description: string
// }



// function List() {
//     const workspaceList: ApplicationResponseData[] = useWorkspaceStore().workspaceList;
//     const loading = useWorkspaceStore().loading;
//     const setLoading = useWorkspaceStore().setLoading;
//     const removeApplication = (workspace: ApplicationResponseData) => {
//         const { id, name } = workspace;
//         const deleteContent = `确定删除 ${name}?`;
//         modals.openConfirmModal({
//             title: '删除应用',
//             centered: true,
//             children: (
//                 <Text size="sm">
//                     <Highlight highlight={name}>{deleteContent}</Highlight>
//                 </Text>
//             ),
//             labels: { confirm: '确定', cancel: '取消' },
//             onCancel: () => console.log('Cancel'),
//             confirmProps: { color: 'red' },
//             onConfirm: async () => {
//                 setLoading(true);
//                 await deleteApplication(id);
//                 await getApplications();
//                 setLoading(false);
//             },
//         });

//     }

//     const getApp = async () => {
//         setLoading(true);
//         await getApplications();
//         setLoading(false);
//     }

//     const rows = workspaceList.map((element: ApplicationResponseData) => (
//         <tr key={element.id}>
//             <td>{element.id}</td>
//             <td><Link href={`/workspace/${element.id}/knowledgeBase`}>{element.name}</Link></td>
//             <td>{element.description}</td>
//             <td>{formatDateTime(element.created)}</td>
//             <td>{formatDateTime(element.modified)}</td>
//             <td> <Button variant="filled" color="red" size="xs" onClick={() => removeApplication(element)}>删除</Button></td>
//         </tr>
//     ));

//     useEffect(() => {
//         getApp();
//     }, []);


//     return (
//         <Box pos="relative" >
//             <LoadingOverlay visible={loading} overlayOpacity={0.3} />
//             <Table striped withBorder withColumnBorders mt={12}  >
//                 <thead>
//                     <tr>
//                         <th>应用id</th>
//                         <th>应用名</th>
//                         <th>应用描述</th>
//                         <th>创建时间</th>
//                         <th>修改时间</th>
//                         <th>操作</th>
//                     </tr>
//                 </thead>
//                 <tbody>{rows}</tbody>
//             </Table>
//         </Box>
//     );
// }

// function Add() {
//     const open = useWorkspaceStore().open;
//     const setOpen = useWorkspaceStore().setOpen;
//     const setLoading = useWorkspaceStore().setLoading;
//     const form = useForm({
//         initialValues: {
//             name: '',
//             description: ''
//         },
//         validate: {
//             name: (value) => (!value ? '应用名必填' : null)
//         },
//     });
//     return (
//         <Modal opened={open} onClose={() => { setOpen(false) }} title="创建应用" centered>
//             <Box maw={FORM_WIDTH} mx="auto">
//                 <TextInput withAsterisk label="名称" placeholder="输入应用名" {...form.getInputProps('name')} />
//                 <Textarea label="描述" placeholder="输入应用描述" {...form.getInputProps('description')} />
//             </Box>
//             <Box maw={FORM_WIDTH} mx="auto" pt={12} style={{ textAlign: 'right' }}>
//                 <Button onClick={async () => {
//                     form.validate();
//                     if (form.isValid()) {
//                         setLoading(true);
//                         const workspaceData: AppForm = form?.values || {};
//                         await addApplication(workspaceData);
//                         await getApplications();
//                         setOpen(false);
//                         setLoading(false);
//                     }

//                 }}>确认</Button>
//             </Box>
//         </Modal>
//     );
// }



export function WorkSpace(props: PageProps & { parentPath: any }) {
    const { workspaceList, workspaceId, parentPath } = props;
    const { setCurrentWorkspace } = useLocalWorkspaceStore();
    return (
        <>
            <Text className={styles.title}>
                {parentPath ? 'AC' : 'AgentCraft'}
            </Text>
            {parentPath ? <Box mt={12} className={styles['workspace-short']}>
                {workspaceList[0]?.name?.substring(0, 1)}
            </Box> : <Box mt={12} className={styles.workspace}>
                <Text className={styles['workspace-namespace-title']}>
                    工作空间
                </Text>
                <Select
                    className={styles['workspace-list']}
                    mt={-2}
                    size={'xs'}
                    variant={'unstyled'}
                    value={workspaceId}
                    data={workspaceList.map((item: any) => {
                        return {
                            label: item.name,
                            value: item.id
                        }
                    })}
                    onChange={(value: any) => {
                        console.log(value);
                        setCurrentWorkspace(value);
                    }
                    }
                />
            </Box>}

            {/* <Add /> */}
        </>

    );
}
