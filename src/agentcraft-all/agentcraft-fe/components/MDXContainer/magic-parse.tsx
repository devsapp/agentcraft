import React, { useState, useEffect, useRef } from 'react';
import * as runtime from 'react/jsx-runtime'
import RemarkMath from "remark-math";
import RemarkBreaks from "remark-breaks";
import RemarkGfm from "remark-gfm";
import { compile, run } from '@mdx-js/mdx';
import RehypeKatex from "rehype-katex";
import RehypeHighlight from "rehype-highlight";
import CodeHighlight from 'components/CodeHighlight';
import { MDXStreamingParser } from 'utils/mdxStreamParse';
// import Markdown from 'components/MarkdownContainer';
import { Think } from 'mdx/Think';
import XLoading from '@/mdx/XLoading';


interface ComponentHandler {
    component: React.ComponentType<any>;
    name: string;
    selfClosing: boolean;
    onRender?: (item: any) => void;
}


const THINK_BEGIN_TAG = '<think>';
const THINK_END_TAG = '</think>';

const CUSTOMER_THINK_COMPONENT_DISPLAY = 'AC_DS_THINK';

let shellTimmer: any = null;
let shellCommands: any = [];



function fixMDXContent(content: string) {
    // 替换中文括号为英文括号
    return content
        .replace(/\\\[/g, '$$').replace(/\\\]/g, '$$')
        // 确保LaTeX公式正确转义
        .replace(/\\\(/g, '$').replace(/\\\)/g, '$')
}


function generateRandomName(length: number = 6): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
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

const customComponents: ComponentHandler[] = [
   
]
let registerComponents: any = {};

customComponents.map((item: any) => {
    registerComponents[item.name] = item.component;
})
const components = {
    ...registerComponents,
    AC_DS_THINK: Think,
    XLoading,
    pre: (props: any) => <div {...props} />,
    code: (props: any) => {
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
                {content}
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

// 定义 ErrorUI 组件
const ErrorUI: React.FC<{ error: Error, onAutoFix: () => void }> = ({ error, onAutoFix }) => {
    return (
        <div style={{
            backgroundColor: '#fdd',
            border: '1px solid #f00',
            padding: '10px',
            borderRadius: '5px',
            margin: '10px 0'
        }}>
            <h3>错误</h3>
            <p>{error.message}</p>
            <button onClick={onAutoFix}>自动修复</button>
        </div>
    );
};

// 定义 ErrorUIContainer 组件
const ErrorUIContainer: React.FC<{ error: Error, content: React.ReactNode, onAutoFix: () => void }> = ({ error, content, onAutoFix }) => {
    const [showError, setShowError] = useState(true);

    const handleToggle = () => {
        setShowError(!showError);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <button onClick={handleToggle} disabled={!showError}>
                    显示错误
                </button>
                <button onClick={handleToggle} disabled={showError}>
                    显示主内容
                </button>
            </div>
            {showError ? (
                <ErrorUI error={error} onAutoFix={onAutoFix} />
            ) : (
                <div style={{ fontSize: '14px', backgroundColor: 'transparent' }}>
                    {content}
                </div>
            )}
        </div>
    );
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
                <div >
                    {this.props.content}
                </div>
            );
        }
        return this.props.children;
    }
}


export function MdxLayout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
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
            ...scope,
            Fragment: MdxLayout
        });


        return <XComponent components={components} scope={scope} />;
    } catch (e) {
        console.log('renderMdx error', mdxContent);
        console.log(e,'e');
        const autoFix = () => {
            // 实现自动修复逻辑
            console.log('尝试自动修复...');
            // 这里可以添加具体的自动修复代码
        };

        return (
            <ErrorUIContainer
                error={e as Error}
                content={<div style={{ fontSize: '14px', backgroundColor: 'transparent' }}>{mdxContent}</div>}
                onAutoFix={autoFix}
            />
        );
        // TODO 这里做成报错的UI， 支持自动修复
        // 自动修复可以找到字符串
        // const MarkdownComponent = <div style={{ fontSize: '14px', backgroundColor: 'transparent' }}  >{mdxContent}</div>;
        // return MarkdownComponent;
    }
}

// 递归解析组件的函数
export async function parseComponentRecursively(item: any, scope: any): Promise<React.ReactNode> {
    if (item.type === 'text') {
        return item.value;
    }

    if (item.type === 'component') {
        const componentHandler = customComponents.find(c => c.name === item.value);
        if (!componentHandler) {
            return null;
        }

        const props = { ...item.props, key: generateRandomName() };
        const propsString = formatProps(props);

        // 处理子组件
        let childrenContent = '';
        if (item.children && Array.isArray(item.children)) {
            const parsedChildren = await Promise.all(
                item.children.map((child: any) => parseComponentRecursively(child, scope))
            );
            item.children.map((item: any, index: number) => {
                if (item.type === 'text') {
                    childrenContent += encodeURIComponent(parsedChildren[index]);
                } else {
                    childrenContent += parsedChildren[index];
                }
            });
        }
        childrenContent = ' ' + childrenContent + ' ';

        // 调用组件的渲染钩子
        if (componentHandler.onRender) {
            componentHandler.onRender(item);
        }

        // 构建组件字符串
        const componentString = componentHandler.selfClosing
            ? `<${item.value} ${propsString} />`
            : ` <${item.value} ${propsString}>${childrenContent}</${item.value}> `;

        return componentString;
    }

    return null;
}

// 辅助函数：格式化props
function formatProps(props: any): string {
    return Object.entries(props)
        .map(([key, value]) => {
            if (typeof value === 'string') {
                return `${key}="${value}"`;
            }
            try {
                value = JSON.stringify(value);
            } catch (e) {
                console.error('Error stringifying prop value:', e);
            }
            return `${key}={${value}}`;
        })
        .join(' ');
}

export default function MDXContainer({ content, scope = {} }: any) {
    const [component, setComponent] = useState<React.ReactNode | null>(null);
    const parser = new MDXStreamingParser(customComponents);
    let mdxContent = content;

    useEffect(() => {
        const parseMDX = async () => {
            let ThinkComponent: React.ReactElement | null = null;
            let ResultComponent: React.ReactElement | null = null;
            let { thinkContent, resultContent } = remarkThinkUpdate(mdxContent);
            if (thinkContent) {
                ThinkComponent = await renderMdx(thinkContent, scope);
            }
            // 处理其他内容
            if (resultContent) {
                resultContent = fixMDXContent(resultContent);
                shellCommands = []; // 重置指令
                const parsedData = parser.parse('magic', resultContent);

                const parsedComponents = await Promise.all(
                    parsedData.map(item => parseComponentRecursively(item, scope))
                );
                const finalComponent = await renderMdx(parsedComponents.join('\n'), scope);
                ResultComponent = <div>{finalComponent}</div>;
            }
            const MDXComponent = (
                <React.Fragment>
                    {ThinkComponent}
                    {ResultComponent}
                </React.Fragment>
            );
            setComponent(MDXComponent);
        };
        parseMDX();
    }, [content]);

    return (
        <ErrorBoundary content={content}>
            {component}
        </ErrorBoundary>
    );
}