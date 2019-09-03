import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { ChipsInput } from '../_common/ChipsInput';
import { Label } from '../_common/Label';
import styles from './Chips.scss';
import { useInput } from '../_common/hooks/useInput';

const Text = ({
  value = "",
  onChange = () => {},

  label = "",
  placeholder = "",
  className = "",
  prefixClassName = "",
  error = "",

  onFocus = () => {},
  onBlur = () => {},
  disabled = false,

  innerRef = {},
}) => {
  const _TextInputDOM = useRef();
  const { focused, setFocused, handleFocus, handleBlur } = useInput(
    _TextInputDOM,
    onFocus,
    onBlur,
  );
  const errorClassName = error ? `${prefixClassName}-error` : "";
  return (
    <div
      className={`${styles.text} ${prefixClassName} ${className}`}
      data-testid="chips"
    >
      <Label
        focused={focused}
        error={error}
        className={`${styles.dropdownLabel} ${prefixClassName}-label ${errorClassName}`}
      >
        {label}
      </Label>
      <ChipsInput
        className={`${prefixClassName}-chipsInput ${errorClassName}`}
        inputRef={_TextInputDOM}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        onClick={setFocused}
        focused={focused}
        active={focused}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

Text.propTypes = {
  /** Placeholder for the Input */
  placeholder: PropTypes.string,
  /** ClassName for the Chips element */
  className: PropTypes.string,
  /** Value of the Chips Input */
  value: PropTypes.string,
  /** Label for the Chips */
  label: PropTypes.string,
  /** Error for Chips */
  error: PropTypes.string,
  /** onChange Callback */
  onChange: PropTypes.func,
  /** PrefixClassName for The Chips */
  prefixClassName: PropTypes.string,
  /** onFocus Callback */
  onFocus: PropTypes.func,
  /** onBlur Callback */
  onBlur: PropTypes.func,
  /** Bool to toggle Enable/Disable */
  disabled: PropTypes.bool,
  /** Ref passed to Chips */
  innerRef: PropTypes.object,
};

export default Text;
