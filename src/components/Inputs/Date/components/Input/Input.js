import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import styles from "./Input.scss";

function Input({
  label,
  value,
  className,
  disabled,
  onFocus,
  focused,
  compare,
  prefixClassName,
}) {
  const date = dayjs.isDayjs(value) ? dayjs(value).format("DD MMM, YYYY") : "";
  const focusedClassName = focused ? styles.focused : "";
  const compareClassName = compare ? styles.compare : "";
  return (
    <div
      className={`${styles.input} ${className} ${compareClassName} ${focusedClassName} ${prefixClassName}`}
    >
      <span className={`${styles.inputLabel} ${prefixClassName}-label`}>
        {label}
      </span>
      <input
        onFocus={onFocus}
        value={date}
        className={`${styles.inputField} ${prefixClassName}-input`}
        placeholder="Selecting"
        disabled={disabled}
      />
    </div>
  );
}

Input.propTypes = {
  className: PropTypes.string,
  compare: PropTypes.bool,
  disabled: PropTypes.bool,
  focused: PropTypes.bool,
  label: PropTypes.string,
  onFocus: PropTypes.func,
  prefixClassName: PropTypes.string,
  value: PropTypes.object,
};

Input.defaultProps = {
  className: "",
  compare: false,
  disabled: false,
  focused: false,
  label: "",
  onFocus: () => {},
  prefixClassName: "",
  value: {},
};

export default Input;
