/* eslint-env jest */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from "@testing-library/react";

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

test("Type variations check", async () => {
  const { getByTestId, rerender } = render(<AlertBar />);
  Object.keys(AlertBar.TYPES).forEach(type => {
    rerender(<AlertBar type={AlertBar.TYPES[type]} />);
    expect(getByTestId("AlertBar")).toBeInTheDocument();
  });
});
