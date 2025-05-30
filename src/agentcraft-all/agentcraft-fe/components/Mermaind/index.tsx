import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import mermaid from 'mermaid';

// 全局缓存
const globalSvgCache = new Map<string, string>()

export default function MermaidRenderer({ chart, index }: { chart: string, index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const [ready, setReady] = useState(false)
    const [error, setError] = useState<string | null>(null)
    
    const chartId = useMemo(() => 
        `mermaid-${index}-${Math.random().toString(36).substr(2, 9)}`, 
        [index]
    )

    const renderChart = useCallback(async () => {
        if (!chart || !ref.current) return

        try {
            // 检查全局缓存
            const cachedSvg = globalSvgCache.get(chart)
            if (cachedSvg) {
                ref.current.innerHTML = cachedSvg
                return
            }

            // @ts-ignore
            if (!mermaid.initialized) {
                await mermaid.initialize({
                    startOnLoad: false,
                    theme: 'default',
                    securityLevel: 'loose',
                    themeVariables: {
                        primaryColor: '#2196f3',
                    }
                })
            }

            const { svg } = await mermaid.render(chartId, chart.trim())
            
            if (ref.current) {
                ref.current.innerHTML = svg
                // 更新全局缓存
                globalSvgCache.set(chart, svg)
            }
            
            setError(null)
        } catch (error) {
            console.error('Failed to render mermaid chart:', error)
            setError(error instanceof Error ? error.message : 'Failed to render chart')
        }
    }, [chart, chartId])

    useEffect(() => {
        setReady(true)
        return () => {
            // 清理工作
            if (ref.current) {
                ref.current.innerHTML = ''
            }
        }
    }, [])

    useEffect(() => {
        if (ready) {
            renderChart()
        }
    }, [ready, renderChart])

    if (!ready) return null
    if (error) return <div className="mermaid-error"></div>

    return (
        <div className="mermaid-wrapper">
            <div ref={ref} className="mermaid-container" />
        </div>
    )
}
