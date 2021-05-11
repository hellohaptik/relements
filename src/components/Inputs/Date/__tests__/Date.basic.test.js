/* eslint-env jest */

import React from "react";
import dayjs from "dayjs";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import Date from "../Date";

afterEach(cleanup);

const date = {
  startDate: dayjs(new Date())
    .subtract(7, "d")
    .toDate(),
  endDate: dayjs(new Date())
    .subtract(0, "d")
    .toDate(),
  comparisonStartDate: dayjs(new Date())
    .subtract(15, "d")
    .toDate(),
  comparisonEndDate: dayjs(new Date())
    .subtract(8, "d")
    .toDate(),
};

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
  maxDate,
  minDate,
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
    maxDate={maxDate}
    minDate={minDate}
    disabled={disabled}
    error={error}
    withTime
  />
);

test("Smoke", async () => {
  const { queryAllByTestId, rerender } = render(
    <Component
      label={null}
      value={undefined}
      onChange={console.log}
      withRange
    />,
  );

  expect(queryAllByTestId("date").length).toBe(1);

  rerender(<Component disabled value={dayjs()} onChange={console.log} />);
  expect(queryAllByTestId("date").length).toBe(1);

  rerender(<Component error="test" value={dayjs()} onChange={console.log} />);
  expect(queryAllByTestId("date").length).toBe(1);

  rerender(
    <Component
      label={undefined}
      value={undefined}
      onChange={console.log}
      withRange
    />,
  );
  expect(queryAllByTestId("date").length).toBe(1);
});

test("Custom class", async () => {
  const { getByTestId } = render(<Component value={date} className="test" />);
  expect(getByTestId("date")).toHaveClass("test");
});

test("Prefix class", async () => {
  const classNames = Object.keys(Date.classNames).map(className =>
    className.replace("$prefix", "test"),
  );
  const { container } = render(
    <Component value={date} prefixClassName="test" withRange withComparison />,
  );

  const inputElement = container.getElementsByClassName("test-input")[0];
  fireEvent.mouseDown(inputElement);

  classNames.forEach(className => {
    if (className === "test-picker-calendar-calendar-grid-row-item-selected")
      return;
    expect(
      document.getElementsByClassName(className).length,
      className,
    ).toBeGreaterThanOrEqual(1);
  });
});

test("max date, min date", async () => {
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
      withComparison
      numCalender
      maxDate={dayjs()
        .add(1, "d")
        .toDate()}
      minDate={dayjs().toDate()}
    />,
  );
});

test("min date", async () => {
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
      withComparison
      numCalender
      minDate={dayjs().toDate()}
    />,
  );
});

test("max date", async () => {
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
      withComparison
      numCalender
      maxDate={dayjs()
        .add(1, "d")
        .toDate()}
    />,
  );
});

test("only start date selected", async () => {
  const mockFn = jest.fn();
  render(
    <Component
      value={{
        startDate: dayjs().toDate(),
      }}
      prefixClassName="test"
      onChange={mockFn}
      withRange
      withComparison
      numCalender
    />,
  );
});

test("On Comparison Toggle", async () => {
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
      withComparison
      numCalender
    />,
  );

  const inputElement = document.getElementsByClassName("test-input")[0];
  fireEvent.mouseDown(inputElement);

  const comparisonToggle = document.getElementsByClassName(
    "test-picker-column-comparison-toggle",
  )[0];

  const CalendarOverlay = document.getElementsByClassName(
    "test-tooltip-overlay",
  )[0];

  fireEvent.click(comparisonToggle);
  fireEvent.click(CalendarOverlay);

  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(mockFn.mock.calls[0][0].comparisonStartDate.toString()).toBe(
    dayjs()
      .subtract(2, "d")
      .startOf("day")
      .toDate()
      .toString(),
  );

  expect(mockFn.mock.calls[0][0].comparisonEndDate.toString()).toBe(
    dayjs()
      .subtract(1, "d")
      .endOf("day")
      .toDate()
      .toString(),
  );

  fireEvent.mouseDown(inputElement);
  fireEvent.click(comparisonToggle);
  fireEvent.click(CalendarOverlay);

  expect(mockFn).toHaveBeenCalledTimes(2);
  expect(mockFn.mock.calls[1][0].comparisonStartDate).toBe(null);
  expect(mockFn.mock.calls[1][0].comparisonEndDate).toBe(null);
});
