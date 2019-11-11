import React, { useRef } from "react";
import PropTypes from "prop-types";

import { TextInput } from "../_common/TextInput";
import { Label } from "../_common/Label";
import styles from "./Text.scss";
import { useInput } from "../_common/hooks/useInput";

const Text = ({
  value,
  onChange,

  label,
  placeholder,
  className,
  prefixClassName,
  error,
  tooltip,

  onFocus,
  onBlur,
  onKeyDown,
  disabled,
  multiline,
  innerRef,
}) => {
  const _TextInputDOM = useRef();
  const { focused, setFocused, handleFocus, handleBlur } = useInput(
    _TextInputDOM,
    onFocus,
    onBlur,
  );
  const errorClassName = error ? "error" : "";
  const disabledClassName = disabled ? "disabled" : "";

  const handleRef = React.useCallback(ref => {
    _TextInputDOM.current = ref;
    if (typeof innerRef === "function") innerRef(ref);
    else innerRef.current = ref;
  });

  return (
    <div
      className={`${styles.text} ${prefixClassName} ${className} ${errorClassName} ${disabledClassName}`}
      data-testid="text"
    >
      <Label
        focused={focused}
        error={error}
        className={`${styles.dropdownLabel} ${prefixClassName}-label`}
        disabled={disabled}
        tooltip={tooltip}
      >
        <span>{label}</span>
      </Label>
      <TextInput
        inputRef={handleRef}
        prefixClassName={prefixClassName}
        className={`${prefixClassName}-textinput`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
        onChange={onChange}
        onClick={setFocused}
        focused={focused}
        active={focused}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        multiline={multiline}
      />
    </div>
  );
};

Text.propTypes = {
  /** Place Holder Text for an Empty Text Field */
  placeholder: PropTypes.string,
  /** Classname for the Parent element */
  className: PropTypes.string,
  /** Value of the Text Field */
  value: PropTypes.string,
  /** Label for the input */
  label: PropTypes.string,
  /** Error to be displayed (if any) */
  error: PropTypes.string,
  /** onChange Callback */
  onChange: PropTypes.func,
  /** A classname prepended on parent */
  prefixClassName: PropTypes.string,
  /** onFocus Callback */
  onFocus: PropTypes.func,
  /** onBlur Callback */
  onBlur: PropTypes.func,
  /** onKeyDown Callback */
  onKeyDown: PropTypes.func,
  /** Disable Flag for input */
  disabled: PropTypes.bool,
  /** Tooltip to help user with the input fields */
  tooltip: PropTypes.string,
  /** If you want to render a textarea instead */
  multiline: PropTypes.bool,
  /** Passing Ref for input field reference */
  innerRef: PropTypes.func,
};

Text.defaultProps = {
  placeholder: "",
  className: "",
  value: "",
  label: "",
  error: "",
  tooltip: "",
  disabled: false,
  multiline: false,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onKeyDown: () => {},
  innerRef: () => {},
};

Text.classNames = {
  $prefix: "Prefix ClassName added to the Parent",
  "$prefix-label": "Added to the Label Component",
  "$prefix-textinput": "Added to the Text Input Component",
  "$prefix-input": "Added to the input DOM Node",
};

export default Text;
