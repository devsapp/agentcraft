import React, { useState, Suspense } from 'react';
import ReactMarkdown from 'react-markdown';
import CodeHighlight from '@/components/CodeHighlight';
import styles from '@/styles/chat.module.scss';


type tProps = {
  className?: string;
  textContent: string;
  value?: string,
  darkMode?: boolean; // markdown文本
};



const MarkdownContent = (props: tProps) => {
  const { textContent, darkMode, className, value } = props;
  const [showCopy, setShowCopy] = useState(false);
  const copy2Clipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('复制成功')
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
      alert('复制成功')
    }
  };
  return (
    <ReactMarkdown
      linkTarget={"_blank"}
      className={className}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <div className={styles['code-container']} onMouseEnter={() => setShowCopy(true)} onMouseLeave={() => setShowCopy(false)}>
              <button className={styles['copy-btn']} style={{ visibility: showCopy ? 'visible' : 'hidden' }} onClick={() => copy2Clipboard(value || textContent)}>Copy</button>
              <Suspense>
                <CodeHighlight
                  darkMode={darkMode}
                  language={match[1]}
                  {...props}
                  textContent={String(children).replace(/\n$/, '')}
                />
              </Suspense>
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {textContent}
    </ReactMarkdown>
  );
};

export default MarkdownContent;
