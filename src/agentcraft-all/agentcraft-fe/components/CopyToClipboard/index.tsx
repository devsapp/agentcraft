import { useState } from 'react';
import { ActionIcon, Tooltip, Text, Flex } from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import styles from './index.module.scss';

type CopyToClipboardProps = {
    value?: string,
    content?: any,
    width?: any,
    truncate?: any,
    position?: any
}

export function useClipboard({ timeout = 2000 } = {}) {
    // @ts-ignore
    const [error, setError] = useState<Error>(null);
    const [copied, setCopied] = useState(false);
    const [copyTimeout, setCopyTimeout] = useState(null);

    const handleCopyResult = (value: boolean) => {
        // @ts-ignore
        clearTimeout(copyTimeout);
        // @ts-ignore
        setCopyTimeout(setTimeout(() => setCopied(false), timeout));
        setCopied(value);
    };

    const copy = (valueToCopy: any) => {
        if ('clipboard' in navigator) {
            navigator.clipboard
                .writeText(valueToCopy)
                .then(() => handleCopyResult(true))
                .catch((err) => setError(err));
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = valueToCopy;
            textArea.style.position = "absolute";
            textArea.style.left = "-999999px";

            document.body.prepend(textArea);
            textArea.select();

            try {
                document.execCommand('copy');
            } catch (error) {
                console.error(error);
            } finally {
                textArea.remove();
                handleCopyResult(true)
            }

        }
    };

    const reset = () => {
        setCopied(false);
        // @ts-ignore
        setError(null);
        // @ts-ignore
        clearTimeout(copyTimeout);
    };

    return { copy, reset, error, copied };
}
export default function CopyToClipboard({ value, content, truncate, width = 'auto', position = "right" }: CopyToClipboardProps) {
    const clipboard = useClipboard({ timeout: 500 });

    return <Tooltip label={clipboard.copied ? '已复制' : '复制'} withArrow position={position} >
        <Flex
            onClick={() => clipboard.copy(value)}
            mih={50}
            style={{ width }}
            gap="xs"
            justify="flex-start"
            align="center"
            direction="row"
            wrap="nowrap">
            {content ? <Text truncate={truncate} className={styles['copy-to-clipboard-content']}>{content}</Text> : null}
            <ActionIcon color={clipboard.copied ? 'teal' : 'gray'} >
                {clipboard.copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
            </ActionIcon>
        </Flex>
    </Tooltip>

}