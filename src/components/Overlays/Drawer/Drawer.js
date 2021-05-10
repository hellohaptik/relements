import React from "react";
import { Portal } from "react-portal";
import PropTypes from "prop-types";

import useActivify from "@src/hooks/useActivify";
import useEscapeKey from "@src/hooks/useEscapeKey";

import DrawerHeader from "./components/DrawerHeader";
import ThemedDrawerBody from "./ThemedDrawerBody";
import styles from "./Drawer.scss";

const Drawer = ({
  children,
  prefixClassName,
  className,
  active,
  position,
  offset,
  attachTo,
  width,
  zIndex,
  noDisable,
  onClose,
  noOverlay,
}) => {
  const { enabled, visible } = useActivify(active);
  const activeClassName = visible ? styles.drawerActive : "";
  const placementClassName = position === "LEFT" ? styles.left : "";
  const noDisableClassName = noDisable ? styles.noDisable : "";
  const transformAmount =
    position === "LEFT" ? -1 * (width + offset) : width + offset;

  const style = {};
  style.zIndex = zIndex;
  style.left = position === "LEFT" ? offset : "auto";
  style.right = position === "LEFT" ? "auto" : offset;

  useEscapeKey(onClose);

  if (!enabled && !noDisable) return null;

  return (
    <Portal node={document && attachTo && document.getElementById(attachTo)}>
      <div
        className={`${styles.drawerWrapper} ${prefixClassName} ${className}`}
        style={style}
        data-testid="drawer"
      >
        {noOverlay ? null : (
          <div
            className={`
                    ${styles.drawerOverlay}
                    ${activeClassName}
                    ${prefixClassName}-overlay
                  `}
            onClick={onClose}
          />
        )}
        <div
          style={{
            width,
            transform: `translate3d(${transformAmount}px, 0, 0)`,
          }}
          className={`
              ${styles.drawer}
              ${placementClassName}
              ${activeClassName}
              ${noDisableClassName}
              ${prefixClassName}-drawer
            `}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

Drawer.Header = DrawerHeader;
Drawer.Body = ThemedDrawerBody;

Drawer.propTypes = {
  /** Children Nodes Passed down to the Drawer */
  children: PropTypes.node,
  /** onClose Callback */
  onClose: PropTypes.func,
  /** Active state for the Drawer */
  active: PropTypes.bool,
  /** Handles the functionality of making a drawer permanently enabled */
  noDisable: PropTypes.bool,
  /** Z-Index for the defining stack order of the Drawer */
  zIndex: PropTypes.number,
  /** Off Set for the drawer */
  offset: PropTypes.number,
  /** Prefixed CSS Classname passed to the Drawer */
  prefixClassName: PropTypes.string,
  /** CSS Classname passed to the Drawer */
  className: PropTypes.string,
  /** Positioning of the Drawer on the Webpage */
  position: PropTypes.string,
  /** Enables/Disables overlaying of the Drawer */
  noOverlay: PropTypes.bool,
  /** Width for the Drawer Element */
  width: PropTypes.number,
  /** The DOM Node to attach the Drawer to */
  attachTo: PropTypes.node,
};

Drawer.defaultProps = {
  onClose: () => {},
  active: false,
  noDisable: false,
  zIndex: 2,
  offset: 0,
  className: "",
  position: "RIGHT",
  noOverlay: false,
  width: "360px",
  attachTo: null,
};

Drawer.classNames = {
  $prefix: "Applied to the Drawer Wrapper",
  "$prefix-overlay": "Applied to the Overlay for Drawer",
  "$prefix-drawer": "Applied to the Drawer Node",
};

export default Drawer;
