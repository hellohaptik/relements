/* eslint-env jest */

import React from "react";
import "jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import Pagination from "../Pagination";

afterEach(cleanup);

test("Smoke", async () => {
  const { queryAllByTestId } = render(<Pagination numPages={33} page={1} />);
  expect(queryAllByTestId("pagination").length).toBe(1);
});

test("Custom class", async () => {
  const { getByTestId } = render(
    <Pagination numPages={33} page={1} className="test" />,
  );
  expect(getByTestId("pagination")).toHaveClass("test");
});

test("prefixClassName test", async () => {
  const classNames = Object.keys(Pagination.classNames).map(className =>
    className.replace("$prefix", "test"),
  );

  const { getByTestId } = render(<Pagination prefixClassName="test" />);

  classNames.forEach(className => {
    expect(
      document.getElementsByClassName(className).length,
      className,
    ).toBeGreaterThanOrEqual(1);
  });
});

test("Next page", async () => {
  const mockFn = jest.fn();
  const { container, rerender } = render(
    <Pagination
      numPages={33}
      page={1}
      prefixClassName="test"
      onChange={mockFn}
    />,
  );
  const nextPageButton = container.getElementsByClassName(
    "test-arrow-right",
  )[0];

  fireEvent.click(nextPageButton);
  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(mockFn.mock.calls[0][0]).toBe(2);
  rerender(
    <Pagination
      numPages={33}
      page={2}
      prefixClassName="test"
      onChange={mockFn}
    />,
  );
  const activePage = container.getElementsByClassName("test-page-active")[0];
  expect(activePage).toHaveTextContent("2");
});

test("Previous page", async () => {
  const mockFn = jest.fn();
  const { container, rerender } = render(
    <Pagination
      numPages={33}
      page={2}
      prefixClassName="test"
      onChange={mockFn}
    />,
  );
  const nextPageButton = container.getElementsByClassName("test-arrow-left")[0];

  fireEvent.click(nextPageButton);
  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(mockFn.mock.calls[0][0]).toBe(1);
  rerender(
    <Pagination
      numPages={33}
      page={1}
      prefixClassName="test"
      onChange={mockFn}
    />,
  );
  const activePage = container.getElementsByClassName("test-page-active")[0];
  expect(activePage).toHaveTextContent("1");
});

test("Specific page", async () => {
  const mockFn = jest.fn();
  const { container, rerender } = render(
    <Pagination
      numPages={4}
      page={2}
      prefixClassName="test"
      onChange={mockFn}
    />,
  );
  const pages = container.getElementsByClassName("test-page");

  fireEvent.click(pages[3]);
  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(mockFn.mock.calls[0][0]).toBe(4);
  rerender(
    <Pagination
      numPages={4}
      page={4}
      prefixClassName="test"
      onChange={mockFn}
    />,
  );
  const activePage = container.getElementsByClassName("test-page-active")[0];
  expect(activePage).toHaveTextContent("4");
});
