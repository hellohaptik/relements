/* eslint-env jest */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import Tabs from "../Tabs";

afterEach(cleanup);

const component = (props = {}) => (
  <Tabs prefixClassName="test" value={props.value} big={props.big}>
    <Tabs.Item
      prefixClassName="test-tab"
      value="bots"
      icon="bot-says"
      onClick={props.onClick}
      type="big"
    >
      Bots
    </Tabs.Item>
    <Tabs.Item
      prefixClassName="test-tab"
      value="templates"
      onClick={props.onClick}
    >
      Templates
    </Tabs.Item>
    <Tabs.Item
      prefixClassName="test-tab"
      onClick={props.onClick}
      type="big"
      disabled
    >
      <span>Businesses</span>
    </Tabs.Item>
  </Tabs>
);

test("Smoke", async () => {
  const { queryAllByTestId, container } = render(component({ value: "bots" }));
  expect(queryAllByTestId("tabs").length).toBe(1);
  expect(container.getElementsByClassName("test-tab").length).toBe(3);
  expect(container.getElementsByClassName("test-tab")[0]).toHaveClass(
    "test-tab-active",
  );
});

test("Custom class", async () => {
  const { getByTestId } = render(component({ className: "test" }));
  expect(getByTestId("tabs")).toHaveClass("test");
});

test("Tab click", async () => {
  const mockFn = jest.fn();
  const { rerender, container } = render(
    component({ className: "test", onClick: mockFn, big: true }),
  );
  fireEvent.click(container.getElementsByClassName("test-tab")[1]);

  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(mockFn.mock.calls[0][0]).toBe("templates");

  rerender(
    component({ className: "test", onClick: mockFn, value: "templates" }),
  );
  expect(container.getElementsByClassName("test-tab")[1]).toHaveClass(
    "test-tab-active",
  );
});
