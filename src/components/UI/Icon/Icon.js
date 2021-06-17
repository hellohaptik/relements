import React from "react";
import PropTypes from "prop-types";

import Tooltip from "@src/components/Overlays/Tooltip";
import styles from "./Icon.scss";
import { getIcon } from "./utils/getIcon";
import WithTooltip from "../../Overlays/WithTooltip";

/**
 * Icon component that renders an icon. It takes a string identifier
 * and renders the icon corresponding to that.
 */
const Icon = ({
  src = "",
  prefixClassName = "",
  className = "",
  size,
  onClick,
  innerRef,
  tooltip,
  tooltipPosition,
  themed,
}) => {
  // Note: Themed only for getting themed tooltip
  if (!src) return null;

  const getSizeClassName = () => {
    switch (size) {
      case Icon.SIZES.BIG:
        return styles.big;
      case Icon.SIZES.MEDIUM:
        return styles.medium;
      case Icon.SIZES.SMALL:
        return styles.small;
      default:
        return styles.medium;
    }
  };

  const IconSvg = typeof src === "string" ? getIcon(src) : src;

  return (
    <div
      data-testid="icon"
      ref={innerRef}
      onClick={onClick}
      className={`${
        styles.icon
      } ${prefixClassName} ${className} ${getSizeClassName()}`}
    >
      {themed ? (
        <Tooltip tooltip={tooltip} themed>
          <IconSvg className={`${prefixClassName}-svg`} />
        </Tooltip>
      ) : (
        <WithTooltip
          tooltip={tooltip}
          position={tooltipPosition}
          className={styles.iconTooltip}
          prefixClassName={`${prefixClassName}-tooltip`}
        >
          <IconSvg className={`${prefixClassName}-svg`} />
        </WithTooltip>
      )}
    </div>
  );
};

Icon.SIZES = {
  SMALL: "small",
  MEDIUM: "medium",
  BIG: "big",
};

Icon.defaultProps = {
  src: "",
  className: "",
  tooltip: "",
  tooltipPosition: "",
  size: Icon.SIZES.MEDIUM,
  onClick: () => {},
  themed: false,
};

Icon.propTypes = {
  /** Can either be a string identifier for the icon (angle-down) or a react node */
  src: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /** The classname to be prefixed to the icon's outer most div */
  prefixClassName: PropTypes.string,
  /** The classname to be attached to the icon's outer most div */
  className: PropTypes.string,
  /** The size of the icon (small/medium/big/px number)  */
  size: PropTypes.number,
  /** The callback function that will be called on click of the icon */
  onClick: PropTypes.func,
  /** Passes the ref to the outermost div  */
  innerRef: PropTypes.func,
  /** Tooltip for the Icon */
  tooltip: PropTypes.string,
  /** Tooltip Positioning (TOP/BOTTOM) */
  tooltipPosition: PropTypes.string,
  /** Use themed version of Icon */
  themed: PropTypes.bool,
};

Icon.classNames = {
  $prefix: "Outermost element",
  "$prefix-tooltip": "Tooltip wrapping the Icon",
  "$prefix-svg": "The SVG wrapped in icon element",
};

export default Icon;
