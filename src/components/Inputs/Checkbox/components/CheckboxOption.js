import React from "react";
import PropTypes from "prop-types";
import cc from "classcat";

import Icon from "@src/components/UI/Icon";
import TickIcon from "@src/icons/checkmark.svg";

import Text from "@src/components/UI/Text";

import { colors } from "@src/Theme/colors";

import styles from "./CheckboxOption.scss";

const CheckboxOption = ({
  label,
  onChange,
  value,
  innerRef,
  className,
  prefixClassName,
  disabled,
  themed,
  mode,
}) => {
  const classNames = {
    main: cc([
      styles.checkboxOption,
      className,
      prefixClassName,
      { [styles.disabled]: disabled },
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
          background: disabled ? colors.grey.deep : colors.blue.dark,
          borderColor: disabled ? colors.grey.deep : colors.blue.dark,
        }
      : {
          background: colors.background,
          borderColor: disabled ? colors.grey.deep : colors.blue.dark,
        },
    label: value
      ? {
          color: disabled ? colors.grey.deep : colors.grey.dark,
        }
      : {
          color: colors.grey.deep,
        },
  };

  return (
    <div
      ref={innerRef}
      data-testid="checkbox-item"
      className={classNames.main}
      onClick={e => onChange(!value, e)}
      style={mode === "stacked" ? { marginBottom: 12 } : null}
    >
      <div style={colorStyles.box} className={classNames.box}>
        <Icon className={classNames.boxIcon} src={TickIcon} />
      </div>
      {themed ? (
        <Text variant="body.md">{label}</Text>
      ) : (
        <span style={colorStyles.label} className={classNames.label}>
          {label}
        </span>
      )}
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
  /** Whether the input is enabled or disabled */
  disabled: PropTypes.string,
  mode: PropTypes.string,
  themed: PropTypes.bool,
};

CheckboxOption.defaultProps = {
  label: "",
  className: "",
  onChange: () => {},
  value: false,
  innerRef: () => {},
  prefixClassName: "",
  disabled: false,
  mode: "inline",
  themed: false,
};

CheckboxOption.classNames = {
  $prefix: "Outermost element",
  "$prefix-box": "Div wrapping the icon",
  "$prefix-box-tick": "The icon div",
  "$prefix-text": "The Text of each of the checkbox options",
};

export default CheckboxOption;
