import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Icon from "components/UI/Icon";
import ErrorIcon from "icons/close.svg";
import SuccessIcon from "icons/tick.svg";
import WarningIcon from "icons/red-exclamation.svg";
import styles from "./AlertBar.scss";

const renderAlertBarIcon = type => {
  let icon = "";
  if (type === "success") {
    icon = <Icon src={SuccessIcon} />;
  } else {
    icon = <Icon src={WarningIcon} />;
  }
  return icon;
};

const AlertBar = ({
  prefixClassName = "",
  className = "",
  type,
  message = "",
  active,
}) => {
  const [isActive, changeActiveStatus] = useState(active);

  useEffect(() => {
    changeActiveStatus(active);
  }, [active]);

  return (
    <div
      data-testid="alertBar"
      data-type={type}
      className={`
            ${styles.alertBar}
            ${prefixClassName}
            ${className}
            ${isActive ? styles.active : null}
        `}
    >
      <div className={styles.inner}>
        {renderAlertBarIcon(type)}
        <span className={styles.message}>{message}</span>
      </div>
      <div className={styles.dismiss} onClick={() => changeActiveStatus(false)}>
        <Icon src={ErrorIcon} />
      </div>
    </div>
  );
};

AlertBar.propTypes = {
  /** The classname to be prefixed on the outermost element */
  prefixClassName: PropTypes.string,
  /** The classname to appended to the outermost element */
  className: PropTypes.string,
  /** The type of the alert bar (success/warning/error) */
  type: PropTypes.string,
  /** The message which will be displayed within the alert bar */
  message: PropTypes.string,
  /** If the alert bar is visible or not */
  active: PropTypes.bool,
};

AlertBar.defaultProps = {
  prefixClassName: "relements-alertBar",
  className: "",
  type: "success",
  message: "",
  active: false,
};

AlertBar.classNames = {
  $prefix: "Outermost element",
  "$prefix-child": "Child of the Main Button Component",
};

export default AlertBar;
