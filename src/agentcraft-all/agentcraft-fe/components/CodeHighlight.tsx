import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vs,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

type tProps = {
  textContent: string;
  language: string;
  darkMode?: boolean;
};

const them = {
  dark: vscDarkPlus,
  light: vs,
};

const CodeHighlight = (props: tProps) => {
  const { textContent, darkMode, language = "txt" } = props;
  return (
    <SyntaxHighlighter style={them.dark} language={language} PreTag="div">
      {String(textContent).replace(/\n$/, "")}
    </SyntaxHighlighter>
  );
};

export default CodeHighlight;
