import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import Calendar from "components/UI/Calendar";
import Inputs from "../Inputs";
import Comparison from "../Comparison";
import styles from "./RangePicker.scss";

export default class RangePicker extends React.Component {
  constructor(props) {
    super(props);

    const value = { ...this._getParsedValue(props.value) };
    value.compare = value.comparisonStartDate && value.comparisonEndDate;
    this.setState(value);
    this.state = {
      startDate: value.startDate,
      endDate: value.endDate,
      compare: value.compare,
      comparisonStartDate: value.comparisonStartDate,
      comparisonEndDate: value.comparisonEndDate,
      selectingKey: "startDate",
    };
    dayjs.extend(customParseFormat);
  }

  render() {
    const {
      startDate,
      endDate,
      comparisonStartDate,
      comparisonEndDate,
    } = this.state;
    let value = [{ from: startDate, to: endDate }];
    if (this.props.withComparison) {
      value = value.concat({
        from: comparisonStartDate,
        to: comparisonEndDate,
        color: "#f1c40f",
      });
    }

    const { prefixClassName, numMonths, maxSelectableRange } = this.props;
    const weekDays = 7;
    const monthDays = 30;
    const shortcut7DaysVisible = maxSelectableRange >= weekDays ? true : false;
    const shortcut30DaysVisible =
      maxSelectableRange >= monthDays ? true : false;

    return (
      <div className={`${styles.rangePicker} ${prefixClassName}`}>
        <div
          className={`${styles.rangePickerCalendarColumn} ${prefixClassName}-column`}
        >
          <Calendar
            value={value}
            onChange={this._handleCellClick}
            numMonths={numMonths}
            prefixClassName={`${prefixClassName}-calendar`}
          />
        </div>
        <div
          className={`${styles.rangePickerCalendarColumn} ${prefixClassName}-column`}
        >
          <Inputs
            selectingKey={this.state.selectingKey}
            startDate={startDate}
            endDate={endDate}
            onChange={this._setDates}
            prefixClassName={`${prefixClassName}-column-inputs`}
            onFocus={key => {
              this.setState({ selectingKey: key });
            }}
            last7DaysVisible={maxSelectableRange ? shortcut7DaysVisible : true}
            last30DaysVisible={
              maxSelectableRange ? shortcut30DaysVisible : true
            }
          />

          {this.props.withComparison ? (
            <Comparison
              selectingKey={this.state.selectingKey}
              startDate={startDate}
              endDate={endDate}
              comparisonStartDate={comparisonStartDate}
              comparisonEndDate={comparisonEndDate}
              toggled={this.state.compare}
              onChange={this._setComparisonDates}
              prefixClassName={`${prefixClassName}-column-comparison`}
              onToggle={newCompare =>
                this.setState({
                  compare: newCompare,
                  selectingKey: "comparisonStartDate",
                  comparisonStartDate:
                    newCompare && startDate && endDate
                      ? startDate.subtract(
                          endDate.diff(startDate, "d") + 1,
                          "d",
                        )
                      : null,
                  comparisonEndDate:
                    newCompare && startDate && endDate
                      ? startDate.subtract(1, "d")
                      : null,
                })
              }
              onFocus={key => {
                this.setState({ selectingKey: key });
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }

  getValue = () => {
    const {
      startDate,
      endDate,
      comparisonStartDate,
      comparisonEndDate,
    } = this.state;
    return {
      startDate: startDate ? startDate.startOf("day").toDate() : startDate,
      endDate: endDate ? endDate.endOf("day").toDate() : null,
      comparisonStartDate: comparisonStartDate
        ? comparisonStartDate.startOf("day").toDate()
        : null,
      comparisonEndDate: comparisonEndDate
        ? comparisonEndDate.endOf("day").toDate()
        : null,
    };
  };

  /**
   * On clicking the cell we want to start/end the range selection depending on the
   * current state
   * So if the current selection is startDate, we start endDate selection and so on
   * We use this.state.selectingKey to track this
   */
  _handleCellClick = day => {
    const { selectingKey, startDate, endDate, comparisonEndDate } = this.state;
    const { maxSelectableRange } = this.props;
    let selectKey = selectingKey;
    let compEndDate = comparisonEndDate;
    const selectedDay = day;
    let selectedStartDate = startDate;
    let selectedEndDate = endDate;

    // When latter date is selected as start date and former is selected as end
    let invalidRange = false;

    if (selectingKey === "startDate") {
      selectKey = "endDate";
      selectedStartDate = selectedDay;
      selectedEndDate = maxSelectableRange
        ? dayjs(selectedDay).add(maxSelectableRange - 1, "d")
        : null;
    }

    // If selected date is comparisonStartDate
    else if (selectingKey === "comparisonStartDate") {
      const numDays = endDate.diff(startDate, "d");
      compEndDate = day.add(numDays, "d");
    }

    // If selected date is end date
    else {
      selectKey = "startDate";
      const difference = day.diff(startDate, "d");
      invalidRange = Math.sign(difference) === -1;
      selectedEndDate = selectedDay;

      // Check if selected day is more than end date for maxSelectableRange
      if (
        maxSelectableRange &&
        day > dayjs(startDate).add(maxSelectableRange - 1, "d")
      ) {
        invalidRange = true;
      }

      // When selected range is invalid
      if (invalidRange) {
        // If max sel. range is applicable, set end date to its number of days + selected date
        if (maxSelectableRange) {
          selectedEndDate = dayjs(selectedDay).add(maxSelectableRange - 1, "d");
          selectKey = "endDate";
        } else {
          selectedEndDate = startDate;
        }
        selectedStartDate = selectedDay;
      }
    }

    // Update values
    this.setState({
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      selectingKey: selectKey,
      comparisonEndDate: compEndDate,
    });
  };

  /**
   * Sets the startDate and endDate
   * Also resets the month in focus to default
   */
  _setDates = (startDate, endDate) => {
    this.setState({
      startDate,
      endDate,
      selectingKey: "startDate",
    });
  };

  _setComparisonDates = (
    comparisonStartDate,
    comparisonEndDate,
    selectingKey = this.state.selectingKey,
  ) => {
    this.setState({
      comparisonStartDate,
      comparisonEndDate,
      selectingKey,
    });
  };

  _getParsedValue = () => {
    const { value = {} } = this.props;
    const startDate = dayjs(value.startDate);
    const endDate = dayjs(value.endDate);
    const comparisonStartDate = value.comparisonStartDate
      ? dayjs(value.comparisonStartDate)
      : null;
    const comparisonEndDate = value.comparisonEndDate
      ? dayjs(value.comparisonEndDate)
      : null;
    return {
      startDate,
      endDate,
      comparisonStartDate,
      comparisonEndDate,
    };
  };
}

RangePicker.propTypes = {
  withComparison: PropTypes.bool,
  prefixClassName: PropTypes.string,
  numMonths: PropTypes.number,
  maxSelectableRange: PropTypes.number,
  value: PropTypes.shape({
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    comparisonStartDate: PropTypes.object,
    comparisonEndDate: PropTypes.object,
  }),
};

RangePicker.defaultProps = {
  withComparison: false,
  numMonths: 2,
  prefixClassName: "",
  value: {
    startDate: dayjs(),
    endDate: dayjs(),
    comparisonStartDate: null,
    comparisonEndDate: null,
  },
};
