/* eslint-env jest */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import Table from "../Table";
import { DATA } from "../Table.storybook.js";

afterEach(cleanup);

const component = props => (
  <Table
    sortable
    sortKey="title"
    sortOrder={-1}
    columns={DATA.columns}
    rows={DATA.data}
    prefixClassName="test"
    {...props}
  />
);

test("Smoke", async () => {
  const { queryAllByTestId, container } = render(component());
  expect(queryAllByTestId("table").length).toBe(1);
  expect(container.getElementsByClassName("test-body-row").length).toBe(
    DATA.data.length,
  );
});

test("Custom class", async () => {
  const { getByTestId } = render(component({ className: "test" }));
  expect(getByTestId("table")).toHaveClass("test");
});

test("Header", async () => {
  const { container } = render(component());
  expect(container.getElementsByClassName("test-header").length).toBe(1);
});

test("Number of Rows", async () => {
  const { container } = render(component());
  expect(container.getElementsByClassName("test-body-row").length).toBe(
    DATA.data.length,
  );
});

test("Row Click", async () => {
  const mockFn = jest.fn();
  const { container } = render(component({ onRowClick: mockFn }));
  fireEvent.click(container.getElementsByClassName("test-body-row")[0]);

  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(mockFn.mock.calls[0][0]).toBe(DATA.data[0]);
  expect(mockFn.mock.calls[0][1]).toBe(0);
});

test("Hidden Row", async () => {
  const { container } = render(component({ rows: DATA.dataWithHidden }));
  expect(container.getElementsByClassName("test-body-row").length).toBe(
    DATA.dataWithHidden.length - 1,
  );
});

test("Sorting", async () => {
  const mockFn = jest.fn();
  const { container, rerender } = render(component({ onSort: mockFn }));
  fireEvent.click(container.getElementsByClassName("test-header-column")[0]);

  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(mockFn.mock.calls[0][0]).toBe(DATA.columns[0]);

  rerender(component({ sortKey: DATA.columns[0].sortKey, sortOrder: -1 }));
  rerender(component({ sortKey: DATA.columns[0].sortKey, sortOrder: 1 }));
});
