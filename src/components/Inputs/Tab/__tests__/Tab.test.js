/* eslint-env jest */

import React from "react";
import "jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "@testing-library/react";

import Tab from "../Tab";

afterEach(cleanup);

test("Smoke", async () => {
  const { queryAllByTestId } = render(<Tab />);
  expect(queryAllByTestId("tab").length).toBe(1);
});

test("Custom class", async () => {
  const { getByTestId } = render(
    <Tab className="test" prefixClassName="pre" />,
  );
  expect(getByTestId("tab")).toHaveClass("test");
});

test("prefixClassName test", async () => {
  const classNames = Object.keys(Tab.classNames).map(className =>
    className.replace("$prefix", "test"),
  );

  const { container } = render(
    <Tab
      label="Checking"
      prefixClassName="test"
      options={["first", "second"]}
      value="first"
    />,
  );

  classNames.forEach(className => {
    expect(
      document.getElementsByClassName(className).length,
      className,
    ).toBeGreaterThanOrEqual(1);
  });
});

test("Testing on focus", async () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(
    <Tab
      label="Checking"
      className="test"
      prefixClassName="pre"
      options={["first", "second"]}
      onFocus={mockFn}
    />,
  );
  const button = document.getElementsByClassName("test")[0];

  fireEvent.focus(button);
  expect(mockFn).toHaveBeenCalled();
});

test("Testing on blur", async () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(
    <Tab
      label="Checking"
      className="test"
      prefixClassName="pre"
      options={["first", "second"]}
      onBlur={mockFn}
    />,
  );
  const button = document.getElementsByClassName("test")[0];

  fireEvent.blur(button);
  expect(mockFn).toHaveBeenCalled();
});

test("On change function", async () => {
  const mockFn = jest.fn();

  const { rerender } = render(
    <Tab
      onChange={mockFn}
      options={["first", "second"]}
      value="second"
      prefixClassName="test"
    />,
  );

  let tabs = document.getElementsByClassName("test-option")[0];

  fireEvent.click(tabs);
  expect(mockFn).toHaveBeenCalledTimes(1);

  rerender(
    <Tab
      onChange={mockFn}
      options={[{ name: "first" }, { name: "second" }]}
      value="second"
      optionKey="name"
      disabled={true}
      prefixClassName="test"
    />,
  );

  tabs = document.getElementsByClassName("test-option")[0];

  fireEvent.click(tabs);
  expect(mockFn).toHaveBeenCalledTimes(2);
});
