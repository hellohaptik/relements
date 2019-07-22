import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/UI/Icon';
import styles from './HeaderLogo.scss';

const Header = ({ children, className }) => {
  return (
    <div className={`${styles.headerLogo} ${className}`}>
      <Icon iconType="haptik" className={`${styles.headerLogoIcon} ${className}-icon`} />
      <div className={`${styles.headerLogoText} ${className}-text`} dangerouslySetInnerHTML={{ __html: children }} />
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Header;
