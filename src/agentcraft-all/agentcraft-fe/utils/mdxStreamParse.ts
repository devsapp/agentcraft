export interface ComponentData {
    type: "text" | "component";
    value: string;
    props?: Record<string, any>;
    children?: ComponentData[] | string;
    selfClosing?: boolean;  // 添加自闭合标记
}

interface ParserState {
    position: number;
    stack: ComponentData[];
    currentComponent?: ComponentData;
    buffer: string;
}

export class MDXStreamingParser {
    private registeredComponents: Set<any>;
    private messages: Map<string, ParserState>;
    private codeBlocks: Map<string, string>; // 存储代码块
    private blockCounter: number;

    constructor(components: any[]) {
        this.registeredComponents = new Set(components);
        this.codeBlocks = new Map();
        this.messages = new Map();
        this.blockCounter = 0;
    }
    findComponentByName(name: string): any | undefined {
        for (const component of this.registeredComponents) {
            if (component.name === name) {
                return component;
            }
        }
        return undefined; // Return undefined if no component is found
    }
    // 添加预处理方法来处理代码块
    private preprocessMarkdown(input: string): string {
        const codeBlockRegex: any = /```(\w+)?\n([\s\S]*?)```/g;

        return input.replace(codeBlockRegex, (match, language, code) => {
            const placeholder = `__CODE_BLOCK_${this.blockCounter}__`;
            this.codeBlocks.set(placeholder, match);
            this.blockCounter++;
            return placeholder;
        });
    }

    // 添加后处理方法来还原代码块
    private postprocessResult(result: ComponentData[]): ComponentData[] {
        const processNode = (node: ComponentData): ComponentData => {
            if (node.type === "text") {
                const value = node.value;
                if (value.includes('__CODE_BLOCK_')) {
                    // 还原所有代码块
                    let restoredValue = value;
                    this.codeBlocks.forEach((originalCode, placeholder) => {
                        restoredValue = restoredValue.replace(placeholder, originalCode);
                    });
                    return {
                        ...node,
                        value: restoredValue
                    };
                }
            } else if (node.children) {
                if (Array.isArray(node.children)) {
                    node.children = node.children.map(child => {
                        if (typeof child === 'string') {
                            let restoredValue: any = child;
                            this.codeBlocks.forEach((originalCode, placeholder) => {
                                restoredValue = restoredValue.replace(placeholder, originalCode);
                            });
                            return {
                                type: "text",
                                value: restoredValue
                            };
                        }
                        return processNode(child);
                    });
                }
            }
            return node;
        };

        return result.map(node => processNode(node));
    }
    parse(messageId: string, input: string): ComponentData[] {
        let state = this.messages.get(messageId);
        const preprocessedInput = this.preprocessMarkdown(input);
        input = preprocessedInput;
        if (!state) {
            state = {
                position: 0,
                stack: [],
                buffer: ''
            };
            this.messages.set(messageId, state);
        }

        const result: ComponentData[] = [];
        let i = state.position;
        while (i < input.length) {
            let char = input[i];
            if (char === '<') {
                // Handle closing tags
                if (input[i + 1] === '/') {
                    const closeTagEnd = input.indexOf('>', i);
                    if (closeTagEnd === -1) {
                        state.buffer += input.slice(i);
                        break;
                    }

                    const tagName = input.slice(i + 2, closeTagEnd);
                    const registerComponentInfo = this.findComponentByName(tagName);

                    // 如果组件未注册，则作为文本处理
                    if (!registerComponentInfo) {
                        state.buffer += input.slice(i, closeTagEnd + 1);
                        i = closeTagEnd + 1;
                        continue;
                    }

                    if (/^[A-Z][A-Za-z0-9]*$/.test(tagName)) {
                        // Handle text content in the buffer
                        const trimmedContent = state.buffer.trim();
                        if (trimmedContent && state.stack.length > 0) {
                            const currentComponent = state.stack[state.stack.length - 1];
                            if (!currentComponent.children) {
                                currentComponent.children = [];
                            }
                            if (typeof currentComponent.children === 'string') {
                                currentComponent.children = [{
                                    type: "text",
                                    value: currentComponent.children
                                }];
                            }
                            (currentComponent.children as ComponentData[]).push({
                                type: "text",
                                value: trimmedContent
                            });
                        }
                        state.buffer = '';
                        state.stack.pop();
                        i = closeTagEnd + 1;
                        continue;
                    }
                }

                // Handle opening tags
                const tagMatch = input.slice(i).match(/^<([A-Z][A-Za-z0-9]*)/);
                if (tagMatch) {
                    // Handle accumulated text before the tag
                    const componentName = tagMatch[1];

                    const registerComponentInfo = this.findComponentByName(componentName);

                    // 如果组件未注册，将整个标签作为文本处理
                    if (!registerComponentInfo) {
                        state.buffer += input[i];
                        i++;
                        continue;
                    }
                    const trimmedText = state.buffer.trim();
                    if (trimmedText && state.stack.length === 0) {
                        result.push({
                            type: "text",
                            value: trimmedText
                        });
                    } else if (trimmedText && state.stack.length > 0) {
                        const currentComponent = state.stack[state.stack.length - 1];
                        if (!currentComponent.children) {
                            currentComponent.children = [];
                        }
                        if (typeof currentComponent.children === 'string') {
                            currentComponent.children = [{
                                type: "text",
                                value: currentComponent.children
                            }];
                        }
                        (currentComponent.children as ComponentData[]).push({
                            type: "text",
                            value: trimmedText
                        });
                    }
                    state.buffer = '';

                    // const componentName = tagMatch[1];
                    let selfClosing = false;
                    // const registerComponentInfo = this.findComponentByName(componentName);
                    if (registerComponentInfo) {
                        selfClosing = registerComponentInfo.selfClosing;
                    }

                    const { props, endIndex } = this.parseComponentTag(input.slice(i), selfClosing);
                    const component: ComponentData = {
                        type: "component",
                        value: componentName,
                        props,
                        selfClosing
                    };

                    if (!selfClosing) {
                        state.stack.push(component);
                        if (state.stack.length === 1) {
                            result.push(component);
                        } else {
                            const parent = state.stack[state.stack.length - 2];
                            if (!parent.children || typeof parent.children === 'string') {
                                parent.children = [];
                            }
                            (parent.children as ComponentData[]).push(component);
                        }
                    } else {
                        if (state.stack.length === 0) {
                            result.push(component);
                        } else {
                            const parent = state.stack[state.stack.length - 1];
                            if (!parent.children || typeof parent.children === 'string') {
                                parent.children = [];
                            }
                            (parent.children as ComponentData[]).push(component);
                        }
                    }

                    i += endIndex;
                    char = input[i];
                    continue;
                }
            }

            state.buffer += char;
            i++;
        }

        // Handle any remaining text in the buffer
        const finalText = state.buffer.trim();
        if (finalText && state.stack.length === 0 && finalText !== '<') {
            result.push({
                type: "text",
                value: finalText.split('<')[0]
            });
        } else if (finalText && state.stack.length > 0) {
            const currentComponent = state.stack[state.stack.length - 1];
            if (!currentComponent.children) {
                currentComponent.children = [];
            }
            if (typeof currentComponent.children === 'string') {
                currentComponent.children = [{
                    type: "text",
                    value: currentComponent.children
                }];
            }
            (currentComponent.children as ComponentData[]).push({
                type: "text",
                value: finalText
            });
        }

        state.position = i;
        const processedResult = this.postprocessResult(result);

        // 清理代码块缓存
        this.codeBlocks.clear();
        this.blockCounter = 0;

        return processedResult;
        // return result;
    }


