import { useState, useEffect } from 'react';
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { Shell } from 'layouts/shell';
import { useSystemConfigStore, getSystemConfig } from '@/store/systemConfig';
import { SystemConfig } from '@/features/systemConfig';
import '../styles/global.scss';
import '../styles/markdown.scss';


export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [render, setRender] = useState(false);
  const hiddenConfigView = useSystemConfigStore().hiddenConfigView;
  useEffect(() => {
    setRender(true);
    getSystemConfig();
  },[]);
  return (
    <>
      <Head>
        <title>AgentCraft</title>
        <link rel="shortcut icon" href="/favicon.ico" />
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
        <Notifications />
        {render ?
          <ModalsProvider>
            {!hiddenConfigView ? < SystemConfig /> : <Shell >
              <Component {...pageProps} />
            </Shell>}
          </ModalsProvider> : null}
      </MantineProvider>
    </>
  );
}
