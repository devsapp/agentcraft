import { Accordion } from '@mantine/core';
export const Think = (props: any) => {
    if(!props.children) {
        return <div></div>
    }
    return (
        <Accordion variant="filled" radius="xs" defaultValue="deep-thinking" style={{ marginBottom: 12,backgroundColor: '#FFF'}}>
            <Accordion.Item value="deep-thinking">
                <Accordion.Control style={{ height: 32, lineHeight: '32px', fontSize: 14 }}>
                    ❀ 深度思考
                </Accordion.Control>
                <Accordion.Panel >
                    <blockquote style={{
                        borderLeft: '2px solid #ddd',
                        color: '#666',
                        paddingLeft: 8,
                        fontStyle: 'italic',
                        marginBottom: 0
                    }}>
                        {props.children}
                    </blockquote>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
};