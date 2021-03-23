import React from "react";
import { Portal } from "react-portal";
import PropTypes from "prop-types";
import useActivify from "@src/hooks/useActivify";
import usePositioner from "@src/hooks/usePositioner";
import useEscapeKey from "@src/hooks/useEscapeKey";

import { ThemedWrapper, ThemedContent, ThemedArrow } from "./ThemedTooltip";

import styles from "./Tooltip.scss";

let modalRoot = document.getElementById("portal-root");
if (!modalRoot) {
  modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "portal-root");
  document.body.appendChild(modalRoot);
}

function Tooltip({
  active,
  position,
  className,
  prefixClassName,
  attachTo,
  onClose,
  children,
  offset,
  dismissable,
  themed,
  variant,
  size,
  tooltip,
  toggleWithHover,
}) {
  const [dismissed, setDismissed] = React.useState(false);
  const [hoverActive, setHoverActive] = React.useState(false);
  const tooltipRef = React.useRef();
  const DOMRef = React.useRef();

  const handleMouseEnter = React.useCallback(() => {
    setHoverActive(true);
  });

  const handleMouseLeave = React.useCallback(() => {
    setHoverActive(false);
  });

  const coordinates = usePositioner({
    attachTo: toggleWithHover ? DOMRef : attachTo,
    attachee: tooltipRef,
    position,
    offset,
  });

  const tooltipActive = toggleWithHover ? hoverActive : active;

  const { enabled, visible } = useActivify(tooltipActive && !dismissed);
  const activeClassName = visible ? styles.tooltipActive : "";
  const tooltipPosition = position ? position.toLowerCase() : "bottom";
  const topPositionClassName = styles[tooltipPosition];

  const handleClose = React.useCallback(() => {
    if (dismissable) setDismissed(true);
    onClose();
  });

  useEscapeKey(handleClose);

  if (!toggleWithHover && (!attachTo || !enabled)) return null;

  const renderTooltipContent = () => {
    if (themed) {
      const arrowPosition = position.toLowerCase() || "bottom";
      const tooltipActiveMode = activeClassName && coordinates.top;

      return (
        <ThemedWrapper
          ref={tooltipRef}
          style={coordinates}
          mode={tooltipActiveMode ? "active" : "inactive"}
          variant={variant}
          size={size}
        >
          <ThemedContent>
            <ThemedArrow
              variant={`${variant}.${[arrowPosition]}`}
              position={arrowPosition}
            />
            {toggleWithHover ? tooltip : children}
          </ThemedContent>
        </ThemedWrapper>
      );
    }

    return (
      <div
        className={`${styles.tooltip} ${activeClassName} ${prefixClassName}-inner`}
        ref={tooltipRef}
        style={coordinates}
      >
        <div
          className={`${styles.tooltipArrow} ${topPositionClassName} ${prefixClassName}-caret`}
        />

        <div
          className={`${styles.tooltipContent} ${topPositionClassName} ${prefixClassName}-body`}
        >
          {children}
        </div>
      </div>
    );
  };

  const renderPortal = () => {
    const hoverEnabledClassName =
      toggleWithHover && enabled ? styles.tooltipWrapperHover : "";
    return (
      <Portal node={document && document.getElementById("portal-root")}>
        <div
          className={`${styles.tooltipWrapper} ${className} ${prefixClassName} ${hoverEnabledClassName}`}
        >
          <div
            onClick={handleClose}
            className={`${styles.tooltipOverlay} ${prefixClassName}-overlay`}
          />
          {renderTooltipContent()}
        </div>
      </Portal>
    );
  };

  return (
    <>
      {themed && toggleWithHover ? (
        <span
          ref={DOMRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
          {enabled && renderPortal()}
        </span>
      ) : (
        renderPortal()
      )}
    </>
  );
}

Tooltip.propTypes = {
  attachTo: PropTypes.object.isRequired,
  active: PropTypes.bool,
  dismissable: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  prefixClassName: PropTypes.string,
  onClose: PropTypes.func,
  position: PropTypes.string,
  themed: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string,
  offset: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
  }),
  tooltip: PropTypes.string,
  toggleWithHover: PropTypes.bool,
};

Tooltip.defaultProps = {
  active: false,
  dismissable: false,
  children: null,
  className: "",
  prefixClassName: "",
  position: "",
  onClose: () => {},
  offset: null,
  themed: false,
  variant: "primary",
  size: "regular",
  tooltip: "",
  toggleWithHover: false,
};

export default Tooltip;
