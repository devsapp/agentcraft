import React, { use, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import { Box, Flex, Text, Button, Navbar, NavLink, Menu, createStyles, ActionIcon, Input } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconSettings } from '@tabler/icons-react';
import { useKnowledgeBaseStore,  getKnowledgeBase } from 'store/knowledgeBase';

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

export const createDynamicSessionData = (prefix: string, workspaceId: string, chatBotId: string) => {
  const sessionId = `${prefix}${nanoid()}`;
  return {
    value: sessionId,
    label: `对话`,
  };
};

function filterSessionList(sessionList: ISessionItem[], prefix: string) {
  if (sessionList && sessionList.length > 0)
    return sessionList.filter((item: ISessionItem) => item.value.includes(prefix));
  return [];
}

function filterCurrentLocalSession(currentLocalSessions: ISessionItem[], prefix: string) {
  if (currentLocalSessions.length > 0) {
    return currentLocalSessions.filter((item: ISessionItem) => item.value.includes(prefix));
  }
  return [];
}

export default function IndexPage() {
  const router = useRouter();
  const { query } = router;
  const { updateCurrentKnowledgeBase, currentKnowledgeBase } = useKnowledgeBaseStore();
  const { chatId: chatBotId, workspaceId, shareToken } = query;
  const prefix = `chat-bot-${workspaceId}-${chatBotId}-`
  const { localSessions, setLocalSessions, currentLocalSessions, setCurrentLocalSessions } = useChatBotStore();

  useEffect(() => {
    if (chatBotId) {
      (async () => {
        const knowledgeBase = await getKnowledgeBase(chatBotId, shareToken as string);
        updateCurrentKnowledgeBase(knowledgeBase);
      })()
    }

  }, []);
  useEffect(() => {
    const filteredSessions = filterSessionList(localSessions, prefix);
    const filteredCurrentSessions = filterCurrentLocalSession(currentLocalSessions, prefix);
    if (workspaceId && chatBotId && filteredSessions.length === 0 && filteredCurrentSessions.length === 0) {
      const dynamicSessionData = createDynamicSessionData(prefix, workspaceId as string, chatBotId as string);
      localSessions.push(dynamicSessionData);
      currentLocalSessions.push(dynamicSessionData);
      setLocalSessions(localSessions);
      setCurrentLocalSessions(currentLocalSessions);
    }
  }, [])
  const currentLocation: any = filterCurrentLocalSession(currentLocalSessions, prefix)[0] || {};
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
          const sessionId = `${prefix}${nanoid()}`;
          const _localSessions = filterSessionList(localSessions, prefix);

          const sessionName = `对话${_localSessions.length}`;
          const newSession = {
            label: sessionName,
            value: sessionId
          };
          localSessions.push(newSession);
          const newLocalSessions = localSessions;
          const newCurrentLocalSessions = currentLocalSessions.map((_item: ISessionItem) => {
            if (_item.value.indexOf(prefix) !== -1) {
              _item = newSession;
            }
            return _item;
          });
          setLocalSessions(newLocalSessions);
          setCurrentLocalSessions(newCurrentLocalSessions);
        }}
      >
        新对话
      </Button>
      <div className={styles['chat-session-container']}>
        {filterSessionList(localSessions, prefix).map((item: ISessionItem) => {
          return <div
            key={item.value}
            className={item.value === currentLocation.value ? [styles['chat-session-item'], styles['active']].join(" ") : styles['chat-session-item']}
            onClick={() => {

              const newCurrentLocalSessions = currentLocalSessions.map((_item: ISessionItem) => {
                if (_item.value.indexOf(prefix) !== -1) {
                  _item = item;
                }
                return _item;
              });
              setCurrentLocalSessions(newCurrentLocalSessions);
            }}
          >
            <SessionItem
              data={item}
              onChange={(data: ISessionItem) => {
                const newCurrentLocalSessions = currentLocalSessions.map((_item: ISessionItem) => {
                  if (_item.value.indexOf(prefix) !== -1) {
                    _item = data;
                  }
                  return _item;
                });
                const newlocalSessions = localSessions.map((item: ISessionItem) => {
                  if (item.value === data.value) {
                    item = data;
                  }
                  return item;
                })
                setCurrentLocalSessions(newCurrentLocalSessions);
                setLocalSessions(newlocalSessions);
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
      <Box style={{ margin: '120px auto', height: '100%' }} w={'80%'}>
        <Conversation 
            version='v1' 
            token={currentKnowledgeBase?.token || ''} 
            shareToken={shareToken as string}
            id={currentKnowledgeBase?.id as number} 
            keyword={currentLocation.value} />
      </Box>
    </Box>
  </Flex>
}

