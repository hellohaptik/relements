/* eslint-env jest */

import React from "react";
import dayjs from "dayjs";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import Modal from "../Modal";

afterEach(cleanup);

const date = dayjs(new Date())
  .set("h", 15)
  .set("m", 24)
  .toDate();

const Component = ({
  active,
  className,
  prefixClassName,
  onClose,
  onSave,
  withSave,
  saveTitle,
}) => (
  <Modal
    className={className}
    prefixClassName={prefixClassName}
    onClose={onClose}
    active={active}
  >
    <Modal.Header
      prefixClassName={`${prefixClassName}-header`}
      onClose={onClose}
      onSave={onSave}
      withSave={withSave}
      saveTitle={saveTitle}
    >
      Hello, world!
    </Modal.Header>
    <div style={{ padding: 24 }}>This is a modal</div>
  </Modal>
);

test("Smoke", async () => {
  const { queryAllByTestId } = render(<Component active />);
  expect(queryAllByTestId("modal").length).toBe(1);
});

test("Custom class", async () => {
  const { getByTestId } = render(<Component active className="test" />);
  expect(getByTestId("modal")).toHaveClass("test");
});

test("Prefix class", async () => {
  const classNames = Object.keys(Modal.classNames).map(className =>
    className.replace("$prefix", "test"),
  );
  render(<Component active prefixClassName="test" />);

  classNames.forEach(className => {
    expect(
      document.getElementsByClassName(className).length,
      className,
    ).toBeGreaterThanOrEqual(1);
  });
});

test("Active/Inactive", async () => {
  const { queryAllByTestId, rerender } = render(<Component />);
  expect(queryAllByTestId("modal").length).toBe(0);
  rerender(<Component active />);
  expect(queryAllByTestId("modal").length).toBe(1);
  rerender(<Component />);
  await new Promise(r => setTimeout(r, 400));
  expect(queryAllByTestId("modal").length).toBe(0);
});

test("On Close", async () => {
  const mockFn = jest.fn();
  const { queryAllByTestId, rerender } = render(
    <Component onClose={mockFn} prefixClassName="test" active />,
  );
  const crossButton = document.getElementsByClassName("test-header-icon")[0];
  fireEvent.click(crossButton);
  expect(mockFn).toHaveBeenCalledTimes(1);
  rerender(<Component />);
  await new Promise(r => setTimeout(r, 400));
  expect(queryAllByTestId("modal").length).toBe(0);
});

test("With Save", async () => {
  const mockFn = jest.fn();
  render(<Component prefixClassName="test" onSave={mockFn} active withSave />);
  const saveButton = document.getElementsByClassName("test-header-cta")[0];
  fireEvent.click(saveButton);
  expect(mockFn).toHaveBeenCalledTimes(1);
});

test("Custom Save Text", async () => {
  const { getByText, rerender } = render(
    <Component prefixClassName="test" active withSave saveTitle="hi_test" />,
  );
  expect(getByText("hi_test")).toBeInTheDocument();
});
