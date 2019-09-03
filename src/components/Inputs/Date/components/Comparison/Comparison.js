import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import Button from "components/UI/Button";
import Checkbox from "components/Inputs/Checkbox";

import Input from "../Input";
import styles from "./Comparison.scss";

function Shortcuts({ startDate, endDate, onChange, prefixClassName }) {
  const numDays = endDate ? endDate.diff(startDate, "d") + 1 : 0;
  const prevComparisonStartDate = startDate.subtract(numDays, "d");
  const prevComparisonEndDate = startDate.subtract(1, "d");
  const isPreviousPeriod =
    startDate &&
    endDate &&
    startDate.isSame(prevComparisonStartDate) &&
    endDate.isSame(prevComparisonEndDate);

  return (
    <div className={`${styles.inputsButtons} ${prefixClassName}`}>
      <Button
        onClick={() => {
          onChange(
            startDate.subtract(numDays, "days").startOf("day"),
            startDate.subtract(1, "days").endOf("day"),
          );
        }}
        className={`${styles.inputsButton} ${
          isPreviousPeriod ? styles.compare : ""
        } ${prefixClassName}-button`}
        primary={isPreviousPeriod}
      >
        Previous Period
      </Button>
      <Button
        onClick={() => {
          onChange(null, null, "comparisonStartDate");
        }}
        className={`${styles.inputsButton} ${styles.comparison} ${prefixClassName}-button`}
        primary={!isPreviousPeriod}
      >
        Custom
      </Button>
    </div>
  );
}

function Comparison({
  comparisonStartDate,
  comparisonEndDate,
  onToggle,
  onChange,
  selectingKey,
  toggled,
  startDate,
  endDate,
  prefixClassName,
  onFocus,
}) {
  return (
    <div className={`${styles.inputs} ${prefixClassName}`}>
      <Checkbox.Item
        label="Compare"
        value={toggled}
        className={`${styles.inputsCheckbox} ${prefixClassName}-toggle`}
        onChange={onToggle}
      />
      {toggled ? (
        <React.Fragment>
          <Shortcuts
            prefixClassName={`${prefixClassName}-shortcuts`}
            startDate={startDate}
            endDate={endDate}
            onChange={onChange}
          />
          <div
            className={`${styles.inputsItems} ${prefixClassName}-input-items`}
          >
            <Input
              label="Start"
              key="comparisonStartDate"
              value={comparisonStartDate}
              onFocus={() => onFocus("comparisonStartDate")}
              focused={selectingKey === "comparisonStartDate"}
              compare
              prefixClassName={`${prefixClassName}-input-item`}
            />
            <Input
              className={styles.endInput}
              label="End"
              key="comparisonEndDate"
              value={comparisonEndDate}
              onFocus={() => onFocus("comparisonEndDate")}
              focused={selectingKey === "comparisonEndDate"}
              compare
              prefixClassName={`${prefixClassName}-input-item`}
            />
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
}

Comparison.propTypes = {
  comparisonEndDate: PropTypes.instanceOf(dayjs),
  comparisonStartDate: PropTypes.instanceOf(dayjs),
  endDate: PropTypes.instanceOf(dayjs),
  onChange: PropTypes.func,
  onToggle: PropTypes.func,
  onFocus: PropTypes.func,
  prefixClassName: PropTypes.string,
  selectingKey: PropTypes.string,
  startDate: PropTypes.instanceOf(dayjs),
  toggled: PropTypes.bool,
};

Comparison.defaultProps = {
  onChange: () => {},
  onToggle: () => {},
  onFocus: () => {},
  prefixClassName: "",
  selectingKey: "",
  toggled: false,
};

Shortcuts.propTypes = {
  onChange: PropTypes.func,
  prefixClassName: PropTypes.string,
  endDate: PropTypes.instanceOf(dayjs),
  startDate: PropTypes.instanceOf(dayjs),
};

Shortcuts.defaultProps = {
  onChange: () => {},
  prefixClassName: "",
};

export default Comparison;
