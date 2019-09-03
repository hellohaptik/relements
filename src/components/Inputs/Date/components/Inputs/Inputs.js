import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import Button from 'components/UI/Button';
import Input from '../Input';
import styles from './Inputs.scss';

/**
 * Retrieves some stats for the given start and end date
 * such as if the combination of dates matches any of the helper buttons
 * (Today, Yesterday, Last 7 days etc.)
 */
function getDateStats(startDate, endDate) {
  const today = dayjs();
  const yesterday = dayjs().subtract(1, 'd');
  const isSame = startDate.isSame(endDate, 'd');
  const isToday = isSame && startDate.isSame(today, 'd');
  const isYesterday = isSame && startDate.isSame(yesterday, 'd');
  const isLast7Days = startDate.subtract(7, 'd').isSame(endDate, 'd')
    && startDate.isSame(today, 'd');
  const isLast30Days = startDate.subtract(30, 'd').isSame(endDate, 'd')
    && startDate.isSame(today, 'd');

  return {
    isToday,
    isYesterday,
    isLast7Days,
    isLast30Days,
  };
}

function Shortcuts({
  startDate, endDate, onChange, prefixClassName,
}) {
  const {
    isToday, isYesterday, isLast7Days, isLast30Days,
  } = getDateStats(
    startDate,
    endDate,
  );

  const today = dayjs().startOf('day');
  return (
    <div className={`${styles.inputsButtons} ${prefixClassName}`}>
      <Button
        primary={isToday}
        className={`${styles.inputsButton} ${prefixClassName}-button`}
        onClick={() => onChange(today, today.endOf('day'))}
      >
        Today
      </Button>
      <Button
        primary={isYesterday}
        className={`${styles.inputsButton} ${prefixClassName}-button`}
        onClick={() => onChange(
          today.subtract(1, 'd').startOf('day'),
          today.subtract(1, 'd').endOf('day'),
        )}
      >
        Yesterday
      </Button>
      <Button
        primary={isLast7Days}
        className={`${styles.inputsButton} ${prefixClassName}-button`}
        onClick={() => onChange(today.subtract(6, 'd').startOf('day'), today.endOf('day'))}
      >
        Last 7 Days
      </Button>
      <Button
        primary={isLast30Days}
        className={`${styles.inputsButton} ${prefixClassName}-button`}
        onClick={() => onChange(today.subtract(29, 'd').startOf('day'), today.endOf('day'))}
      >
        Last 30 Days
      </Button>
    </div>
  );
}

function Inputs({
  startDate,
  endDate,
  onChange,
  onFocus,
  selectingKey,
  prefixClassName,
}) {
  return (
    <div className={`${styles.inputsColumn} ${prefixClassName}`}>
      <div className={`${styles.inputsColumnLabel} ${prefixClassName}-label`}>
        Select Date
      </div>
      <div className={`${styles.inputsColumnHint} ${prefixClassName}-hint`}>
        Tap on the calendar to define custom date ranges
      </div>
      <Shortcuts
        prefixClassName={`${prefixClassName}-shortcuts`}
        startDate={startDate}
        endDate={endDate}
        onChange={onChange}
      />
      <div className={`${styles.inputsItems} ${prefixClassName}-input-items`}>
        <Input
          label="Start"
          key="startDate"
          value={startDate}
          onFocus={() => onFocus('startDate')}
          focused={selectingKey === 'startDate'}
          prefixClassName={`${prefixClassName}-input-item`}
        />
        <Input
          className={styles.endInput}
          label="End"
          key="endDate"
          value={endDate}
          onFocus={() => onFocus('endDate')}
          focused={selectingKey === 'endDate'}
          prefixClassName={`${prefixClassName}-input-item`}
        />
      </div>
    </div>
  );
}

Inputs.propTypes = {
  endDate: PropTypes.instanceOf(dayjs).isRequired,
  startDate: PropTypes.instanceOf(dayjs).isRequired,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  prefixClassName: PropTypes.string,
  selectingKey: PropTypes.string,
};

Inputs.defaultProps = {
  onChange: () => {},
  onFocus: () => {},
  prefixClassName: '',
  selectingKey: '',
};

Shortcuts.propTypes = {
  onChange: PropTypes.func,
  prefixClassName: PropTypes.string,
  endDate: PropTypes.instanceOf(dayjs),
  startDate: PropTypes.instanceOf(dayjs),
};

Shortcuts.defaultProps = {
  onChange: () => {},
  prefixClassName: '',
};

export default Inputs;
