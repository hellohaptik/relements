/* eslint-env jest */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { KEY_CODES } from "constants";

import RangeSlider from "../RangeSlider";
import {
  getColonSeparatedDuration,
  translateColonSeparatedDuration,
} from "../RangeSlider.storybook.js";
import {
  toPosition,
  fromPosition,
  getKnobPosition,
} from "../hooks/useRangeSlider";

afterEach(cleanup);
const defaultStart = 0,
  defaultEnd = 1000,
  defaultStep = 1;
const Component = ({
  value,
  onChange,
  className,
  prefixClassName,
  renderInputValue,
  translateInputValue,
}) => (
  <RangeSlider
    start={defaultStart}
    end={defaultEnd}
    step={100}
    value={value}
    onChange={onChange}
    className={className}
    renderInputValue={renderInputValue}
    translateInputValue={translateInputValue}
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

  // upper bound range violation by start input
  newStart = 1100;
  fireEvent.change(inputStart, { target: { value: newStart } });
  fireEvent.keyDown(inputStart, { key: "tab", keyCode: KEY_CODES.TAB });
  startLeft = translateFromPosition(newStart);
  expect(inputStart.value).toBe("200");
  expect(knobStart.style.left).toBe(`20%`);

  let newEnd = 500;
  fireEvent.change(inputEnd, { target: { value: newEnd } });
  fireEvent.keyDown(inputEnd, { key: "enter", keyCode: KEY_CODES.ENTER });
  let endLeft = translateFromPosition(newEnd);
  expect(inputEnd.value).toBe(newEnd.toString());
  expect(knobEnd.style.left).toBe(`${endLeft}%`);

  // invalid value w.r.t step should reset to previous valid value
  newEnd = 510;
  fireEvent.change(inputEnd, { target: { value: newEnd } });
  fireEvent.keyDown(inputEnd, { key: "enter", keyCode: KEY_CODES.ENTER });
  endLeft = translateFromPosition(newEnd);
  expect(inputEnd.value).toBe("500");
  expect(knobEnd.style.left).toBe(`${"50"}%`);

  // lower bound range violation by end input
  newEnd = -100;
  fireEvent.change(inputEnd, { target: { value: newEnd } });
  fireEvent.keyDown(inputEnd, { key: "enter", keyCode: KEY_CODES.ENTER });
  endLeft = translateFromPosition(newEnd);
  expect(inputEnd.value).toBe("500");
  expect(knobEnd.style.left).toBe(`${"50"}%`);

  // lower bound range violation
  newStart = -1;
  fireEvent.change(inputStart, { target: { value: newStart } });
  fireEvent.keyDown(inputStart, { key: "tab", keyCode: KEY_CODES.TAB });
  startLeft = translateFromPosition(newStart);
  expect(inputStart.value).toBe("0");
  expect(knobStart.style.left).toBe(`0%`);

  // retry lower bound range violation
  newStart = -1;
  fireEvent.change(inputStart, { target: { value: newStart } });
  fireEvent.keyDown(inputStart, { key: "tab", keyCode: KEY_CODES.TAB });
  startLeft = translateFromPosition(newStart);
  expect(inputStart.value).toBe("0");
  expect(knobStart.style.left).toBe(`0%`);

  // upper bound range violation
  newEnd = 1001;
  fireEvent.change(inputEnd, { target: { value: newEnd } });
  fireEvent.keyDown(inputEnd, { key: "enter", keyCode: KEY_CODES.ENTER });
  endLeft = translateFromPosition(newEnd);
  expect(inputEnd.value).toBe("1000");
  expect(knobEnd.style.left).toBe(`100%`);

  // retry upper bound range violation
  newEnd = 1001;
  fireEvent.change(inputEnd, { target: { value: newEnd } });
  fireEvent.keyDown(inputEnd, { key: "enter", keyCode: KEY_CODES.ENTER });
  endLeft = translateFromPosition(newEnd);
  expect(inputEnd.value).toBe("1000");
  expect(knobEnd.style.left).toBe(`100%`);
});

test("On change input value for start and end: crossover input", async () => {
  const { container } = render(
    <Component value={[100, 300]} prefixClassName="range-slider" />,
  );

  const inputStart = container.querySelector(".range-slider-start-input");
  const knobStart = container.querySelector(".range-slider-start-knob");

  const inputEnd = container.querySelector(".range-slider-end-input");
  const knobEnd = container.querySelector(".range-slider-end-knob");
  const translateFromPosition = fromPosition(defaultStart, defaultEnd);

  // end input crossing start input current value
  let newStart = 301;
  fireEvent.change(inputStart, { target: { value: newStart } });
  fireEvent.keyDown(inputStart, { key: "tab", keyCode: KEY_CODES.TAB });
  let startLeft = translateFromPosition(newStart);
  expect(inputStart.value).toBe("100");
  expect(knobStart.style.left).toBe(`${"10"}%`);

  // retry end input crossing start input current value
  newStart = 301;
  fireEvent.change(inputStart, { target: { value: newStart } });
  fireEvent.keyDown(inputStart, { key: "tab", keyCode: KEY_CODES.TAB });
  startLeft = translateFromPosition(newStart);
  expect(inputStart.value).toBe("100");
  expect(knobStart.style.left).toBe(`${"10"}%`);

  // start input crossing end input current value
  let newEnd = 99;
  fireEvent.change(inputEnd, { target: { value: newEnd } });
  fireEvent.keyDown(inputEnd, { key: "enter", keyCode: KEY_CODES.ENTER });
  let endLeft = translateFromPosition(newEnd);
  expect(inputEnd.value).toBe("300");
  expect(knobEnd.style.left).toBe(`${"30"}%`);

  // retry start input crossing end input current value
  newEnd = 99;
  fireEvent.change(inputEnd, { target: { value: newEnd } });
  fireEvent.keyDown(inputEnd, { key: "enter", keyCode: KEY_CODES.ENTER });
  endLeft = translateFromPosition(newEnd);
  expect(inputEnd.value).toBe("300");
  expect(knobEnd.style.left).toBe(`${"30"}%`);
});

