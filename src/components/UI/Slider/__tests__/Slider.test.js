/* eslint-env jest */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import Slider from "../Slider";
import { Card } from "../Slider.storybook";

afterEach(cleanup);

const component = props => (
  <Slider {...props}>
    <Card> {1} </Card>
    <Card> {2} </Card>
    <Card> {3} </Card>
    <Card> {4} </Card>
  </Slider>
);

test("Smoke", async () => {
  const { queryAllByTestId, rerender } = render(component());
  expect(queryAllByTestId("slider").length).toBe(1);
  expect(queryAllByTestId("slider-track")[0].children.length).toBe(4);
});

test("Custom class", async () => {
  const { getByTestId } = render(component({ className: "test" }));
  expect(getByTestId("slider")).toHaveClass("test");
});

test("Next page", async () => {
  const mockFn = jest.fn();
  const { getByTestId, container, rerender } = render(
    component({ prefixClassName: "test", onChange: mockFn }),
  );
  const nextPageButton = container.getElementsByClassName(
    "test-arrow-right",
  )[0];

  fireEvent.click(nextPageButton);
  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(mockFn.mock.calls[0][0]).toBe(1);
  const activePage = container.getElementsByClassName("test-item")[1];
  expect(activePage).toHaveTextContent("2");
  expect(activePage).toHaveClass("test-item-active");
});

test("Previous page", async () => {
  const mockFn = jest.fn();
  const { getByTestId, container, rerender } = render(
    component({ prefixClassName: "test", onChange: mockFn, initialSlide: 3 }),
  );
  const prevPageButton = container.getElementsByClassName("test-arrow-left")[0];

  fireEvent.click(prevPageButton);
  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(mockFn.mock.calls[0][0]).toBe(2);
  const activePage = container.getElementsByClassName("test-item")[2];
  expect(activePage).toHaveTextContent("3");
  expect(activePage).toHaveClass("test-item-active");
});

test("Center Mode", async () => {
  const mockFn = jest.fn();
  const { queryAllByTestId, container } = render(
    component({
      prefixClassName: "test",
      onChange: mockFn,
      initialSlide: 2,
      centerMode: true,
    }),
  );
  expect(queryAllByTestId("slider").length).toBe(1);
  const nextPageButton = container.getElementsByClassName(
    "test-arrow-right",
  )[0];
  fireEvent.click(nextPageButton);
  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(mockFn.mock.calls[0][0]).toBe(3);
  const activePage = container.getElementsByClassName("test-item")[3];
  expect(activePage).toHaveTextContent("4");
  expect(activePage).toHaveClass("test-item-active");
});
