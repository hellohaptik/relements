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

test("On Focus: Inputs", async () => {
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
  fireEvent.mouseDown(inputElement);

  const rangeInputs = document.getElementsByClassName(
    "test-picker-column-inputs-input-item-input",
  );

  const startDateInput = rangeInputs[0];
  const endDateInput = rangeInputs[1];

  fireEvent.focus(startDateInput);
  fireEvent.focus(endDateInput);
});

test("On Focus: Comparison Inputs", async () => {
  const mockFn = jest.fn();
  const { getAllByText } = render(
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
  fireEvent.mouseDown(inputElement);

  const rangeInputs = document.getElementsByClassName(
    "test-picker-column-comparison-input-item-input",
  );

  const CalendarDateFirst = getAllByText("1")[0];
  const startDateInput = rangeInputs[0];
  const endDateInput = rangeInputs[1];

  fireEvent.focus(startDateInput);
  fireEvent.click(CalendarDateFirst);
  fireEvent.focus(endDateInput);
});
