import React, { useState, Suspense } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vs,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { notifications } from '@mantine/notifications';
import styles from '@/styles/chat.module.scss';
type tProps = {
  language: string;
  darkMode?: boolean;
  children: any;
};

const them = {
  dark: vscDarkPlus,
  light: vs,
};

const CodeHighlight = (props: tProps) => {
  const { language = "txt", children, ...rest } = props;
  const [showCopy, setShowCopy] = useState(false);
  const copy2Clipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
      } catch (error) {
        console.log(error);
      }
      document.body.removeChild(textArea);

    }
    notifications.show({
      title: '复制成功',
      message: '您已完成复制',
      color: 'green',
    });
  };
  const extractTextFromChildren = (children: any): string => {
    return React.Children.toArray(children).map(child => {
      if (typeof child === 'string') {
        return child;
      }
      if (React.isValidElement(child)) {
        return extractTextFromChildren(child.props.children);
      }
      return '';
    }).join('');
  };
  const value = extractTextFromChildren(children).replace(/\n$/, '');
  return (
    <div className={styles['code-container']} onMouseEnter={() => setShowCopy(true)} onMouseLeave={() => setShowCopy(false)}>
      <button className={styles['copy-btn']} style={{ visibility: showCopy ? 'visible' : 'hidden' }} onClick={() => copy2Clipboard(value)}>复制</button>
      <Suspense>
        <SyntaxHighlighter
          {...rest}
          PreTag="div"
          style={them.dark}
          language={language}
        >
          {value}
        </SyntaxHighlighter >
      </Suspense>
    </div>

  );
};

export default CodeHighlight;
