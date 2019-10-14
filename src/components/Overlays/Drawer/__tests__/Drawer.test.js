/* eslint-env jest */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import Drawer from "../Drawer";

afterEach(cleanup);

const component = props => (
  <Drawer onClose={() => {}} active={true} {...props}>
    <Drawer.Header onClose={() => {}}>Hello, world!</Drawer.Header>
    <div style={{ padding: 24 }}>This is a modal</div>
  </Drawer>
);

test("Smoke", async () => {
  const { queryAllByTestId, rerender } = render(component({ active: true }));
  expect(queryAllByTestId("drawer").length).toBe(1);
});

test("Active", async () => {
  const { queryAllByTestId, rerender } = render(component({ active: false }));
  expect(queryAllByTestId("drawer").length).toBe(0);

  rerender(component({ active: true }));
  expect(queryAllByTestId("drawer").length).toBe(1);
});

test("Custom Z-Index", async () => {
  const { queryAllByTestId } = render(
    component({ active: true, prefixClassName: "test", zIndex: 3 }),
  );
  expect(queryAllByTestId("drawer")[0]).toHaveStyle("z-index: 3");
});

test("Custom Width", async () => {
  const { queryAllByTestId } = render(
    component({ active: true, prefixClassName: "test", width: 420 }),
  );
  expect(document.getElementsByClassName("test-drawer")[0]).toHaveStyle(
    "width: 420px",
  );
});

test("ClassName", async () => {
  const { queryAllByTestId } = render(
    component({ active: true, prefixClassName: "test", className: "demo" }),
  );
  expect(queryAllByTestId("drawer")[0]).toHaveClass("demo");
});

test("Position : Left", async () => {
  const { queryAllByTestId } = render(component({ position: "LEFT" }));
  expect(queryAllByTestId("drawer")[0]).toHaveStyle("left: 0px;");
});

test("No Disable", async () => {
  const { queryAllByTestId, container } = render(
    component({ active: false, noDisable: true }),
  );
  expect(queryAllByTestId("drawer").length).toBeGreaterThanOrEqual(1);
});

test("Prefix Class", async () => {
  const classNames = Object.keys(Drawer.classNames).map(className =>
    className.replace("$prefix", "test"),
  );

  const { queryAllByTestId } = render(component({ prefixClassName: "test" }));

  classNames.forEach(className => {
    expect(
      document.getElementsByClassName(className).length,
      className,
    ).toBeGreaterThanOrEqual(1);
  });
});

test("No Overlay", async () => {
  const { queryAllByTestId, rerender } = render(
    component({ active: true, prefixClassName: "test", noOverlay: true }),
  );
  expect(document.getElementsByClassName("test-overlay").length).toBe(0);
});

test("On Close", async () => {
  const mockOnClick = jest.fn();
  const { getByTestId } = render(
    component({ prefixClassName: "test", onClose: mockOnClick }),
  );
  fireEvent.click(document.getElementsByClassName("test-overlay")[0]);
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});
