/* eslint-env jest */

import React from "react";
import dayjs from "dayjs";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import Date from "../Date";

afterEach(cleanup);

let count = 0;
function triggerShortcut(
  Button,
  mockFn,
  startDate,
  endDate,
  startKey = "startDate",
  endKey = "endDate",
  shouldExpect = true,
) {
  const inputElement = document.getElementsByClassName("test-input")[0];
  const CalendarOverlay = document.getElementsByClassName(
    "test-tooltip-overlay",
  )[0];

  fireEvent.mouseDown(inputElement);
  fireEvent.click(Button);
  fireEvent.click(CalendarOverlay);

  count += 1;

  if (!shouldExpect) return;

  expect(mockFn).toHaveBeenCalledTimes(count);
  expect(mockFn.mock.calls[count - 1][0][startKey].toString()).toBe(
    startDate
      .startOf("day")
      .toDate()
      .toString(),
  );

  expect(mockFn.mock.calls[count - 1][0][endKey].toString()).toBe(
    endDate
      .endOf("day")
      .toDate()
      .toString(),
  );
}

const Component = ({
  value,
  onChange,
  className,
  prefixClassName,
  numMonths,
  withRange,
  withComparison,
  disabled,
  error,
  label = "Enter date",
}) => (
  <Date
    label={label}
    value={value}
    onChange={onChange}
    className={className}
    prefixClassName={prefixClassName}
    numMonths={numMonths}
    withRange={withRange}
    withComparison={withComparison}
    disabled={disabled}
    error={error}
  />
);

test("On Change: Shortcuts", async () => {
  const mockFn = jest.fn();
  render(
    <Component
      value={{
        startDate: dayjs().toDate(),
        endDate: dayjs()
          .add(1, "d")
          .toDate(),
      }}
      prefixClassName="test"
      onChange={mockFn}
      withRange
      numCalender
    />,
  );

  const inputElement = document.getElementsByClassName("test-input")[0];
  const ShortcutButtons = document.getElementsByClassName(
    "test-picker-column-inputs-shortcuts-button",
  );

  fireEvent.mouseDown(inputElement);
  const CalendarDateToday = ShortcutButtons[0];
  const CalendarDateYesterday = ShortcutButtons[1];
  const CalendarDateLast7 = ShortcutButtons[2];
  const CalendarDateLast30 = ShortcutButtons[3];

  triggerShortcut(CalendarDateToday, mockFn, dayjs(), dayjs());
  triggerShortcut(
    CalendarDateYesterday,
    mockFn,
    dayjs().subtract(1, "d"),
    dayjs().subtract(1, "d"),
  );
  triggerShortcut(CalendarDateLast7, mockFn, dayjs().subtract(6, "d"), dayjs());
  triggerShortcut(
    CalendarDateLast30,
    mockFn,
    dayjs().subtract(29, "d"),
    dayjs(),
  );

  count = 0;
});

test("On Change: Comparison Shortcuts", async () => {
  const mockFn = jest.fn();
  render(
    <Component
      value={{
        startDate: dayjs().toDate(),
        endDate: dayjs()
          .add(1, "d")
          .toDate(),
        comparisonStartDate: dayjs().toDate(),
        comparisonEndDate: dayjs()
          .add(1, "d")
          .toDate(),
      }}
      prefixClassName="test"
      onChange={mockFn}
      withRange
      withComparison
      numCalender
    />,
  );

  const inputElement = document.getElementsByClassName("test-input")[0];
  const ShortcutButtons = document.getElementsByClassName(
    "test-picker-column-inputs-shortcuts-button",
  );
  const ComparisonShortcutButtons = document.getElementsByClassName(
    "test-picker-column-comparison-shortcuts-button",
  );

  fireEvent.mouseDown(inputElement);
  const CalendarDateToday = ShortcutButtons[0];
  const CalendarDatePreviousPeriod = ComparisonShortcutButtons[0];
  const CalendarDateCustomPeriod = ComparisonShortcutButtons[1];

  triggerShortcut(CalendarDateToday, mockFn, dayjs(), dayjs());
  triggerShortcut(
    CalendarDatePreviousPeriod,
    mockFn,
    dayjs().subtract(1, "d"),
    dayjs().subtract(1, "d"),
    "comparisonStartDate",
    "comparisonEndDate",
  );
  triggerShortcut(
    CalendarDateCustomPeriod,
    mockFn,
    dayjs().subtract(1, "d"),
    dayjs().subtract(1, "d"),
    "comparisonStartDate",
    "comparisonEndDate",
    false,
  );

  expect(mockFn).toHaveBeenCalledTimes(count);
  expect(mockFn.mock.calls[count - 1][0].comparisonStartDate).toBe(null);
  expect(mockFn.mock.calls[count - 1][0].comparisonEndDate).toBe(null);
});
