import React from "react";
import { Box, TextInput, Group, Select, Textarea,  Paper, Title } from '@mantine/core';
import { INSTRUCTION_TEMPLATES, DEFAULT_CHAT_INSTRUCTION } from 'constants/instructions'

export function InstructionLLMForm({ form }: { form: any }) {
    return <>
        <Paper shadow="xs" p="md" withBorder mt={12}>
            <Title order={5} size="h5">调试指令</Title>
            <Box pl={4} pr={4} >
                <Select
                    data={INSTRUCTION_TEMPLATES}
                    description=""
                    defaultValue={DEFAULT_CHAT_INSTRUCTION}
                    {...form.getInputProps('system_message')}
                    label="指令示例"
                    placeholder=""
                    onChange={(value: string) => {
                        form.setValues({
                            system_message: value
                        })
                    }}
                />
                <Textarea label="系统指令" placeholder="输入系统指令" {...form.getInputProps('system_message')} minRows={12} description="系统提示词可以作为对大语言模型的约束指令" />
                {/* <TextInput label="停止提示词" placeholder="停止输出的token" {...form.getInputProps('stop')} /> */}
            </Box>
        </Paper>
        <Paper shadow="xs" p="md" withBorder mt={12}>
            <Title order={5} size="h5">LLM参数</Title>
            <Box pl={4} pr={4} mt={4}>
                <Group grow>
                    <TextInput withAsterisk label="temperature" placeholder="" description="采样温度，用于控制模型生成文本的多样性。temperature越高，生成的文本更多样，反之，生成的文本更确定。取值范围： [0, 2)" {...form.getInputProps('temperature')} />
                    <TextInput withAsterisk label="top_p" placeholder="" description="核采样的概率阈值，用于控制模型生成文本的多样性。top_p越高，生成的文本更多样。反之，生成的文本更确定。取值范围：（0,1.0]" {...form.getInputProps('top_p')} />
                </Group>
                <Group grow>
                    <TextInput withAsterisk label="n_sequences" placeholder="" description="" {...form.getInputProps('n_sequences')} />
                    <TextInput withAsterisk label="max_tokens" placeholder="" description="允许模型生成的最大Token数。" {...form.getInputProps('max_tokens')} />
                </Group>
                <Group grow>
                    <TextInput withAsterisk label="presence_penalty" placeholder="控制模型生成文本时的内容重复度。值范围：[-2.0, 2.0]。正数会减少重复度，负数会增加重复度。适用场景：较高的presence_penalty适用于要求多样性、趣味性或创造性的场景，如创意写作或头脑风暴。较低的presence_penalty适用于要求一致性或专业术语的场景，如技术文档或其他正式文档。" description="" {...form.getInputProps('presence_penalty')} />
                    <TextInput withAsterisk label="frequency_penalty" placeholder="" description="" {...form.getInputProps('frequency_penalty')} />
                </Group>
                <TextInput label="logit_bias" placeholder="" {...form.getInputProps('logit_bias')} width={'50%'} />
            </Box>
        </Paper>
    </>
}

// export function InstructionChatForm({ form, modelSelectData }: any) {
//     return <Box>
//         <Paper shadow="xs" p="md" withBorder mt={12}>
//             <Title order={5} size="h5">问答信息</Title>
//             <Box pl={4} pr={4} >
//                 <TextInput withAsterisk label="名称" placeholder="输入问答名称" {...form.getInputProps('name')} />
//                 <Textarea label="描述" placeholder="输入应用描述" description="请输入问答的描述信息" {...form.getInputProps('description')} />
//             </Box>
//         </Paper>
//         <Paper shadow="xs" p="md" withBorder mt={12}>

//             <Flex justify={'space-between'} align={'center'} mb={4} >
//                 <Title order={5} size="h5">LLM代理</Title>
//                 <IconRefresh cursor={'pointer'} onClick={getModelList} />
//             </Flex>
//             <Box pl={4} pr={4} >
//                 <Select
//                     data={modelSelectData}
//                     description=""
//                     {...form.getInputProps('model_id')}
//                     label="模型"
//                     placeholder=""
//                 />
//             </Box>
//         </Paper>
//         <InstructionLLMForm form={form} />

//     </Box>
// }


