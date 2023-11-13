import React, { useRef, useState, RefObject, useEffect } from "react";
import ReactMarkdown from "react-markdown";

import { Loader } from '@mantine/core';
import RemarkMath from "remark-math";
import RemarkBreaks from "remark-breaks";
import RehypeKatex from "rehype-katex";
import rehypeRaw from 'rehype-raw';
import RemarkGfm from "remark-gfm";
import RehypeHighlight from "rehype-highlight";
import { useClipboard } from "@/components/CopyToClipboard";
import mermaid from "mermaid";
import "katex/dist/katex.min.css";


// import { useDebouncedCallback, useThrottledCallback } from "use-debounce";


export function showImageModal(img: string) {
  alert('showimg')
}


export function Mermaid(props: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (props.code && ref.current) {
      mermaid
        .run({
          nodes: [ref.current],
          suppressErrors: true,
        })
        .catch((e: any) => {
          setHasError(true);
          console.error("[Mermaid] ", e.message);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.code]);

  function viewSvgInNewWindow() {
    const svg = ref.current?.querySelector("svg");
    if (!svg) return;
    const text = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([text], { type: "image/svg+xml" });
    showImageModal(URL.createObjectURL(blob));
  }

  if (hasError) {
    return null;
  }

  return (
    <div
      className="no-dark mermaid"
      style={{
        cursor: "pointer",
        overflow: "auto",
      }}
      ref={ref}
      onClick={() => viewSvgInNewWindow()}
    >
      {props.code}
    </div>
  );
}


export function PreCode(props: { children: any }) {
  const ref = useRef<HTMLPreElement>(null);
  const refText = ref.current?.innerText;
  const [mermaidCode, setMermaidCode] = useState("");
  const copyUser = useClipboard({ timeout: 3000 });
  // const renderMermaid = useDebouncedCallback(() => {
  //   if (!ref.current) return;
  //   const mermaidDom = ref.current.querySelector("code.language-mermaid");
  //   if (mermaidDom) {
  //     setMermaidCode((mermaidDom as HTMLElement).innerText);
  //   }
  // }, 600);

  useEffect(() => {
    // setTimeout(renderMermaid, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refText]);

  return (
    <>
      {mermaidCode.length > 0 && (
        <Mermaid code={mermaidCode} key={mermaidCode} />
      )}
      <pre ref={ref}>
        <span
          className="copy-code-button"
          onClick={() => {
            if (ref.current) {
              const code = ref.current.innerText;

              copyUser.copy(code);
            }
          }}
        ></span>
        {props.children}
      </pre>
    </>
  );
}


function _MarkDownContent(props: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
      rehypePlugins={[
        //@ts-ignore
        RehypeKatex,
        //@ts-ignore
        rehypeRaw,
        [
          //@ts-ignore
          RehypeHighlight,
          {
            detect: false,
            ignoreMissing: true,
          },
        ],
      ]}
      components={{
        p: (pProps) => <p {...pProps} dir="auto" />,
        a: (aProps) => {
          const href = aProps.href || "";
          const isInternal = /^\/#/i.test(href);
          const target = isInternal ? "_self" : aProps.target ?? "_blank";
          return <a color="red" {...aProps} target={target} />;
        },
        video: ({ node, ...props }: any) => {
          let videoNode: any = { props: {} };
          console.log(props,'props')
          try {
            props.children.map((item: any) => {
              if (item.props && item.type === 'source') {
                videoNode = item;
              }
            })
          } catch (e) {

          }

          return <video controls {...props}>
            <source src={videoNode.props.src || ''} type={videoNode.props.type || 'video/mp4'} />
            你的浏览器不支持video标签
          </video>
        }
      }}
    >
      {props.content}
    </ReactMarkdown>
  );
}

export const MarkdownContent = React.memo(_MarkDownContent);

export function Markdown(
  props: {
    content: string;
    loading?: boolean;
    fontSize?: number;
    parentRef?: RefObject<HTMLDivElement>;
    defaultShow?: boolean;
  } & React.DOMAttributes<HTMLDivElement>,
) {
  const mdRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="markdown-body"
      style={{
        fontSize: `${props.fontSize ?? 14}px`,
      }}
      ref={mdRef}
      onContextMenu={props.onContextMenu}
      onDoubleClickCapture={props.onDoubleClickCapture}
    >
      {props.loading ? (
        <Loader />
      ) : (
        <MarkdownContent content={props.content} />
      )}
    </div>
  );
}
