/* eslint-env jest */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "@testing-library/react";

import SearchBar from "../SearchBar";

afterEach(cleanup);

test("Smoke", async () => {
  const { getByTestId } = render(<SearchBar />);
  expect(getByTestId("SearchBar")).toBeInTheDocument();
});
