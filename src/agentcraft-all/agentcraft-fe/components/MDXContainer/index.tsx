
import React, { useState, useEffect, useRef } from 'react';
import RemarkMath from "remark-math";
import RemarkBreaks from "remark-breaks";
import { Loader } from '@mantine/core';
import RemarkGfm from "remark-gfm";
import { MDXProvider } from '@mdx-js/react'
import { compile } from '@mdx-js/mdx';
//@ts-ignore
import MDX from '@mdx-js/runtime';
import CodeHighlight from '@/components/CodeHighlight';


import ModelView from '@/mdx/ModelView';
import Scenes from '@/mdx/Scenes';
import Features from '@/mdx/Features';



import "katex/dist/katex.min.css";

const components = {
    ModelView,
    Features,
    Scenes,
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
    }
}



export function MdxLayout({ children }: { children: React.ReactNode }) {
    // Create any shared layout or styles here
    return <div style={{ color: 'blue' }} className="markdown-body">{children}</div>
}
export function parseAndRender(mdxString: string) {

}
export default function MDXContainer({ content, scope = {} }: any) {
    const [Component, setComponent] = useState(null);
    const [loading, setLoading] = useState(false);

    const timerRef: any = useRef();

    useEffect(() => {
        const parseMDX = async () => {
            let MDXComponent: any = null;
            try {
                setLoading(false);
                await compile(content);
                MDXComponent = <MDX components={components} scope={scope} remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}>
                    {content}
                </MDX>;
                setComponent(MDXComponent);
            } catch (e) {
                setLoading(true);
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                }
                timerRef.current = setTimeout(() => {
                    setLoading(false);
                }, 3000);
            }
        }
        parseMDX();
    }, [content]);

    return (
        <MDXProvider >
            <MdxLayout>
                {Component}
                {loading && <div>组件加载中...<Loader /></div>}
            </MdxLayout>
        </MDXProvider>

    )
}