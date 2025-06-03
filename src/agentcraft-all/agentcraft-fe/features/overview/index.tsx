import React, { useEffect } from "react";
import Link from 'next/link'
import { Paper, Text, Title, Button, Card, Flex, Box, Anchor, Group, Badge } from '@mantine/core';
import { QuickStart } from "features/overview/quickStart";
import { List as AgentList } from 'features/agent/index';
import { ExplorePage } from "features/explore";
import { useQuickStartStore } from "store/quickStart";
import { useKnowledgeBaseStore, getAccessUrl } from 'store/knowledgeBase';
import { useAssistantStore } from 'store/assistant';
import { useLocalWorkspaceStore } from 'store/workspace';
import { getModelList, useModelStore } from 'store/model';
import { getDataSetList, useDataSetStore } from 'store/dataset';
import { DataSet } from 'types/dataset';
import { Model } from 'types/model';
export function OverView() {
    const { autoQuickStart, setAutoQuickStart } = useQuickStartStore();
    const { currentWorkspace } = useLocalWorkspaceStore();
    const { knowledgeBaseList } = useKnowledgeBaseStore();
    const modelList: Model[] = useModelStore().modelList;
    const { assistantList } = useAssistantStore();
    const dataSetList: DataSet[] = useDataSetStore().dataSetList;
    const accessUrl = useKnowledgeBaseStore().accessUrl;
    const setAccessUrl = useKnowledgeBaseStore().setAccessUrl;
    useEffect(() => {
        getDataSetList();
        getModelList();
        (async () => {
            const result = await getAccessUrl();
            const data = result.data || { openApiUrl: '', innerApiUrl: '' }
            setAccessUrl(data);
        })()
    }, []);
    return (
        <>
            {autoQuickStart && <Paper shadow="xs" p="xl" mt={24} >
                <QuickStart workspaceId={currentWorkspace} />
            </Paper>}
            {!autoQuickStart &&
                <ExplorePage />
            }
        </>
    );
}
