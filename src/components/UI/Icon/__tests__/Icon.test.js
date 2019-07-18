/* eslint-env jest */

import React from "react";
import "jest-dom/extend-expect";
import { render, cleanup } from "@testing-library/react";

import { ICON_MAP } from "../utils/getIcon";
import Icon from "../Icon";

afterEach(cleanup);

test("Smoke", async () => {
  const { queryAllByTestId, rerender, container } = render(<Icon />);
  expect(queryAllByTestId("icon").length).toBe(0);

  Object.keys(ICON_MAP).forEach(key => {
    rerender(<Icon src={key} />);
    expect(queryAllByTestId("icon").length).toBe(1);
    expect(container.getElementsByTagName("svg").length).toBe(1);
  });
});

test("Custom class", async () => {
  const { getByTestId } = render(<Icon src="info" className="test" />);
  expect(getByTestId("icon")).toHaveClass("test");
});
