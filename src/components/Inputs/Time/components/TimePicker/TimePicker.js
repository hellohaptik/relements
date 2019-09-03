import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import TimePickerInput from '../TimePickerInput';
import styles from './TimePicker.scss';

function TimePicker({ value, onChange, prefixClassName }) {
  const date = dayjs(value);
  const HHRef = React.useRef();
  const MMRef = React.useRef();
  const [HH, setHH] = React.useState(date.format('h'));
  const [MM, setMM] = React.useState(date.format('mm'));
  const [AMPM, setAMPM] = React.useState(value.format('A'));

  const amActiveClassName = AMPM === 'AM' ? styles.active : '';
  const pmActiveClassName = AMPM === 'PM' ? styles.active : '';

  const generateValue = React.useCallback((newHH, newMM, newAMPM) => {
    let date = dayjs();
    date = date.set('h', parseInt(newHH, 10) + (newAMPM === 'PM' ? 12 : 0));
    date = date.set('m', parseInt(newMM, 10));

    return date;
  });

  const handleHHChange = React.useCallback((e) => {
    const newHH = e.target ? e.target.value : e;
    if (Number.isNaN(+newHH)) return;
    if (newHH > 12) return MMRef.current.focus();
    if (newHH > 1) {
      MMRef.current.select();
      MMRef.current.focus();
    }
    setHH(newHH);
    onChange(generateValue(newHH, MM, AMPM));
  });

  const handleMMChange = React.useCallback((e) => {
    const newMM = e.target ? e.target.value : e;
    if (Number.isNaN(+newMM)) return;
    if (newMM > 59) return;
    setMM(newMM);
    onChange(generateValue(HH, newMM, AMPM));
  });

  const handleAMPMChange = React.useCallback((newAMPM) => () => {
    setAMPM(newAMPM);
    onChange(generateValue(HH, MM, newAMPM));
  });

  return (
    <div className={`${styles.timePicker} ${prefixClassName}`}>
      <TimePickerInput
        autoFocus
        innerRef={HHRef}
        value={HH}
        onChange={handleHHChange}
        placeholder="HH"
        increment={1}
        prefixClassName={`${prefixClassName}-input`}
      />
      <span className={`${prefixClassName}-separator`}>:</span>
      <TimePickerInput
        innerRef={MMRef}
        value={MM}
        onChange={handleMMChange}
        placeholder="MM"
        increment={30}
        prefixClassName={`${prefixClassName}-input`}
      />
      <div
        className={`${styles.timePickerSwitcher} ${prefixClassName}-switcher`}
      >
        <div
          onClick={handleAMPMChange('AM')}
          className={`${styles.timePickerSwitcherValue} ${amActiveClassName} ${prefixClassName}-switcher-value`}
        >
          AM
        </div>
        <div
          onClick={handleAMPMChange('PM')}
          className={`${styles.timePickerSwitcherValue} ${pmActiveClassName} ${prefixClassName}-switcher-value`}
        >
          PM
        </div>
      </div>
    </div>
  );
}

TimePicker.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
  prefixClassName: PropTypes.string,
};

TimePicker.defaultProps = {
  onChange: () => {},
  value: dayjs(),
  prefixClassName: '',
};

export default TimePicker;
