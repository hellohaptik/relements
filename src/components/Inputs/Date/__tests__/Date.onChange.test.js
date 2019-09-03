/* eslint-env jest */

import React from "react";
import dayjs from "dayjs";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import Date from "../Date";

afterEach(cleanup);

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

test("On Change: Single", async () => {
  const mockFn = jest.fn();
  const { container, rerender, getAllByText } = render(
    <Component value={dayjs()} prefixClassName="test" onChange={mockFn} />,
  );

  const inputElement = container.getElementsByClassName("test-input")[0];
  fireEvent.mouseDown(inputElement);

  const CalendarDateFirst = getAllByText("1")[0];
  const CalendarDateSecond = getAllByText("2")[0];

  fireEvent.click(CalendarDateFirst);
  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(mockFn.mock.calls[0][0].toString()).toBe(
    dayjs()
      .startOf("month")
      .toDate()
      .toString(),
  );

  rerender(
    <Component
      value={mockFn.mock.calls[0][0]}
      onChange={mockFn}
      prefixClassName="test"
    />,
  );

  fireEvent.click(CalendarDateSecond);
  expect(mockFn).toHaveBeenCalledTimes(2);
  expect(mockFn.mock.calls[1][0].toString()).toBe(
    dayjs()
      .startOf("month")
      .add(1, "d")
      .toDate()
      .toString(),
  );
});

test("On Change: Range", async () => {
  const mockFn = jest.fn();
  const { container, rerender, getAllByText } = render(
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

  const inputElement = container.getElementsByClassName("test-input")[0];
  fireEvent.mouseDown(inputElement);

  const CalendarDateFirst = getAllByText("1")[0];
  const CalendarDateSecond = getAllByText("2")[0];
  const CalendarOverlay = document.getElementsByClassName(
    "test-tooltip-overlay",
  )[0];

  fireEvent.click(CalendarDateFirst);
  fireEvent.click(CalendarDateSecond);
  fireEvent.click(CalendarOverlay);

  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(mockFn.mock.calls[0][0].startDate.toString()).toBe(
    dayjs()
      .startOf("month")
      .toDate()
      .toString(),
  );

  expect(mockFn.mock.calls[0][0].endDate.toString()).toBe(
    dayjs()
      .startOf("month")
      .add(1, "d")
      .endOf("day")
      .toDate()
      .toString(),
  );

  rerender(
    <Component
      value={mockFn.mock.calls[0][0]}
      onChange={mockFn}
      prefixClassName="test"
    />,
  );
});
