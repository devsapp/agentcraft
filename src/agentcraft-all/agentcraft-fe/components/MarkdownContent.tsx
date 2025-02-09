import React, { useState, Suspense } from 'react';
import ReactMarkdown from 'react-markdown';
import CodeHighlight from '@/components/CodeHighlight';
import RemarkMath from "remark-math";
import RemarkBreaks from "remark-breaks";
import RehypeKatex from "rehype-katex";
import rehypeRaw from 'rehype-raw';
import RehypeHighlight from "rehype-highlight";
import RemarkGfm from "remark-gfm";
import { notifications } from '@mantine/notifications';
import styles from '@/styles/chat.module.scss';


type MarkdownContentProps = {
  textContent: string;
  value?: string,
  darkMode?: boolean; // markdown文本
};



const MarkdownContent = (props: MarkdownContentProps) => {
  const { textContent, darkMode, value } = props;
  const [showCopy, setShowCopy] = useState(false);
  const copy2Clipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
      } catch (error) {
        console.log(error);
      }
      document.body.removeChild(textArea);

    }
    notifications.show({
      title: '复制成功',
      message: '您已完成复制',
      color: 'green',
    });
  };
  return (
    <ReactMarkdown

      className={'markdown-body'}
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
      remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
      components={{
        code({ node,  className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <div className={styles['code-container']} onMouseEnter={() => setShowCopy(true)} onMouseLeave={() => setShowCopy(false)}>
              <button className={styles['copy-btn']} style={{ visibility: showCopy ? 'visible' : 'hidden' }} onClick={() => copy2Clipboard(value || textContent)}>复制</button>
              <Suspense>
                <CodeHighlight
                  darkMode={darkMode}
                  language={match[1]}
                  {...props}
                  textContent={String(children).replace(/\n$/, '')}
                />
              </Suspense>
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {textContent}
    </ReactMarkdown>
  );
};

export default MarkdownContent;
