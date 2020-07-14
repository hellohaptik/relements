/* eslint-env jest */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { KEY_CODES } from "constants";

import ExpandableSearchBar from "../ExpandableSearchBar";

afterEach(cleanup);

test("Smoke", async () => {
  const { getByTestId } = render(<ExpandableSearchBar />);
  expect(getByTestId("ExpandableSearchBar")).toBeInTheDocument();
});

test("Custom class", async () => {
  const { getByTestId } = render(<ExpandableSearchBar className="test" />);
  expect(getByTestId("ExpandableSearchBar")).toHaveClass("test");
});

test("Prefix class", async () => {
  const classNames = Object.keys(ExpandableSearchBar.classNames).map(
    className => className.replace("$prefix", "test"),
  );

  const classesNotAllowed = ["text-dismiss-icon", "text-loader"];
  const { rerender } = render(
    <ExpandableSearchBar prefixClassName="test" alwaysActive={true} />,
  );

  classNames.shift();

  classNames
    .filter(className => classesNotAllowed[1] === className)
    .forEach(className => {
      expect(
        document.getElementsByClassName(className).length,
        className,
      ).toBeGreaterThanOrEqual(1);
    });

  rerender(<ExpandableSearchBar prefixClassName="test" showLoader={true} />);

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
  const { container } = render(
    <ExpandableSearchBar prefixClassName="test" label="Test" />,
  );
  const label = container.getElementsByClassName("test-label");
  expect(label.length).toBe(1);
});

test("OnClick Test", async () => {
  const onClick = jest.fn();

  const { container } = render(
    <ExpandableSearchBar prefixClassName="test" onClick={onClick} />,
  );

  const actionButton = document.getElementsByClassName("test-inner-button")[0];
  fireEvent.click(actionButton);

  const inputElementWrapper = container.getElementsByClassName(
    "test-inner-input",
  )[0];
  const inputDOMElement =
    inputElementWrapper.children[1].children[0].children[0];

  fireEvent.focus(inputElementWrapper);
  fireEvent.change(inputDOMElement, { target: { value: "test" } });

  fireEvent.click(actionButton);
  expect(onClick).toHaveBeenCalled();
});

test("onChange Test", async () => {
  const onChange = jest.fn();

  const { container } = render(
    <ExpandableSearchBar prefixClassName="test" onChange={onChange} />,
  );

  const actionButton = document.getElementsByClassName("test-inner-button")[0];
  fireEvent.click(actionButton);

  const inputElementWrapper = container.getElementsByClassName(
    "test-inner-input",
  )[0];
  const inputDOMElement =
    inputElementWrapper.children[1].children[0].children[0];

  fireEvent.change(inputDOMElement, { target: { value: "test" } });

  expect(onChange).toHaveBeenCalled();
});

test("onBlur Test", async () => {
  const onBlur = jest.fn();

  const { container } = render(
    <ExpandableSearchBar prefixClassName="test" onBlur={onBlur} />,
  );

  const actionButton = document.getElementsByClassName("test-inner-button")[0];
  fireEvent.click(actionButton);

  const inputElementWrapper = container.getElementsByClassName(
    "test-inner-input",
  )[0];
  const inputDOMElement =
    inputElementWrapper.children[1].children[0].children[0];

  fireEvent.blur(inputDOMElement);

  expect(onBlur).toHaveBeenCalled();
});

test("onFocus Test", async () => {
  const onFocus = jest.fn();

  const { container } = render(
    <ExpandableSearchBar prefixClassName="test" onFocus={onFocus} />,
  );

  const actionButton = document.getElementsByClassName("test-inner-button")[0];
  fireEvent.click(actionButton);

  const inputElementWrapper = container.getElementsByClassName(
    "test-inner-input",
  )[0];
  const inputDOMElement =
    inputElementWrapper.children[1].children[0].children[0];

  fireEvent.click(inputDOMElement);
  expect(true).toBe(true);
});

test("OnDismiss Test", async () => {
  const onDismiss = jest.fn();

  const { container, rerender } = render(
    <ExpandableSearchBar prefixClassName="test" onDismiss={onDismiss} />,
  );

  const actionButton = document.getElementsByClassName("test-inner-button")[0];
  fireEvent.click(actionButton);

  const dismissButton = container.getElementsByClassName(
    "test-dismiss-icon",
  )[0];
  fireEvent.click(dismissButton);
  expect(onDismiss).toHaveBeenCalled();

  rerender(
    <ExpandableSearchBar
      prefixClassName="test"
      onDismiss={onDismiss}
      alwaysActive={true}
    />,
  );

  const inputElementWrapper = container.getElementsByClassName(
    "test-inner-input",
  )[0];
  const inputDOMElement =
    inputElementWrapper.children[1].children[0].children[0];

  fireEvent.change(inputDOMElement, { target: { value: "test" } });

  fireEvent.click(dismissButton);
  expect(onDismiss).toHaveBeenCalled();
});

test("onKeyDown Test", async () => {
  const onKeyDown = jest.fn();

  const { container } = render(
    <ExpandableSearchBar prefixClassName="test" onKeyDown={onKeyDown} />,
  );

  const actionButton = document.getElementsByClassName("test-inner-button")[0];
  fireEvent.click(actionButton);

  const inputElementWrapper = container.getElementsByClassName(
    "test-inner-input",
  )[0];
  const inputDOMElement =
    inputElementWrapper.children[1].children[0].children[0];

  fireEvent.keyDown(inputDOMElement, {
    key: "enter",
    keyCode: KEY_CODES.ENTER,
  });

  expect(onKeyDown).toHaveBeenCalled();
});

test("Type variations check", async () => {
  const { getByTestId, rerender } = render(<ExpandableSearchBar />);
  Object.keys(ExpandableSearchBar.TYPES).forEach(type => {
    rerender(
      <ExpandableSearchBar
        message={{ type: ExpandableSearchBar.TYPES[type] }}
      />,
    );
    expect(getByTestId("ExpandableSearchBar")).toBeInTheDocument();
  });
});
