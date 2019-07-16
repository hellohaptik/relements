import React from 'react';
import PropTypes from 'prop-types';

import styles from './HeaderRight.scss';

const HeaderRight = ({ children, className }) => {
  return <div className={`${styles.headerRight} ${className}`}>{children}</div>;
};

HeaderRight.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default HeaderRight;
