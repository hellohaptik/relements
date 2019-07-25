/* eslint-env jest */

import React from "react";
import "jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "@testing-library/react";

import Toggle from "../Toggle";

afterEach(cleanup);

test("Smoke", async () => {
  const { queryAllByTestId } = render(<Toggle />);
  expect(queryAllByTestId("toggle").length).toBe(1);
});

test("Custom class", async () => {
  const { getByTestId } = render(<Toggle label="test" className="test" />);
  expect(getByTestId("toggle")).toHaveClass("test");
});

test("Prefix Class", async () => {
  const classNames = Object.keys(Toggle.classNames).map(className =>
    className.replace("$prefix", "test"),
  );

  const { container } = render(<Toggle label="test" prefixClassName="test" />);

  classNames.forEach(className => {
    expect(
      document.getElementsByClassName(className).length,
      className,
    ).toBeGreaterThanOrEqual(1);
  });
});

test("Testing button click", async () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(<Toggle value={true} onChange={mockFn} />);
  const button = getByTestId("toggle");

  fireEvent.click(button);
  expect(mockFn).toHaveBeenCalled();
});

test("Testing on focus", async () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(
    <Toggle prefixClassName="test" value={true} onFocus={mockFn} />,
  );
  const button = document.getElementsByClassName("test-toggle")[0];

  fireEvent.focus(button);
  expect(mockFn).toHaveBeenCalled();
});

test("Testing on blur", async () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(
    <Toggle prefixClassName="test" value={true} onBlur={mockFn} />,
  );
  const button = document.getElementsByClassName("test-toggle")[0];

  fireEvent.blur(button);
  expect(mockFn).toHaveBeenCalled();
});

test("Value", async () => {
  let value = true;
  const func = () => {
    value = !value;
  };
  const { getByTestId } = render(<Toggle value={value} onChange={func} />);
  const button = getByTestId("toggle");

  fireEvent.click(button);
  expect(value).toBe(false);
});
