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
