import { useState } from 'react';
import { formatDateTime } from 'utils/index';
import { IconPlus } from '@tabler/icons-react'
import { useForm } from '@mantine/form';
import { Flex, Table, Group, Modal, Button, Input, Highlight, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import {
  useLocalWorkspaceStore,
  useWorkspaceStore,
  deleteWorkspace,
  addWorkspace,
  WorkspaceResponseData,
  updateWorkspace,
  getWorkspaceListAndSetCurrent
} from 'store/workspace';

interface ModalProps {
  opened: boolean;
  close: () => void;
}

export default function ({
  opened,
  close,
}: ModalProps) {
  const { workspaceList } = useWorkspaceStore();
  const { currentWorkspace } = useLocalWorkspaceStore();
  const [showAdd, updateShowAdd] = useState(false);
  const [editingItem, setEditingItem] = useState<WorkspaceResponseData | null>(null);

  const form = useForm<WorkspaceResponseData>({
    initialValues: {} as WorkspaceResponseData,
    validate: {
      name: (value) => !value ? '请输入名称' : undefined,
      description: (value) => !value ? '请输入描述' : undefined,
    },
  });

  const onEditsSubmit = async () => {
    const { hasErrors } = form.validate();
    if (hasErrors) {
      return;
    }

    const { id, name, description } = form.values;
    let status;
    if (id) {
      status = await updateWorkspace(id, { name, description });
    } else {
      status = await addWorkspace({ name, description });
    }
    if (status) {
      form.reset();
      updateShowAdd(false);
      setEditingItem(null);
      getWorkspaceListAndSetCurrent();
    }
  };

  const onCancelEdits = () => {
    setEditingItem(null);
    updateShowAdd(false);
    form.reset();
  };

  const onDelete = async (item: any) => {
    const { name, id } = item
    const deleteContent = `确定删除 ${name} 工作空间? 删除后不可恢复`;
    modals.openConfirmModal({
      title: '删除工作空间',
      centered: true,
      children: (
        <Text size="sm">
          <Highlight highlight={name}>{deleteContent}</Highlight>
        </Text>
      ),
      labels: { confirm: '确定', cancel: '取消' },
      onCancel: () => console.log('Cancel'),
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        await deleteWorkspace(id);
        getWorkspaceListAndSetCurrent();
      },
    });

  };

  const onEdit = (values: WorkspaceResponseData) => {
    setEditingItem(values);
    form.setValues(values);
  }

  return (
    <Modal opened={opened} onClose={close} fullScreen title="工作空间管理">
      <Flex>
        <Button
          disabled={showAdd || !!editingItem}
          leftIcon={<IconPlus size="1rem" />}
          onClick={() => updateShowAdd(true)}
        >新建</Button>
        {showAdd && (
          <Group style={{ marginLeft: 8 }}>
            <Input placeholder='请输入名称' size="xs" {...form.getInputProps('name')} />
            <Input placeholder='请输入描述' size="xs" {...form.getInputProps('description')} />
            <Button onClick={onEditsSubmit} size="xs">
              提交
            </Button>
            <Button variant="outline" size="xs" onClick={onCancelEdits} color='red'>
              取消
            </Button>
          </Group>
        )}
      </Flex>
      <Table striped>
        <thead>
          <tr>
            <th>编号</th>
            <th>名称</th>
            <th>描述</th>
            <th>创建时间</th>
            <th>修改时间</th>
            <th style={{ paddingLeft: 28 }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {workspaceList.map((item) => {
            if (item.id === editingItem?.id) {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td style={{ width: 200 }}><Input size="xs" {...form.getInputProps('name')} /></td>
                  <td style={{ width: 400 }}><Input size="xs" {...form.getInputProps('description')} /></td>
                  <td>{formatDateTime(item.created)}</td>
                  <td>{formatDateTime(item.modified)}</td>
                  <td>
                    <Group>
                      <Button variant="subtle" onClick={onEditsSubmit}>
                        提交
                      </Button>
                      <Button variant="subtle" onClick={onCancelEdits} color='red'>
                        取消
                      </Button>
                    </Group>
                  </td>
                </tr>
              )
            }
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td style={{ width: 200 }}>{item.name}</td>
                <td style={{ width: 400 }}>{item.description}</td>
                <td>{formatDateTime(item.created)}</td>
                <td>{formatDateTime(item.modified)}</td>
                <td>
                  <Group>
                    <Button disabled={!!editingItem || showAdd} variant="subtle" onClick={() => onEdit(item)}>
                      编辑
                    </Button>
                    <Button
                      disabled={!!editingItem || currentWorkspace === item.id}
                      onClick={() => onDelete(item)}
                      variant="subtle"
                      color='red'
                    >
                      删除
                    </Button>
                  </Group>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Modal>
  )
}