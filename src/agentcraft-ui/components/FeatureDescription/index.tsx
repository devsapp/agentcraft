


import { Box, Drawer, Flex, Title, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

type FeatureDescriptionProps = {
    title: string,
    description?: string,
    detail?: string
}

function InfoDetail({ detail, title }: { detail?: string, title: string }) {
    const [opened, { open, close }] = useDisclosure(false);
    return <>{detail ?
        <div>
            <Drawer opened={opened} onClose={close} title={title}>
                <Text>
                    {detail}
                </Text>
            </Drawer>
            <Text onClick={() => open()}>信息</Text>
        </div> : null}</>
}

export default function FeatureDescription(props: FeatureDescriptionProps) {

    const { title, description, detail } = props;
    return <Box mt={24} mb={24}>
        <Flex
            mih={20}

            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap"
        >
            <Title order={2}>{title}</Title>
            <InfoDetail title={title} detail={detail} />
        </Flex>
        {description ? <Text lineClamp={4}>
            {description}
        </Text> : null}

    </Box>
}