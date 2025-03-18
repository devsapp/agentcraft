import React, { useState, Suspense } from 'react';
import ReactMarkdown from 'react-markdown';
import CodeHighlight from '@/components/CodeHighlight';
import RemarkMath from "remark-math";
import RemarkBreaks from "remark-breaks";
import RehypeKatex from "rehype-katex";
import RehypeRaw from 'rehype-raw';
import RehypeHighlight from "rehype-highlight";
import RemarkGfm from "remark-gfm";
// import { Think } from 'mdx/Think';
import { visit } from 'unist-util-visit';




declare global {
    namespace JSX {
        // this merges with the existing intrinsic elements, adding 'my-custom-tag' and its props
        interface IntrinsicElements {
            'think': { 'think': any }
        }
    }
}

type MarkdownContentProps = {
    textContent: string;
    value?: string,
    darkMode?: boolean; // markdown文本
};

const Markdown = (props: MarkdownContentProps) => {
    const { textContent } = props;
    return (
        <ReactMarkdown
            className={'markdown-body'}
            rehypePlugins={[
                [RehypeKatex, {
                    katexOptions: {
                        strict: false
                    }
                 }
                ],
                RehypeRaw as any,
                [RehypeHighlight, { detect: false, ignoreMissing: true }]
            ]}
            remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
            components={{
                code(props: any) {
                    const { children, className, node, ...rest } = props
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                        <CodeHighlight
                            {...rest}
                            language={match[1]} >
                            {children}
                        </CodeHighlight>
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

export default Markdown;
