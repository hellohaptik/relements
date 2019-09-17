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
  prefixClassName,
  prefixComponent,
  postfixComponent,
}) => {
  const { primaryColor } = React.useContext(Context);
  const focusedStyle =
    !disabled && focused ? { borderColor: primaryColor } : {};
  const focusedClassNameString = focused ? "focused" : "";
  const errorClassName = error ? styles.error : "";
  const disabledClassName = disabled ? styles.disabled : "";
  const [textValue, setTextValue] = useState();
  const handleChange = e => {
    onChange(e.target.value);
    setTextValue(e.target.value);
  };

  const renderInput = () => (
    <input
      disabled={disabled || !editable}
      value={textValue}
      onChange={handleChange}
      placeholder={placeholder}
      type="text"
      ref={inputRef}
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
};

TextInput.defaultProps = {
  className: "",
  editable: true,
  disabled: false,
  error: false,
  focused: false,
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
