/* eslint-env jest */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "@testing-library/react";

import FileComponent from "../File";

afterEach(cleanup);

test("Smoke", async () => {
  const { queryAllByTestId } = render(<FileComponent />);
  expect(queryAllByTestId("file").length).toBe(1);
});

test("Custom class", async () => {
  const { getByTestId } = render(<FileComponent className="test" />);
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

  const fileClassNamesNotAllowed = [
    "test-placeholder-wrapper",
    "test-placeholder-icon",
    "test-placeholder-text-wrapper",
    "test-placeholder-title",
    "test-placeholder-filesize",
    "test-placeholder-format",
    "test-placeholder-image-dimensions",
    "test-image-wrapper",
    "test-image-preview",
    "test-image-preview-icon",
    "test-image-preview-image",
    "test-image-preview-delete",
    "test-image-preview-delete-icon",
  ];

  const classNames = Object.keys(FileComponent.classNames).map(className =>
    className.replace("$prefix", "test"),
  );

  const { rerender } = render(
    <FileComponent value="" prefixClassName="test" />,
  );

  classNames
    .filter(className => !previewClassNamesNotAllowed.includes(className))
    .forEach(className => {
      expect(
        document.getElementsByClassName(className).length,
        className,
      ).toBeGreaterThanOrEqual(1);
    });

  rerender(
    <FileComponent
      prefixClassName="test"
      type="image"
      value={["hi.jpg"]}
      multiple={true}
    />,
  );

  classNames
    .filter(className => !placeholderClassNamesNotAllowed.includes(className))
    .forEach(className => {
      expect(
        document.getElementsByClassName(className).length,
        className,
      ).toBeGreaterThanOrEqual(1);
    });

  rerender(
    <FileComponent
      prefixClassName="test"
      type="file"
      value={["hi.csv"]}
      multiple={true}
    />,
  );

  classNames
    .filter(className => !fileClassNamesNotAllowed.includes(className))
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

  const { getByTestId } = render(<FileComponent prefixClassName="test" />);
  const input = document.getElementsByClassName("test-input")[0];
  input.onchange = mockFn;

  Object.defineProperty(input, "files", {
    value: [file],
  });

  fireEvent.change(input);
  expect(mockFn).toHaveBeenCalled();
});

test("File size", async () => {
  window.URL.createObjectURL = function() {};
  const file = new File(["dummy content"], "example.png", {
    type: "image/png",
  });

  const { rerender } = render(
    <FileComponent prefixClassName="test" maxFileSize={0.000001} />,
  );
  const input = document.getElementsByClassName("test-input")[0];

  global.alert = jest.fn();
  Object.defineProperty(input, "files", {
    value: [file],
  });
  fireEvent.change(input);

  rerender(
    <FileComponent type="file" prefixClassName="test" maxFileSize={0.000001} />,
  );
  const input_file = document.getElementsByClassName("test-input")[0];
  Object.defineProperty(input_file, "file", {
    value: [file],
  });
  fireEvent.change(input_file);
  expect(global.alert).toHaveBeenCalledTimes(2);
});

test("Multiple test", async () => {
  const { getByTestId } = render(
    <FileComponent prefixClassName="test" multiple={true} />,
  );
  const input = document.getElementsByClassName("test-input")[0];
  expect(input.multiple).toEqual(true);
});

test("File extension", async () => {
  const mockFn = jest.fn();
  window.URL.createObjectURL = function() {};

  //#region Image
  const imgFile = new File(["dummy content"], "example.png", {
    type: "image",
  });
  const { imgRerender } = render(
    <FileComponent prefixClassName="test" type="image" />,
  );
  const imgInput = document.getElementsByClassName("test-input")[0];
  imgInput.onchange = mockFn;

  Object.defineProperty(imgInput, "imgFile", {
    value: [imgFile],
  });
  fireEvent.change(imgInput);
  expect(mockFn).toHaveBeenCalled();
  //#endregion

  //#region File
  const file = new File(["dummy content"], "example.pdf", {
    type: "file",
  });
  const { fileRerender } = render(
    <FileComponent prefixClassName="test" type="file" />,
  );
  const fileInput = document.getElementsByClassName("test-input")[0];
  fileInput.onchange = mockFn;

  Object.defineProperty(fileInput, "file", {
    value: [file],
  });
  fireEvent.change(fileInput);
  expect(mockFn).toHaveBeenCalled();
  //#endregion

  //#region Custom Extensions

  //Valid
  const customInputValid = new File(["dummy content"], "example.png", {
    type: ".png, .pdf",
  });
  const { validInputRerender } = render(
    <FileComponent prefixClassName="test" type=".png" />,
  );
  const fileInputValid = document.getElementsByClassName("test-input")[0];
  fileInputValid.onchange = mockFn;

  Object.defineProperty(fileInputValid, "validFiles", {
    value: [customInputValid],
  });
  fireEvent.change(fileInputValid);
  expect(mockFn).toHaveBeenCalled();

  //Invalid
  const customInputInvalid = new File(["dummy content"], "example.png", {
    type: ".pdfasdsad, -2",
  });
  const { invalidInputRerender } = render(
    <FileComponent prefixClassName="test" type=".pdfasdsad, -2" />,
  );
  const fileInputInvalid = document.getElementsByClassName("test-input")[0];
  fileInputInvalid.onchange = mockFn;

  Object.defineProperty(fileInputInvalid, "invalidFiles", {
    value: [customInputInvalid],
  });
  fireEvent.change(fileInputInvalid);
  expect(mockFn).toHaveBeenCalled();

  //Mix
  const customInputMix = new File(["dummy content"], "example.png", {
    type: ".pdf",
  });
  const { mixInputRerender } = render(
    <FileComponent prefixClassName="test" type=".png, asdw" />,
  );
  const fileInputMix = document.getElementsByClassName("test-input")[0];
  fileInputMix.onchange = mockFn;

  Object.defineProperty(fileInputMix, "mixFiles", {
    value: [customInputMix],
  });
  fireEvent.change(fileInputMix);
  expect(mockFn).toHaveBeenCalled();

  //#endregion
});
