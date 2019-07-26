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

test("Prefix Placeholder Class", async () => {
  const placeholderClassNamesNotAllowed = [
    "test-placeholder-wrapper",
    "test-placeholder-icon",
    "test-placeholder-text-wrapper",
    "test-placeholder-title",
    "test-placeholder-filesize",
    "test-placeholder-format",
    "test-placeholder-image-dimensions",
    "test-file-wrapper",
    "test-file-preview",
    "test-file-preview-title",
    "test-file-preview-delete-wrapper",
    "test-file-preview-delete-icon",
    "test-image-preview-image",
    "test-image-preview-delete",
    "test-image-preview-delete-icon",
  ];

  const previewClassNamesNotAllowed = [
    "test-wrapper",
    "test-file-wrapper",
    "test-file-preview",
    "test-file-preview-title",
    "test-file-preview-delete-wrapper",
    "test-file-preview-delete-icon",
    "test-loader",
    "test-progressbar-wrapper",
    "test-progressbar-bar",
    "test-addmore-wrapper",
    "test-addmore-text",
    "test-addmore-icon",
    "test-add-icon",
    "test-add-text",
    "test-add-wrapper",
    "test-image-wrapper",
    "test-image-preview",
    "test-image-preview-icon",
    "test-image-preview-image",
    "test-image-preview-delete",
    "test-image-preview-delete-icon",
  ];

  const classNames = Object.keys(File.classNames).map(className =>
    className.replace("$prefix", "test"),
  );

  const { rerender } = render(<File prefixClassName="test" />);

  classNames
    .filter(className => !previewClassNamesNotAllowed.includes(className))
    .forEach(className => {
      expect(
        document.getElementsByClassName(className).length,
        className,
      ).toBeGreaterThanOrEqual(1);
    });

  rerender(
    <File prefixClassName="test" type="image" value="hi.jpg" multiple={true} />,
  );

  classNames
    .filter(className => !placeholderClassNamesNotAllowed.includes(className))
    .forEach(className => {
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
