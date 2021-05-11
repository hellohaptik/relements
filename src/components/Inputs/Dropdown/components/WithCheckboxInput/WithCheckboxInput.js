import React from "react";
import PropTypes from "prop-types";
import Context from "@src/components/Context";

import Icon from "@src/components/UI/Icon";
import Tooltip from "@src/components/Overlays/Tooltip";
import WithTooltip from "@src/components/Overlays/WithTooltip";
import AngleDownIcon from "@src/icons/angle-down.svg";

import {
  DropdownWrapper,
  DropdownWithCheckboxInput,
  DropdownArrow,
} from "../../ThemedDropdown";

import styles from "./WithCheckboxInput.scss";

const WithCheckboxInput = ({
  value,
  innerRef,
  optionKey,
  tooltip,
  focused,
  isReversed,
  prefixClassName,
  themed,
}) => {
  const { primaryColor } = React.useContext(Context);
  const focusedStyle = focused ? { borderColor: primaryColor } : {};
  const focusedClassName = focused ? styles.focused : "";
  const reversedClassName = isReversed ? styles.reversed : "";

  const renderWithCheckboxInput = () => {
    if (themed) {
      let dropdownVariant = "dropdown";
      if (focused) {
        if (isReversed) {
          dropdownVariant = "dropdownActiveTop";
        } else {
          dropdownVariant = "dropdownActive";
        }
      }
      return (
        <DropdownWrapper ref={innerRef} data-testid="dropdownCheckboxWrapper">
          <DropdownWithCheckboxInput variant={dropdownVariant}>
            {value.map(valueObject => valueObject[optionKey]).join(", ") ||
              "Nothing selected."}
            {tooltip ? (
              <Tooltip themed tooltip={tooltip} position="BOTTOM">
                <DropdownArrow mode={focused ? "active" : "inactive"}>
                  <Icon src={AngleDownIcon} />
                </DropdownArrow>
              </Tooltip>
            ) : (
              <DropdownArrow
                mode={focused ? "activeWithCheckbox" : "inactiveWithCheckbox"}
              >
                <Icon src={AngleDownIcon} />
              </DropdownArrow>
            )}
          </DropdownWithCheckboxInput>
        </DropdownWrapper>
      );
    }
    return (
      <div
        className={`${styles.withCheckboxInput} ${focusedClassName} ${reversedClassName}`}
        style={focusedStyle}
        ref={innerRef}
        data-testid="dropdownCheckboxWrapper"
      >
        <div className={styles.withCheckboxInputText}>
          {value.map(valueObject => valueObject[optionKey]).join(", ")}
        </div>
        <div className={styles.withCheckboxInputIcon}>
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

  return renderWithCheckboxInput();
};

WithCheckboxInput.propTypes = {
  value: PropTypes.arrayOf(PropTypes.shape({})),
  innerRef: PropTypes.shape({}),
  optionKey: PropTypes.string,
  tooltip: PropTypes.string,
  prefixClassName: PropTypes.string,
  focused: PropTypes.bool,
  isReversed: PropTypes.bool,
  themed: PropTypes.bool,
};

export default WithCheckboxInput;
