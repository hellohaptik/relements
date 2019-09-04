/* eslint-env jest */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from "@testing-library/react";

import Loader from "../Loader";

afterEach(cleanup);

test("Smoke", async () => {
  const { queryAllByTestId } = render(<Loader />);
  expect(queryAllByTestId("loader").length).toBe(1);
});

test("Custom class", async () => {
  const { getByTestId } = render(<Loader className="test" />);
  expect(getByTestId("loader")).toHaveClass("test");
});

test("Prefix custom class", async () => {
  const { getByTestId } = render(
    <Loader className="test" prefixClassName="pre" />,
  );
  expect(getByTestId("loader")).toHaveClass("pre");
  expect(getByTestId("loader")).toHaveClass("test");
  expect(getByTestId("loader-inner")).toHaveClass("pre-inner");
});

test("Size variations", async () => {
  const { getByTestId } = render(<Loader size={40} />);
  expect(getByTestId("loader")).toHaveStyle("width: 40px");
  expect(getByTestId("loader")).toHaveStyle("height: 40px");
  expect(getByTestId("loader")).toHaveStyle("clip: rect(0, 40px, 40px, 20px)");
});
