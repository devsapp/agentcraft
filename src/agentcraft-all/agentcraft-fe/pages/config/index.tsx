import React from 'react';
import Link from 'next/link'
import { Paper, TextInput, PasswordInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { useAuthenticationStore } from '@/store/authentication';




const ConfigPage = () => {
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



    return (
        <div style={{ maxWidth: 400, margin: '200px auto', paddingTop: '2rem' }}>
          
        </div>
    );
};

export default ConfigPage;