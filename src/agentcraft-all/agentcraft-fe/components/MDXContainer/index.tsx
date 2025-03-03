import React, { useState, useEffect, useRef } from 'react';
import * as runtime from 'react/jsx-runtime'
import { Paper, Button, Text, Code, TypographyStylesProvider } from '@mantine/core';

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
const DEBUG_CONTENT = `<think>
好的，我现在需要帮用户设计一个卖大米的爆款封面。根据用户提供的参考信息和之前的示例，我需要按照结构化的方式输出包含HTML、CSS、表单变量以及宽高设置的代码。首先，用户的需求是做一个卖大米的封面，所以主题要突出“大米”，可能要用相关的元素，比如稻穗、碗等图片，颜色方面可能需要自然、温暖的色调，比如绿色或米色。

参考例子中的结构，通常包括容器、标题、图片、副标题和底部标签。用户提供的参考案例中有分层的设计，比如顶部区域、中间区域和底部标签，所以我需要将内容分成几个部分。例如，顶部可能有主标题，中间是图片和促销信息，底部是价格或标语。

首先，确定整体布局。卡片尺寸参考用户提到的480x640像素，但用户可能没有明确给出，所以可能需要默认使用常见尺寸，比如500x500，或者根据用户之前例子中的尺寸调整。不过根据用户提供的参考信息，有一个例子是480x640，可能需要采用这个尺寸。需要确认用户是否指定，但当前输入中没有，可能需要询问，但根据指令，可能需要自行决定。不过用户之前的例子中宽度和高度都是500，所以可能沿用这个，但根据用户参考信息中的爆款封面尺寸是480x640，可能更合适。需要根据用户输入判断，但用户现在只是说“卖大米的爆款封面”，可能采用常见的竖版比例，比如480x640。

接下来，颜色方案。爆款封面可能需要吸引眼球，所以主色调可能需要鲜艳的颜色，比如红色或黄色，但结合大米，可能更偏向于绿色（自然）或白色（大米颜色）。参考用户提供的例子中的配色，比如白色背景、黑色文字，可能适合。但可能需要更吸引人的颜色，比如主色调用绿色或金黄色，代表稻谷。

结构方面，顶部区域可能需要主标题，比如“热卖大米”之类的，中间放产品图片，下面可能有促销信息，比如“特价优惠”或“限时抢购”，底部可能有价格标签或品牌信息。同时，可能需要添加一些装饰元素，比如稻穗图标、优惠标签等。

考虑到用户提供的例子中使用Bootstrap，我需要使用Bootstrap的类来布局，比如d-flex实现垂直水平居中，使用flex容器排列元素。图片可能需要圆形边框或阴影效果，使用Bootstrap的类如rounded、shadow等。

动态变量方面，可能需要标题、副标题、图片URL、价格等，所以在form部分需要定义这些变量。例如，title设置为“热卖大米”，subtitle为“天然好米 粒粒香醇”，imageUrl指向大米图片，price为促销价，tag为限时标签。

背景方面，可能需要渐变色或图片背景。比如使用渐变的绿色背景，或者米色的纹理背景。如果使用背景图片，需要在CSS中设置background-image，并使用变量{{backgroundImage}}，但用户可能需要纯色或渐变更简单。

另外，装饰元素比如价格标签可以使用Bootstrap的badge组件，或者自定义CSS样式，比如红色背景白色文字，带有圆角。

浏览器兼容方面，确保使用Bootstrap 5的类，并避免使用太新的CSS特性，或者添加适当的前缀。

现在，整合这些思路，结构大致分为：

1. 外层容器，设置宽高480x640，使用d-flex居中内容。
2. 顶部区域：主标题，可能带有图标，比如稻穗或购物车图标。
3. 中间区域：产品图片，可能使用圆形或矩形边框，阴影效果。
4. 促销信息：比如“限时特价”、“买一送一”等，使用醒目的字体和颜色。
5. 底部区域：价格标签和购买按钮，或者品牌信息。

配色方面，主背景可能使用浅绿色或米色渐变，标题使用深绿色或黑色加粗，促销信息用红色突出。

检查用户提供的例子，其中一个使用了背景图片，另一个使用了渐变。这里可能需要根据用户需求选择，但考虑到卖大米，可能使用自然风格的背景图，比如稻田，但如果没有图片，可以用纯色或渐变。

最后，确保所有元素都使用Bootstrap类，并且结构正确，变量替换正确，比如{{title}}, {{imageUrl}}等。
</think>
<X data={{
    "html": "<div class='d-flex flex-column align-items-center justify-content-between p-4 position-relative' style='width:480px;height:640px;background:linear-gradient(135deg, #f5deb3 0%, #fff 100%);'>\n  <!-- 顶部促销标 -->\n  <div class='position-absolute top-0 start-0 bg-danger text-white px-3 py-1 rounded-end'>{{tag}}</div>\n  \n  <!-- 主标题 -->\n  <h1 class='display-4 fw-bold text-dark mb-0' style='text-shadow: 2px 2px 4px rgba(0,0,0,0.1);'>{{title}}</h1>\n  \n  <!-- 产品展示区 -->\n  <div class='position-relative' style='width:280px;height:280px;'>\n    <img src='{{imageUrl}}' class='w-100 h-100 object-fit-contain rotate-15' />\n    <div class='position-absolute bottom-0 end-0 bg-warning rounded-pill px-3 py-2 shadow'>\n      <span class='h3 fw-bold text-danger'>{{price}}</span>\n    </div>\n  </div>\n  \n  <!-- 卖点区 -->\n  <div class='text-center'>\n    <h3 class='fw-bold mb-3' style='color:#2c541d;'>{{subtitle}}</h3>\n    <div class='d-flex gap-2'>\n      <span class='badge bg-success rounded-pill'><i class='bi bi-check2-circle'></i> {{feature1}}</span>\n      <span class='badge bg-primary rounded-pill'><i class='bi bi-truck'></i> {{feature2}}</span>\n    </div>\n  </div>\n</div>",
    "css": "@keyframes rotate { 0% {transform: rotate(-15deg);} 50% {transform: rotate(15deg);} 100% {transform: rotate(-15deg);} .rotate-15 {animation: rotate 3s ease-in-out infinite;}",
    "form": {
        "title": "东北珍珠米",
        "subtitle": "当季新米 五常直发",
        "imageUrl": "https://example.com/rice.png",
        "price": "¥29.9/5kg",
        "tag": "限时特惠",
        "feature1": "真空包装",
        "feature2": "次日达"
    },
    "height": 640,
    "width": 480
}} />`

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

