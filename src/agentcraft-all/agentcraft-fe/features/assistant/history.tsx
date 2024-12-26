import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import { Button, Box, Table, LoadingOverlay, Spoiler } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { getHistory, useAssistantChatStore } from "@/store/assistant_chat";
import { formatDateTime } from 'utils/index';
import CopyToClipboard from 'components/CopyToClipboard';

const CopyNode = ({ value }: { value?: string }) => {
  if (value) {
    return (
      <CopyToClipboard
        value={value}
        content={(
          <Spoiler maxHeight={80} showLabel="显示更多" hideLabel="隐藏">
            {value}
          </Spoiler>
        )}
      />
    )
  }

  return <></>
}

export function History() {
  const { query } = useRouter();
  const assistantId = Number(query.assistantId);
  const { history, loading } = useAssistantChatStore();

  useEffect(() => {
    getHistory(assistantId);
  }, [assistantId])
  return (
    <Box pos="relative" pb={64}>
      <Box mt={4} style={{ textAlign: 'right' }}>
        <Button
          leftIcon={<IconRefresh />}
          onClick={() => getHistory(assistantId)}
          h={32}
        >
          刷新
        </Button>
      </Box>
      <LoadingOverlay visible={loading} overlayOpacity={0.3} />
      <Table striped withBorder withColumnBorders mt={12}  >
        <thead>
          <tr>
            <th>编号</th>
            <th>问题</th>
            <th>答案</th>
            {/* <th>完整提示词</th> */}
            <th>访问IP</th>
            <th>使用模型</th>
            <th>问答创建时间</th>
            <th>输入Token</th>
            <th>输出Token</th>
          </tr>
        </thead>
        <tbody>
          {history.map((element: any) => (
            <tr key={element.id}>
              <td>{element.id}</td>
              <td style={{ width: 210 }}><CopyNode value={element.question} /></td>
              <td style={{ maxWidth: 210 }}><CopyNode value={element.answer} /></td>
              {/* <td style={{ width: 120 }}><CopyNode value={element.prompt} /></td> */}
              <td>{element.ip}</td>
              <td style={{ width: 160 }}>{element.model_name}</td>
              <td style={{ width: 120 }}>{formatDateTime(element.created)}</td>
              <td style={{ width: 80 }}>{element.prompt_tokens || '-'}</td>
              <td style={{ width: 80 }}>{element.completion_tokens || '-'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box >
  )
}