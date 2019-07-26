/* eslint-env jest */

import React from "react";
import "jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "@testing-library/react";

import File from "../File";

afterEach(cleanup);

test("Smoke", async () => {
  const { queryAllByTestId } = render(<File />);
  expect(queryAllByTestId("file").length).toBe(1);
});

test("Custom class", async () => {
  const { getByTestId } = render(<File className="test" />);
  expect(getByTestId("file")).toHaveClass("test");
});

test("Prefix Holder Class", async () => {
  const classNamesAllowed = [
    "test",
    "test-holder",
    "test-icon",
    "test-wrapper",
    "test-title",
    "test-sub",
    "test-sub-2",
    "test-sub-3",
    "test-input",
  ];
  const classNames = Object.keys(File.classNames)
    .filter(className => classNamesAllowed.includes(className))
    .map(className => className.replace("$prefix", "test"));

  const { container } = render(<File prefixClassName="test" />);

  classNames.forEach(className => {
    expect(
      document.getElementsByClassName(className).length,
      className,
    ).toBeGreaterThanOrEqual(1);
  });
});

test("Prefix Image Class", async () => {
  const classNamesAllowed = [
    "test",
    "test-holder",
    "test-icon",
    "test-preview",
    "test-preview-del",
    "test-wrapper",
    "test-image",
    "test-loader",
    "test-input",
    "test-extra",
    "test-add",
    "test-text",
  ];
  const classNames = Object.keys(File.classNames)
    .filter(className => classNamesAllowed.includes(className))
    .map(className => className.replace("$prefix", "test"));

  const { container } = render(
    <File value={["test.png"]} prefixClassName="test" multple={true} />,
  );

  classNames.forEach(className => {
    expect(
      document.getElementsByClassName(className).length,
      className,
    ).toBeGreaterThanOrEqual(1);
  });
});

test("On change test", async () => {
  const mockFn = jest.fn();
  window.URL.createObjectURL = function() {};

  const file = new File(["dummy content"], "example.png", {
    type: "image/png",
  });
  const { getByTestId } = render(<File prefixClassName="test" />);
  const input = document.getElementsByClassName("test-input")[0];
  input.onchange = mockFn;

  Object.defineProperty(input, "files", {
    value: [file],
  });

  fireEvent.change(input);
  expect(mockFn).toHaveBeenCalled();
});

test("Multiple test", async () => {
  const { getByTestId } = render(
    <File prefixClassName="test" multiple={true} />,
  );
  const input = document.getElementsByClassName("test-input")[0];
  expect(input.multiple).toEqual(true);
});
