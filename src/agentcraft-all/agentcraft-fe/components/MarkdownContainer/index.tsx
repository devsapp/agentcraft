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

const remarkThink = () => (tree: any, file: any) => {
    visit(tree, (node: any, index, parent) => {
        if (node.type === 'html' && node.value.indexOf('<think>') !== -1) {
            const value = file.value;

            // 从value 中取出 <think></think>标签内的内容
            // 如果只包含了 <think>， 则取<think>之后的所有内容
            // 使用正则表达式匹配 <think> 标签及其内容
            const thinkRegex = /<think>(.*?)<\/think>/s;
            const match = value.match(thinkRegex);

            if (match) {
                // 提取 <think> 标签中的内容
                const thinkContent = match[1];
                console.log(thinkContent)
                node.data = {
                    hName: 'think',
                    hChildren: thinkContent,
                };
            }

        }
    });
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
