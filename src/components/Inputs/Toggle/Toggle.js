import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import cc from 'classcat';

import { rgba } from '@src/utils/generic';
import Context from '@src/components/Context';

import { useInput } from '../_common/hooks/useInput';
import { Label } from '../_common/Label';
import styles from './Toggle.scss';

const Toggle = ({
  label,
  prefixClassName,
  className,
  value,
  onChange,
  redGreen,
  onFocus,
  onBlur,
  error,
  disabled,
}) => {
  const { primaryColor } = React.useContext(Context);
  const activeClassName = value ? styles.active : '';
  const disabledClassName = disabled ? styles.disabled : '';
  const _TextInputDOM = useRef();
  const { focused, handleFocus, handleBlur } = useInput(
    _TextInputDOM,
    onFocus,
    onBlur,
  );

  const redGreenClassName = redGreen ? styles.redGreen : '';
  const classNames = {
    main: cc([
      styles.toggleInput,
      redGreenClassName,
      activeClassName,
      disabledClassName,
    ]),
  };

  const toggleStyle = value && !redGreen
    ? {
      backgoundColor: rgba(primaryColor, 0.2),
      borderColor: primaryColor,
    }
    : {};

  const toggleKnobStyle = value && !redGreen
    ? {
      backgoundColor: primaryColor,
      borderColor: primaryColor,
    }
    : {};

  return (
    <div
      data-testid="toggle"
      className={`${styles.toggle} ${redGreenClassName} ${prefixClassName} ${className}`}
      onClick={() => onChange(!value)}
    >
      <Label
        focused={focused}
        error={error}
        className={`${styles.toggleLabel} ${prefixClassName}-label`}
      >
        {label}
      </Label>
      <div
        tabIndex="0"
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={toggleStyle}
        className={`${classNames.main} ${prefixClassName}-toggle`}
      >
        <div
          style={toggleKnobStyle}
          className={`${styles.toggleInputKnob} ${redGreenClassName} ${prefixClassName}-toggle-knob ${activeClassName}`}
        />
      </div>
    </div>
  );
};

Toggle.propTypes = {
  /** Label for toggle  */
  label: PropTypes.string,
  /** prefix to be appended to the child elements */
  prefixClassName: PropTypes.string,
  /** The classname to be appended to the outermost element */
  className: PropTypes.string,
  /** Boolean value true or false */
  value: PropTypes.bool,
  /** Changes toggle to red and green style */
  redGreen: PropTypes.bool,
  /** On toggle change function */
  onChange: PropTypes.func,
  /** On focus function */
  onFocus: PropTypes.func,
  /** On blur function */
  onBlur: PropTypes.func,
  /** Error class enable or disable on toggle label  */
  error: PropTypes.bool,
  /** Disables the toggle  */
  disabled: PropTypes.bool,
};

Toggle.defaultProps = {
  label: '',
  prefixClassName: '',
  className: '',
  value: false,
  redGreen: false,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  error: false,
  disabled: false,
};

Toggle.classNames = {
  $prefix: 'Outermost element',
  '$prefix-label': 'Label element',
  '$prefix-toggle': 'Inner element that wraps the toggle',
  '$prefix-toggle-knob': 'Knob element inside the wrapper',
};

export default Toggle;
