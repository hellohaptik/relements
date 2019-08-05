/* eslint-env jest */

import React from "react";
import "jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import RangeSlider from "../RangeSlider";

afterEach(cleanup);

const Component = ({ value, onChange, className, prefixClassName }) => (
  <RangeSlider
    start={0}
    end={1000}
    step={100}
    value={value}
    onChange={onChange}
    className={className}
    testId="range-slider"
    prefixClassName={prefixClassName}
    placeholder="Delay (seconds)"
    label="Multiple knob slider"
  />
);

test("Smoke", async () => {
  const { queryAllByTestId } = render(
    <Component value={[100, 200]} onChange={console.log} />,
  );
  expect(queryAllByTestId("range-slider").length).toBe(1);
});

test("Custom class", async () => {
  const { getByTestId } = render(
    <Component value={[100, 200]} className="custom-class" />,
  );
  expect(getByTestId("range-slider")).toHaveClass("custom-class");
});

test("Prefix class", async () => {
  const classNames = Object.keys(RangeSlider.classNames).map(className =>
    className.replace("$prefix", "prefix-class"),
  );
  const { container } = render(
    <Component value={[100, 200]} prefixClassName="prefix-class" />,
  );

  classNames.forEach(className => {
    expect(
      container.getElementsByClassName(className).length,
      className,
    ).toBeGreaterThanOrEqual(1);
  });
});

// increment decrement test - onChange
// edit text input test
// error messge test
