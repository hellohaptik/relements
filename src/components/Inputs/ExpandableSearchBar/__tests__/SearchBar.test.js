/* eslint-env jest */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "@testing-library/react";

import ExpandableSearchBar from "../ExpandableSearchBar";

afterEach(cleanup);

test("Smoke", async () => {
  const { getByTestId } = render(<ExpandableSearchBar />);
  expect(getByTestId("ExpandableSearchBar")).toBeInTheDocument();
});

test("Custom class", async () => {
  const { getByTestId } = render(<ExpandableSearchBar className="test" />);
  expect(getByTestId("ExpandableSearchBar")).toHaveClass("test");
});
