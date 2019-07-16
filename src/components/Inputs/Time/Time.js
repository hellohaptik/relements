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
    const { className, error, disabled } = this.props;
    const errorClassName = error ? styles.dateError : "";
    const disabledClassName = disabled ? styles.disabled : "";

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
          <TimePicker value={this.state.value} onChange={this._handleChange} />
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
    const { placeholder, prefixClassName, onFocus, onBlur } = this.props;
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
};

Time.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  label: "",
  className: "",
  value: "",
  placeholder: "",
  error: false,
  disabled: false,
  errorMessage: "",
  errorMsgClassName: "",
  offset: null,
  position: null,
  attachTo: null,
};

export default Time;
