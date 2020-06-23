import React from "react";
import PropTypes from "prop-types";

import Icon from "components/UI/Icon";
import ErrorIcon from "icons/close.svg";

import * as Utils from "./utils";
import styles from "./AlertBar.scss";

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
  const [isActive, setIsActive] = React.useState(false);
  React.useEffect(() => {
    setIsActive(active || alwaysActive);
  }, [active || alwaysActive]);
  const renderIcon = !noIcon && Utils.renderAlertBarIcon(type, customIcon);
  return (
    <div
      data-testid="AlertBar"
      className={`
            ${styles.alertBar}
            ${className}
            ${type}
            ${isActive ? styles.active : styles.inactive}`}
    >
      <div className={`${styles.inner} ${prefixClassName}-inner`}>
        {renderIcon}
        <div
          className={`${styles.message}
          ${noIcon && styles.noIcon} ${prefixClassName}-inner-message`}
        >
          {message}
        </div>
      </div>
      {!alwaysActive && (
        <div
          className={`${styles.dismiss} ${prefixClassName}-dismiss`}
          onClick={() => {
            setIsActive(false);
            onDismiss();
          }}
        >
          <Icon src={ErrorIcon} className={`${prefixClassName}-dismiss-icon`} />
        </div>
      )}
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
  /** The message/content which will be displayed within the alert bar */
  message: PropTypes.node,
  /** Determines if alert bar is visible */
  active: PropTypes.bool,
  /** Function which will be called when dismissing the alert bar.
   * A required prop when driving from parent.
   */
  onDismiss: PropTypes.func,
  /** If set to 'true',
   * the bar won't be dismissed it will always be shown. */
  alwaysActive: PropTypes.bool,
  /** Decides if the icon before the message is to be visible or not.
   *  'active' prop is not needed
   */
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
  onDismiss: () => {},
  active: false,
  alwaysActive: false,
  noIcon: false,
  customIcon: "",
};

AlertBar.classNames = {
  $prefix: "Outermost element",
  "$prefix-inner": "Child of the Main Alert Bar Component",
  "$prefix-inner-message": "Message of the alert bar",
  "$prefix-dismiss": "Dismiss container",
  "$prefix-dismiss-icon": "Dismiss icon for message",
};

AlertBar.TYPES = {
  DEFAULT: "default",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
};

export default AlertBar;
