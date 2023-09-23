import { useState, useEffect } from 'react';
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { Shell } from '../components/shell';

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
          <Shell >
            <Component {...pageProps} />
          </Shell> : null}
      </MantineProvider>
    </>
  );
}
