import React from "react";
import PropTypes from "prop-types";

import Icon from "@src/components/UI/Icon";
import AngleDownIcon from "@src/icons/angle-down.svg";
import styles from "./TimePickerInput.scss";

function TimePickerInput(props) {
  return (
    <div className={`${styles.timePickerInput} ${props.prefixClassName}`}>
      <input
        {...props}
        ref={props.innerRef}
        className={`${props.prefixClassName}-element`}
      />
      <div
        className={`${styles.timePickerInputArrows} ${props.prefixClassName}-arrows`}
      >
        <Icon
          onClick={() => props.onChange(+props.value + props.increment)}
          src={AngleDownIcon}
          className={`${styles.timePickerInputArrow} ${props.prefixClassName}-arrow`}
        />
        <Icon
          onClick={() => props.onChange(+props.value - props.increment)}
          src={AngleDownIcon}
          className={`${styles.timePickerInputArrow} ${props.prefixClassName}-arrow`}
        />
      </div>
    </div>
  );
}

TimePickerInput.propTypes = {
  innerRef: PropTypes.node,
  onChange: PropTypes.func,
  value: PropTypes.object,
  increment: PropTypes.number,
  prefixClassName: PropTypes.string,
};

TimePickerInput.defaultProps = {
  innerRef: null,
  increment: 1,
  onChange: () => {},
  prefixClassName: "",
};

export default TimePickerInput;
