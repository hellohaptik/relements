/* eslint-env jest */

import React from "react";
import dayjs from "dayjs";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import Time from "../Time";

afterEach(cleanup);

const date = dayjs(new Date())
  .set("h", 15)
  .set("m", 24)
  .toDate();

const Component = ({ value, onChange, className, prefixClassName }) => (
  <Time
    label="Node Type"
    value={value}
    onChange={onChange}
    className={className}
    prefixClassName={prefixClassName}
  />
);

test("Smoke", async () => {
  const { queryAllByTestId } = render(
    <Component value={date} onChange={console.log} />,
  );
  expect(queryAllByTestId("time").length).toBe(1);
});

test("Custom class", async () => {
  const { getByTestId } = render(<Component value={date} className="test" />);
  expect(getByTestId("time")).toHaveClass("test");
});

test("Prefix class", async () => {
  const classNames = Object.keys(Time.classNames).map(className =>
    className.replace("$prefix", "test"),
  );
  const { container } = render(
    <Component value={date} prefixClassName="test" />,
  );

  const inputElement = container.getElementsByClassName("test-input")[0];
  fireEvent.mouseDown(inputElement);

  classNames.forEach(className => {
    expect(
      document.getElementsByClassName(className).length,
      className,
    ).toBeGreaterThanOrEqual(1);
  });
});

test("On Change", async () => {
  const mockFn = jest.fn();
  const { container, rerender } = render(
    <Component value={date} prefixClassName="test" onChange={mockFn} />,
  );

  const inputElement = container.getElementsByClassName("test-input")[0];
  fireEvent.mouseDown(inputElement);

  const tooltipInputHH = document.getElementsByClassName(
    "test-picker-input-element",
  )[0];

  const tooltipInputSwitcher = document.getElementsByClassName(
    "test-picker-switcher-value",
  );

  const tooltipInputMM = document.getElementsByClassName(
    "test-picker-input-element",
  )[1];

  const tooltipOverlay = document.getElementsByClassName(
    "test-tooltip-overlay",
  )[0];

  fireEvent.change(tooltipInputHH, { target: { value: "3" } });
  fireEvent.change(tooltipInputMM, { target: { value: "10" } });
  fireEvent.click(tooltipInputSwitcher[0]);
  fireEvent.click(tooltipOverlay);

  expect(mockFn).toHaveBeenCalledTimes(1);

  const date = dayjs(mockFn.mock.calls[0][0]);
  expect(date.get("hour")).toBe(3);
  expect(date.get("minute")).toBe(10);

  rerender(
    <Component
      value={mockFn.mock.calls[0][0]}
      onChange={mockFn}
      prefixClassName="test"
    />,
  );

  expect(tooltipInputHH.value).toBe("3");
  expect(tooltipInputMM.value).toBe("10");

  fireEvent.mouseDown(inputElement);
  fireEvent.click(tooltipInputSwitcher[1]);
  fireEvent.click(tooltipOverlay);

  expect(mockFn).toHaveBeenCalledTimes(2);
  const date2 = dayjs(mockFn.mock.calls[1][0]);
  expect(date2.get("hour")).toBe(15);
  expect(date2.get("minute")).toBe(10);

  rerender(
    <Component
      value={mockFn.mock.calls[1][0]}
      onChange={mockFn}
      prefixClassName="test"
    />,
  );

  expect(tooltipInputHH.value).toBe("3");
  expect(tooltipInputMM.value).toBe("10");
});
