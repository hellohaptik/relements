/* eslint-env jest */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "@testing-library/react";

import AlertBar from "../AlertBar";

afterEach(cleanup);

test("Smoke", async () => {
  const { getByTestId } = render(<AlertBar />);
  expect(getByTestId("AlertBar")).toBeInTheDocument();
});

test("Custom class", async () => {
  const { getByTestId } = render(<AlertBar className="test" />);
  expect(getByTestId("AlertBar")).toHaveClass("test");
});

test("Prefix class", async () => {
  console.log(AlertBar);
  const classNames = Object.keys(AlertBar.classNames).map(className =>
    className.replace("$prefix", "test"),
  );

  render(<AlertBar prefixClassName="test" />);

  classNames.shift();
  classNames.forEach(className => {
    expect(
      document.getElementsByClassName(className).length,
      className,
    ).toBeGreaterThanOrEqual(1);
  });
});

test("OnDismiss", async () => {
  const onDismiss = jest.fn();

  render(<AlertBar prefixClassName="test" onDismiss={onDismiss} />);

  const container = document.getElementsByClassName("test-dismiss")[0];
  fireEvent.click(container);
  expect(onDismiss).toHaveBeenCalled();
});

test("Type variations check", async () => {
  const { getByTestId, rerender } = render(<AlertBar />);
  Object.keys(AlertBar.TYPES).forEach(type => {
    rerender(<AlertBar type={AlertBar.TYPES[type]} />);
    expect(getByTestId("AlertBar")).toBeInTheDocument();
  });
});
