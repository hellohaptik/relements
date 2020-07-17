import React, { useState, useEffect } from "react";
import cc from "classcat";
import PropTypes from "prop-types";
import Context from "@src/components/Context";

import styles from "./TextInput.scss";

export const TextInput = ({
  className,
  onKeyDown,
  onFocus,
  onBlur,
  onMouseDown,
  innerRef,
  value,
  onChange,
  focused,
  error,
  placeholder = "Type here...",
  inputRef,
  disabled,
  editable,
  multiline,
  prefixClassName,
  prefixComponent,
  postfixComponent,
}) => {
  const input = React.useRef(null);
  const { primaryColor } = React.useContext(Context);
  const focusedStyle =
    !disabled && focused ? { borderColor: primaryColor } : {};
  const focusedClassNameString = focused ? "focused" : "";
  const errorClassName = error ? styles.error : "";
  const disabledClassName = disabled ? styles.disabled : "";
  const [textValue, setTextValue] = useState();

  const handleRef = React.useCallback(ref => {
    input.current = ref;
    if (typeof inputRef === "function") inputRef(ref);
    else inputRef.current = ref;
  });

  const handleChange = e => {
    onChange(e.target.value);
    setTextValue(e.target.value);

    if (multiline && input.current) {
      input.current.style.height = `auto`;
      input.current.style.height = `${input.current.scrollHeight}px`;
    }
  };

  const renderInput = () =>
    multiline ? (
      <textarea
        disabled={disabled || !editable}
        value={textValue}
        onChange={handleChange}
        placeholder={placeholder}
        type="text"
        ref={handleRef}
        className={`${prefixClassName}-input`}
      />
    ) : (
      <input
        disabled={disabled || !editable}
        value={textValue}
        onChange={handleChange}
        placeholder={placeholder}
        data-testid="inputText"
        type="text"
        ref={handleRef}
        className={`${prefixClassName}-input`}
      />
    );

  useEffect(() => {
    setTextValue(value);
  }, [value]);

  const classNames = {
    main: cc([
      styles.inputWrapper,
      className,
      prefixClassName,
      focusedClassNameString,
      errorClassName,
      disabledClassName,
    ]),
  };

  return (
    <div
      ref={innerRef}
      tabIndex="0"
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseDown={onMouseDown}
      onKeyDown={onKeyDown}
      className={classNames.main}
      style={focusedStyle}
    >
      {prefixComponent}
      <div className={`${styles.input} ${prefixClassName}-inner`}>
        {renderInput()}
      </div>
      {postfixComponent}
    </div>
  );
};

TextInput.propTypes = {
  className: PropTypes.string,
  editable: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  focused: PropTypes.bool,
  innerRef: PropTypes.func,
  inputRef: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseDown: PropTypes.func,
  placeholder: PropTypes.string,
  postfixComponent: PropTypes.node,
  prefixClassName: PropTypes.string,
  prefixComponent: PropTypes.node,
  value: PropTypes.string,
  multiline: PropTypes.bool,
};

TextInput.defaultProps = {
  className: "",
  editable: true,
  disabled: false,
  error: false,
  focused: false,
  multiline: false,
  innerRef: () => {},
  inputRef: () => {},
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  onMouseDown: () => {},
  placeholder: "",
  prefixClassName: "",
  value: "",
};
