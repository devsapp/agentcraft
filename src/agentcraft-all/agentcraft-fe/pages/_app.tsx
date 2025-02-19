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
import 'katex/dist/katex.min.css';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [render, setRender] = useState(false);
  const { hiddenConfigView, completeConfig = {} } = useSystemConfigStore();
  const { projectFavicon, projectName, projectTheme = THEME } = completeConfig;
  useEffect(() => {
    setRender(true);
    getSystemConfig();
  }, []);
  return (
    <>
      <Head>
        <title>{projectName}</title>
        <link rel="shortcut icon" href={projectFavicon} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>

      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={projectTheme}
      >
        {/* 前端页面监控，专属部署建议使用自己的rum */}
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
