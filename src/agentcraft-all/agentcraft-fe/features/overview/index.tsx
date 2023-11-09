import React from "react";
import { Paper, Text, Title, Button } from '@mantine/core';
import { QuickStart } from "features/overview/quickStart";
import { useQuickStartStore } from "store/quickStart";
export function OverView() {
    const { autoQuickStart, setAutoQuickStart } = useQuickStartStore();

    return (
        <>
            {autoQuickStart && <Paper shadow="xs" p="xl" >
                <QuickStart />
            </Paper>}
            {!autoQuickStart &&
                <div>
                    <Button compact variant="subtle" onClick={() => setAutoQuickStart(true)} mb={12}>打开快速引导</Button>
                    <Paper shadow="xs" p="xl" mb={24}>
                        <Title order={3}>基础模型</Title>
                        <Text>
                            由函数计算提供的基础模型包含丰富的AI领域模型，包括LLM类别的通义千问，Chatglm,Llama2等，以及绘画类别的Stable Diffusion,通义万相等，以及Bert算法模型，Ocr模型
                        </Text>
                    </Paper>
                    <Paper shadow="xs" p="xl">
                        <Title order={3}>LLM代理</Title>
                        <Text>
                            LLM代理可以更好的兼容不同的LLM服务，保障在AgentCraft服务商
                        </Text>
                    </Paper>
                </div>
            }
        </>
    );
}