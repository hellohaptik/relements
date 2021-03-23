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
  trigger,
}) {
  const [dismissed, setDismissed] = React.useState(false);
  const [tooltipActive, setTooltipActive] = React.useState(false);
  const tooltipRef = React.useRef();
  const DOMRef = React.useRef();

  const triggerEnabled = !attachTo;

  const handleMouseEnter = React.useCallback(() => {
    if (trigger === "hover") setTooltipActive(true);
  });

  const handleMouseLeave = React.useCallback(() => {
    if (trigger === "hover") setTooltipActive(false);
  });

  const coordinates = usePositioner({
    attachTo: triggerEnabled ? DOMRef : attachTo,
    attachee: tooltipRef,
    position,
    offset,
  });

  const tooltipActiveStatus = triggerEnabled ? tooltipActive : active;

  const { enabled, visible } = useActivify(tooltipActiveStatus && !dismissed);
  const activeClassName = visible ? styles.tooltipActive : "";
  const tooltipPosition = position ? position.toLowerCase() : "bottom";
  const topPositionClassName = styles[tooltipPosition];

  const handleClose = React.useCallback(() => {
    if (dismissable) setDismissed(true);
    setTooltipActive(false);
    onClose();
  });

  useEscapeKey(handleClose);

  if (!triggerEnabled && (!attachTo || !enabled)) return null;

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
            {coordinates.arrowCoords && (
              <ThemedArrow
                variant={`${variant}.${[arrowPosition]}`}
                position={arrowPosition}
                style={coordinates.arrowCoords}
              />
            )}
            {triggerEnabled ? tooltip : children}
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
      triggerEnabled && enabled && trigger === "hover"
        ? styles.tooltipWrapperHover
        : "";
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
      {themed && triggerEnabled ? (
        <span
          style={{ display: "inline-block" }}
          ref={DOMRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            if (trigger === "click" && !tooltipActive) {
              setTooltipActive(true);
            }
          }}
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
  trigger: PropTypes.string,
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
  trigger: "hover",
};

export default Tooltip;
