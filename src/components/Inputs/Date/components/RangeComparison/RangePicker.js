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
      compare,
      selectingKey,
    } = this.state;

    let value = [{ from: startDate, to: endDate }];
    if (this.props.withComparison) {
      value = value.concat({
        from: comparisonStartDate,
        to: comparisonEndDate,
        color: "#f1c40f",
      });
    }

    const {
      prefixClassName,
      numMonths,
      maxDate,
      minDate,
      comparisonMaxDate,
    } = this.props;

    return (
      <div className={`${styles.rangePicker} ${prefixClassName}`}>
        <div
          className={`${styles.rangePickerCalendarColumn} ${prefixClassName}-column`}
        >
          <Calendar
            value={value}
            startDate={startDate}
            endDate={endDate}
            onChange={this._handleCellClick}
            numMonths={numMonths}
            maxDate={maxDate}
            minDate={minDate}
            toggled={this.state.compare}
            comparisonMaxDate={comparisonMaxDate}
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
          />
          {this.props.withComparison ? (
            <Comparison
              selectingKey={selectingKey}
              startDate={startDate}
              endDate={endDate}
              comparisonStartDate={comparisonStartDate}
              comparisonEndDate={comparisonEndDate}
              toggled={compare}
              onChange={this._setComparisonDates}
              prefixClassName={`${prefixClassName}-column-comparison`}
              onToggle={this._onToggle}
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
      endDate: endDate ? endDate.endOf("day").toDate() : startDate,
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
    const { selectingKey, compare } = this.state;
    const { comparisonMaxDate } = this.props;
    if (selectingKey === "startDate") {
      this.setState({
        selectingKey: "endDate",
        endDate: null,
      });
    } else if (compare && selectingKey === "comparisonStartDate") {
      const { startDate, endDate } = this.state;
      const numDays = endDate && endDate.diff(startDate, "d");
      const compMaxDate =
        comparisonMaxDate &&
        dayjs(comparisonMaxDate).isBefore(day.add(numDays, "d"))
          ? dayjs(comparisonMaxDate)
          : day.add(numDays, "d");
      this.setState({
        selectingKey: "comparisonStartDate",
        comparisonEndDate: compMaxDate,
      });
    } else {
      this.setState({ selectingKey: "startDate" });
    }

    this.setState({ [selectingKey]: day });
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

  _onToggle = newCompare => {
    const { startDate, endDate } = this.state;
    const { comparisonMaxDate } = this.props;
    const numDays = endDate && endDate.diff(startDate, "d") + 1;
    let comparisonStart = null;
    let comparisonEnd = null;

    this.setState({
      compare: newCompare,
      selectingKey: newCompare ? "comparisonStartDate" : "startDate",
    });

    if (newCompare && startDate && endDate) {
      comparisonStart = startDate.subtract(numDays, "d");

      // setting maximum selectable compare date as comparisonEndDate
      comparisonEnd =
        comparisonMaxDate && comparisonMaxDate < startDate.subtract(1, "d")
          ? comparisonMaxDate
          : startDate.subtract(1, "d");
    }

    this.setState({
      comparisonStartDate: comparisonStart,
      comparisonEndDate: comparisonEnd,
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
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  comparisonMaxDate: PropTypes.instanceOf(Date),
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
  maxDate: null,
  minDate: null,
  comparisonMaxDate: null,
  value: {
    startDate: dayjs(),
    endDate: dayjs(),
    comparisonStartDate: null,
    comparisonEndDate: null,
  },
};
