import React from "react";

import { Flex, Tabs, Card, Image, Text, Badge, Button, Group, } from '@mantine/core';

import { IconMessageCircle, IconBrandGithubFilled, IconExternalLink } from '@tabler/icons-react';

import { FOUNDATION_MODEL_TEMPLATES } from '@/constants/foundationModelTemplate';
import { ServerlessAppTemplate, } from '@/types/serverless-devs-app';



function FoundationModelTab() {

  return <Flex
    mih={50}
    gap="md"
    justify="flex-start"
    align="flex-start"
    direction="column"
    wrap="wrap"
  >
    {FOUNDATION_MODEL_TEMPLATES.map((item: ServerlessAppTemplate, index: number) => {
      return <Card shadow="sm" padding="lg" radius="md" withBorder key={`template-${index}`} style={{width:'100%'}}>
        <Card.Section >
          <img
            src={item.icon}
            style={{ margin: '10px auto', width: 160, height: 160, display: 'block' }}
            height={160}
            width={160}
            alt={item.tag.join('')}
          />
        </Card.Section>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{item.name}</Text>
          {
            item.githubLink ? <a href={item.githubLink} target="_blank"><IconBrandGithubFilled /></a> : null
          }

        </Group>
        <div>
          {item.tag.map((tag) => {
            return <Badge color="green" variant="light" key={`template-${index}-${tag}`} mr={4}>
              {tag}
            </Badge>
          })}
        </div>
        <Text size="sm" color="dimmed">
          {item.description}
        </Text>
       
          <a target="_blank" href={item.fcLink}>
            <Button variant="light" color="yellow" fullWidth mt="md" radius="md" style={{width:'100%'}}>
              <Flex align={'center'}>
                查看模型信息<IconExternalLink />
              </Flex>
            </Button>
          </a>
      </Card>
    })}
  </Flex>
}

export default function ModelView() {
  return (
    <FoundationModelTab />
  );
}
