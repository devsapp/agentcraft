import React, { use, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import { Box, Flex, Text, Button, Navbar, NavLink, Menu, createStyles, ActionIcon, Input } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconSettings } from '@tabler/icons-react';
import { useKnowledgeBaseStore, getKnowledgeBase } from 'store/knowledgeBase';
import { useChatBotStore } from 'store/chatBot';
import Conversation from 'components/Conversation';
import styles from './index.module.scss';

type ISessionItem = {
  label: string,
  value: string
}
const enum CHAT_SESSION_STATE {
  LABEL = 'LABEL',
  DELETE = 'DELETE',
  RENAME = 'RENAME'
}
const SessionItem = function ({ data, onChange, onDelete }: { data: ISessionItem, onChange: any, onDelete: any }) {
  const [chatLabelState, setChatLabelState] = useState(CHAT_SESSION_STATE.LABEL);
  const [sessionName, setSessionName] = useState(data.label);
  let renameTimmer: any = null;
  return <>
    {
      chatLabelState === CHAT_SESSION_STATE.LABEL && <Text className={styles['chat-session-name']}>{data.label}</Text>
    }
    {
      chatLabelState === CHAT_SESSION_STATE.RENAME &&
      <Input
        className={styles['chat-session-name']}
        value={sessionName}
        onBlur={(e) => {
          setChatLabelState(CHAT_SESSION_STATE.LABEL);
        }}
        onChange={(e) => {
          const sessionName = e.target.value;
          setSessionName(sessionName);
          renameTimmer && clearTimeout(renameTimmer);
          renameTimmer = setTimeout(() => {
            onChange({ label: sessionName, value: data.value })
          }, 500);
        }} />
    }
    <Menu shadow="md" >
      <Menu.Target>
        <ActionIcon variant="subtle"><IconSettings size="1rem" /></ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label className={styles['rename']} onClick={() => {
          setChatLabelState(CHAT_SESSION_STATE.RENAME)
        }}>重命名</Menu.Label>
        <Menu.Label className={styles['delete']} onClick={() => {
          onDelete(data.value);
        }}>删除</Menu.Label>
      </Menu.Dropdown>
    </Menu>
  </>
}

export function getServerSideProps(context: any) {
  const { params } = context;
  const chatId = params.chatId;
  return {
    props: {
      chatId
    },
  }
}


export default function IndexPage() {
  const router = useRouter();
  const { query } = router;
  const { updateCurrentKnowledgeBase, currentKnowledgeBase } = useKnowledgeBaseStore();
  const chatBotId = query.chatId;
  const { localSessions, setLocalSessions, currentLocalSession, setCurrentLocalSession } = useChatBotStore();
  useEffect(() => {
    if (chatBotId) {
      (async () => {
        const knowledgeBase = await getKnowledgeBase(chatBotId);
        updateCurrentKnowledgeBase(knowledgeBase);
      })()
    }
  }, []);

  return <Flex h={'100vh'} style={{ overflow: 'hidden' }}>
    <Box w="240px" h="100%" style={{ borderRight: '1px solid #ccc', padding: 12 }}>
      <Text
        align="center"
        h={40}
        color="grape"
        size={24}
        style={{ lineHeight: '40px', overflow: 'hidden' }}>{currentKnowledgeBase?.name}</Text>

      <Button
        style={{ width: '100%', marginTop: 24 }}
        onClick={() => {
          const sessionId = `share-${chatBotId}-${nanoid()}`;
          const sessionName = `对话${localSessions.length}`;
          const newSession = {
            label: sessionName,
            value: sessionId
          };
          localSessions.push(newSession);
          setLocalSessions(localSessions);
          setCurrentLocalSession(newSession);
        }}
      >
        新对话
      </Button>
      <div className={styles['chat-session-container']}>
        {localSessions.map((item: ISessionItem) => {
          return <div
            key={item.value}
            className={item.value === currentLocalSession.value ? [styles['chat-session-item'], styles['active']].join(" ") : styles['chat-session-item']}
            onClick={() => {
              setCurrentLocalSession(item);
            }}
          >
            <SessionItem
              data={item}
              onChange={(data: ISessionItem) => {
                localSessions.forEach((item: ISessionItem) => {
                  if (item.value === data.value) {
                    item.label = data.label
                  }
                });
                setLocalSessions(localSessions);
              }}
              onDelete={(value: string) => {
                modals.openConfirmModal({
                  title: '删除',
                  centered: true,
                  children: (
                    <Text size="sm">
                      确定删除该会话？
                    </Text>
                  ),
                  labels: { confirm: '确定', cancel: '取消' },
                  onCancel: () => console.log('Cancel'),
                  confirmProps: { color: 'red' },
                  onConfirm: async () => {
                    const updatedSessions = localSessions.filter((item: ISessionItem) => item.value !== value);
                    setLocalSessions(updatedSessions);
                  },
                });
              }} />
          </div>
        })}
      </div>
    </Box>
    <Box style={{ height: '100%', width: 'calc(100vw - 240px)' }} >
      <Box style={{ margin: '160px auto' }} w={'80%'}>
        <Conversation version='v1' token={currentKnowledgeBase?.token || ''} id={currentKnowledgeBase?.id as number} keyword={currentLocalSession.value} />
      </Box>
    </Box>
  </Flex>
}