    private findComponentClose(input: string, startIndex: number): number {
        let depth = 1;
        let i = startIndex;
        let openclose = false; // 内嵌开闭标签要成对
        while (i < input.length) {
            if (input[i] === '/' && input[i + 1] === '>') {
                depth--;
                if (depth === 0) return i + 2;
                i += 2;
            } else if (input[i] === '<') {
                openclose = true;
                depth++;
                i++;
            }

            else if (input[i] === '>') {
                if (openclose) {
                    openclose = false;
                    depth--;
                }
                if (depth === 0) return i + 1;
                i++;
            } else {
                i++;
            }
        }
        return input.length;
    }

    private parseComponentTag(input: string, selfClosing: boolean): { props: Record<string, any>; endIndex: number } {
        const props: Record<string, any> = {};
        let i = 0;
        // 跳过组件名
        while (i < input.length && input[i] !== ' ' && input[i] !== '>') i++;
        if (!selfClosing) {
            return this.parsePropsCommon(input);
        }
        // 使用 parseProps 方法解析属性
        const propsContent = input.slice(i);

        const parsedProps = this.parsePropsSelfClosing(propsContent);
        Object.assign(props, parsedProps);

        const endIndex = this.findComponentClose(input, i);

        return { props, endIndex };
    }
    private parsePropsCommon(input: string): { props: Record<string, any>; endIndex: number; selfClosing: boolean } {
        const props: Record<string, any> = {};
        let i = 0;
        let inQuote = false;
        let quoteChar = '';
        let bracketCount = 0;
        let selfClosing = false;

        // 跳过组件名
        while (i < input.length && input[i] !== ' ' && input[i] !== '>') i++;

        while (i < input.length) {
            const char = input[i];

            if (char === '"' || char === "'") {
                if (!inQuote) {
                    inQuote = true;
                    quoteChar = char;
                } else if (char === quoteChar && bracketCount === 0) {
                    inQuote = false;
                }
            } else if (char === '{' && !inQuote) {
                bracketCount++;
            } else if (char === '}' && !inQuote) {
                bracketCount--;
            } else if (char === '/' && input[i + 1] === '>' && !inQuote && bracketCount === 0) {
                selfClosing = true;
                return { props, endIndex: i + 2, selfClosing };
            } else if (char === '>' && !inQuote && bracketCount === 0) {
                return { props, endIndex: i + 1, selfClosing };
            }

            if (char === '=' && !inQuote && bracketCount === 0) {
                let propName = '';
                let j = i - 1;
                while (j >= 0 && /[\w-]/.test(input[j])) {
                    propName = input[j] + propName;
                    j--;
                }

                let value = '';
                j = i + 1;

                if (input[j] === '{') {
                    // 处理 JSON 值
                    let startBracket = j;
                    bracketCount = 1;
                    j++;
                    while (j < input.length && bracketCount > 0) {
                        if (input[j] === '{') bracketCount++;
                        if (input[j] === '}') bracketCount--;
                        j++;
                    }
                    value = input.slice(startBracket + 1, j - 1);

                    try {
                        // 处理属性值中的模板字符串
                        value = value.replace(/`([^`]*)`/g, (match, p1) => {
                            return JSON.stringify(p1);
                        });

                        // 处理可能的对象字面量
                        if (value.trim().startsWith('{')) {
                            props[propName] = JSON.parse(value);
                        } else {
                            // 处理其他 JSON 值
                            try {
                                props[propName] = JSON.parse(value);
                            } catch {
                                // 如果不是有效的 JSON，保持原值
                                props[propName] = value;
                            }
                        }
                    } catch (e) {
                        console.warn(`Failed to parse prop value for ${propName}:`, value);
                        props[propName] = value;
                    }
                    i = j;
                    continue;
                } else if (input[j] === '"' || input[j] === "'") {
                    // 处理字符串值
                    const quote = input[j];
                    j++;
                    while (j < input.length && input[j] !== quote) {
                        value += input[j];
                        j++;
                    }
                    props[propName] = value;
                    i = j + 1;
                    continue;
                }
            }
            i++;
        }

        return { props, endIndex: i, selfClosing };
    }
    private parsePropsSelfClosing(content: string): Record<string, any> {
        const props: Record<string, any> = {};
        // 首先匹配属性名
        const propMatches = content.match(/(\w+)=\{/g);

        if (!propMatches) return props;

        for (const propMatch of propMatches) {
            const propName = propMatch.slice(0, -2); // 移除 ={
            let value = '';
            let startIndex = content.indexOf(propMatch) + propMatch.length;
            let bracketCount = 1;

            // 逐字符扫描，正确处理嵌套的花括号
            for (let i = startIndex; i < content.length; i++) {
                if (content[i] === '{') {
                    bracketCount++;
                } else if (content[i] === '}') {
                    bracketCount--;
                    if (bracketCount === 0) {
                        // 找到匹配的结束花括号
                        value = content.slice(startIndex, i);
                        break;
                    }
                }
            }

            try {

                value = value.replace(/`([^`]*)`/g, function (match, p1) {
                    // 处理内部的特殊字符
                    return '"' + p1
                        .replace(/\n/g, '\\n') // 替换换行符
                        .replace(/\r/g, '\\r') // 替换回车符
                        .replace(/"/g, '\\"') // 转义双引号
                        .replace(/\t/g, '\\t') // 替换制表符
                        + '"';
                });
                value = value.replace(/:\s*"(.*?)(?="\s*(?:,|$))/g, function (match, p1) {
                    // 只对未转义的双引号进行转义
                    const escapedValue = p1.replace(/(?<!\\)"/g, '\\"');
                    return ': "' + escapedValue + '';
                });
                value = value.replace(/(?<!\\)\\\\"/g, '\\"'); // 只对未转义的 \\" 进行转换


                const parsedData = JSON.parse(value);
                props[propName] = parsedData;
            } catch (e) {
                // console.error(`Failed to parse prop value for ${propName}: ${value}`);
                if (value) props[propName] = value;
            }
        }

        return props;
    }
    reset() {
        this.messages.clear();
    }
}
