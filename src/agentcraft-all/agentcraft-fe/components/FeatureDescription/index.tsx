import { Box, Drawer, Flex, Title, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import styles from './index.module.scss';
type FeatureDescriptionProps = {
    title: string,
    description?: string,
    detail?: string,
    mt?: number,
    mb?: number
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

    const { title, description, detail, mt, mb } = props;
    return <Box pt={36} className={styles['feature-description']}>
        <Flex
            mih={20}
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap"
        >
            <Title className={styles['title']}>{title}</Title>
            <InfoDetail title={title} detail={detail} />
        </Flex>
        {description ? <Text lineClamp={4} className={styles['description']}> 
            {description}
        </Text> : null}
    </Box>
}