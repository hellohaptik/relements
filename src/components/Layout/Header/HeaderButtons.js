import React from 'react';
import PropTypes from 'prop-types';

import styles from './HeaderButtons.scss';

const HeaderButtons = ({ children, className }) => {
  return <div className={`${styles.headerButtons} ${className}`}>{children}</div>;
};

HeaderButtons.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default HeaderButtons;
