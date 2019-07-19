import React from "react";
import PropTypes from "prop-types";
import cc from "classcat";

import TickIcon from "icons/checkmark.svg";
import Icon from "components/UI/Icon";

import styles from "./CheckboxOption.scss";

const CheckboxOption = ({
  label,
  onChange,
  value,
  innerRef,
  className,
  prefixClassName,
}) => {
  const classNames = {
    main: cc([
      styles.checkboxOption,
      className,
      prefixClassName,
      { [styles.selected]: value },
      { [styles.selected]: `${prefixClassName}-selected` },
    ]),
    box: cc([
      styles.checkboxOptionBox,
      `${prefixClassName}-box`,
      { [styles.selected]: value },
    ]),
    boxIcon: cc([
      styles.checkboxOptionBoxTick,
      `${prefixClassName}-box-tick`,
      { [styles.selected]: value },
    ]),
    label: cc([
      styles.checkboxOptionText,
      `${prefixClassName}-text`,
      { [styles.selected]: value },
    ]),
  };

  return (
    <div
      ref={innerRef}
      className={classNames.main}
      onClick={e => onChange(!value, e)}
    >
      <div className={classNames.box}>
        <Icon className={classNames.boxIcon} src={TickIcon} />
      </div>
      <span className={classNames.label}>{label}</span>
    </div>
  );
};

CheckboxOption.propTypes = {
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

CheckboxOption.defaultProps = {
  label: "",
  className: "",
  onChange: () => {},
  value: false,
  innerRef: () => {},
  prefixClassName: "",
};

CheckboxOption.classNames = {
  $prefix: "Outermost element",
  "$prefix-icon": "Div wrapping the icon",
  "$prefix-icon-inner": "The icon div",
  "$prefix-text": "The Text of each of the checkbox options",
};

export default CheckboxOption;
