import Link from 'next/link';
import { Flex } from '@mantine/core';

let m: NodeJS.Timeout;

export default function Custom404() {

  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
    >
      <h2>404 Not Found</h2>
      <p>页面丢失了，跳转到<Link href="/overview">概览</Link>页面</p>
    </Flex>
  );
}