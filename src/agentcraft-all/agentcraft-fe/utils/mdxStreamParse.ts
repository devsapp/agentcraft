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

    constructor(components: any[]) {
        this.registeredComponents = new Set(components);

        this.messages = new Map();
    }
    findComponentByName(name: string): any | undefined {
        for (const component of this.registeredComponents) {
            if (component.name === name) {
                return component;
            }
        }
        return undefined; // Return undefined if no component is found
    }
    parse(messageId: string, input: string): ComponentData[] {
        // let state = this.messages.get(messageId);
        // if (!state) {
        //     state = {
        //         position: 0,
        //         stack: [],
        //         buffer: ''
        //     };
        //     this.messages.set(messageId, state);
        // }
        let state: ParserState = {
            position: 0,
            stack: [],
            buffer: ''
        };

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
        if (finalText && state.stack.length === 0) {
            if (finalText === '<') {
                result.push({
                    type: "text",
                    value: ''
                });
            } else {
                result.push({
                    type: "text",
                    value: finalText
                });
            }

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
        return result;
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

        // 先找到当前标签的结束位置
        const endIndex = content.indexOf('/>');
        if (endIndex === -1) return props;

        // 只处理当前标签内的内容
        const tagContent = content.slice(0, endIndex);

        // 使用更精确的正则匹配属性
        const propRegex = /(\w+)=(?:"([^"]*)"|'([^']*)'|{([^}]*)})/g;
        let match;

        while ((match = propRegex.exec(tagContent)) !== null) {
            const propName = match[1];
            let value;

            if (match[2] !== undefined) { // 处理双引号值
                value = match[2];
            } else if (match[3] !== undefined) { // 处理单引号值
                value = match[3];
            } else if (match[4] !== undefined) { // 处理花括号值
                try {
                    value = JSON.parse(match[4]);
                } catch (e) {
                    value = match[4]; // 解析失败保留原始值
                }
            }

            props[propName] = value;
        }

        return props;
    }

    // private parsePropsSelfClosing(content: string): Record<string, any> {
    //     const props: Record<string, any> = {};
    //     // 首先匹配属性名
    //     // const propMatches = content.match(/(\w+)=\{/g);
    //     const propMatches = content.match(/(\w+)=(?:"([^"]*)"|{([^}]*)})/g);
    //     if (!propMatches) return props;

    //     for (const propMatch of propMatches) {

    //         if (propMatch.includes('="')) {
    //             const equalIndex = propMatch.indexOf('=');
    //             const propName = propMatch.slice(0, equalIndex).trim();
    //             // 提取引号内的内容，去掉首尾引号
    //             const quotedValue = propMatch.slice(equalIndex + 1).trim();
    //             const value = quotedValue.slice(1, -1); // 去掉首尾引号
    //             props[propName] = value;
    //             continue;
    //         }

    //         const propName = propMatch.slice(0, -2); // 移除 ={
    //         let value = '';
    //         let startIndex = content.indexOf(propMatch) + propMatch.length;
    //         let bracketCount = 1;

    //         // 逐字符扫描，正确处理嵌套的花括号
    //         for (let i = startIndex; i < content.length; i++) {
    //             if (content[i] === '{') {
    //                 bracketCount++;
    //             } else if (content[i] === '}') {
    //                 bracketCount--;
    //                 if (bracketCount === 0) {
    //                     // 找到匹配的结束花括号
    //                     value = content.slice(startIndex, i);
    //                     break;
    //                 }
    //             }
    //         }

    //         try {

    //             value = value.replace(/`([^`]*)`/g, function (match, p1) {
    //                 // 处理内部的特殊字符
    //                 return '"' + p1
    //                     .replace(/\n/g, '\\n') // 替换换行符
    //                     .replace(/\r/g, '\\r') // 替换回车符
    //                     .replace(/"/g, '\\"') // 转义双引号
    //                     .replace(/\t/g, '\\t') // 替换制表符
    //                     + '"';
    //             });
    //             value = value.replace(/:\s*"(.*?)(?="\s*(?:,|$))/g, function (match, p1) {
    //                 // 只对未转义的双引号进行转义
    //                 const escapedValue = p1.replace(/(?<!\\)"/g, '\\"');
    //                 return ': "' + escapedValue + '';
    //             });
    //             value = value.replace(/(?<!\\)\\\\"/g, '\\"'); // 只对未转义的 \\" 进行转换


    //             const parsedData = JSON.parse(value);
    //             props[propName] = parsedData;
    //         } catch (e) {
    //             // console.error(`Failed to parse prop value for ${propName}: ${value}`);
    //             if (value) props[propName] = value;
    //         }
    //     }

    //     return props;
    // }
    reset() {
        this.messages.clear();
    }
}
