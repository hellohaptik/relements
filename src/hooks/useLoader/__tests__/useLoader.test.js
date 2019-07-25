/* eslint-env jest */

import React from "react";
import "jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import { WithLoader } from "../useLoader.storybook";

afterEach(cleanup);

test("Smoke", async () => {
  const { getByTestId, rerender, queryByTestId } = render(
    <WithLoader loading={true} />,
  );

  expect(getByTestId("loader")).toBeInTheDocument();
  rerender(<WithLoader loading={false} />);
  await new Promise(r => setTimeout(r, 400));
  expect(queryByTestId("loader")).toBeNull();
});

test("Activate", async () => {
  const { getByTestId, rerender, queryByTestId } = render(
    <WithLoader loading={false} />,
  );
  expect(queryByTestId("loader")).toBeNull();
  rerender(<WithLoader loading={true} />);
  await new Promise(r => setTimeout(r, 50));
  expect(getByTestId("loader")).toBeInTheDocument();
});

test("Deactivate", async () => {
  const { getByTestId, rerender, queryByTestId } = render(
    <WithLoader loading={true} />,
  );
  expect(getByTestId("loader")).toBeInTheDocument();
  rerender(<WithLoader loading={false} />);
  await new Promise(r => setTimeout(r, 400));
  expect(queryByTestId("loader")).toBeNull();
});
