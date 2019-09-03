import React from 'react';
import { Portal } from 'react-portal';
import PropTypes from 'prop-types';
import useActivify from '@src/hooks/useActivify';
import Context from '@src/components/Context';

import styles from './DropdownOptions.scss';

function DropdownOptions({
  focused,
  attachTo,
  reverseMode,
  onClose,
  children,
  active,
  className,
}) {
  const { visible, enabled } = useActivify(active);
  const { primaryColor } = React.useContext(Context);
  const renderPortalContainer = () => {
    const activeClassName = visible ? styles.active : '';
    const focusedStyle = focused ? { borderColor: primaryColor } : {};
    const rect = attachTo.current.getBoundingClientRect();
    let isReversed = reverseMode;

    const position = {
      top: rect.bottom + window.scrollY,
      left: rect.left,
      width: rect.width,
    };

    if (isReversed) {
      isReversed = true;
      position.top = 'none';
      position.bottom = window.innerHeight - rect.top + window.scrollY - 1;
    }

    const reverseModeClassName = isReversed ? styles.reverse : '';

    return (
      <div className={`${styles.dropdownOptionsWrapper}  ${className}`}>
        <div className={styles.dropdownOptionsOverlay} onClick={onClose} />
        <div
          style={{ ...position, ...focusedStyle }}
          className={`${styles.dropdownOptions} ${activeClassName} ${reverseModeClassName}`}
        >
          {children}
        </div>
      </div>
    );
  };

  if (!enabled) return null;
  return <Portal>{renderPortalContainer()}</Portal>;
}

DropdownOptions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  attachTo: PropTypes.object,
  onClose: PropTypes.func,
  active: PropTypes.bool,
  focused: PropTypes.bool,
  reverseMode: PropTypes.bool,
};

export default DropdownOptions;
