import React from "react";
import jsxToString from "jsx-to-string";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

import Provider from "@src/components/Context/Provider";
import useActivify from "@src/hooks/useActivify";

import styles from "./CodeBlock.scss";

const CodeBlock = ({
  customStyles = {},
  children,
  title,
  defaultValue,

  // TODO: Find a better approach to render code other than codeString
  codeString,
}) => {
  const codeRef = React.useRef();
  const childRef = React.useRef();
  const [value, setValue] = React.useState(defaultValue);
  const [codeOpen, setCodeOpen] = React.useState(false);
  const [codeHeight, setCodeHeight] = React.useState(false);
  const { visible, enabled } = useActivify(codeOpen);
  const bodyStyle = visible
    ? { height: codeHeight, opacity: 1 }
    : { height: 0, opacity: 1 };
  const toggledClassName = visible ? styles.toggled : "";
  const toggleCode = React.useCallback(() => {
    if (codeOpen) setCodeOpen(false);
    else setCodeOpen(true);
  });

  React.useLayoutEffect(() => {
    if (!codeRef.current) return;
    const rect = codeRef.current.getBoundingClientRect();
    setCodeHeight(rect.height);
  }, [enabled]);

  const child =
    typeof children === "function"
      ? children(value, setValue, childRef)
      : children;

  return (
    <Provider>
      <div className={styles.codeBlockWrapper}>
        {title ? <div className={styles.codeBlockTitle}>{title}</div> : null}
        <div className={styles.codeBlock} style={customStyles}>
          <div className={`${styles.codeBlockPreview} ${toggledClassName}`}>
            {child}
          </div>
          {enabled ? (
            <div style={bodyStyle} className={styles.codeBlockBody}>
              <div ref={codeRef} className="language-javascript">
                <SyntaxHighlighter language="jsx" style={tomorrow}>
                  {codeString ||
                    child.props.originalType.__codeString ||
                    CodeBlock.getCode(child)}
                </SyntaxHighlighter>
              </div>
            </div>
          ) : null}
        </div>
        <div onClick={toggleCode} className={styles.codeBlockToggle}>
          {`${codeOpen ? "Hide" : "Show"} Code`}
        </div>
      </div>
    </Provider>
  );
};

CodeBlock.getCode = child => {
  return jsxToString(child, {
    displayName: child.props.mdxType,
    ignoreProps: ["mdxType", "originalType"],
  });
};

export default CodeBlock;
