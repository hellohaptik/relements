import React from 'react';
import PropTypes from 'prop-types';

import styles from './HeaderLeft.scss';

const HeaderLeft = ({ children, className }) => {
  return <div className={`${styles.headerLeft} ${className}`}>{children}</div>;
};

HeaderLeft.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default HeaderLeft;
