import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import TimePickerInput from "../TimePickerInput";
import styles from "./TimePicker.scss";

function TimePicker({ value, onChange, prefixClassName }) {
  const date = dayjs(value);
  const HHRef = React.useRef();
  const MMRef = React.useRef();
  const [HH, setHH] = React.useState(date.format("h"));
  const [MM, setMM] = React.useState(date.format("mm"));
  const [AMPM, setAMPM] = React.useState(value.format("A"));

  const amActiveClassName = AMPM === "AM" ? styles.active : "";
  const pmActiveClassName = AMPM === "PM" ? styles.active : "";

  const generateValue = React.useCallback(
    (newHH, newMM, newAMPM) => {
      let date = dayjs(value);
      let hoursToAdd = 0;
      if (newAMPM === "PM" && +newHH === 12) hoursToAdd = 0;
      if (newAMPM === "AM" && +newHH === 12) hoursToAdd = 12;

      date = date.set("h", parseInt(newHH, 10) + hoursToAdd);
      date = date.set("m", parseInt(newMM, 10));

      if (dayjs(value).get("d") !== date.get("d"))
        date = date.set("d", dayjs(value).get("d"));

      return date;
    },
    [date],
  );

  const handleHHChange = React.useCallback(
    e => {
      let newHH = e.target ? +e.target.value : e;
      if (!newHH) newHH = 0;
      if (Number.isNaN(+newHH)) return;
      if (newHH > 12) return MMRef.current.focus();
      if (newHH > 1) {
        MMRef.current.select();
        MMRef.current.focus();
      }
      if (newHH === 0) newHH = 12;
      if (newHH < 1) return;

      setHH(newHH);
      onChange(generateValue(newHH, MM, AMPM));
    },
    [date],
  );

  const handleMMChange = React.useCallback(
    e => {
      let newMM = e.target ? e.target.value : e;
      if (!newMM) newMM = 0;
      if (Number.isNaN(+newMM)) return;
      if (newMM > 59) return;
      if (newMM < 0) return;
      setMM(newMM);
      onChange(generateValue(HH, newMM, AMPM));
    },
    [date],
  );

  const handleAMPMChange = React.useCallback(newAMPM => () => {
    setAMPM(newAMPM);
    onChange(generateValue(HH, MM, newAMPM));
  });

  return (
    <div className={`${styles.timePicker} ${prefixClassName}`}>
      <TimePickerInput
        autoFocus
        innerRef={HHRef}
        value={HH}
        onChange={handleHHChange}
        placeholder="HH"
        increment={1}
        max={12}
        prefixClassName={`${prefixClassName}-input`}
      />
      <span className={`${prefixClassName}-separator`}>:</span>
      <TimePickerInput
        innerRef={MMRef}
        value={MM}
        onChange={handleMMChange}
        placeholder="MM"
        increment={1}
        max={59}
        prefixClassName={`${prefixClassName}-input`}
      />
      <div
        className={`${styles.timePickerSwitcher} ${prefixClassName}-switcher`}
      >
        <div
          onClick={handleAMPMChange("AM")}
          className={`${styles.timePickerSwitcherValue} ${amActiveClassName} ${prefixClassName}-switcher-value`}
        >
          AM
        </div>
        <div
          onClick={handleAMPMChange("PM")}
          className={`${styles.timePickerSwitcherValue} ${pmActiveClassName} ${prefixClassName}-switcher-value`}
        >
          PM
        </div>
      </div>
    </div>
  );
}

TimePicker.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
  prefixClassName: PropTypes.string,
};

TimePicker.defaultProps = {
  onChange: () => {},
  value: dayjs(),
  prefixClassName: "",
};

export default TimePicker;
