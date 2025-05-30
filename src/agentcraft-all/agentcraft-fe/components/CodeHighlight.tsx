import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs, vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import MermaidRenderer from "@/components/Mermaind"; // 假设这是正确的路径
import { notifications } from "@mantine/notifications";

type CodeHighlightProps = {
  textContent: string;
  language: string;
  darkMode?: boolean;
};

const themes = {
  dark: vscDarkPlus,
  light: vs,
};

const CodeHighlight: React.FC<CodeHighlightProps> = ({ textContent, language = "txt", darkMode }) => {
  const [showCopy, setShowCopy] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
      } catch (error) {
        console.error("Fallback copy failed", error);
      }
      document.body.removeChild(textarea);
    }

    notifications.show({
      title: "复制成功",
      message: "代码已复制到剪贴板",
      color: "green",
    });
  };

  if (language === "mermaid") {
    // @ts-ignore
    return <MermaidRenderer chart={String(textContent)} key={Date.now()} />;
  }

  return (
    <div style={{ position: "relative" }}>
      <button
        style={{
          position: "absolute",
          right: "10px",
          top: "5px",
          zIndex: 1,
          background: "#333",
          color: "#fff",
          border: "none",
          padding: "4px 8px",
          fontSize: "12px",
          cursor: "pointer",
          borderRadius: "4px",
        }}
        onClick={(e) => {
          e.preventDefault();
          copyToClipboard(String(textContent));
        }}
        onMouseEnter={() => setShowCopy(true)}
        onMouseLeave={() => setShowCopy(false)}
      >
        复制
      </button>
      <SyntaxHighlighter style={themes.dark} language={language} PreTag="div">
        {String(textContent).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeHighlight;