import React from 'react';
import { Box, Anchor, Text, Flex } from '@mantine/core';


const NewBieGuid = () => {


    return (
        <Box style={{ top: 0, right: 0, position: 'fixed' }}>
            <Flex align="center" mr={24} mt={12}>
                <Anchor href="//agentcraft-docs.serverless-developer.com/community/seek-support" target="_blank"><Text size={12}>寻求支持</Text></Anchor>
                <Text size={12} ml={12} mr={12}>|</Text>
                <Anchor href="//github.com/devsapp/agentcraft" target="_blank"><Text size={12}>查看源码</Text></Anchor>
            </Flex>
        </Box>
    );
};

export default NewBieGuid;