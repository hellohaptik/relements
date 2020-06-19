import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Icon from "components/UI/Icon";
import ErrorIcon from "icons/close.svg";
import SuccessIcon from "icons/tick.svg";
import WarningIcon from "icons/red-exclamation.svg";
import styles from "./AlertBar.scss";

const renderAlertBarIcon = (type, customIcon = false) => {
  let icon = "";
  let iconPath = "";
  if (customIcon) {
    iconPath = customIcon;
  } else if (type === "success") {
    iconPath = SuccessIcon;
  } else {
    iconPath = WarningIcon;
  }
  icon = <Icon src={iconPath} />;
  return icon;
};

const AlertBar = ({
  prefixClassName = "",
  className = "",
  type,
  message = "",
  active,
  onDismiss,
  alwaysActive,
  noIcon,
  customIcon,
}) => {
  const [isActive, setAlertBarActive] = useState(false);

  useEffect(() => {
    setAlertBarActive(active || alwaysActive);
  }, [active || alwaysActive]);

  return (
    <div
      data-testid="AlertBar"
      data-type={type}
      className={`
            ${styles.alertBar}
            ${prefixClassName}
            ${className}
            ${isActive ? styles.active : null}
        `}
    >
      <div className={styles.inner}>
        {!noIcon ? renderAlertBarIcon(type, customIcon) : null}
        <span
          className={`
        ${styles.message}
        ${noIcon ? styles.noIcon : ""}`}
        >
          {message}
        </span>
      </div>
      {!alwaysActive ? (
        <div
          className={styles.dismiss}
          onClick={() => {
            setAlertBarActive(false);
            onDismiss(false);
          }}
        >
          <Icon src={ErrorIcon} />
        </div>
      ) : null}
    </div>
  );
};

AlertBar.propTypes = {
  /** The classname to be prefixed on the outermost element */
  prefixClassName: PropTypes.string,
  /** The classname to appended to the outermost element */
  className: PropTypes.string,
  /** The type of the alert bar (default/success/warning/error) */
  type: PropTypes.string,
  /** The message which will be displayed within the alert bar */
  message: PropTypes.string,
  /** If the alert bar is visible or not */
  active: PropTypes.bool,
  /** Function to update parent state when alert bar is deactivated */
  onDismiss: PropTypes.func,
  /** If set to 'true',
   * the bar won't be dismissed it will always be shown.
   * 'active' prop is not needed here. */
  alwaysActive: PropTypes.bool,
  /** Decides if the icon before the message is to be visible or not  */
  noIcon: PropTypes.bool,
  /** Adds a custom icon before the message,
   * accepts the name to the icon (Refer Icon docs for names)  */
  customIcon: PropTypes.string,
};

AlertBar.defaultProps = {
  prefixClassName: "",
  className: "",
  type: "default",
  message: "",
  active: false,
  onDismiss: () => {},
  alwaysActive: false,
  noIcon: false,
  customIcon: "",
};

AlertBar.classNames = {
  $prefix: "Outermost element",
  "$prefix-child": "Child of the Main Button Component",
};

AlertBar.TYPES = {
  DEFAULT: "default",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
};

export default AlertBar;
