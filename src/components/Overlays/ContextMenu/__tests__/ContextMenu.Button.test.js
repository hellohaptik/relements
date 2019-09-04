/* eslint-env jest */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import SampleIcon from "@src/icons/active.svg";
import ContextMenu from "../ContextMenu";

afterEach(cleanup);

const Component = ({ className, prefixClassName }) => {
  return (
    <ContextMenu.Button
      className={className}
      prefixClassName={prefixClassName}
      offset={{ left: -24, top: 0 }}
    >
      <ContextMenu.Item
        className={`${className}-item`}
        prefixClassName={`${prefixClassName}-item`}
        icon={SampleIcon}
        iconSize={18}
        title="Hello 1"
      />
      <ContextMenu.Item
        className={`${className}-item`}
        prefixClassName={`${prefixClassName}-item`}
        disabled
        icon={SampleIcon}
        iconSize={18}
        title="Hello 2"
      />
      <ContextMenu.Item
        className={`${className}-item`}
        prefixClassName={`${prefixClassName}-item`}
        icon={SampleIcon}
        iconSize={18}
        title="Hello 3"
      />
    </ContextMenu.Button>
  );
};

test("Smoke", async () => {
  const { queryAllByTestId } = render(<Component active />);
  expect(queryAllByTestId("button").length).toBe(1);
});

test("Custom class", async () => {
  const { getByTestId } = render(<Component active className="test" />);
  expect(getByTestId("button")).toHaveClass("test");
});

test("Prefix class", async () => {
  const buttonClassNames = Object.keys(ContextMenu.Button.classNames).map(
    className => className.replace("$prefix", "test"),
  );
  const itemClassNames = Object.keys(ContextMenu.Item.classNames).map(
    className => className.replace("$prefix", "test-item"),
  );

  const { getByTestId } = render(<Component prefixClassName="test" />);

  fireEvent.click(getByTestId("button"));

  buttonClassNames.forEach(className => {
    expect(
      document.getElementsByClassName(className).length,
      className,
    ).toBeGreaterThanOrEqual(1);
  });

  itemClassNames.forEach(className => {
    expect(
      document.getElementsByClassName(className).length,
      className,
    ).toBeGreaterThanOrEqual(1);
  });
});

test("Activate/Deactivate", async () => {
  const { queryAllByTestId, getByTestId, rerender } = render(
    <Component active={false} />,
  );
  expect(queryAllByTestId("context-menu").length).toBe(0);
  fireEvent.click(getByTestId("button"));
  expect(queryAllByTestId("context-menu").length).toBe(1);
  fireEvent.click(getByTestId("button"));
  await new Promise(r => setTimeout(r, 400));
  expect(queryAllByTestId("context-menu").length).toBe(0);
});

test("Overlay click", async () => {
  const { queryAllByTestId, getByTestId, rerender } = render(
    <Component prefixClassName="test" />,
  );
  expect(queryAllByTestId("context-menu").length).toBe(0);
  fireEvent.click(getByTestId("button"));
  expect(queryAllByTestId("context-menu").length).toBe(1);
  fireEvent.click(document.getElementsByClassName("test-portal-overlay")[0]);
  await new Promise(r => setTimeout(r, 400));
  expect(queryAllByTestId("context-menu").length).toBe(0);
});
