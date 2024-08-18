import React from "react";
import { Paper, Button, Box, Table, TextInput, PasswordInput, Text, Textarea, Divider, Title, Select, Modal, Flex, Space, NumberInput, Stepper, Group } from '@mantine/core';
import { TemplatePropertyDetail } from '@/types/serverless-devs-app';
import { FOUNDATION_MODEL_TEMPLATES } from 'constants/foundation-model';
export default function QuickStart({ form }: any) {
    const fmObj:any = FOUNDATION_MODEL_TEMPLATES[0];
    const fmTemplate: any = fmObj.templateParams;
    function renderFormUi(key: string, field: TemplatePropertyDetail) {
        if (!field.hiddenUI) {
            let FieldComponent = <TextInput withAsterisk label={field.title} placeholder="" {...form.getInputProps(key)} description={<div dangerouslySetInnerHTML={{ __html: field.description }} />} />
            switch (field.type) {
                case 'string':
                    if (field.uiType === 'select') {
                        FieldComponent = <Select
                            withAsterisk={fmTemplate.required.includes(key)}
                            data={field.dataSource}
                            description={<div dangerouslySetInnerHTML={{ __html: field.description }} />}
                            label={field.title}
                            placeholder=""

                            {...form.getInputProps(key)}
                        />
                    }
                    if (field.uiType === 'password') {
                        FieldComponent = <PasswordInput
                            withAsterisk label={field.title} placeholder="" {...form.getInputProps(key)} description={<div dangerouslySetInnerHTML={{ __html: field.description }} />} />
                    }
                    break;
                default:
                    break
            }
            return FieldComponent;
        } else {
            return null;
        }
    }

    return (
        <>
            <Title order={5}>通义千问基础模型设置</Title>
            <Box mx="auto">
                {fmTemplate.properties && Object.keys(fmTemplate?.properties).map((key: string) => {
                    return <div key={key}>{renderFormUi(key, fmTemplate?.properties[key])}</div>
                })}
            </Box>
            <Divider my="sm" />
            <Title order={5}>LLM代理设置</Title>
            <Box mx="auto">
                <TextInput withAsterisk label="LLM代理名称" description="" placeholder=""  {...form.getInputProps('name_alias')} />
                <Textarea label="LLM代理描述" description="" placeholder=""  {...form.getInputProps('description')} />
            </Box>
        </>
    );
}