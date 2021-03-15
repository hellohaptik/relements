import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import cc from "classcat";
import customParseFormat from "dayjs/plugin/customParseFormat";

import Icon from "components/UI/Icon";
import styles from "./Calendar.scss";

const LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

dayjs.extend(customParseFormat);

const hexToRgb = hex => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * Translates the row/column index for an actual date (we only use the month from date)
 * @Returns
 * text : <string> : the date text (ex. 23)
 * invisible : <bool> : whether the given cell is invisible (out of range)
 * day: <dayjs> : the dayjs object representing the day of the cell
 */
const getTextForCell = (date, rowIndex, columnIndex) => {
  const month = date.startOf("month");
  const cellNumber = rowIndex * 7 + columnIndex;
  const offset = month.day();
  const day = month.add(cellNumber - offset, "d");
  const invisible = day.month() !== month.month();

  return {
    text: `${day.date()}`,
    day,
    invisible,
  };
};

/**
 * For every cell we run this function to see if the range is selected or not
 * so given, the date and the start date and end date we see if it falls inside (inclusively)
 */
const isSelected = (date, from, to) => {
  return (
    (date.isAfter(from, "d") && date.isBefore(to, "d")) ||
    date.isSame(from, "d") ||
    date.isSame(to, "d")
  );
};

const renderHeader = (date, ranges, { prefixClassName }) => {
  const month = date.format("MMMM");
  const year = date.format("YYYY");
  return (
    <div
      className={`${styles.calendarHeader} ${prefixClassName}-calendar-header`}
    >
      <div
        className={`${styles.calendarHeaderMonth} ${prefixClassName}-calendar-header-text`}
      >
        {month} <strong>{year}</strong>
      </div>
    </div>
  );
};

const renderLabels = (date, ranges, { prefixClassName }) => {
  return (
    <div className={`${styles.calendarLabels} ${prefixClassName}-labels`}>
      {new Array(7).fill(0).map((_, i) => (
        <div className={`${styles.calendarLabel} ${prefixClassName}-label`}>
          {LABELS[i]}
        </div>
      ))}
    </div>
  );
};

/**
 * Renders each Row
 */
const renderGridRow = (
  rowIndex,
  date,
  ranges,
  {
    handleCellClick,
    mergeColor,
    prefixClassName,
    minDate,
    maxDate,
    comparisonMaxDate,
    toggled,
    startDate,
    endDate,
  },
) => {
  return new Array(7).fill(0).map((_, columnIndex) => {
    const { text, day, invisible } = getTextForCell(
      date,
      rowIndex,
      columnIndex,
    );

    let selected = false;
    let hasLeftEdgeBorder = false;
    let hasRightEdgeBorder = false;
    let hasBottomEdgeBorder = false;
    let style = {};
    let lastColor = "";
    ranges.forEach(({ from, to, color = "#1b9cfc" }) => {
      const adjacentCell = day.add(7, "d");
      const adjacentCellIsInThisMonth = adjacentCell.month() === day.month();

      lastColor = color;

      if (invisible) return;
      if (adjacentCell.isSame(from, "d") && adjacentCellIsInThisMonth)
        hasBottomEdgeBorder = true;
      if (adjacentCell.isSame(to, "d") && adjacentCellIsInThisMonth)
        hasBottomEdgeBorder = true;
      if (day.isSame(from, "d")) hasLeftEdgeBorder = true;
      if (day.isSame(to, "d")) hasRightEdgeBorder = true;
      if (isSelected(day, from, to)) {
        selected = true;
        if (!style.backgroundColor) {
          style = {
            borderColor: color,
            borderBottomColor: color,
            backgroundColor: `rgba(${Object.values(hexToRgb(color))}, 0.3)`,
          };
        } else {
          style = {
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            borderBottomColor: mergeColor,
            backgroundColor: `rgba(${Object.values(
              hexToRgb(mergeColor),
            )}, 0.3)`,
          };
        }
      }
    });

    let isDisabled = false;
    if (minDate && dayjs(minDate).isAfter(day)) isDisabled = true;
    if (maxDate && dayjs(maxDate).isBefore(day)) isDisabled = true;
    if (toggled && comparisonMaxDate && dayjs(comparisonMaxDate).isBefore(day))
      isDisabled = true;
    if (startDate && !endDate && dayjs(startDate).isAfter(day))
      isDisabled = true;
    const classNames = {
      gridRowItem: cc([
        styles.calendarGridRowItem,
        {
          [styles.invisible]: invisible,
          [styles.selected]: selected,
          [styles.disabled]: isDisabled,
        },
        `${prefixClassName}-calendar-grid-row-item`,
        {
          [`${prefixClassName}-calendar-grid-row-item-selected`]: selected,
        },
      ]),

      gridRowItemText: cc([
        styles.calendarGridRowItemText,
        `${prefixClassName}-grid-row-item-text`,
      ]),
    };

    return (
      <div
        onClick={() => handleCellClick(day)}
        style={{
          borderLeftWidth: hasLeftEdgeBorder ? 1 : 0,
          borderRightWidth: hasRightEdgeBorder ? 1 : 0,
          borderBottomColor: hasBottomEdgeBorder ? lastColor : undefined,
          ...style,
        }}
        className={classNames.gridRowItem}
      >
        <div className={classNames.gridRowItemText}>{text}</div>
      </div>
    );
  });
};

