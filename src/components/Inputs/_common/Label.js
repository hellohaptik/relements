import React from "react";
import PropTypes from "prop-types";
import InfoIcon from "icons/info.svg";
import styles from "./Label.scss";
import WithTooltip from "../../Overlays/WithTooltip";
import Icon from "../../UI/Icon";

export const Label = ({
  children,
  className,
  focused,
  error,
  disabled,
  tooltip,
}) => {
  if (!children) return null;
  const focusedClassName = !disabled && focused ? styles.focused : "";
  const errorClassName = error ? styles.error : "";
  return (
    <React.Fragment>
      <div className={`${styles.container}`}>
        <span className={`${styles.label} ${className} ${focusedClassName}`}>
          {children}
          {tooltip ? (
            <WithTooltip className={`${styles.tooltip}`} tooltip={tooltip}>
              <Icon className={`${styles.tooltipIcon}`} src={InfoIcon} />
            </WithTooltip>
          ) : null}
        </span>
        {error ? (
          <span className={`${styles.label} ${errorClassName}`}>
            {`(${error})`}
          </span>
        ) : null}
      </div>
    </React.Fragment>
  );
};

Label.propTypes = {
  children: PropTypes.node || PropTypes.string,
  tooltip: PropTypes.string,
  className: PropTypes.string,
  focused: PropTypes.bool,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
};
