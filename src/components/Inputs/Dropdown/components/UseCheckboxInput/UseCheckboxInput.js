import React from "react";
import PropTypes from "prop-types";
import Context from "@src/components/Context";

import Icon from "@src/components/UI/Icon";
import WithTooltip from "@src/components/Overlays/WithTooltip";
import AngleDownIcon from "@src/icons/angle-down.svg";

import styles from "./UseCheckboxInput.scss";

const UseCheckboxInput = ({
  value,
  innerRef,
  optionKey,
  tooltip,
  focused,
  isReversed,
  prefixClassName,
}) => {
  const { primaryColor } = React.useContext(Context);
  const focusedStyle = focused ? { borderColor: primaryColor } : {};
  const focusedClassName = focused ? styles.focused : "";
  const reversedClassName = isReversed ? styles.reversed : "";
  return (
    <div
      data-testid="dropdownCheckboxWrapper"
      className={`${styles.useCheckboxInput} ${focusedClassName} ${reversedClassName} ${prefixClassName}-checkbox`}
      style={focusedStyle}
      ref={innerRef}
    >
      <div
        className={`${styles.useCheckboxInputText} ${prefixClassName}-checkbox-text`}
      >
        {value.map(valueObject => valueObject[optionKey]).join(", ")}
      </div>
      <div
        className={`${styles.useCheckboxInputIcon}  ${prefixClassName}-checkbox-icon`}
      >
        {tooltip ? (
          <WithTooltip
            className={`${prefixClassName}-tooltip`}
            tooltip={tooltip}
            position="BOTTOM"
          >
            <Icon className={`${prefixClassName}-icon`} src={AngleDownIcon} />
          </WithTooltip>
        ) : (
          <Icon className={`${prefixClassName}-icon`} src={AngleDownIcon} />
        )}
      </div>
    </div>
  );
};

UseCheckboxInput.propTypes = {
  value: PropTypes.arrayOf(PropTypes.shape({})),
  innerRef: PropTypes.shape({}),
  optionKey: PropTypes.string,
  tooltip: PropTypes.string,
  prefixClassName: PropTypes.string,
  focused: PropTypes.bool,
  isReversed: PropTypes.bool,
};

export default UseCheckboxInput;
