import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import Tooltip from '@src/components/Overlays/Tooltip';
import Icon from '@src/components/UI/Icon';
import AngleDownIcon from '@src/icons/angle-down.svg';

import { TextInput } from '../_common/TextInput';
import { Label } from '../_common/Label';

import RangeComparison from './components/RangeComparison';
import SinglePicker from './components/SinglePicker';

import styles from './Date.scss';

class Date extends React.Component {
  state = {
    active: false,
    focused: false,
  };

  _DOMNode = React.createRef();

  rangeComparisonRef = React.createRef();

  render() {
    const {
      className,
      error,
      disabled,
      maxDate,
      minDate,
      comparisonMaxDate,
      comparisonMinDate,
      withRange,
      withComparison,
      value,
      prefixClassName,
      numMonths,
    } = this.props;
    const errorClassName = error ? styles.dateError : '';
    const disabledClassName = disabled ? styles.disabled : '';

    return (
      <div
        data-testid="date"
        className={`${styles.date} ${errorClassName} ${disabledClassName} ${className} ${prefixClassName}`}
      >
        {this.renderLabel()}
        {this.renderInput()}
        <Tooltip
          onClose={this.closeDate}
          attachTo={this.props.attachTo || this._DOMNode}
          active={this.state.active}
          offset={this.props.offset}
          className="date-picker-tooltip"
          position={this.props.position}
          prefixClassName={`${prefixClassName}-tooltip`}
        >
          {withRange ? (
            <RangeComparison
              ref={this.rangeComparisonRef}
              value={value}
              maxDate={maxDate}
              minDate={minDate}
              active={this.state.active}
              comparisonMaxDate={comparisonMaxDate}
              comparisonMinDate={comparisonMinDate}
              withComparison={withComparison}
              prefixClassName={`${prefixClassName}-picker`}
              numMonths={numMonths}
            />
          ) : (
            <SinglePicker
              value={value}
              onChange={this._handleChange}
              maxDate={maxDate}
              minDate={minDate}
              prefixClassName={`${prefixClassName}-picker`}
              numMonths={numMonths}
            />
          )}
        </Tooltip>
      </div>
    );
  }

  renderLabel() {
    const { prefixClassName, error, label } = this.props;
    if (!label) return null;
    return (
      <Label
        focused={this.state.focused}
        error={error}
        className={`${prefixClassName}-label`}
      >
        {label}
      </Label>
    );
  }

  renderInput() {
    const { focused, active } = this.state;
    const {
      placeholder, prefixClassName, onFocus, onBlur,
    } = this.props;
    const parsedValue = this._getParsedDate();
    return (
      <TextInput
        className={`${prefixClassName}-input`}
        innerRef={this._DOMNode}
        onKeyDown={this._handleKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseDown={this.toggleDate}
        focused={focused}
        active={active}
        value={parsedValue}
        placeholder={placeholder}
        disabled
        postfixComponent={<Icon src={AngleDownIcon} />}
      />
    );
  }

  _getParsedDate = () => {
    const { withRange, value } = this.props;
    const format = 'DD MMM, YYYY';

    if (withRange) {
      const { startDate, endDate } = this._getParsedValueFromObject(value);
      if (!startDate.isValid() || !endDate.isValid()) return '';
      return `${startDate.format(format)} - ${endDate.format(format)}`;
    }

    const date = this._getParsedValueFromDate(value);
    if (!date.isValid()) return 'Invalid Date';
    return `${date.format('DD MMMM, YYYY')}`;
  };

  _getParsedValueFromObject = () => {
    const { value } = this.props;
    const startDate = dayjs(value.startDate);
    const endDate = dayjs(value.endDate);
    const comparisonStartDate = value.comparisonStartDate
      ? dayjs(value.comparisonStartDate)
      : null;
    const comparisonEndDate = value.comparisonEndDate
      ? dayjs(value.comparisonEndDate)
      : null;
    return {
      startDate,
      endDate,
      comparisonStartDate,
      comparisonEndDate,
    };
  };

  _getParsedValueFromDate = () => {
    const { value } = this.props;
    return dayjs(value);
  };

  _handleChange = (date) => {
    this.setState({ active: false, focused: false });
    this.props.onChange(date);
  };

  toggleDate = () => {
    this.setState((state) => ({ active: !state.active, focused: !state.active }));
  };

  closeDate = () => {
    this.setState({ active: false, focused: false });
    this.props.onChange(this.rangeComparisonRef.current.getValue());
  };
}

Date.propTypes = {
  /** If you want to attach the input tooltip to your a custom input */
  attachTo: PropTypes.object,
  /** The classname to appended to the outermost element */
  className: PropTypes.string,
  /** If the input is disabled (non-editable) */
  disabled: PropTypes.bool,
  /** If the input has an error. */
  error: PropTypes.bool,
  /** The prefix classname appended to all elements */
  prefixClassName: PropTypes.string,
  /** Label text */
  label: PropTypes.string,
  /** Input tooltip offset ({x: 0, y: 0}) */
  offset: PropTypes.object,
  /** onBlur callback */
  onBlur: PropTypes.func,
  /** onChange callback */
  onChange: PropTypes.func,
  /** onFocus callback */
  onFocus: PropTypes.func,
  /** Input placeholder */
  placeholder: PropTypes.string,
  /** Tooltip position (TOP/BOTTOM) */
  position: PropTypes.string,
  /** The date */
  value: PropTypes.string,
  /** Max selectable date */
  maxDate: PropTypes.instanceOf(Date),
  /** Min selectable date */
  minDate: PropTypes.instanceOf(Date),
  /** Max selectable comparison date */
  comparisonMaxDate: PropTypes.instanceOf(Date),
  /** Min selectable comparison date */
  comparisonMinDate: PropTypes.instanceOf(Date),
  /** With range support (From Date -> To Date) */
  withRange: PropTypes.bool,
  /** With Comparison support (comparing 2 ranges) */
  withComparison: PropTypes.bool,
  /** Number of months to show at a time */
  numMonths: PropTypes.number,
};

Date.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  label: '',
  className: '',
  value: '',
  placeholder: '',
  error: false,
  disabled: false,
  offset: null,
  position: null,
  attachTo: null,
  maxDate: null,
  minDate: null,
  comparisonMaxDate: null,
  comparisonMinDate: null,
  numMonths: 1,
};

