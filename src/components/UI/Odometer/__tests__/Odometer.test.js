/* eslint-env jest */

import React from "react";
import "jest-dom/extend-expect";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import Odometer from "../Odometer";

afterEach(cleanup);

test("Smoke", async () => {
  const { queryAllByTestId, rerender } = render(<Odometer>1</Odometer>);
  expect(queryAllByTestId("odometer").length).toBe(1);
  rerender(<Odometer>Hello</Odometer>);
  expect(queryAllByTestId("odometer").length).toBe(1);
  rerender(<Odometer>{[1, 2, 3]}</Odometer>);
  expect(queryAllByTestId("odometer").length).toBe(1);
  rerender(<Odometer />);
  expect(queryAllByTestId("odometer").length).toBe(0);
});

test("Custom class", async () => {
  const { getByTestId } = render(<Odometer className="test">1</Odometer>);
  expect(getByTestId("odometer")).toHaveClass("test");
});

test("prefixClassName test", async () => {
  const classNames = Object.keys(Odometer.classNames).map(className =>
    className.replace("$prefix", "test"),
  );

  const { getByTestId } = render(<Odometer prefixClassName="test">1</Odometer>);

  classNames.forEach(className => {
    expect(
      document.getElementsByClassName(className).length,
      className,
    ).toBeGreaterThanOrEqual(1);
  });
});

test("Change", async () => {
  const { queryAllByTestId, rerender, getByTestId, getAllByTestId } = render(
    <Odometer>1</Odometer>,
  );
  expect(queryAllByTestId("odometer").length).toBe(1);
  expect(getByTestId("odometer-value")).toHaveTextContent("1");
  rerender(<Odometer>{19}</Odometer>);
  expect(getAllByTestId("odometer-value")[0]).toHaveTextContent("1");
  expect(getAllByTestId("odometer-value")[1]).toHaveTextContent("9");
  rerender(<Odometer>20</Odometer>);
  expect(getAllByTestId("odometer-value")[0]).toHaveTextContent("2");
  expect(getAllByTestId("odometer-value")[1]).toHaveTextContent("0");
  rerender(<Odometer>19</Odometer>);
  expect(getAllByTestId("odometer-value")[0]).toHaveTextContent("1");
  expect(getAllByTestId("odometer-value")[1]).toHaveTextContent("9");
  rerender(<Odometer>123</Odometer>);
  expect(getAllByTestId("odometer-value")[0]).toHaveTextContent("1");
  expect(getAllByTestId("odometer-value")[1]).toHaveTextContent("2");
  expect(getAllByTestId("odometer-value")[2]).toHaveTextContent("3");
});

test("on click function", async () => {
  const mockFn = jest.fn();

  const { container } = render(
    <Odometer onClick={mockFn} className="test">
      1
    </Odometer>,
  );

  const odometer = container.getElementsByClassName("test")[0];

  fireEvent.click(odometer);
  expect(mockFn).toHaveBeenCalledTimes(1);
});
