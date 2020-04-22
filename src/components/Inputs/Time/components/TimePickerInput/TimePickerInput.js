import React from "react";
import PropTypes from "prop-types";

import Icon from "@src/components/UI/Icon";
import AngleDownIcon from "@src/icons/angle-down.svg";
import styles from "./TimePickerInput.scss";

function TimePickerInput({
  innerRef,
  onChange,
  value,
  increment,
  prefixClassName,
}) {
  return (
    <div className={`${styles.timePickerInput} ${prefixClassName}`}>
      <input
        value={value}
        onChange={onChange}
        ref={innerRef}
        className={`${prefixClassName}-element`}
      />
      <div
        className={`${styles.timePickerInputArrows} ${prefixClassName}-arrows`}
      >
        <Icon
          onClick={() => onChange(+value + increment)}
          src={AngleDownIcon}
          className={`${styles.timePickerInputArrow} ${prefixClassName}-arrow`}
        />
        <Icon
          onClick={() => onChange(+value - increment)}
          src={AngleDownIcon}
          className={`${styles.timePickerInputArrow} ${prefixClassName}-arrow`}
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
