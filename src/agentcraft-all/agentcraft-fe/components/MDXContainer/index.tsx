import React, { useState, useEffect } from 'react';
import * as runtime from 'react/jsx-runtime'
import { Paper, Button, Text, Code } from '@mantine/core';
import RemarkMath from "remark-math";
import RemarkBreaks from "remark-breaks";
import RemarkGfm from "remark-gfm";
import { MDXProvider } from '@mdx-js/react';
import { compile, run } from '@mdx-js/mdx';
import RehypeKatex from "rehype-katex";
import RehypeHighlight from "rehype-highlight";
import CodeHighlight from 'components/CodeHighlight';
// import Markdown from 'components/MarkdownContainer';
import Features from 'mdx/Features';
import { Think } from 'mdx/Think';


const THINK_BEGIN_TAG = '<think>';
const THINK_END_TAG = '</think>';
const CUSTOMER_THINK_COMPONENT_DISPLAY = 'AC_DS_THINK';
// 新增预处理函数
const preprocessMDXContent = (content: string) => {
    // 步骤0: 提取并保护代码块、内联代码、数学公式、HTML注释、YAML Front Matter和自定义组件标签中的内容
    const codeBlockRegex = /(```[\s\S]*?```|`[^`]*`)/g; // 匹配代码块和内联代码
    const mathRegex = /(\$\$[\s\S]*?\$\$|\$[^$]*\$)/g; // 匹配数学公式
    const htmlCommentRegex = /<!--[\s\S]*?-->/g; // 匹配HTML注释
    const yamlFrontMatterRegex = /^---\n([\s\S]*?)\n---/; // 匹配YAML Front Matter
    const customComponentRegex = /<([A-Z]\w*)([\s\S]*?)>([\s\S]*?)<\/\1>/g; // 匹配自定义组件

    let codeBlocks: any = [];
    let mathFormulas: any = [];
    let htmlComments: any = [];
    let yamlFrontMatter = '';
    let customComponents: any = [];

    // 保护YAML Front Matter
    let protectedContent = content.replace(yamlFrontMatterRegex, match => {
        yamlFrontMatter = match;
        return '__YAML_FRONT_MATTER__';
    });

    // 保护代码块和内联代码
    protectedContent = protectedContent.replace(codeBlockRegex, match => {
        codeBlocks.push(match);
        return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
    });

    // 保护数学公式
    protectedContent = protectedContent.replace(mathRegex, match => {
        mathFormulas.push(match);
        return `__MATH_FORMULA_${mathFormulas.length - 1}__`;
    });

    // 保护HTML注释
    protectedContent = protectedContent.replace(htmlCommentRegex, match => {
        htmlComments.push(match);
        return '__HTML_COMMENT__';
    });

    // 保护自定义组件
    protectedContent = protectedContent.replace(customComponentRegex, match => {
        customComponents.push(match);
        return '__CUSTOM_COMPONENT__';
    });


    protectedContent = protectedContent.replace(htmlCommentRegex, (match) => {
        return `{/* ${match.slice(4, -3).trim()} */}`; // 提取注释内容并转换格式
    });

    // 2. 转义MDX中需要转义的特殊字符（根据实际需求调整），跳过已经保护的部分
    protectedContent = protectedContent
        .replace(/{{\s*/g, '&#123;&#123;')  // 转义开头双括号
        .replace(/\s*}}/g, '&#125;&#125;')  // 转义结尾双括号
        .replace(/([^\\]){/g, '$1&#123;') // 转义非转义花括号
        .replace(/([^\\])}/g, '$1&#125;');


    // 3. 清理非法字符（根据常见错误案例调整）
    protectedContent = protectedContent.replace(/[\x00-\x09\x0B-\x0C\x0E-\x1F]/g, '');

    // protectedContent = protectedContent
    //     .replace(/([^\\]){/g, '$1&#123;')
    //     .replace(/([^\\])}/g, '$1&#125;')
    //     .replace(/&(?!amp;|lt;|gt;|quot;|#39;)/g, '&amp;')
    //     .replace(/</g, '&lt;')
    //     .replace(/>/g, '&gt;');

    // 步骤4: 恢复保护的所有部分
    if (yamlFrontMatter) protectedContent = protectedContent.replace('__YAML_FRONT_MATTER__', yamlFrontMatter);
    for (let i = 0; i < codeBlocks.length; i++) {
        protectedContent = protectedContent.replace(`__CODE_BLOCK_${i}__`, () => codeBlocks[i]);
    }
    for (let j = 0; j < mathFormulas.length; j++) {
        protectedContent = protectedContent.replace(`__MATH_FORMULA_${j}__`, () => mathFormulas[j]);
    }
    while (protectedContent.includes('__HTML_COMMENT__')) {
        protectedContent = protectedContent.replace('__HTML_COMMENT__', () => htmlComments.shift());
    }
    while (protectedContent.includes('__CUSTOM_COMPONENT__')) {
        protectedContent = protectedContent.replace('__CUSTOM_COMPONENT__', () => customComponents.shift());
    }

    return protectedContent;
};

function fixMDXContent(content: string) {
    // 替换中文括号为英文括号
    return content
        .replace(/\\\[/g, '$$').replace(/\\\]/g, '$$')
        // 确保LaTeX公式正确转义
        .replace(/\\\(/g, '$').replace(/\\\)/g, '$')
}

// function fixMDXContent(content: string) {
//     // 替换中文括号为英文括号
//     return content
//         .replace(/（/g, '(').replace(/）/g, ')')
//         // 替换其他中文标点
//         .replace(/，/g, ',').replace(/。/g, '.')
//         .replace(/\\\[/g, '$$').replace(/\\\]/g, '$$')
//         // 确保LaTeX公式正确转义
//         .replace(/\\\(/g, '$').replace(/\\\)/g, '$').replace(/\\\,/g, '')
// }

function remarkThink(content: string) {

    content = content.replace(/<think>/g, '\n<AC_DS_THINK>\n').replace(/<\/think>/g, '\n</AC_DS_THINK>\n'); // 统计将标记的小写think替换为大写Think

    // 处理步骤1：每个</think>前的部分只保留一个<think>
    let parts = content.split(/<\/AC_DS_THINK>/i);
    for (let i = 0; i < parts.length; i++) {
        let part = parts[i];
        if (/<AC_DS_THINK>/i.test(part)) {
            parts[i] = '<AC_DS_THINK>' + part.replace(/<AC_DS_THINK>/gi, '');
        }
    }

    let processedStr = parts.join('</AC_DS_THINK>');

    // 处理步骤2：去除多余的</think>
    let openCount = 0, closeCount = 0, result = '';
    const regex = /(<\/?AC_DS_THINK\b[^>]*>)|(<[^>]+>)|([^<]+)/gi;
    let match;
    while ((match = regex.exec(processedStr)) !== null) {
        if (match[1]) {
            const tag = match[1];
            if (tag === '<AC_DS_THINK>') {
                openCount++;
                result += match[1];
            } else if (tag === '</AC_DS_THINK>' && closeCount < openCount) {
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
    const currentOpen = (result.match(/<AC_DS_THINK>/gi) || []).length;
    const currentClose = (result.match(/<\/AC_DS_THINK>/gi) || []).length;

    if (currentOpen === 1 && currentClose === 0) {
        result += '\n\n</AC_DS_THINK>\n\n';
    } else if (currentOpen > currentClose) {
        // 如果<Think>标签的数量多于</Think>标签的数量，移除最后一个多余的<Think>标签
        const lastThinkIndex = result.lastIndexOf('<AC_DS_THINK>');
        if (lastThinkIndex !== -1) {
            result = result.slice(0, lastThinkIndex) + result.slice(lastThinkIndex + '<AC_DS_THINK>'.length);
        }
    }

    result = result.replace(/<\/AC_DS_THINK><AC_DS_THINK>/g, '\n </AC_DS_THINK> \n');
    return result;
}

function remarkThinkUpdate(content: string) {
    let thinkContent = '';
    let resultContent = ''
    let thinkBeginIndex = content.indexOf(THINK_BEGIN_TAG);
    let thinkEndIndex = content.lastIndexOf(THINK_END_TAG);
    if (thinkBeginIndex !== -1 && thinkEndIndex === -1) { // 有开始，无结束
        thinkContent = content.slice(THINK_BEGIN_TAG.length);
        thinkContent = `<${CUSTOMER_THINK_COMPONENT_DISPLAY}  content="${encodeURIComponent(thinkContent)}" />`
    } else if (thinkBeginIndex !== -1 && thinkEndIndex !== -1) { // 有开始，有结束
        let anotherEndIndex = content.indexOf(THINK_END_TAG);
        if (anotherEndIndex !== thinkEndIndex) {
            thinkContent = content.slice(THINK_BEGIN_TAG.length, anotherEndIndex);
            resultContent = content.slice(thinkEndIndex + THINK_END_TAG.length);
            thinkContent = `<${CUSTOMER_THINK_COMPONENT_DISPLAY}  content="${encodeURIComponent(thinkContent)}" />`;
        } else {
            thinkContent = content.slice(THINK_BEGIN_TAG.length, thinkEndIndex);
            thinkContent = `<${CUSTOMER_THINK_COMPONENT_DISPLAY}  content="${encodeURIComponent(thinkContent)}" />`;
            resultContent = content.slice(thinkEndIndex + THINK_END_TAG.length);
        }
    } else if (thinkBeginIndex == -1) {
        resultContent = content;
    }
    return { thinkContent, resultContent };
}

const components = {
    AC_DS_THINK: Think,
    Button,
    Paper,
    Text,
    Features,
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
// 创建动态组件解析器
function SafeMdxRenderer({ components = {}, children }: any) {
    const finalComponents = {
        ...components,
        // 对所有未知组件提供默认兜底逻辑
        '*': ({ originalType, ...props }: any) => {
            if (typeof originalType === 'string' && /^[A-Z]/.test(originalType)) {
                return (
                    <>
                        &lt;{originalType}&gt;
                        {props.children ? `{${props.children}}` : ''}
                        &lt;/{originalType}&gt;
                    </>
                );
            }
            return React.createElement(originalType, props);
        },
    };

    return (
        <MDXProvider components={finalComponents}>
            <React.Fragment>{children}</React.Fragment>
        </MDXProvider>
    );
}
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

export async function renderMdx(mdxContent: string, scope: any) {
    try {
        const componentTagRegex = /<([A-Z][a-zA-Z]*)\b/g;
        const usedComponents = new Set<string>();
        let match;
        while ((match = componentTagRegex.exec(mdxContent)) !== null) {
            usedComponents.add(match[1]);
        }
        const registeredComponents = new Set(Object.keys(components));
        for (const component of usedComponents) {
            if (!registeredComponents.has(component)) {
                throw new Error(`Component ${component} is used but not registered in the components object.`);
            }
        }
        const vf = await compile(mdxContent, {
            outputFormat: "function-body",
            remarkPlugins: [
                [RemarkMath, { strict: true }],
                RemarkGfm,
                RemarkBreaks
            ],
            rehypePlugins: [
                [RehypeKatex, {

                }],
                [RehypeHighlight, { detect: false, ignoreMissing: true, plainText: ['unknow'] }]]
        });
        const { default: XComponent } = await run(vf, {
            ...runtime,
            Fragment: MdxLayout
        });
        return <XComponent components={components} scope={scope} />;
    } catch (e) {
        const MarkdownComponent = <Code style={{ fontSize: '14px', backgroundColor: 'transparent' }}  >{mdxContent}</Code>;
        return MarkdownComponent;
    }
}
export default function MDXContainer({ content, scope = {} }: any) {
    const [component, setComponent] = useState<React.ReactNode | null>(null);
    let mdxContent = content;
    useEffect(() => {
        const parseMDX = async () => {
            // mdxContent = fixMDXContent(mdxContent);
            // mdxContent = preprocessMDXContent(mdxContent);
            let ThinkComponent: React.ReactElement | null = null;
            let ResultComponent: React.ReactElement | null = null;

            let { thinkContent, resultContent } = remarkThinkUpdate(mdxContent);


            if (thinkContent) {
                ThinkComponent = await renderMdx(thinkContent, scope);
            }
            if (resultContent) {
                resultContent = fixMDXContent(resultContent);
                // resultContent = preprocessMDXContent(resultContent);
                ResultComponent = await renderMdx(resultContent, scope);
            }
            const MDXComponent = (
                <SafeMdxRenderer>
                    <React.Fragment>
                        {ThinkComponent}
                        {ResultComponent}
                    </React.Fragment>
                </SafeMdxRenderer>
            );
            setComponent(MDXComponent);
            // try {
            // mdxContent = fixMDXContent(content);
            // mdxContent = preprocessMDXContent(mdxContent);
            // mdxContent = remarkThink(mdxContent);
            // const vf = await compile(mdxContent, {
            //     outputFormat: "function-body",
            //     remarkPlugins: [
            //         [RemarkMath, { strict: false, throwOnError: false, }],
            //         RemarkGfm,
            //         RemarkBreaks
            //     ],
            //     rehypePlugins: [
            //         [RehypeKatex, {
            //             katexOptions: {
            //                 strict: "ignore",
            //                 throwOnError: false, // 抑制渲染错误(关键！)
            //             }
            //         }],
            //         [RehypeHighlight, { detect: false, ignoreMissing: true, plainText: ['unknow'] }]]
            // });
            // const { default: XComponent } = await run(vf, {
            //     ...runtime,
            //     Fragment: MdxLayout
            // });
            // const MDXComponent = (
            //     <SafeMdxRenderer  >
            //         <XComponent components={components} scope={scope} />
            //     </SafeMdxRenderer>
            // );
            // setComponent(MDXComponent);
            // } catch (e) {
            //     const MarkdownComponent = <Code style={{ fontSize: '14px', backgroundColor: 'transparent' }}  >{content}</Code>;
            //     // content = remarkThink(content);
            //     // const MarkdownComponent = <Markdown textContent={content} />;
            //     setComponent(
            //         MarkdownComponent
            //     );
            // }
        };
        parseMDX();
    }, [content]);

    return (
        <ErrorBoundary content={content}>
            {component}
        </ErrorBoundary>
    );
}