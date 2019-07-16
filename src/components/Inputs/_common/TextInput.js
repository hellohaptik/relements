import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './TextInput.scss';

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
  placeholder = 'Type here...',
  inputRef,
  disabled,

  prefixComponent,
  postfixComponent,
}) => {
  const focusedClassName = !disabled && focused ? styles.focused : '';
  const focusedClassNameString = focused ? 'focused' : '';
  const errorClassName = error ? styles.error : '';
  const [textValue, setTextValue] = useState();

  const handleChange = (e) => {
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
      className={`${errorClassName}`}
    />
  );

  useEffect(() => {
    setTextValue(value);
  }, [value]);

  return (
    <div
      ref={innerRef}
      tabIndex="0"
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseDown={onMouseDown}
      className={`${styles.inputWrapper} ${className} ${focusedClassName} ${focusedClassNameString} ${errorClassName}`}
    >
      {prefixComponent}
      <div className={styles.input}>{renderInput()}</div>
      {postfixComponent}
    </div>
  );
};
