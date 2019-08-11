/* eslint-env jest */

import React from "react";
import "jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import NumberCounter from "../NumberCounter";

afterEach(cleanup);

const component = props => (
  <NumberCounter prefixClassName="numbercounter" {...props} />
);

test("Smoke", async () => {
  const { getByTestId } = render(component());
  expect(getByTestId("numberCounter")).toBeInTheDocument();
});
