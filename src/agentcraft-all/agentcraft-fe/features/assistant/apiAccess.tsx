import React, { useEffect } from "react";
import { Button, Box, Text, Group, Divider, Title, Paper, Flex, Tooltip } from '@mantine/core';
import { useAssistantStore, getAccessUrl } from 'store/assistant';
import CopyToClipboard from 'components/CopyToClipboard';
import MarkdownContent from "components/MarkdownContent";

export function APIAccess() {
    const currentAssistant = useAssistantStore().currentAssistant;
    const accessUrl = useAssistantStore().accessUrl;
    const setAccessUrl = useAssistantStore().setAccessUrl;
    useEffect(() => {
        (async () => {
            const result = await getAccessUrl();
            const data = result.data || { openApiUrl: '', innerApiUrl: '' }
            setAccessUrl(data);
        })()

    }, [])
    const curlExample = `curl -X 'POST' \
    '${accessUrl.openApiUrl}/v2/chat/completions' \
    -H 'accept: application/json' \
    -H 'Authorization: Bearer ${currentAssistant?.token}' \
    -H 'Content-Type: application/json' \
    -d '{
      "messages":[
          {
              "role": "user",
              "content": "请问世界最高峰是什么？"
          }
      ],
      "stream": false,
      "max_tokens": 1024
  }'`
    return <Flex style={{ width: '100%' }} pt={32}>

        <Paper shadow="xs" withBorder w={'70%'}>

            <Title order={5} size="h5" p={16}>API访问</Title>
            <Divider my="sm" mt={0} mb={0} />
            <Box p={16} >
                <Box>
                    <span><Text color="cyan" weight={700}>公网API访问地址：</Text><CopyToClipboard value={accessUrl.openApiUrl} content={accessUrl.openApiUrl} /> </span>
                    <span></span>
                </Box>
                <Box>
                    <span style={{ wordBreak: 'break-all' }}><Text color="cyan" weight={700}>API访问token：</Text><CopyToClipboard value={currentAssistant?.token} content={currentAssistant?.token} /></span>
                    <span></span>
                </Box>
                <Box>
                    <span style={{ wordBreak: 'break-all' }}><Text color="cyan" weight={700}>API文档访问：</Text><a href={`${accessUrl.openApiUrl}/docs`} target="_blank">{`${accessUrl.openApiUrl}/docs`}</a></span>
                    <span></span>
                </Box>
            </Box>
            <Divider my="sm" />
            <Box p={16}>
            <Title order={5} size="h5">API调用示例</Title>
            <div style={{ width: '95%', overflow: 'hidden', margin: '0 auto' }} >
                <MarkdownContent textContent={`\`\`\`shell\n${curlExample}`} value={curlExample} />
            </div>
            </Box>
        </Paper>
    </Flex>
}





