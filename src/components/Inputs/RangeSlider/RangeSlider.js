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
  });

  return (
    <div
      tabIndex="0"
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`${styles.slider} ${className}`}
    >
      <Label
        focused={focused}
        error={error}
        className={`${styles.sliderLabel} ${prefixClassName}-label`}
      >
        {label}
      </Label>
      <div className={styles.sliderInput}>
        <div className={styles.sliderTrack} ref={_TrackDOM}>
          <div
            className={styles.sliderFilled}
            style={{ width: `${trackWidth}%`, left: `${trackOffset}%` }}
          />
          {single ? null : renderKnob("start")}
          {renderKnob("end")}
        </div>
      </div>
      <div className={styles.sliderTextInputs}>
        {single ? null : renderInput("start")}
        {renderInput("end")}
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
};

RangeSlider.defaultProps = {
  className: "",
  placeholder: "",
  end: 0,
  error: "",
  label: "",
  onBlur: () => {},
  onChange: () => {},
  onDrag: () => {},
  onFocus: () => {},
  prefixClassName: "",
  single: false,
  start: 0,
  step: 0,
};

RangeSlider.classNames = {
  "$prefix-label": "Label of the Range slider",
};

export default RangeSlider;
