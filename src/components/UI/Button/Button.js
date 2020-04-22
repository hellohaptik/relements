import React from "react";
import PropTypes from "prop-types";

import { rgba } from "@src/utils/generic";

import styles from "./Button.scss";
import Context from "../../Context";

/**
 * Button component. Renders a button
 * based on type and size. Uses the children prop
 * to render the contents of the button.
 */
const Button = ({
  prefixClassName = "",
  className = "",
  type,
  size,
  disabled,
  onClick,
  innerRef,
  children,
}) => {
  const { primaryColor } = React.useContext(Context);

  /**
   * Get the styles classname corresponding to the type prop
   * @returns {string} classname of the type styles to be applied
   */
  const getTypeClassName = React.useCallback(() => {
    switch (type) {
      case Button.TYPES.PRIMARY:
        return styles.primary;
      case Button.TYPES.SECONDARY:
        return styles.secondary;
      case Button.TYPES.OUTLINE:
        return styles.outline;
      case Button.TYPES.GREY:
        return styles.grey;
      case Button.TYPES.WARNING:
        return styles.warning;
      case Button.TYPES.YELLOW:
        return styles.yellow;
      default:
        return "";
    }
  });

  /**
   * Get the styles corresponding to the type prop
   * @returns {object} the styles object to be applied
   */
  const getColorStyles = React.useCallback(() => {
    switch (type) {
      case Button.TYPES.PRIMARY:
        return {
          backgroundColor: primaryColor,
          borderColor: primaryColor,
        };
      case Button.TYPES.OUTLINE:
        return {
          color: primaryColor,
          borderColor: primaryColor,
          backgroundColor: rgba(primaryColor, 0.1),
        };
      default:
        return {};
    }
  });

  /**
   * Get the styles classname corresponding to the size prop
   * @returns {string} classname of the size styles to be applied
   */
  const getSizeClassName = React.useCallback(() => {
    switch (size) {
      case Button.SIZES.BIG:
        return styles.big;
      case Button.SIZES.MEDIUM:
        return styles.medium;
      case Button.SIZES.SMALL:
        return styles.small;
      default:
        return styles.medium;
    }
  });

  const getDisabledClassName = React.useCallback(() => {
    return disabled ? styles.disabled : "";
  });

  return (
    <button
      data-testid="button"
      type="button"
      disabled={disabled}
      ref={innerRef}
      onClick={onClick}
      style={getColorStyles()}
      className={`
        ${styles.button}
        ${prefixClassName}
        ${className}
        ${getDisabledClassName()}
        ${getTypeClassName()}
        ${getSizeClassName()}
      `}
    >
      {children}
    </button>
  );
};

Button.SIZES = {
  SMALL: "small",
  MEDIUM: "medium",
  BIG: "big",
};

Button.TYPES = {
  DEFAULT: "default",
  PRIMARY: "primary",
  SECONDARY: "secondary",
  OUTLINE: "outline",
  GREY: "grey",
  WARNING: "warning",
  YELLOW: "yellow",
};

Button.propTypes = {
  /** The classname to be prefixed on the outermost element */
  prefixClassName: PropTypes.string,
  /** The classname to appended to the outermost element */
  className: PropTypes.string,
  /** The type of the button (primary, secondary, grey etc.) */
  type: PropTypes.oneOf([
    Button.TYPES.DEFAULT,
    Button.TYPES.PRIMARY,
    Button.TYPES.SECONDARY,
    Button.TYPES.OUTLINE,
    Button.TYPES.GREY,
    Button.TYPES.WARNING,
    Button.TYPES.YELLOW,
  ]),
  /** The size of the button (small/medium/big) */
  size: PropTypes.oneOf([
    Button.SIZES.SMALL,
    Button.SIZES.MEDIUM,
    Button.SIZES.BIG,
  ]),
  /** Whether the button is disabled */
  disabled: PropTypes.bool,
  /** OnClick callback */
  onClick: PropTypes.func,
  /** The ref passed down to the outermost DOM element */
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  /** Children to render inside the button */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

Button.defaultProps = {
  prefixClassName: "relements-button",
  className: "",
  type: Button.TYPES.DEFAULT,
  size: Button.SIZES.MEDIUM,
  disabled: false,
  onClick: () => {},
};

Button.classNames = {
  $prefix: "Outermost element",
  "$prefix-child": "Child of the Main Button Component",
};

export default Button;
