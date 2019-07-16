import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import Tooltip from '@src/components/Overlays/Tooltip';
import Icon from '@src/components/UI/Icon';
import AngleDownIcon from '@src/icons/angle-down.svg';

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
      onChange,
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
          onClose={this.toggleDate}
          attachTo={this.props.attachTo || this._DOMNode}
          active={this.state.active}
          offset={this.props.offset}
          className="date-picker-tooltip"
          position={this.props.position}
        >
          {withRange ? (
            <RangeComparison
              value={value}
              onChange={onChange}
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
    if (!this.props.label) return null;
    const focusedClassName = this.state.focused ? styles.focused : '';
    return (
      <span className={`${styles.dateLabel} ${focusedClassName}`}>
        {this.props.label}
      </span>
    );
  }

  renderInput() {
    const parsedValue = this._getParsedDate();
    const activeClassName = this.state.active ? styles.active : '';
    const focusedClassName = this.state.focused ? styles.focused : '';
    const disabledClassName = this.props.disabled ? styles.disabled : '';
    return (
      <div
        ref={this._DOMNode}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex="0"
        onKeyDown={this._handleKeyDown}
        onFocus={this._handleFocus}
        onBlur={this._handleBlur}
        onClick={this.toggleDate}
        className={`${styles.dateInputWrapper} ${activeClassName} ${disabledClassName} ${focusedClassName}`}
      >
        <div className={styles.dateInput}>
          {parsedValue || <span>{this.props.placeholder}</span>}
        </div>
        <Icon src={AngleDownIcon} />
      </div>
    );
  }

  renderError = () => {
    const { errorMessage, errorMsgClassName, error } = this.props;
    if (!error || !errorMessage) return null;
    return (
      <div className={`${styles.dateInputSubtext} ${errorMsgClassName}`}>
        <span className={styles.dateInputSubtextError}>{errorMessage}</span>
;
      </div>
    );
  };

  _getParsedDate = () => {
    // let parsedValue = '';
    // const value = this.props.value;
    let value = '';
    if (this.props.withRange) {
      value = this._getParsedValueFromObject(this.props.value);
      if (!value.startDate.isValid() || !value.endDate.isValid()) return '';
      return `${value.startDate.format(
        'DD MMM, YYYY',
      )} - ${value.endDate.format('DD MMM, YYYY')}`;
    }

    value = this._getParsedValueFromDate(this.props.value);
    if (!value.isValid()) return '';
    return `${value.format('DD MMMM, YYYY')}`;
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

  _handleFocus = (e) => {
    this.props.onFocus(e);
  };

  _handleBlur = (e) => {
    this.props.onBlur(e);
  };

  _onDateClick = (option) => {
    this.props.onChange(option);
  };

  toggleDate = () => {
    this.setState(state => ({ active: !state.active, focused: !state.active }));
  };
}

Date.propTypes = {
  attachTo: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  errorMsgClassName: PropTypes.string,
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
