import React from "react";
import PropTypes from "prop-types";
import Context from "@src/components/Context";
import Text from "@src/components/UI/Text";
import { rgba } from "@src/utils/generic";

import { DropdownOption } from "../../ThemedDropdown";

import styles from "./Option.scss";

const Option = ({
  children,
  onClick,
  selected,
  innerRef,
  className,
  isZeroState,
  isNew,
  themed,
  noOptionsText,
  checkboxSearch,
}) => {
  const { primaryColor } = React.useContext(Context);
  const dropdownOptionSelectedStyle = selected
    ? { backgroundColor: rgba(primaryColor, 0.1) }
    : {};
  const dropdownOptionTextStyle = selected ? { color: primaryColor } : {};
  const selectedClassName = selected ? `${className}-selected` : "";
  const zeroStateClassName = isZeroState ? styles.zeroState : "";
  const isNewClassName = isNew ? styles.isNew : "";
  let optionMode = "default";

  const renderOption = () => {
    if (themed) {
      if (children === noOptionsText) {
        if (checkboxSearch) {
          optionMode = "disabledWithCheckboxSearch";
        } else {
          optionMode = "disabled";
        }
      }
      return (
        <DropdownOption
          ref={innerRef}
          onClick={!isZeroState ? onClick : null}
          data-testid="dropdown-option"
          mode={optionMode}
        >
          <Text
            variant="body.md"
            color={children === noOptionsText && "red.haptik"}
          >
            {children}
          </Text>
        </DropdownOption>
      );
    }
    return (
      <div
        ref={innerRef}
        style={dropdownOptionSelectedStyle}
        className={`${styles.dropdownOption} ${className} ${selectedClassName} ${zeroStateClassName} ${isNewClassName}`}
        onClick={!isZeroState ? onClick : null}
        data-testid="dropdown-option"
      >
        <span
          style={dropdownOptionTextStyle}
          className={`${styles.dropdownOptionText}`}
          dangerouslySetInnerHTML={{ __html: children }}
        />
      </div>
    );
  };

  return renderOption();
};

Option.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  innerRef: PropTypes.func,
  isNew: PropTypes.bool,
  isZeroState: PropTypes.bool,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  themed: PropTypes.bool,
  noOptionsText: PropTypes.string,
};

Option.defaultProps = {
  children: "",
  className: "",
  innerRef: () => {},
  onClick: () => {},
  isNew: false,
  isZeroState: false,
  selected: false,
  themed: false,
  noOptionsText: "",
};

export default Option;
