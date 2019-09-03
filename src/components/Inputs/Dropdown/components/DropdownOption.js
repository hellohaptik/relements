import React from 'react';
import PropTypes from 'prop-types';
import Context from '@src/components/Context';
import { rgba } from '@src/utils/generic';

import styles from './DropdownOption.scss';

const DropdownOption = ({
  children,
  onClick,
  selected,
  innerRef,
  value,
  className,
}) => {
  const { primaryColor } = React.useContext(Context);
  const dropdownOptionSelectedStyle = selected
    ? { backgroundColor: rgba(primaryColor, 0.1) }
    : {};
  const dropdownOptionTextStyle = selected ? { color: primaryColor } : {};
  const selectedClassName = selected ? `${className}-selected` : '';
  return (
    <div
      ref={innerRef}
      style={dropdownOptionSelectedStyle}
      className={`${styles.dropdownOption} ${className} ${selectedClassName}`}
      onClick={() => onClick(value)}
      data-testid="dropdown-option"
    >
      <span
        style={dropdownOptionTextStyle}
        className={`${styles.dropdownOptionText}`}
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
