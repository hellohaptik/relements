import React, { useRef } from "react";
import PropTypes from "prop-types";

import { useRangeSlider } from "./hooks/useRangeSlider";
import { useInput } from "../_common/hooks/useInput";
import { Label } from "../_common/Label";
import styles from "./RangeSlider.scss";

function RangeSlider({
  className,
  prefixClassName,
  placeholder,
  label,
  value,
  onFocus,
  onBlur,
  onDrag,
  onChange,
  error,
  single,
  start,
  end,
  step,
  testId,
  startPlaceholder,
  endPlaceholder,
  inputPlaceholder,
  renderInputValue,
  translateInputValue,
}) {
  const _TextInputDOM = useRef();
  const _TrackDOM = useRef();
  const { focused, handleFocus, handleBlur } = useInput(
    _TextInputDOM,
    onFocus,
    onBlur,
  );
  const { trackWidth, trackOffset, renderKnob, renderInput } = useRangeSlider({
    value,
    start,
    end,
    onChange,
    step,
    trackRef: _TrackDOM,
    single,
    onDrag,
    placeholder,
    startPlaceholder,
    endPlaceholder: endPlaceholder || inputPlaceholder,
    renderInputValue,
    translateInputValue,
  });

  return (
    <div
      data-testid={testId}
      tabIndex="0"
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`${styles.slider} ${className} ${prefixClassName}`}
    >
      <Label
        focused={focused}
        error={error}
        className={`${styles.sliderLabel} ${prefixClassName}-label`}
      >
        {label}
      </Label>
      <div className={styles.sliderInput}>
        <div
          className={`${styles.sliderTrack} ${prefixClassName}-track`}
          ref={_TrackDOM}
        >
          <div
            className={styles.sliderFilled}
            style={{ width: `${trackWidth}%`, left: `${trackOffset}%` }}
          />
          {single ? null : renderKnob("start", prefixClassName)}
          {renderKnob("end", prefixClassName)}
        </div>
      </div>
      <div className={`${styles.sliderTextInputs}`}>
        {single ? null : renderInput("start", prefixClassName)}
        {renderInput("end", prefixClassName)}
      </div>
    </div>
  );
}

RangeSlider.propTypes = {
  /** The classname to appended to the outermost element */
  className: PropTypes.string,
  /** Value of the slider input in case of single. In case of multiple, it's the end value */
  start: PropTypes.number,
  /** Value of the slider input in case of single. In case of multiple, it's the end value */
  end: PropTypes.number,
  /** If the input slider has an error, pass on the message. */
  error: PropTypes.string,
  /** Label text */
  label: PropTypes.string,
  /** Placeholder text for value indicated below the slider widget */
  placeholder: PropTypes.string,
  /** Method fired onBlur event */
  onBlur: PropTypes.func,
  /** Method fired on changing range value */
  onChange: PropTypes.func,
  /** Method fired on dragging the knob event */
  onDrag: PropTypes.func,
  /** Method fired on focusing on the slider */
  onFocus: PropTypes.func,
  /**
   * Method to format range value, range value is passed as a parameter.
   * Method should return user defined representation for supplied parameter value.
   * Returned value is displayed in the input box.
   * Mandatory prop if translateInputValue prop is passed.
   * @author Swapnil Misal <swapnil.misal@gmail.com>
   */
  renderInputValue: PropTypes.func,
  /**
   * Method to translate value in the input box.
   * Input value from input box and range value is passed as a parameter in respective order.
   * It should return previous valid range value for invalid input box value or converted range value from input value.
   * Mandatory prop if renderInputValue prop is passed.
   * @author Swapnil Misal <swapnil.misal@gmail.com>
   */
  translateInputValue: PropTypes.func,
  /** The prefix classname prepended to all elements */
  prefixClassName: PropTypes.string,
  /** Defines the type of slider. Whether it will have a range or a single knob */
  single: PropTypes.bool,
  /** The difference with which the value will be increased or decreased */
  step: PropTypes.number,
  /** Array of two numbers in case of multiple type slider. Only a number in case of single type slider. */
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  /** For testing purpose */
  testId: PropTypes.string,
  /** Placeholder (LHS) of the input for the start knob */
  startPlaceholder: PropTypes.string,
  /** Placeholder (LHS) of the input for the end knob */
  endPlaceholder: PropTypes.string,
  /** Placeholder (LHS) of the input for the start knob */
  inputPlaceholder: PropTypes.string,
};

RangeSlider.defaultProps = {
  className: "",
  placeholder: "",
  end: 0,
  error: "",
  label: "",
  startPlaceholder: "",
  endPlaceholder: "",
  inputPlaceholder: "",
  onBlur: () => {},
  onChange: () => {},
  onDrag: () => {},
  onFocus: () => {},
  renderInputValue: undefined,
  translateInputValue: undefined,
  prefixClassName: "",
  single: false,
  start: 0,
  step: 0,
};

RangeSlider.classNames = {
  $prefix: "Range slider wrapper class",
  "$prefix-label": "Label of the Range slider",
  "$prefix-track": "Track of the Range slider",
  "$prefix-start-input": "Start input field of the Range slider",
  "$prefix-end-input": "End input field of the Range slider",
  "$prefix-start-knob": "Start draggable knob of the Range slider",
  "$prefix-end-knob": "End draggable knob of the Range slider",
};

export default RangeSlider;
