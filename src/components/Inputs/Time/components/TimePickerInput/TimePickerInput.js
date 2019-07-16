import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@src/components/UI/Icon';
import AngleDownIcon from '@src/icons/angle-down.svg';
import styles from './TimePickerInput.scss';

function TimePickerInput(props) {
  return (
    <div className={styles.timePickerInput}>
      <input {...props} ref={props.innerRef} />
      <div className={styles.timePickerInputArrows}>
        <Icon
          onClick={() => props.onChange(+props.value + props.increment)}
          src={AngleDownIcon}
          className={styles.timePickerInputArrow}
        />
        <Icon
          onClick={() => props.onChange(+props.value - props.increment)}
          src={AngleDownIcon}
          className={styles.timePickerInputArrow}
        />
      </div>
    </div>
  );
}

TimePickerInput.propTypes = {
  innerRef: PropTypes.node,
  onChange: PropTypes.func,
  value: PropTypes.object,
  increment: PropTypes.number,
};

TimePickerInput.defaultProps = {
  innerRef: null,
  increment: 1,
  onChange: () => {},
};

export default TimePickerInput;
