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

//Extenstion Tests

//#region Single File Upload Tests
test("Single - Image Extension Test", async () => {
  global.alert = jest.fn();
  window.URL.createObjectURL = function() {};

  //Invalid File
  const invalidFile = new File(["dummy content"], "example.pdf", {
    type: "image",
  });

  const { rerender } = render(
    <FileComponent prefixClassName="test" type="image" />,
  );
  const input = document.getElementsByClassName("test-input")[0];

  Object.defineProperty(input, "files", {
    value: [invalidFile],
  });
  fireEvent.change(input);

  //Valid File
  const validFile = new File(["dummy content"], "example.png", {
    type: "image",
  });

  const inputFile = document.getElementsByClassName("test-input")[0];
  Object.defineProperty(inputFile, "file", {
    value: [validFile],
  });
  fireEvent.change(inputFile);

  expect(global.alert).toHaveBeenCalled();
});

test("Single - File Extension Test", async () => {
  global.alert = jest.fn();
  window.URL.createObjectURL = function() {};

  //Invalid File
  const invalidFile = new File(["dummy content"], "example.exe", {
    type: "file",
  });

  const { rerender } = render(
    <FileComponent prefixClassName="test" type="file" />,
  );
  const input = document.getElementsByClassName("test-input")[0];

  Object.defineProperty(input, "files", {
    value: [invalidFile],
  });
  fireEvent.change(input);

  //Valid File
  const validFile = new File(["dummy content"], "example.png", {
    type: "file",
  });

  const inputFile = document.getElementsByClassName("test-input")[0];
  Object.defineProperty(inputFile, "file", {
    value: [validFile],
  });
  fireEvent.change(inputFile);

  expect(global.alert).toHaveBeenCalled();
});

test("Single - Custom Extension Test", async () => {
  global.alert = jest.fn();
  window.URL.createObjectURL = function() {};

  //Invalid File
  const invalidFile = new File(["dummy content"], "example.exe", {
    type: ".png, .pdf",
  });

  const { rerender } = render(
    <FileComponent prefixClassName="test" type=".png, .pdf" />,
  );
  const input = document.getElementsByClassName("test-input")[0];

  Object.defineProperty(input, "files", {
    value: [invalidFile],
  });
  fireEvent.change(input);

  //Valid File
  const validFile = new File(["dummy content"], "example.png", {
    type: ".png, .pdf",
  });

  const inputFile = document.getElementsByClassName("test-input")[0];
  Object.defineProperty(inputFile, "file", {
    value: [validFile],
  });
  fireEvent.change(inputFile);

  //Mixed
  const mixed = new File(["dummy content"], "example.png", {
    type: ".png, .pdf",
  });
  rerender(<FileComponent prefixClassName="test" type=".png, .asdw" />);
  const inputMixed = document.getElementsByClassName("test-input")[0];
  Object.defineProperty(inputMixed, "mixed", {
    value: [mixed],
  });
  fireEvent.change(inputMixed);

  expect(global.alert).toHaveBeenCalled();
});
//#endregion

//#region Multiple File Upload Tests
test("Multiple - Image Extension Test", async () => {
  global.alert = jest.fn();
  window.URL.createObjectURL = function() {};

  const imgFile = new File(["dummy content"], "example.png", {
    type: "image",
  });

  const invalidFile = new File(["dummy content"], "example.exe", {
    type: "image",
  });

  render(<FileComponent prefixClassName="test" type="image" multiple={true} />);

  const multipleInput = document.getElementsByClassName("test-input")[0];

  Object.defineProperty(multipleInput, "files", {
    value: [imgFile, invalidFile],
  });
  fireEvent.change(multipleInput);

  expect(multipleInput.multiple).toEqual(true);
  expect(global.alert).toHaveBeenCalled();
});

test("Multiple - File Extension Test", async () => {
  global.alert = jest.fn();
  window.URL.createObjectURL = function() {};

  const imgFile = new File(["dummy content"], "example.png", {
    type: "file",
  });

  const file = new File(["dummy content"], "example.pdf", {
    type: "file",
  });

  const invalidFile = new File(["dummy content"], "example.exe", {
    type: "file",
  });

  render(<FileComponent prefixClassName="test" type="file" multiple={true} />);

  const multipleInput = document.getElementsByClassName("test-input")[0];

  Object.defineProperty(multipleInput, "files", {
    value: [imgFile, file, invalidFile],
  });
  fireEvent.change(multipleInput);

  expect(multipleInput.multiple).toEqual(true);
  expect(global.alert).toHaveBeenCalled();
});

test("Multiple - Custom Extension Test", async () => {
  global.alert = jest.fn();
  window.URL.createObjectURL = function() {};

  const imgFile = new File(["dummy content"], "example.png", {
    type: ".png, .pdf",
  });

  const file = new File(["dummy content"], "example.pdf", {
    type: ".png, .pdf",
  });

  const invalidFile = new File(["dummy content"], "example.exe", {
    type: ".png, .pdf",
  });

  render(
    <FileComponent prefixClassName="test" type=".png, .pdf" multiple={true} />,
  );

  const multipleInput = document.getElementsByClassName("test-input")[0];

  Object.defineProperty(multipleInput, "files", {
    value: [imgFile, file, invalidFile],
  });
  fireEvent.change(multipleInput);

  expect(multipleInput.multiple).toEqual(true);
  expect(global.alert).toHaveBeenCalled();
});
//#endregion
