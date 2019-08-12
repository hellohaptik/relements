/* eslint-env jest */

import React from "react";
import "jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import RangeSlider from "../RangeSlider";
import {
  toPosition,
  fromPosition,
  getKnobPosition,
} from "../hooks/useRangeSlider";
import { KEY_CODES } from "constants";

afterEach(cleanup);
const defaultStart = 0,
  defaultEnd = 1000,
  defaultStep = 1;
const Component = ({ value, onChange, className, prefixClassName }) => (
  <RangeSlider
    start={defaultStart}
    end={defaultEnd}
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
  const prefixClassName = "range-slider";
  const classNames = Object.keys(RangeSlider.classNames).map(className =>
    className.replace("$prefix", prefixClassName),
  );
  const { container } = render(
    <Component value={[100, 200]} prefixClassName={prefixClassName} />,
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
test("On change input value for start and end", async () => {
  const { container } = render(
    <Component value={[100, 300]} prefixClassName="range-slider" />,
  );

  const inputStart = container.querySelector(".range-slider-start-input");
  const knobStart = container.querySelector(".range-slider-start-knob");

  const inputEnd = container.querySelector(".range-slider-end-input");
  const knobEnd = container.querySelector(".range-slider-end-knob");
  const translateFromPosition = fromPosition(defaultStart, defaultEnd);

  // within range test
  let newStart = 200;
  fireEvent.change(inputStart, { target: { value: newStart } });
  fireEvent.keyDown(inputStart, { key: "tab", keyCode: KEY_CODES.TAB });
  let startLeft = translateFromPosition(newStart);
  expect(inputStart.value).toBe(newStart.toString());
  expect(knobStart.style.left).toBe(`${startLeft}%`);

  let newEnd = 500;
  fireEvent.change(inputEnd, { target: { value: newEnd } });
  fireEvent.keyDown(inputEnd, { key: "enter", keyCode: KEY_CODES.ENTER });
  let endLeft = translateFromPosition(newEnd);
  expect(inputEnd.value).toBe(newEnd.toString());
  expect(knobEnd.style.left).toBe(`${endLeft}%`);

  // out of range
  newStart = -1;
  fireEvent.change(inputStart, { target: { value: newStart } });
  fireEvent.keyDown(inputStart, { key: "tab", keyCode: KEY_CODES.TAB });
  startLeft = translateFromPosition(newStart);
  expect(inputStart.value).toBe(newStart.toString());
  expect(knobStart.style.left).toBe(`0%`);

  newEnd = 1001;
  fireEvent.change(inputEnd, { target: { value: newEnd } });
  fireEvent.keyDown(inputEnd, { key: "enter", keyCode: KEY_CODES.ENTER });
  endLeft = translateFromPosition(newEnd);
  expect(inputEnd.value).toBe(newEnd.toString());
  expect(knobEnd.style.left).toBe(`100%`);
});

// Error messge test
test("Show error message", async () => {
  const prefixClassName = "range-slider";
  const errorMsg = "Error message";
  const { queryAllByLabelText } = render(
    <Component
      value={[100, 300]}
      prefixClassName={prefixClassName}
      error={errorMsg}
    />,
  );
  expect(queryAllByLabelText(errorMsg)).toBeDefined();
});

test("Drag start knob", async () => {
  const { container } = render(
    <Component value={[300, 400]} prefixClassName="range-slider" />,
  );

  const knobStart = container.querySelector(".range-slider-start-knob > div");
  const inputStart = container.querySelector(".range-slider-start-input");
  const pageX = 50;
  const trackRect = { left: 0, width: 0 };
  let knobPosition = getKnobPosition({ pageX, trackRect });
  const newVal = toPosition(defaultStart, defaultEnd, defaultStep)(
    knobPosition,
  );

  fireEvent.dragStart(knobStart);

  fireEvent.drag(knobStart, {
    target: {
      pageX,
      dragTest: true,
    },
  });

  fireEvent.dragEnd(knobStart);

  expect(inputStart.value).toBe(newVal.toString());
});

test("Drag end knob", async () => {
  const { container } = render(
    <Component value={[300, 400]} prefixClassName="range-slider" />,
  );

  const knobEnd = container.querySelector(".range-slider-end-knob > div");
  const inputEnd = container.querySelector(".range-slider-end-input");
  const pageX = 400;
  const trackRect = { left: 0, width: 0 };
  let knobPosition = getKnobPosition({ pageX, trackRect });
  const newVal = toPosition(defaultStart, defaultEnd, defaultStep)(
    knobPosition,
  );

  fireEvent.dragStart(knobEnd);

  fireEvent.drag(knobEnd, {
    target: {
      pageX,
      dragTest: true,
    },
  });

  fireEvent.dragEnd(knobEnd);

  expect(inputEnd.value).toBe(newVal.toString());
});
