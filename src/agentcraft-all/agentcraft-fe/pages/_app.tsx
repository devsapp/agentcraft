import { useState, useEffect } from 'react';
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from '@mantine/modals';
import { Shell } from 'layouts/shell';

import '../styles/global.scss';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), []);

  return (
    <>
      <Head>
        <title>AgentCraft</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
        }}
      >

        {render ?
          <ModalsProvider>
            <Shell >
              <Component {...pageProps} />
            </Shell>
          </ModalsProvider> : null}
      </MantineProvider>
    </>
  );
}
