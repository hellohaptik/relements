import React, { useState, useEffect } from "react";
import cc from "classcat";
import PropTypes from "prop-types";
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
  prefixClassName,
  prefixComponent,
  postfixComponent,
}) => {
  const focusedClassName = !disabled && focused ? styles.focused : '';
  const focusedClassNameString = focused ? 'focused' : '';
  const errorClassName = error ? styles.error : '';
  const [textValue, setTextValue] = useState();

  const handleChange = e => {
    onChange(e.target.value);
    setTextValue(e.target.value);
  };

  const renderInput = () => (
    <input
      disabled={disabled}
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
      focusedClassName,
      focusedClassNameString,
      errorClassName,
    ]),
  };

  return (
    <div
      ref={innerRef}
      tabIndex="0"
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseDown={onMouseDown}
      className={classNames.main}
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
