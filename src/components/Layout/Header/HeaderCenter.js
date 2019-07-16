import React from 'react';
import PropTypes from 'prop-types';

import styles from './HeaderCenter.scss';

const HeaderCenter = ({ children, className }) => {
  return <div className={`${styles.headerCenter} ${className}`}>{children}</div>;
};

HeaderCenter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default HeaderCenter;
