import React from "react";
import PropTypes from "prop-types";
import Context from "@src/components/Context";
import { rgba } from "@src/utils/generic";

import styles from "./Option.scss";

const Option = ({
  children,
  onClick,
  selected,
  innerRef,
  className,
  isZeroState,
  isNew,
}) => {
  const { primaryColor } = React.useContext(Context);
  const dropdownOptionSelectedStyle = selected
    ? { backgroundColor: rgba(primaryColor, 0.1) }
    : {};
  const dropdownOptionTextStyle = selected ? { color: primaryColor } : {};
  const selectedClassName = selected ? `${className}-selected` : "";
  const zeroStateClassName = isZeroState ? styles.zeroState : "";
  const isNewClassName = isNew ? styles.isNew : "";
  return (
    <div
      ref={innerRef}
      style={dropdownOptionSelectedStyle}
      className={`${styles.dropdownOption} ${className} ${selectedClassName} ${zeroStateClassName} ${isNewClassName}`}
      onClick={!isZeroState && onClick}
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

Option.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  innerRef: PropTypes.func,
  isNew: PropTypes.bool,
  isZeroState: PropTypes.bool,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};

Option.defaultProps = {
  children: "",
  className: "",
  innerRef: () => {},
  onClick: () => {},
  isNew: false,
  isZeroState: false,
  selected: false,
};

export default Option;
