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
  max,
}) {
  const handleChange = React.useCallback(newValue => {
    if (+newValue > max) onChange("00");
    else onChange(`${newValue}`);
  });

  // in display we want to always show 2 digits 
  // [1 should show up as 01, but 13 should show up as 13]
  const inputValue = +value > 9 ? `${+value}` : `0${+value}`;

  return (
    <div className={`${styles.timePickerInput} ${prefixClassName}`}>
      <input
        type="number"
        value={inputValue}
        onChange={e => handleChange(e.target.value)}
        ref={innerRef}
        className={`${prefixClassName}-element`}
      />
      <div
        className={`${styles.timePickerInputArrows} ${prefixClassName}-arrows`}
      >
        <Icon
          onClick={() => handleChange(+value + increment)}
          src={AngleDownIcon}
          className={`${styles.timePickerInputArrow} ${prefixClassName}-arrow`}
        />
        <Icon
          onClick={() => handleChange(+value - increment)}
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
  max: PropTypes.number,
  prefixClassName: PropTypes.string,
};

TimePickerInput.defaultProps = {
  innerRef: null,
  increment: 1,
  max: Number.MAX_SAFE_INTEGER,
  onChange: () => {},
  prefixClassName: "",
};

export default TimePickerInput;