const components = {
    AC_DS_THINK: Think,
    Button,
    Paper,
    Text,
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


export default function MDXContainer({ content, scope = {} }: any) {
    const [component, setComponent] = useState<React.ReactNode | null>(null);
    // content = DEBUG_CONTENT;
    let mdxContent = content;
    useEffect(() => {
        const parseMDX = async () => {
            try {
                mdxContent = fixMDXContent(content);
                mdxContent = preprocessMDXContent(mdxContent);
                mdxContent = remarkThink(mdxContent);
                const vf = await compile(mdxContent, {
                    outputFormat: "function-body",
                    remarkPlugins: [
                        [RemarkMath, { strict: false, throwOnError: false, }],
                        RemarkGfm,
                        RemarkBreaks
                    ],
                    rehypePlugins: [
                        [RehypeKatex, {
                            katexOptions: {
                                strict: "ignore",
                                throwOnError: false, // 抑制渲染错误(关键！)
                            }
                        }],
                        [RehypeHighlight, { detect: false, ignoreMissing: true, plainText: ['unknow'] }]]
                });
                const { default: XComponent } = await run(vf, {
                    ...runtime,
                    Fragment: MdxLayout
                });
                const MDXComponent = (
                    <SafeMdxRenderer  >
                        <XComponent components={components} scope={scope} />
                    </SafeMdxRenderer>
                );
                setComponent(MDXComponent);
            } catch (e) {
                const MarkdownComponent = <Code style={{fontSize: '14px',backgroundColor:'transparent'}}  >{content}</Code>;
                // content = remarkThink(content);
                // const MarkdownComponent = <Markdown textContent={content} />;
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