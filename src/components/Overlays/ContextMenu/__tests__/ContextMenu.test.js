/* eslint-env jest */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import SampleIcon from "@src/icons/active.svg";
import ContextMenu from "../ContextMenu";

afterEach(cleanup);

const Component = ({
  className,
  prefixClassName,
  active: defaultActive = true,
}) => {
  const buttonRef = React.useRef();
  const [active, setActive] = React.useState(defaultActive);
  return (
    <>
      <button
        data-testid="toggle"
        onClick={() => setActive(!active)}
        ref={buttonRef}
      >
        Activate
      </button>
      <ContextMenu
        attachTo={buttonRef}
        active={active}
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
          size="big"
        />
        <ContextMenu.Item
          className={`${className}-item`}
          prefixClassName={`${prefixClassName}-item`}
          disabled
          icon={SampleIcon}
          iconSize={18}
          title="Hello 2"
          href="abc.com"
        />
        <ContextMenu.Item
          className={`${className}-item`}
          prefixClassName={`${prefixClassName}-item`}
          icon={SampleIcon}
          iconSize={18}
        >
          Hello 3
        </ContextMenu.Item>
      </ContextMenu>
    </>
  );
};

test("Smoke", async () => {
  const { queryAllByTestId } = render(<Component active />);
  expect(queryAllByTestId("context-menu").length).toBe(1);
  expect(queryAllByTestId("context-menu-item").length).toBe(3);
});

test("Custom class", async () => {
  const { getByTestId } = render(<Component active className="test" />);
  expect(getByTestId("context-menu")).toHaveClass("test");
});

test("Prefix class", async () => {
  const classNames = Object.keys(ContextMenu.classNames).map(className =>
    className.replace("$prefix", "test"),
  );
  const itemClassNames = Object.keys(ContextMenu.Item.classNames).map(
    className => className.replace("$prefix", "test-item"),
  );
  render(<Component active prefixClassName="test" />);

  classNames.forEach(className => {
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
  fireEvent.click(getByTestId("toggle"));
  expect(queryAllByTestId("context-menu").length).toBe(1);
  fireEvent.click(getByTestId("toggle"));
  await new Promise(r => setTimeout(r, 400));
  expect(queryAllByTestId("context-menu").length).toBe(0);
});
