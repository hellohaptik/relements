import React from "react";
import PropTypes from "prop-types";
import cc from "classcat";

import styles from "./RadioOption.scss";

const RadioOption = ({
  label,
  onChange,
  value,
  innerRef,
  className,
  prefixClassName,
}) => {
  const classNames = {
    main: cc([
      styles.radioOption,
      className,
      prefixClassName,
      { [styles.selected]: value },
      { [styles.selected]: `${prefixClassName}-selected` },
    ]),
    box: cc([
      styles.radioOptionBox,
      `${prefixClassName}-box`,
      { [styles.selected]: value },
    ]),
    boxIcon: cc([
      styles.radioOptionBoxTick,
      `${prefixClassName}-box-tick`,
      { [styles.selected]: value },
    ]),
    label: cc([
      styles.radioOptionText,
      `${prefixClassName}-text`,
      { [styles.selected]: value },
    ]),
  };

  return (
    <div
      data-testid="radio-item"
      ref={innerRef}
      className={classNames.main}
      onClick={e => onChange(!value, e)}
    >
      <div className={classNames.box}>
        <div className={classNames.boxIcon} />
      </div>
      <span className={classNames.label}>{label}</span>
    </div>
  );
};

RadioOption.propTypes = {
  /** Label text */
  label: PropTypes.string,
  /** The classname to appended to the outermost element */
  className: PropTypes.string,
  /** onChange callback */
  onChange: PropTypes.func,
  /** The value of the input */
  value: PropTypes.bool,
  /** For assigning a ref to the outermost element */
  innerRef: PropTypes.func,
  /** The prefix classname appended to all elements */
  prefixClassName: PropTypes.string,
};

RadioOption.defaultProps = {
  label: "",
  className: "",
  onChange: () => {},
  value: false,
  innerRef: () => {},
  prefixClassName: "",
};

RadioOption.classNames = {
  $prefix: "Outermost element",
  "$prefix-box": "Div wrapping the icon",
  "$prefix-box-tick": "The icon div",
  "$prefix-text": "The Text of each of the radio options",
};

export default RadioOption;
