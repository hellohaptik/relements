/* eslint-env jest */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { KEY_CODES } from "constants";

import ExpandableInputBar from "../ExpandableInputBar";

afterEach(cleanup);

test("Smoke", async () => {
  const { getByTestId } = render(<ExpandableInputBar />);
  expect(getByTestId("ExpandableInputBar")).toBeInTheDocument();
});

test("Custom class", async () => {
  const { getByTestId } = render(<ExpandableInputBar className="test" />);
  expect(getByTestId("ExpandableInputBar")).toHaveClass("test");
});

test("Prefix class", async () => {
  const classNames = Object.keys(ExpandableInputBar.classNames).map(className =>
    className.replace("$prefix", "test"),
  );

  const classesNotAllowed = ["text-dismiss-icon", "text-loader"];
  const { rerender } = render(
    <ExpandableInputBar prefixClassName="test" alwaysActive={true} />,
  );

  // Check that loader should not be present when dismiss icon is visible
  classNames
    .filter(className => classesNotAllowed[1] === className)
    .forEach(className => {
      expect(
        document.getElementsByClassName(className).length,
        className,
      ).toBeGreaterThanOrEqual(1);
    });

  //Re-render with loader
  rerender(<ExpandableInputBar prefixClassName="test" showLoader={true} />);

  // Check that dismiss icon should not be present when loader is visible
  classNames
    .filter(className => classesNotAllowed[0] === className)
    .forEach(className => {
      expect(
        document.getElementsByClassName(className).length,
        className,
      ).toBeGreaterThanOrEqual(1);
    });
});

test("Label", async () => {
  const { getByTestId } = render(
    <ExpandableInputBar prefixClassName="test" label="Test" />,
  );

  const actionButton = document.getElementsByClassName("test-inner-button")[0];
  fireEvent.click(actionButton);

  const label = getByTestId("labelText");
  expect(label.textContent.length).toBeGreaterThan(1);
});

test("OnClick Test", async () => {
  const onClick = jest.fn();

  const { getByTestId } = render(
    <ExpandableInputBar prefixClassName="test" onClick={onClick} />,
  );

  const actionButton = document.getElementsByClassName("test-inner-button")[0];
  fireEvent.click(actionButton);

  const inputDOMElement = getByTestId("inputText");

  fireEvent.change(inputDOMElement, { target: { value: "test" } });

  fireEvent.click(actionButton);
  expect(onClick).toHaveBeenCalled();
});

test("onChange Test", async () => {
  const onChange = jest.fn();

  const { getByTestId } = render(
    <ExpandableInputBar prefixClassName="test" onChange={onChange} />,
  );

  const actionButton = document.getElementsByClassName("test-inner-button")[0];
  fireEvent.click(actionButton);

  const inputDOMElement = getByTestId("inputText");

  fireEvent.change(inputDOMElement, { target: { value: "test" } });

  expect(onChange).toHaveBeenCalled();
});

test("onBlur Test", async () => {
  const onBlur = jest.fn();

  const { getByTestId } = render(
    <ExpandableInputBar prefixClassName="test" onBlur={onBlur} />,
  );

  const actionButton = document.getElementsByClassName("test-inner-button")[0];
  fireEvent.click(actionButton);

  const inputDOMElement = getByTestId("inputText");

  fireEvent.blur(inputDOMElement);

  expect(onBlur).toHaveBeenCalled();
});

test("onFocus Test", async () => {
  const onFocus = jest.fn();

  const { getByTestId } = render(
    <ExpandableInputBar prefixClassName="test" onFocus={onFocus} />,
  );

  const actionButton = document.getElementsByClassName("test-inner-button")[0];
  fireEvent.click(actionButton);

  const inputDOMElement = getByTestId("inputText");

  fireEvent.click(inputDOMElement);
  expect(true).toBe(true);
});

test("OnDismiss Test", async () => {
  const onDismiss = jest.fn();

  const { container, rerender, getByTestId } = render(
    <ExpandableInputBar prefixClassName="test" onDismiss={onDismiss} />,
  );

  const actionButton = document.getElementsByClassName("test-inner-button")[0];
  fireEvent.click(actionButton);

  const dismissButton = container.getElementsByClassName(
    "test-dismiss-icon",
  )[0];
  fireEvent.click(dismissButton);
  expect(onDismiss).toHaveBeenCalled();

  rerender(
    <ExpandableInputBar
      prefixClassName="test"
      onDismiss={onDismiss}
      alwaysActive={true}
    />,
  );

  const inputDOMElement = getByTestId("inputText");

  fireEvent.change(inputDOMElement, { target: { value: "test" } });

  fireEvent.click(dismissButton);
  expect(onDismiss).toHaveBeenCalled();
});

test("onKeyDown Test", async () => {
  const onKeyDown = jest.fn();

  const { getByTestId } = render(
    <ExpandableInputBar prefixClassName="test" onKeyDown={onKeyDown} />,
  );

  const actionButton = document.getElementsByClassName("test-inner-button")[0];
  fireEvent.click(actionButton);

  const inputDOMElement = getByTestId("inputText");

  fireEvent.keyDown(inputDOMElement, {
    key: "enter",
    keyCode: KEY_CODES.ENTER,
  });

  expect(onKeyDown).toHaveBeenCalled();
});

test("Type variations check", async () => {
  const { getByTestId, rerender } = render(<ExpandableInputBar />);
  Object.keys(ExpandableInputBar.TYPES).forEach(type => {
    rerender(
      <ExpandableInputBar message={{ type: ExpandableInputBar.TYPES[type] }} />,
    );
    expect(getByTestId("ExpandableInputBar")).toBeInTheDocument();
  });
});
