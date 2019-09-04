import React from "react";
import { Portal } from "react-portal";
import PropTypes from "prop-types";
import useActivify from "@src/hooks/useActivify";

import styles from "./DropdownOptions.scss";

function DropdownOptions({
  focused,
  attachTo,
  reverseMode,
  onClose,
  children,
  active,
  className,
}) {
  const { visible, enabled } = useActivify(active);
  const renderPortalContainer = () => {
    const activeClassName = visible ? styles.active : "";
    const focusedClassName = focused ? styles.focused : "";
    const rect = attachTo.current.getBoundingClientRect();
    let isReversed = reverseMode;

    const position = {
      top: rect.bottom + window.scrollY,
      left: rect.left,
      width: rect.width,
    };

    if (isReversed) {
      isReversed = true;
      position.top = "none";
      position.bottom = window.innerHeight - rect.top + window.scrollY - 1;
    }

    const reverseModeClassName = isReversed ? styles.reverse : "";

    return (
      <div className={`${styles.dropdownOptionsWrapper}  ${className}`}>
        <div className={styles.dropdownOptionsOverlay} onClick={onClose} />
        <div
          style={position}
          className={`${styles.dropdownOptions} ${activeClassName} ${focusedClassName} ${reverseModeClassName}`}
        >
          {children}
        </div>
      </div>
    );
  };

  if (!enabled) return null;
  return <Portal>{renderPortalContainer()}</Portal>;
}

DropdownOptions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  attachTo: PropTypes.object,
  onClose: PropTypes.func,
  active: PropTypes.bool,
  focused: PropTypes.bool,
  reverseMode: PropTypes.bool,
};

export default DropdownOptions;
