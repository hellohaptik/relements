import React from "react";
import PropTypes from "prop-types";
import cc from "classcat";

import Context from "@src/components/Context";
import Icon from "@src/components/UI/Icon";
import TickIcon from "@src/icons/checkmark.svg";

import styles from "./CheckboxOption.scss";

const CheckboxOption = ({
  label,
  onChange,
  value,
  innerRef,
  className,
  prefixClassName,
}) => {
  const { primaryColor } = React.useContext(Context);
  const classNames = {
    main: cc([
      styles.checkboxOption,
      className,
      prefixClassName,
      { [styles.selected]: value },
      { [styles.selected]: `${prefixClassName}-selected` },
    ]),
    box: cc([styles.checkboxOptionBox, `${prefixClassName}-box`]),
    boxIcon: cc([
      styles.checkboxOptionBoxTick,
      `${prefixClassName}-box-tick`,
      { [styles.selected]: value },
    ]),
    label: cc([styles.checkboxOptionText, `${prefixClassName}-text`]),
  };

  const colorStyles = {
    box: value
      ? {
          background: primaryColor,
          borderColor: primaryColor,
        }
      : {},
    label: value
      ? {
          color: primaryColor,
        }
      : {},
  };

  return (
    <div
      ref={innerRef}
      data-testid="checkbox-item"
      className={classNames.main}
      onClick={e => onChange(!value, e)}
    >
      <div style={colorStyles.box} className={classNames.box}>
        <Icon className={classNames.boxIcon} src={TickIcon} />
      </div>
      <span style={colorStyles.label} className={classNames.label}>
        {label}
      </span>
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
  "$prefix-box": "Div wrapping the icon",
  "$prefix-box-tick": "The icon div",
  "$prefix-text": "The Text of each of the checkbox options",
};

export default CheckboxOption;