/**
 * Renders the 6 * 7 grid
 */
const renderGrid = (date, ranges, props) => {
  // eslint-disable-next-line react/prop-types
  const { prefixClassName } = props;
  return (
    <div className={`${styles.calendarGrid} ${prefixClassName}-calendar-grid`}>
      {new Array(6).fill(0).map((_, i) => (
        <div
          className={`${styles.calendarGridRow} ${prefixClassName}-calendar-grid-row`}
        >
          {renderGridRow(i, date, ranges, props)}
        </div>
      ))}
    </div>
  );
};

const renderCalendar = (date, ranges, props) => {
  // eslint-disable-next-line react/prop-types
  const { prefixClassName } = props;
  return (
    <div className={`${styles.calendar} ${prefixClassName}-calendar`}>
      {renderHeader(date, ranges, props)}
      {renderLabels(date, ranges, props)}
      {renderGrid(date, ranges, props)}
    </div>
  );
};

const Calendar = ({
  value,
  numMonths,
  onChange,
  mergeColor,
  className,
  prefixClassName,
  maxDate,
  minDate,
  comparisonMaxDate,
  toggled,
  startDate,
  endDate,
}) => {
  const ranges = Array.isArray(value) ? value : [{ from: value, to: value }];
  const [viewingMonth, setViewingMonth] = React.useState(dayjs());

  const viewNextMonth = React.useCallback(() => {
    setViewingMonth(viewingMonth.add(1, "month"));
  });

  const viewPreviousMonth = React.useCallback(() => {
    setViewingMonth(viewingMonth.subtract(1, "month"));
  });

  const handleCellClick = React.useCallback(day => {
    onChange(day);
  });

  const props = {
    handleCellClick,
    mergeColor,
    prefixClassName,
    maxDate,
    minDate,
    comparisonMaxDate,
    toggled,
    startDate,
    endDate,
  };

  return (
    <div
      data-testid="calendar"
      className={`${styles.datePicker} ${className} ${prefixClassName}`}
    >
      <Icon
        src="angle-down"
        className={`${styles.datePickerNavigationIcon} ${prefixClassName}-arrow-left`}
        onClick={viewPreviousMonth}
      />
      <Icon
        src="angle-down"
        className={`${styles.datePickerNavigationIcon} ${styles.right} ${prefixClassName}-arrow-right`}
        onClick={viewNextMonth}
      />
      {new Array(numMonths)
        .fill(0)
        .map((_, i) =>
          renderCalendar(
            viewingMonth.subtract(numMonths - i - 1, "months"),
            ranges,
            props,
          ),
        )}
    </div>
  );
};

Calendar.propTypes = {
  /** The classname to appended to the outermost element */
  className: PropTypes.string,
  /** The prefix classname appended to all elements */
  prefixClassName: PropTypes.string,
  /** onChange callback */
  onChange: PropTypes.func,
  /** when specifying multiple ranges, this is the color for conflicting ranges */
  mergeColor: PropTypes.string,
  /** start date of the range * */
  startDate: PropTypes.string,
  /** end date of the range* */
  endDate: PropTypes.string,
  /** Dates after this date would be disabled * */
  maxDate: PropTypes.string,
  /** Dates before this date would be disabled * */
  minDate: PropTypes.string,
  /** Dates after this date would be disabled * */
  comparisonMaxDate: PropTypes.string,
  /** number of months to show in the calendar at a time */
  numMonths: PropTypes.number,
  /**  when compare is enabled */
  toggled: PropTypes.bool,
  /** The dates to highlight, can be an array of objects or a single a object */
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        from: PropTypes.object,
        to: PropTypes.object,
        color: PropTypes.string,
      }),
    ),
    PropTypes.object,
  ]),
};

Calendar.defaultProps = {
  onChange: () => {},
  numMonths: 1,
  value: dayjs(),
  mergeColor: "#F00",
  className: "",
  prefixClassName: "",
  minDate: undefined,
  maxDate: undefined,
  comparisonMaxDate: undefined,
  toggled: false,
};

Calendar.classNames = {
  $prefix: "Outermost element",
  "$prefix-arrow-left": "The left arrow",
  "$prefix-arrow-right": "The right arrow",
  "$prefix-calendar": "The calendar month",
  "$prefix-calendar-header": "The calendar header",
  "$prefix-calendar-header-text": "The calendar header's text (Month)",
  "$prefix-labels": "The wrapper for labels for the days",
  "$prefix-label": "The labels for the days (Sun, Mon, Tue, etc.)",
  "$prefix-calendar-grid": "The main calendar grid div",
  "$prefix-calendar-grid-row": "Each row of the calendar grid",
  "$prefix-calendar-grid-row-item": "Each item of the grid (the square)",
  "$prefix-calendar-grid-row-item-selected": "selected grid row item",
  "$prefix-grid-row-item-text": "The label for each grid item (the day)",
};

export default Calendar;
