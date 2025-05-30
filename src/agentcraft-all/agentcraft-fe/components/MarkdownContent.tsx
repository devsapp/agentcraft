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

  return (
    <ReactMarkdown
      className={'markdown-body'}
      rehypePlugins={[
        RehypeKatex,
        rehypeRaw,
        [
          RehypeHighlight,
          {
            detect: false,
            ignoreMissing: true,
          },
        ],
      ]}
      remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
      components={{
        code(props: any) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          const a = String(children).replace(/\n$/, '');
          const extractText = (children: React.ReactNode): string => {
              return React.Children.toArray(children).reduce((acc: string, child: any) => {
                  if (typeof child === 'string') {
                      return acc + child;
                  } else if (React.isValidElement(child) && child.props && (child.props as { children?: React.ReactNode }).children) {
                      return acc + extractText((child.props as { children: React.ReactNode }).children);
                  }
                  return acc;
              }, '');
          };
          const content = extractText(children);
          return match ? (
            <CodeHighlight
                {...rest}
                language={match[1]}
                textContent={content}
            >
                {content}
            </CodeHighlight >
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
