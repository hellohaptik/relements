import React from "react";
import PropTypes from "prop-types";

import Icon from "components/UI/Icon";
import Odometer from "components/UI/Odometer";
import styles from "./NumberCounter.scss";

class NumberCounter extends React.Component {
  state = {
    focused: false,
  };

  render() {
    const {
      prefixClassName,
      className,
      value = "",
      label,
      error,
      errorMessage,
      errorMsgClassName,
      max = 100000,
    } = this.props;

    const errorClassName = error ? styles.numberCounterError : "";
    const focusedClassName = this.state.focused ? styles.focused : "";
    const minusDisabledClassName = value === 0 ? styles.disabled : "";
    const plusDisabledClassName = value >= max ? styles.disabled : "";
    const isZeroClassName = value === 0 ? styles.isZero : "";

    return (
      <div
        className={`${styles.numberCounter} ${errorClassName} ${prefixClassName} ${className}`}
        data-testid="numberCounter"
      >
        <span
          className={`${prefixClassName}-label ${errorClassName} ${styles.numberCounterLabel} ${focusedClassName}`}
        >
          {label}
        </span>
        <div className={`${styles.counter} ${isZeroClassName}`}>
          <Icon
            onClick={this._handleChange(-1)}
            src="minus"
            className={`${prefixClassName}-subtract ${styles.counterButton} ${minusDisabledClassName}`}
          />
          <Odometer>{value.toString()}</Odometer>
          <Icon
            onClick={this._handleChange(1)}
            src="plus2"
            className={`${prefixClassName}-add ${styles.counterButton} ${plusDisabledClassName}`}
          />
        </div>
        {error && (
          <div
            className={`${errorMsgClassName} ${styles.numberCounterInputWrapper}`}
          >
            {this._renderError(errorMessage)}
          </div>
        )}
      </div>
    );
  }

  _renderError = errorMessage => {
    return (
      <span className={styles.numberCounterInputWrapperError}>
        {errorMessage}
      </span>
    );
  };

  _handleChange = change => () => {
    const max = this.props.max || 100000;
    const value = this.props.value + change;

    if (value < 0) return;
    if (value > max) return;

    this.props.onChange(value);
  };
}

NumberCounter.propTypes = {
  /** Prefix Classname to Element classNames */
  prefixClassName: PropTypes.string,
  /** Outermost className */
  className: PropTypes.string,
  /** Value for the Number Count */
  value: PropTypes.number,
  /** Label for the input */
  label: PropTypes.string,
  /** onChange callback */
  onChange: PropTypes.func,
  /** Error Flag */
  error: PropTypes.bool,
  /** Reason for the error */
  errorMessage: PropTypes.string,
  /** Custom Error Message Classname */
  errorMsgClassName: PropTypes.string,
  /** Maximum value for the input */
  max: PropTypes.number,
};

NumberCounter.defaultProps = {
  prefixClassName: "",
  className: "",
  value: "",
  label: "",
  onChange: () => {},
  error: false,
  errorMessage: "There is an error",
  errorMsgClassName: "",
  max: 10000,
};

NumberCounter.classNames = {
  $prefix: "Prefix ClassName added to the Parent",
  "$prefix-label": "Added to the Label Component",
  "$prefix-subtract": "Added to the Subtract Button",
  "$prefix-add": "Added to the Add Button",
};

export default NumberCounter;
