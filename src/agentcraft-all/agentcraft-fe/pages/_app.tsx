import { useState, useEffect } from 'react';
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { Main } from 'layouts/shell';
import { SystemConfig } from 'features/systemConfig';
import { useSystemConfigStore, getSystemConfig } from 'store/systemConfig';
import THEME from 'constants/theme';
import '../styles/global.scss';
import '../styles/markdown.scss';



export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [render, setRender] = useState(false);
  const hiddenConfigView = useSystemConfigStore().hiddenConfigView;
  useEffect(() => {
    setRender(true);
    getSystemConfig();
  }, []);
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
        theme={THEME}
      >
        <script dangerouslySetInnerHTML={{
          __html: `
            !(function(c,b,d,a){c[a]||(c[a]={});c[a]={
              "pid": "bd9s7j354n@36f359f7139899d",
              "endpoint": "https://bd9s7j354n-default-cn.rum.aliyuncs.com"
            };
            with(b)with(body)with(insertBefore(createElement("script"),firstChild))setAttribute("crossorigin","",src=d)
            })(window, document, "https://sdk.rum.aliyuncs.com/v2/browser-sdk.js", "__rum");
            `,
        }}>
        </script>
        <Notifications />
        {render ?
          <ModalsProvider>
            {!hiddenConfigView ? < SystemConfig /> : <Main><Component {...pageProps} /></Main>}
          </ModalsProvider> :
          null
        }
      </MantineProvider>
    </>
  );
}
