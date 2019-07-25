/* eslint-env jest */

import React from "react";
import "jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import { ActivifiedComponent } from "../useActivify.storybook";

afterEach(cleanup);

test("Smoke", async () => {
  const { getByTestId, rerender, queryByTestId } = render(
    <ActivifiedComponent active={true} />,
  );
  expect(getByTestId("content")).toBeInTheDocument();
  rerender(<ActivifiedComponent active={false} />);
  await new Promise(r => setTimeout(r, 400));
  expect(queryByTestId("content")).toBeNull();
});

test("Activate", async () => {
  const { getByTestId, rerender, queryByTestId } = render(
    <ActivifiedComponent active={false} />,
  );
  expect(queryByTestId("content")).toBeNull();
  rerender(<ActivifiedComponent active={true} />);
  await new Promise(r => setTimeout(r, 50));
  expect(getByTestId("content")).toBeInTheDocument();
});

test("Deactivate", async () => {
  const { getByTestId, rerender, queryByTestId } = render(
    <ActivifiedComponent active={true} />,
  );
  expect(getByTestId("content")).toBeInTheDocument();
  rerender(<ActivifiedComponent active={false} />);
  await new Promise(r => setTimeout(r, 400));
  expect(queryByTestId("content")).toBeNull();
});
