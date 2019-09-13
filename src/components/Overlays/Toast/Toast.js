import React from "react";
import { Portal } from "react-portal";
import PropTypes from "prop-types";

import { KEY_CODES } from "@src/constants/key_codes";
import useActivify from "@src/hooks/useActivify";
import styles from "./Toast.scss";

function Toast({ onClose, onEnter, className, children, active: propActive }) {
  const { visible, enabled } = useActivify(propActive);
  const handleKeyUp = React.useCallback(e => {
    if (e.keyCode === KEY_CODES.ESC) onClose();
    else if (e.keyCode === KEY_CODES.ENTER) onEnter();
  });

  React.useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  });

  if (!enabled) return null;

  const activeClassName = visible ? styles.toastActive : "";
  return (
    <Portal>
      <div className={`${styles.toastWrapper}`}>
        <div
          className={`${styles.toastOverlay} ${activeClassName}`}
          onClick={onClose}
        />
        <div className={`${styles.toast} ${activeClassName} ${className}`}>
          {children}
        </div>
      </div>
    </Portal>
  );
}

Toast.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  onEnter: PropTypes.func,
  active: PropTypes.bool,
  className: PropTypes.string,
};

Toast.defaultProps = {
  onClose: () => {},
  onEnter: () => {},
  active: false,
  className: "",
  children: null,
};

export default Toast;
