/* eslint-env jest */

import React from "react";
import dayjs from "dayjs";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import Calendar from "../Calendar";

afterEach(cleanup);

const Component = ({
  value,
  onChange,
  className,
  prefixClassName,
  numMonths,
}) => (
  <Calendar
    value={value}
    onChange={onChange}
    className={className}
    prefixClassName={prefixClassName}
    numMonths={numMonths}
  />
);

test("Smoke", async () => {
  const { queryAllByTestId } = render(
    <Component value={dayjs()} onChange={console.log} />,
  );
  expect(queryAllByTestId("calendar").length).toBe(1);
});

test("Custom class", async () => {
  const { getByTestId } = render(
    <Component value={dayjs()} className="test" />,
  );
  expect(getByTestId("calendar")).toHaveClass("test");
});

test("Prefix class", async () => {
  const classNames = Object.keys(Calendar.classNames).map(className =>
    className.replace("$prefix", "test"),
  );
  const { container, getByTestId } = render(
    <Component value={dayjs()} prefixClassName="test" />,
  );

  classNames.forEach(className => {
    expect(
      container.getElementsByClassName(className).length,
      className,
    ).toBeGreaterThanOrEqual(1);
  });
});

test("On Change: Single", async () => {
  const mockFn = jest.fn();
  const { container, rerender, getAllByText } = render(
    <Component value={dayjs()} prefixClassName="test" onChange={mockFn} />,
  );

  const CalendarDateFirst = getAllByText("1")[0];
  const CalendarDateSecond = getAllByText("2")[0];

  fireEvent.click(CalendarDateFirst);
  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(new Date(mockFn.mock.calls[0][0]).getTime()).toBe(
    dayjs()
      .startOf("month")
      .toDate()
      .getTime(),
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
  expect(new Date(mockFn.mock.calls[1][0]).getTime()).toBe(
    dayjs()
      .startOf("month")
      .add(1, "d")
      .toDate()
      .getTime(),
  );
});

test("On Change: Range", async () => {
  const mockFn = jest.fn();
  const { container, rerender, getAllByText } = render(
    <Component
      value={[
        { from: dayjs(), to: dayjs().add(7, "d") },
        { from: dayjs().subtract(10, "d"), to: dayjs().subtract(3, "d") },
      ]}
      prefixClassName="test"
      onChange={mockFn}
    />,
  );

  const CalendarDateFirst = getAllByText("1")[0];
  const CalendarDateSecond = getAllByText("2")[0];

  fireEvent.click(CalendarDateFirst);
  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(new Date(mockFn.mock.calls[0][0]).getTime()).toBe(
    dayjs()
      .startOf("month")
      .toDate()
      .getTime(),
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
  expect(new Date(mockFn.mock.calls[1][0]).getTime()).toBe(
    dayjs()
      .startOf("month")
      .add(1, "d")
      .toDate()
      .getTime(),
  );
});