test("On change input value for start and end: text input", async () => {
  const { container } = render(
    <Component
      value={[defaultStart, defaultEnd]}
      prefixClassName="range-slider"
    />,
  );

  const inputStart = container.querySelector(".range-slider-start-input");
  const knobStart = container.querySelector(".range-slider-start-knob");

  const inputEnd = container.querySelector(".range-slider-end-input");
  const knobEnd = container.querySelector(".range-slider-end-knob");
  const translateFromPosition = fromPosition(defaultStart, defaultEnd);

  // text at the start
  let newStart = "some text at the start";
  fireEvent.change(inputStart, { target: { value: newStart } });
  fireEvent.keyDown(inputStart, { key: "tab", keyCode: KEY_CODES.TAB });
  let startLeft = translateFromPosition(newStart);
  expect(inputStart.value).toBe(defaultStart.toString());
  expect(knobStart.style.left).toBe(`${"0"}%`);

  // text at the end
  let newEnd = "some text at the end";
  fireEvent.change(inputEnd, { target: { value: newEnd } });
  fireEvent.keyDown(inputEnd, { key: "enter", keyCode: KEY_CODES.ENTER });
  let endLeft = translateFromPosition(newEnd);
  expect(inputEnd.value).toBe(defaultEnd.toString());
  expect(knobEnd.style.left).toBe(`${"100"}%`);
});

test("On change input value for start and end: custom format", async () => {
  const { container } = render(
    <Component
      value={[defaultStart, defaultEnd]}
      renderInputValue={getColonSeparatedDuration}
      translateInputValue={translateColonSeparatedDuration}
      prefixClassName="range-slider"
    />,
  );

  const inputStart = container.querySelector(".range-slider-start-input");
  const knobStart = container.querySelector(".range-slider-start-knob");

  const inputEnd = container.querySelector(".range-slider-end-input");
  const knobEnd = container.querySelector(".range-slider-end-knob");
  const translateFromPosition = fromPosition(defaultStart, defaultEnd);

  let newStart = 100;
  fireEvent.change(inputStart, {
    target: { value: getColonSeparatedDuration(newStart) },
  });
  fireEvent.keyDown(inputStart, { key: "tab", keyCode: KEY_CODES.TAB });
  let startLeft = translateFromPosition(newStart);
  expect(inputStart.value).toBe(getColonSeparatedDuration(newStart));
  expect(knobStart.style.left).toBe(`${startLeft}%`);

  // partial input start
  newStart = 0;
  fireEvent.change(inputStart, { target: { value: ":" } });
  fireEvent.keyDown(inputStart, { key: "enter", keyCode: KEY_CODES.ENTER });
  startLeft = translateFromPosition(newStart);
  expect(inputStart.value).toBe(getColonSeparatedDuration(0));
  expect(knobStart.style.left).toBe(`${startLeft}%`);

  //partial input
  newStart = 100;
  fireEvent.change(inputStart, { target: { value: "1:40" } });
  fireEvent.keyDown(inputStart, { key: "enter", keyCode: KEY_CODES.ENTER });
  startLeft = translateFromPosition(newStart);
  expect(inputStart.value).toBe(getColonSeparatedDuration(newStart));
  expect(knobStart.style.left).toBe(`${startLeft}%`);

  let newEnd = 200;
  fireEvent.change(inputEnd, {
    target: { value: getColonSeparatedDuration(newEnd) },
  });
  fireEvent.keyDown(inputEnd, { key: "enter", keyCode: KEY_CODES.ENTER });
  let endLeft = translateFromPosition(newEnd);
  expect(inputEnd.value).toBe(getColonSeparatedDuration(newEnd));
  expect(knobEnd.style.left).toBe(`${endLeft}%`);

  // partial input
  newEnd = 600;
  fireEvent.change(inputEnd, { target: { value: "10:" } });
  fireEvent.keyDown(inputEnd, { key: "enter", keyCode: KEY_CODES.ENTER });
  endLeft = translateFromPosition(newEnd);
  expect(inputEnd.value).toBe(getColonSeparatedDuration(newEnd));
  expect(knobEnd.style.left).toBe(`${endLeft}%`);
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

test("onBlur", async () => {
  const mockFn = jest.fn();
  const { container } = render(
    <Component
      value={[300, 400]}
      prefixClassName="range-slider"
      onBlur={mockFn}
    />,
  );
  const inputEnd = container.querySelector(".range-slider-end-input");
  let newEnd = 500;
  fireEvent.change(inputEnd, { target: { value: newEnd } });
  fireEvent.blur(inputEnd);
  expect(inputEnd.value).toBe(newEnd.toString());
});
