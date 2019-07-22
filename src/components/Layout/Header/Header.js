import React from 'react';
import PropTypes from 'prop-types';

import styles from './Header.scss';

const Header = ({ children, className }) => {
  return <header className={`${styles.header} ${className}`}>{children}</header>;
};

Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Header;
