import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'
import { Paper, TextInput, PasswordInput, Button, LoadingOverlay, Flex, Loader } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { DEFAULT_WORKSPACE_NAME, DEFAULT_WORKSPACE_DESCRIPTION } from 'constants/workspace';
// import { HTTP_STATUS } from 'types/httpStatus';
import { register } from 'store/authentication';
import { addWorkspace } from 'store/workspace';


const LoginPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },
        validate: {
            username: (value) => !value ? '用户名必填' : null,
            password: (value) => (!value || value.length < 8) ? '密码不合规' : null,
        },
    });

    const handleSubmit = async () => {
        form.validate();
        if (form.isValid()) {
            try {
                setLoading(true)
                const { username, password } = form.values;
                const result = await register(username, password);
                if (result.success) {
                    await addWorkspace({
                        name: DEFAULT_WORKSPACE_NAME,
                        description: DEFAULT_WORKSPACE_DESCRIPTION,
                    });
                    notifications.show({
                        title: '注册成功',
                        message: '您已成功注册账号，正在进行跳转登录',
                        color: 'green',
                    });
                    setTimeout(() => {
                        router.push('/');
                    }, 1000)

                } else {
                    notifications.show({
                        title: '注册失败',
                        message: '账号已存在',
                        color: 'red',
                    });
                }
            } catch (e) {
            }
            setLoading(false);
        }

    };

    return (
        <div style={{ maxWidth: 400, margin: '200px auto', paddingTop: '2rem' }}>
            <LoadingOverlay
                loader={<Flex align={'center'} direction="column"><Flex align={'center'} ><Loader variant="bars" color={'pink'} ml={12} /></Flex></Flex>}
                overlayOpacity={0.3}
                overlayColor="#c5c5c5"
                visible={loading}
            />
            <Paper shadow="xs" p={24}>
                <div style={{ textAlign: 'center', width: '100%' }}> <Link href="/login">已有账号？前往登录</Link></div>

                <form >
                    <TextInput
                        label="用户名"
                        placeholder="请输入用户名"
                        required
                        {...form.getInputProps('username')}
                    />
                    <PasswordInput
                        label="密码"
                        placeholder="请输入密码"
                        description="密码长度至少8位"
                        required
                        {...form.getInputProps('password')}
                    />
                    <Button
                        fullWidth
                        style={{ marginTop: '1rem' }}
                        onClick={() => { handleSubmit() }}
                    >
                        注册
                    </Button>
                </form>
            </Paper>
        </div>
    );
};

export default LoginPage;