import React from "react";
import PropTypes from "prop-types";

import styles from "./DropdownOption.scss";

const DropdownOption = ({
  children,
  onClick,
  selected,
  innerRef,
  value,
  className,
}) => {
  const selectedClassName = selected ? `${className}-selected` : "";
  return (
    <div
      ref={innerRef}
      className={`${styles.dropdownOption} ${className} ${
        selected ? styles.dropdownOptionSelected : ""
      } ${selectedClassName}`}
      onClick={() => onClick(value)}
      data-testid="dropdown-option"
    >
      <span
        className={`${styles.dropdownOptionText} ${
          selected ? styles.dropdownOptionSelected : ""
        }`}
      >
        {children}
      </span>
    </div>
  );
};

DropdownOption.propTypes = {
  value: PropTypes.string,
  children: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  innerRef: PropTypes.func,
};

export default DropdownOption;
