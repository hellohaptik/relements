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
    } = this.props;
    const errorClassName = error ? styles.dateError : '';
    const disabledClassName = disabled ? styles.disabled : '';

    return (
      <div
        className={`${styles.date} ${errorClassName} ${disabledClassName} ${className}`}
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
        >
          {withRange ? (
            <RangeComparison
              value={value}
              onChange={this._handleChange}
              maxDate={maxDate}
              minDate={minDate}
              comparisonMaxDate={comparisonMaxDate}
              comparisonMinDate={comparisonMinDate}
              withComparison={withComparison}
            />
          ) : (
            <SinglePicker
              value={value}
              onChange={this._handleChange}
              maxDate={maxDate}
              minDate={minDate}
            />
          )}
        </Tooltip>
        {this.renderError()}
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

  renderError = () => {
    const { errorMessage, errorMsgClassName, error } = this.props;
    if (!error || !errorMessage) return null;
    return (
      <div className={`${styles.dateInputSubtext} ${errorMsgClassName}`}>
        <span className={styles.dateInputSubtextError}>{errorMessage}</span>
      </div>
    );
  };

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
    const { value = {} } = this.props;
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
    const { value = {} } = this.props;
    return dayjs(value);
  };

  _handleChange = (date) => {
    this.setState({ active: false, focused: false });
    this.props.onChange(date);
  };

  toggleDate = () => {
    this.setState(state => ({ active: !state.active, focused: !state.active }));
  };

  closeDate = () => {
    this.setState({ active: false, focused: false });
  };
}

Date.propTypes = {
  attachTo: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  errorMsgClassName: PropTypes.string,
  prefixClassName: PropTypes.string,
  label: PropTypes.string,
  offset: PropTypes.object,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  position: PropTypes.string,
  value: PropTypes.string,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  comparisonMaxDate: PropTypes.instanceOf(Date),
  comparisonMinDate: PropTypes.instanceOf(Date),
  withRange: PropTypes.bool,
  withComparison: PropTypes.bool,
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
  errorMessage: '',
  errorMsgClassName: '',
  offset: null,
  position: null,
  attachTo: null,
  maxDate: null,
  minDate: null,
  comparisonMaxDate: null,
  comparisonMinDate: null,
};

export default Date;
