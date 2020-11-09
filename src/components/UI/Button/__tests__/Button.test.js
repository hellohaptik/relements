/* eslint-env jest */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import InfoIcon from "icons/infoV2.svg";

import Button from "../Button";

afterEach(cleanup);

test("Smoke", async () => {
  const { rerender, getByTestId } = render(<Button>Button</Button>);
  expect(getByTestId("button")).toBeInTheDocument();
  expect(getByTestId("button")).toHaveTextContent("Button");
  rerender(<Button>Button Changed</Button>);
  expect(getByTestId("button")).toHaveTextContent("Button Changed");
});

test("Custom class", async () => {
  const { getByTestId } = render(<Button className="test">Button</Button>);
  expect(getByTestId("button")).toHaveClass("test");
});

test("Click", async () => {
  const mockOnClick = jest.fn();
  const { getByTestId } = render(<Button onClick={mockOnClick}>Button</Button>);
  fireEvent.click(getByTestId("button"));
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});

test("Type variations", async () => {
  const { getByTestId, rerender } = render(<Button>Button</Button>);
  Object.keys(Button.TYPES).forEach(type => {
    rerender(<Button type={Button.TYPES[type]}>Button</Button>);
    expect(getByTestId("button")).toBeInTheDocument();
  });
});

test("Size variations", async () => {
  const { getByTestId, rerender } = render(<Button>Button</Button>);
  Object.keys(Button.SIZES).forEach(type => {
    rerender(<Button size={Button.SIZES[type]}>Button</Button>);
    expect(getByTestId("button")).toBeInTheDocument();
  });

  // invalid size
  rerender(<Button size="123">Button</Button>);
  expect(getByTestId("button")).toBeInTheDocument();
});

test("Disabled", async () => {
  const { getByTestId } = render(<Button disabled>Button</Button>);
  expect(getByTestId("button")).toBeInTheDocument();
});

test("Ref", async () => {
  const mockRef = jest.fn();
  const { getByTestId } = render(<Button innerRef={mockRef}>Button</Button>);
  fireEvent.click(getByTestId("button"));
  expect(mockRef).toHaveBeenCalledTimes(1);
});

test("secondary icon not visible", async () => {
  const { queryByTestId } = render(<Button>Button</Button>);
  expect(queryByTestId("secondry-icon")).toBeNull();
});

test("secondary icon visible", async () => {
  const { getByTestId } = render(
    <Button showSecondaryIcon={true} secondaryIcon={InfoIcon}>
      Button
    </Button>,
  );
  expect(getByTestId("secondry-icon")).toBeInTheDocument();
});

test("secondary icon click", async () => {
  const mockOnClick = jest.fn();
  const { getByTestId } = render(
    <Button
      showSecondaryIcon={true}
      secondaryIcon={InfoIcon}
      onSecondaryIconClick={mockOnClick}
    >
      Button
    </Button>,
  );
  fireEvent.click(getByTestId("secondry-icon"));
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});
