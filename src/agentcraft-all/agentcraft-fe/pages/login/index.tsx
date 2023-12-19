import React, { useState } from 'react';
import Link from 'next/link'
import { Paper, Col, TextInput, PasswordInput, Button, LoadingOverlay, Flex, Loader } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { HTTP_STATUS } from 'types/httpStatus';
import { login, useAuthenticationStore } from '@/store/authentication';
import { notifications } from '@mantine/notifications';

const LoginPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const setToken = useAuthenticationStore().setToken;
    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },
        validate: {
            username: (value) => !value ? '用户名必填' : null,
            password: (value) => !value ? '密码必填' : null,
        },
    });

    const handleSubmit = async () => {
        form.validate();
        if(form.isValid()) {


             try {
                setLoading(true)
                const { username, password } = form.values;
                const result:any = await login(username, password);
                if (result.code && result.code === HTTP_STATUS.UNAUTHORIZED) {
                    notifications.show({
                        title: '登录失败',
                        message: '请检查账号密码是否正确',
                        color: 'read',
                    });
                   
                } else {
                    if (result.access_token) {
                        setToken(result.access_token);
                        notifications.show({
                            title: '登录成功',
                            message: '登录成功，即将前往主页',
                            color: 'green',
                        });
                        router.push('/');
                    }
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
            <Paper shadow="xs">
                <div style={{ textAlign: 'center', width: '100%' }}> <Link href="/register">前往注册</Link></div>

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
                        required
                        {...form.getInputProps('password')}
                    />
                    <Button
                        color="blue"
                        fullWidth
                        style={{ marginTop: '1rem' }}
                        onClick={() => { handleSubmit() }}
                    >
                        登录
                    </Button>
                </form>
            </Paper>
        </div>
    );
};

export default LoginPage;