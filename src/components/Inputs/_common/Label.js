import React from 'react';
import PropTypes from 'prop-types';
import Context from '@src/components/Context';
import InfoIcon from '@src/icons/info.svg';
import styles from './Label.scss';
import WithTooltip from '../../Overlays/WithTooltip';
import Icon from '../../UI/Icon';

export const Label = ({
  children,
  className,
  focused,
  error,
  disabled,
  tooltip,
}) => {
  if (!children) return null;

  const { primaryColor } = React.useContext(Context);
  const focusedStyle = !disabled && focused ? { color: primaryColor } : {};
  const errorClassName = error ? styles.error : '';
  return (
    <>
      <div className={`${styles.container}`}>
        <span style={focusedStyle} className={`${styles.label} ${className}`}>
          {children}
          {tooltip ? (
            <WithTooltip className={`${styles.tooltip}`} tooltip={tooltip}>
              <Icon className={`${styles.tooltipIcon}`} src={InfoIcon} />
            </WithTooltip>
          ) : null}
        </span>
        {error ? (
          <span className={`${styles.label} ${errorClassName}`}>
            {`(${error})`}
          </span>
        ) : null}
      </div>
    </>
  );
};

Label.propTypes = {
  children: PropTypes.node || PropTypes.string,
  tooltip: PropTypes.string,
  className: PropTypes.string,
  focused: PropTypes.bool,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
};
