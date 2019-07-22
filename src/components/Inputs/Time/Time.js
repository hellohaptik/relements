import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import Tooltip from "@src/components/Overlays/Tooltip";
import Icon from "@src/components/UI/Icon";
import AngleDownIcon from "@src/icons/angle-down.svg";

import { TextInput } from "../_common/TextInput";
import { Label } from "../_common/Label";

import TimePicker from "./components/TimePicker";
import styles from "./Time.scss";

class Time extends React.Component {
  state = {
    active: false,
    focused: false,
    value: dayjs(),
  };

  _DOMNode = React.createRef();

  render() {
    const { className, error, disabled, prefixClassName } = this.props;
    const errorClassName = error ? styles.dateError : "";
    const disabledClassName = disabled ? styles.disabled : "";

    return (
      <div
        data-testid="time"
        className={`${styles.date} ${errorClassName} ${disabledClassName} ${prefixClassName} ${className}`}
      >
        {this.renderLabel()}
        {this.renderInput()}
        <Tooltip
          onClose={this.closeDate}
          attachTo={this._DOMNode}
          active={this.state.active}
          offset={this.props.offset}
          prefixClassName={`${prefixClassName}-tooltip`}
          position={this.props.position}
        >
          <TimePicker
            prefixClassName={`${prefixClassName}-picker`}
            value={this.state.value}
            onChange={this._handleChange}
          />
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
    const { placeholder, prefixClassName, onFocus, onBlur, error } = this.props;
    const parsedValue = this._getParsedDate();
    return (
      <TextInput
        prefixClassName={`${prefixClassName}-input`}
        innerRef={this._DOMNode}
        onKeyDown={this._handleKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseDown={this.toggleDate}
        focused={focused}
        active={active}
        value={parsedValue}
        placeholder={placeholder}
        error={error}
        disabled
        postfixComponent={<Icon src={AngleDownIcon} />}
      />
    );
  }

  _getParsedDate = () => {
    const { value } = this.props;
    const format = "hh:mm A";
    const date = this._getParsedValueFromDate(value);
    if (!date.isValid()) return "Invalid Date";
    return `${date.format(format)}`;
  };

  _getParsedValueFromDate = value => {
    return dayjs(value);
  };

  _handleChange = date => {
    this.setState({ value: date });
  };

  toggleDate = () => {
    this.setState(state => ({ active: !state.active, focused: !state.active }));
  };

  closeDate = () => {
    this.setState({ active: false, focused: false });
    this.props.onChange(this.state.value.toDate());
  };
}

Time.propTypes = {
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
  /** The offset of the tooltip containing the picker */
  offset: PropTypes.object,
  /** onBlur callback */
  onBlur: PropTypes.func,
  /** onChange callback */
  onChange: PropTypes.func,
  /** onFocus callback */
  onFocus: PropTypes.func,
  /** The input placeholder (when no value is selected) */
  placeholder: PropTypes.string,
  /** The position of the tooltip */
  position: PropTypes.string,
  /** The value of the input */
  value: PropTypes.string,
};

Time.defaultProps = {
  label: "",
  className: "",
  prefixClassName: "",
  value: "",
  placeholder: "",
  error: false,
  disabled: false,
  offset: null,
  position: null,
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
};

Time.classNames = {
  $prefix: "Added to the wrapper",
  "$prefix-label": "Added to the wrapper",
  "$prefix-input": "Added to the wrapper",

  "$prefix-tooltip": "Added to the wrapper",
  "$prefix-tooltip-overlay": "Added to the wrapper",
  "$prefix-tooltip-inner": "Added to the wrapper",
  "$prefix-tooltip-caret": "Added to the wrapper",
  "$prefix-tooltip-body": "Added to the wrapper",

  "$prefix-picker": "Added to the wrapper",
  "$prefix-picker-input": "Added to the wrapper",
  "$prefix-picker-input-element": "Added to the wrapper",
  "$prefix-picker-input-arrows": "Added to the wrapper",
  "$prefix-picker-input-arrow": "Added to the wrapper",

  "$prefix-picker-switcher": "Added to the wrapper",
  "$prefix-picker-switcher-value": "Added to the wrapper",
};

export default Time;
