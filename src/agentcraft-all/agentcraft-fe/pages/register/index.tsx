import React from 'react';
import Link from 'next/link'
import { Paper, Col, TextInput, PasswordInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { register } from '@/store/authentication';
const LoginPage = () => {
    const router = useRouter();

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
        const data = await register(username, password);
        router.push('/login');
    };

    return (
        <div style={{ maxWidth: 400, margin: '200px auto', paddingTop: '2rem' }}>
            <Paper shadow="xs">
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
                        required
                        {...form.getInputProps('password')}
                    />
                    <Button
                        color="blue"
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