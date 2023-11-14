import React from 'react';
import Link from 'next/link'
import { Paper, TextInput, PasswordInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { login, useAuthenticationStore } from '@/store/authentication';
const LoginPage = () => {
    const router = useRouter();
    const setToken = useAuthenticationStore().setToken;
    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },

        validate: {

        },
    });

    const handleSubmit = async () => {
        form.validate();
        const { username, password } = form.values;
        const data = await login(username, password);
        if (data.access_token) {
            setToken(data.access_token);
            router.push('/');
        }

    };

    return (
        <div style={{ maxWidth: 400, margin: '200px auto', paddingTop: '2rem' }}>
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