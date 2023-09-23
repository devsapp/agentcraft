

import { useState } from 'react';
import { ActionIcon, Tooltip, } from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';


type CopyToClipboardProps = {
    value: string
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
            // Use the 'out of viewport hidden text area' trick
            const textArea = document.createElement("textarea");
            textArea.value = valueToCopy;

            // Move textarea out of the viewport so it's not visible
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
export default function CopyToClipboard({ value }: CopyToClipboardProps) {
    const clipboard = useClipboard({ timeout: 500 });
    
    return <Tooltip label={clipboard.copied ? '已复制' : '复制'} withArrow position="right">
        <ActionIcon color={clipboard.copied ? 'teal' : 'gray'} onClick={() => clipboard.copy(value)}>
            {clipboard.copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
        </ActionIcon>
    </Tooltip>
}