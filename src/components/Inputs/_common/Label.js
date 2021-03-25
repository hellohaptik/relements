import React from "react";
import PropTypes from "prop-types";
import Context from "@src/components/Context";
import InfoIcon from "@src/icons/info.svg";
import styles from "./Label.scss";
import Tooltip from "../../Overlays/Tooltip";
import WithTooltip from "../../Overlays/WithTooltip";
import Icon from "../../UI/Icon";

import { ThemedLabelWrapper, ThemedLabel } from "./ThemedLabel";

export const Label = ({
  children,
  className,
  focused,
  error,
  disabled,
  tooltip,
  themed,
}) => {
  if (!children) return null;

  const { primaryColor } = React.useContext(Context);
  const focusedStyle = !disabled && focused ? { color: primaryColor } : {};
  const errorClassName = error ? styles.error : "";

  const renderLabel = () => {
    if (themed && (children || error)) {
      let mode = "default";
      if (!disabled && focused) {
        mode = "focussed";
      }

      if (error) {
        mode = "error";
      }

      return (
        <ThemedLabelWrapper>
          <ThemedLabel mode={mode}>
            {children} {error && `(${error})`}
          </ThemedLabel>
          {tooltip ? (
            <Tooltip tooltip={tooltip} position="TOP" themed>
              <Icon
                src={InfoIcon}
                size={Icon.SIZES.SMALL}
                style={{ marginBottom: 8 }}
              />
            </Tooltip>
          ) : null}
        </ThemedLabelWrapper>
      );
    }

    return (
      <div className={`${styles.container}`}>
        <span
          style={focusedStyle}
          className={`${styles.label} ${className} ${errorClassName}`}
        >
          {children}
          {tooltip ? (
            <WithTooltip
              className={`${styles.tooltip}`}
              tooltip={tooltip}
              position="TOP"
            >
              <Icon className={`${styles.tooltipIcon}`} src={InfoIcon} />
            </WithTooltip>
          ) : null}
        </span>
        {error && typeof error === "string" ? (
          <span className={`${styles.label} ${errorClassName}`}>
            {`(${error})`}
          </span>
        ) : null}
      </div>
    );
  };

  return renderLabel();
};

Label.propTypes = {
  children: PropTypes.node || PropTypes.string,
  tooltip: PropTypes.string,
  className: PropTypes.string,
  focused: PropTypes.bool,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  themed: PropTypes.bool,
};

export default Label;
