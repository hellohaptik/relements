/* eslint-env jest */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import ModalHeader from "../ModalHeader";

afterEach(cleanup);

const Component = ({
  className,
  prefixClassName,
  onClose,
  onSave,
  withSave,
  saveTitle,
  isCloseOnRight,
  isWithoutUnderline,
  children,
}) => (
  <ModalHeader
    className={className}
    prefixClassName={prefixClassName}
    isWithoutUnderline={isWithoutUnderline}
    onClose={onClose}
    onSave={onSave}
    withSave={withSave}
    saveTitle={saveTitle}
    isCloseOnRight={isCloseOnRight}
  >
    {children}
  </ModalHeader>
);

test("Smoke", async () => {
  const { queryAllByTestId } = render(<Component active />);
  expect(queryAllByTestId("modal-header").length).toBe(1);
});

test("Custom class", async () => {
  const { getByTestId } = render(<Component className="test" />);
  expect(getByTestId("modal-header")).toHaveClass("test");
});

test("Prefix class", async () => {
  const classNames = Object.keys(ModalHeader.classNames).map(className =>
    className.replace("$prefix", "test"),
  );
  console.log(classNames);
  render(<Component prefixClassName="test" withSave />);

  classNames.forEach(className => {
    expect(
      document.getElementsByClassName(className).length,
      className,
    ).toBeGreaterThanOrEqual(1);
  });
});

test("On Close", async () => {
  const mockFn = jest.fn();
  render(<Component onClose={mockFn} prefixClassName="test" />);
  const crossButton = document.getElementsByClassName("test-icon")[0];
  fireEvent.click(crossButton);
  expect(mockFn).toHaveBeenCalledTimes(1);
});

test("With Save", async () => {
  const mockFn = jest.fn();
  render(<Component prefixClassName="test" onSave={mockFn} withSave />);
  const saveButton = document.getElementsByClassName("test-cta")[0];
  fireEvent.click(saveButton);
  expect(mockFn).toHaveBeenCalledTimes(1);
});

test("Custom Save Text", async () => {
  const { getByText } = render(<Component withSave saveTitle="hi_test" />);
  expect(getByText("hi_test")).toBeInTheDocument();
});

test("Close Icon to have iconWithoutRightMargin class", async () => {
  const { getByTestId } = render(<Component isCloseOnRight />);
  const icon = getByTestId("icon");
  expect(icon).toHaveClass("iconWithoutRightMargin");
});

test("Close Icon to not have iconWithoutRightMargin class with save button", async () => {
  const { getByTestId } = render(<Component isCloseOnRight withSave />);
  const icon = getByTestId("icon");
  expect(icon).not.toHaveClass("iconWithoutRightMargin");
});

test("Left Column to have closeOnRight class", async () => {
  const { getByTestId } = render(<Component isCloseOnRight />);
  const leftColumn = getByTestId("modal-header-left-column");
  expect(leftColumn).toHaveClass("closeOnRight");
});

test("Left Column to have closeOnRight class with save button", async () => {
  const { getByTestId } = render(<Component isCloseOnRight withSave />);
  const leftColumn = getByTestId("modal-header-left-column");
  expect(leftColumn).toHaveClass("closeOnRight");
});

test("Without Underline", async () => {
  const { getByTestId } = render(<Component isWithoutUnderline />);
  const modalHeader = getByTestId("modal-header");
  expect(modalHeader).toHaveClass("modalHeaderWithoutUnderline");
});

test("With Underline", async () => {
  const { getByTestId } = render(<Component isWithoutUnderline={false} />);
  const modalHeader = getByTestId("modal-header");
  expect(modalHeader).not.toHaveClass("modalHeaderWithoutUnderline");
});
