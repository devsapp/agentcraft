import React, { useState, useEffect, useRef } from 'react';
// import * as runtime from 'react/jsx-runtime'
import { Paper, Button, Text } from '@mantine/core';
import RemarkMath from "remark-math";
import RemarkBreaks from "remark-breaks";
import RemarkGfm from "remark-gfm";
import {MDXProvider} from '@mdx-js/react';
import { compile, evaluate } from '@mdx-js/mdx';
// @ts-ignore
import MDX from '@mdx-js/runtime';
import RehypeKatex from "rehype-katex";
// import RehypeRaw from 'rehype-raw';
import RehypeHighlight from "rehype-highlight";

import CodeHighlight from 'components/CodeHighlight';
import Markdown from 'components/MarkdownContainer';
import { Think } from 'mdx/Think';


function fixMDXContent(content: string) {
    // 替换中文括号为英文括号
    let fixed = content.replace(/（/g, '(').replace(/）/g, ')');
    // 替换其他中文标点
    fixed = fixed.replace(/，/g, ',').replace(/。/g, '.');
    // 确保LaTeX公式正确转义
    fixed = fixed.replace(/\\\(/g, '$').replace(/\\\)/g, '$').replace(/\\text/g, '\\\\text');
    // fixed = fixed.replace(/\\(?:\\\\)*(\[|\]|\(|\)|\{|\})/g, '\\$1');
    // fixed = fixed.replace(/(\d)([^\d\s.,;!?])/g, "$1 $2");

    return fixed;
}


// function fixMDXContent(content: string): string {
//     return content
//         // 1. 基础标点修正（中文→英文）
//         .replace(/（/g, '(')
//         .replace(/）/g, ')')
//         .replace(/，/g, ', ')
//         .replace(/。/g, '. ')
//         // 2. 数学公式增强处理（核心修正）
//         // 处理公式块内的所有问题
//         .replace(/(\${1,2})(.*?)\1/gs, (_, delim, formula) => {
//             return delim + formula
//                 // 修复下标空格问题（v_{0 y } → v_{0y}）
//                 .replace(/_{\s*([^}]+?)\s*}/g, (m: any, p1: string) =>
//                     `_{${p1.replace(/\s+/g, '')}}`
//                 )
//                 // 标准化单位格式（2.5\mathrm{m} → 2.5\ \mathrm{m}）
//                 .replace(/(\d)(\\mathrm{)/g, '$1 $2')
//                 // 移除多余空格（兼容\, \quad等格式）
//                 .replace(/(\\[,\s]+)(\\mathrm)/g, ' $2')
//                 // 强制数字单位分离（2.5m → 2.5\ \mathrm{m}）
//                 .replace(/(\d+\.?\d*)([a-zA-Z]+)/g, '$1\\ \\mathrm{$2}')
//         })

//         // 3. 全局修复（公式外内容）
//         // 处理文本中的数字单位粘连（6米 → 6 米）
//         .replace(/(\d)([^\d\s.,;!?])/g, '$1 $2')
//         // 修复独立公式的转义问题
//         .replace(/\\\[/g, '\\\\[')
//         .replace(/\\\]/g, '\\\\]')
//         // 4. 语法容错处理
//         // 清除公式内多余空格（h = 2.5 \, \mathrm{m} → h = 2.5\ \mathrm{m}）
//         .replace(/(\\,)\s*(\\mathrm)/g, ' $2')
//         // 兼容多空格情况（v_{ 0 y } → v_{0y}）
//         .replace(/_{\s*([^}]+)\s*}/g, '_{$1}'.replace(/\s+/g, ''));
// }



function remarkThink(content: string) {
    // 处理步骤1：每个</think>前的部分只保留一个<think>
    let parts = content.split(/<\/think>/i);
    for (let i = 0; i < parts.length; i++) {
        let part = parts[i];
        if (/<think>/i.test(part)) {
            parts[i] = '<think>' + part.replace(/<think>/gi, '');
        }
    }
    let processedStr = parts.join('</think>');

    // 处理步骤2：去除多余的</think>
    let openCount = 0, closeCount = 0, result = '';
    const regex = /(<\/?think\b[^>]*>)|([^<]+)/gi;
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
        } else {
            result += match[2];
        }
    }

    // 处理步骤3：补充单个未闭合的<think>
    const currentOpen = (result.match(/<think>/gi) || []).length;
    const currentClose = (result.match(/<\/think>/gi) || []).length;
    if (currentOpen === 1 && currentClose === 0) {
        result += '\n\n</think>\n\n';
    }

    return result;
}
// 自定义 Think 组件
const components = {
    think: Think,
    pre: (props: any) => <div {...props} />,
    code: (props: any) => {
        return <CodeHighlight textContent={props.children} language={props.className?.replace("language-", "")} />
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
    let mdxContent = '';
    useEffect(() => {
        const parseMDX = async () => {
            try {
                mdxContent = fixMDXContent(content);
                mdxContent = remarkThink(mdxContent);
                await compile(mdxContent, {
                    remarkPlugins: [RemarkMath as any, RemarkGfm as any, RemarkBreaks as any],
                    rehypePlugins: [[RehypeKatex as any, {
                        katexOptions: {
                            strict: false // 关闭严格模式
                            // 其他 KaTeX 选项（如需）
                        }
                    }], [RehypeHighlight as any, { detect: false, ignoreMissing: true }]]
                });
                // const jsx = await evaluate(mdxContent, {
                //     ...runtime,
                //     ...components,
                //     // @ts-ignore
                //     components: components,
                //     remarkPlugins: [RemarkMath, RemarkGfm, RemarkBreaks],
                //     rehypePlugins: [
                //         // 配置 KaTeX 选项：关闭严格模式以允许 Unicode 字符
                //         [RehypeKatex, {
                //             katexOptions: {
                //                 strict: false // 关闭严格模式
                //             }
                //         }],
                //         // 配置代码高亮插件
                //         [RehypeHighlight, {
                //             detect: false,
                //             ignoreMissing: true
                //         }]
                //     ],
                //     format: 'mdx',
                //     Fragment: MdxLayout
                // });
    
                // const XComponent = jsx.default;
                // console.log(String(jsx.default))
                // const MDXComponent = (
                //     <provider.MDXProvider  >
                //         <XComponent components={components} />
                //     </provider.MDXProvider>
                // );
                const MDXComponent = (
                    <MDXProvider>
                        <MdxLayout>
                            <MDX components={components} 
                                 scope={scope} 
                                 remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
                                 rehypePlugins={[RehypeKatex ,[RehypeHighlight,  { detect: false, ignoreMissing: true }]]}>
                                { mdxContent }
                            </MDX>
                        </MdxLayout>
                    </MDXProvider>
                );

                setComponent(MDXComponent);
            } catch (e) {
                console.log(mdxContent, 'mdxContent');
                console.log(e, 'e');
                content = remarkThink(content);
                const MarkdownComponent = <Markdown textContent={content} />;
                setComponent(
                    MarkdownComponent
                )
            }
        };
        parseMDX();
    }, [content]);

    return (
        <>
            <ErrorBoundary content={content}>
                {component}
            </ErrorBoundary>
        </>
    );
}