import React, { useState, useEffect, useRef } from 'react';
import * as runtime from 'react/jsx-runtime'
import { Paper, Button, Text } from '@mantine/core';
import RemarkMath from "remark-math";
import RemarkBreaks from "remark-breaks";
import RemarkGfm from "remark-gfm";
import { MDXProvider } from '@mdx-js/react';
import { compile, evaluate, run } from '@mdx-js/mdx';
import RehypeKatex from "rehype-katex";
import RehypeHighlight from "rehype-highlight";
import CodeHighlight from 'components/CodeHighlight';
import Markdown from 'components/MarkdownContainer';
import { Think } from 'mdx/Think';

function fixMDXContent(content: string) {
    // 替换中文括号为英文括号
    return content
        .replace(/（/g, '(').replace(/）/g, ')')
        // 替换其他中文标点
        .replace(/，/g, ',').replace(/。/g, '.')
        .replace(/\\\[/g, '$$').replace(/\\\]/g, '$$')
        // 确保LaTeX公式正确转义
        .replace(/\\\(/g, '$').replace(/\\\)/g, '$').replace(/\\\,/g, '')

}


function remarkThink(content: string) {
    // 处理步骤1：每个</think>前的部分只保留一个<think>
    let parts = content.split(/<\/think>/i);
    for (let i = 0; i < parts.length; i++) {
        let part = parts[i];
        if (/<think>/i.test(part)) {
            parts[i] = '<Think>' + part.replace(/<think>/gi, '');
        }
    }
    let processedStr = parts.join('</Think>');

    // 处理步骤2：去除多余的</think>
    let openCount = 0, closeCount = 0, result = '';
    const regex = /(<\/?think\b[^>]*>)|(<[^>]+>)|([^<]+)/gi;
    let match;
    while ((match = regex.exec(processedStr)) !== null) {
        if (match[1]) {
            const tag = match[1].toLowerCase();
            if (tag === '<think>') {
                openCount++;
                result += match[1];
            } else if (tag === '</think>' && closeCount < openCount) {
                closeCount++;
                result += match[1];
            }
        } else if (match[2]) {
            // 直接添加其他标签（如 <span>）
            result += match[2];
        } else {
            result += match[3];
        }
    }


    // 处理步骤3：补充单个未闭合的<think>
    const currentOpen = (result.match(/<think>/gi) || []).length;
    const currentClose = (result.match(/<\/think>/gi) || []).length;

    if (currentOpen === 1 && currentClose === 0) {
        result += '\n\n</Think>\n\n';
    }
    return result;
}

const components = {
    Think,
    pre: (props: any) => <div {...props} />,
    code: (props: any) => {
        const { children, className, node, ...rest } = props;
        const match = /language-(\w+)/.exec(className || "");
        return match ? (
            <CodeHighlight
                {...rest}
                language={match[1]}

            >
                {children}
            </CodeHighlight >
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        );
    },
    p: (pProps: any) => <p {...pProps} dir="auto" />,
    a: (aProps: any) => {
        const href = aProps.href || "";
        const isInternal = /^\/#/i.test(href);
        const target = isInternal ? "_self" : aProps.target ?? "_blank";
        return <a color="red" {...aProps} target={target} />;
    },
    video: ({ node, ...props }: any) => {
        let videoNode: any = { props: {} };
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
    },
    audio: ({ node, ...props }: any) => {
        let audioNode: any = { props: {} };
        try {
            props.children.map((item: any) => {
                if (item.props && item.type === 'source') {
                    audioNode = item;
                }
            });
        } catch (e) {
            console.error('Error processing audio children:', e);
        }

        return (
            <audio controls {...props}>
                <source src={audioNode.props.src || ''} type={audioNode.props.type || 'audio/mpeg'} />
                你的浏览器不支持 audio 标签
            </audio>
        );
    }
};

class ErrorBoundary extends React.Component<{ content: any, children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: { content: any, children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    }
    render() {
        if (this.state.hasError) {
            return (
                <Text size="sm">
                    {this.props.content}
                </Text>
            );
        }
        return this.props.children;
    }
}

export function MdxLayout({ children }: { children: React.ReactNode }) {
    return <div style={{ color: 'blue' }} className="markdown-body" >{children}</div>;
}

export default function MDXContainer({ content, scope = {} }: any) {
    const [component, setComponent] = useState<React.ReactNode | null>(null);
    let mdxContent = content;
    useEffect(() => {
        const parseMDX = async () => {
            try {
                mdxContent = fixMDXContent(content);
                mdxContent = remarkThink(mdxContent);
                const vf = await compile(mdxContent, {
                    outputFormat: "function-body",
                    remarkPlugins: [
                        [RemarkMath],
                        RemarkGfm,
                        RemarkBreaks
                    ],
                    rehypePlugins: [
                        [RehypeKatex, {
                            katexOptions: {
                                strict: true 
                            }
                        }],
                        [RehypeHighlight, { detect: false, ignoreMissing: true }]]
                });
                const { default: XComponent } = await run(vf, {
                    ...runtime,
                    Fragment: MdxLayout
                });

                const MDXComponent = (
                    <MDXProvider  >
                        <XComponent components={components} scope={scope} />
                    </MDXProvider>
                );
                setComponent(MDXComponent);
            } catch (e) {
                content = remarkThink(content);
                const MarkdownComponent = <Markdown textContent={content} />;
                setComponent(
                    MarkdownComponent
                );
            }
        };
        parseMDX();
    }, [content]);

    return (
        <ErrorBoundary content={content}>
            {component}
        </ErrorBoundary>
    );
}