Date.classNames = {
  $prefix: 'Outermost element',
  '$prefix-label': 'Label',
  '$prefix-input': 'Input',
  '$prefix-tooltip': 'Tooltip wrapping the picker',
  '$prefix-picker': 'The div wrapping the picker inside the tooltip',
  '$prefix-picker-calendar': 'Calendar element',
  '$prefix-picker-calendar-arrow-left': 'Calendar arrow left',
  '$prefix-picker-calendar-arrow-right': 'Calendar arrow right',
  '$prefix-picker-calendar-calendar': 'The calendar month',
  '$prefix-picker-calendar-calendar-header': 'The calendar header',
  '$prefix-picker-calendar-calendar-header-text':
    "The calendar header's text (Month)",
  '$prefix-picker-calendar-labels': 'The wrapper for labels for the days',
  '$prefix-picker-calendar-label':
    'The labels for the days (Sun, Mon, Tue, etc.)',
  '$prefix-picker-calendar-calendar-grid': 'The main calendar grid div',
  '$prefix-picker-calendar-calendar-grid-row': 'Each row of the calendar grid',
  '$prefix-picker-calendar-calendar-grid-row-item':
    'Each item of the grid (the square)',
  '$prefix-picker-calendar-calendar-grid-row-item-selected':
    'selected grid row item',
  '$prefix-picker-calendar-grid-row-item-text':
    'The label for each grid item (the day)',
  '$prefix-picker-column': 'The column for a range picker',
  '$prefix-picker-column-inputs': 'The inputs wrapper',
  '$prefix-picker-column-comparison': 'The comparison wrapper',
  '$prefix-picker-column-inputs-shortcuts': 'The button shortcuts wrapper',
  '$prefix-picker-column-inputs-shortcuts-button': 'The button shortcut',
  '$prefix-picker-column-inputs-label': 'The label class',
  '$prefix-picker-column-inputs-hint': 'The hint class',
  '$prefix-picker-column-inputs-input-items': 'The items class',
  '$prefix-picker-column-inputs-input-item': 'The input element',
  '$prefix-picker-column-comparison-shortcuts': 'The button shortcuts wrapper',
  '$prefix-picker-column-comparison-shortcuts-button': 'The button shortcut',
  '$prefix-picker-column-comparison-toggle': 'Comparison toggle',
  '$prefix-picker-column-comparison-input-items': 'Comparison inputs wrapper',
  '$prefix-picker-column-comparison-input-item': 'Comparison input',
};

export default Date;
