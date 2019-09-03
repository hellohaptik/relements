/* eslint-env jest */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import { AccordionTest } from "../Accordion.storybook.js";

afterEach(cleanup);

test("Smoke", async () => {
  const { getByTestId } = render(<AccordionTest />);
  expect(getByTestId("accordion")).toBeInTheDocument();
});

test("Header", async () => {
  const { getAllByTestId } = render(<AccordionTest />);
  expect(getAllByTestId("accordion-header")[0]).toHaveTextContent(
    "Accordion Header 1",
  );
  expect(getAllByTestId("accordion-header")[1]).toHaveTextContent(
    "Accordion Header 2",
  );
});

test("Expand Body", async () => {
  const { getAllByTestId, getByText } = render(<AccordionTest />);
  fireEvent.click(getByText("Accordion Header 1"));
  expect(getAllByTestId("accordion-body")[0]).toHaveTextContent(
    "This is the body 1",
  );

  fireEvent.click(getByText("Accordion Header 2"));
  await new Promise(r => setTimeout(r, 1000));
  expect(getAllByTestId("accordion-body")[0]).toHaveTextContent(
    "This is the body 2",
  );
});

test("Switching items", async () => {
  const { getAllByTestId, queryAllByTestId, getByText } = render(
    <AccordionTest />,
  );

  expect(queryAllByTestId("accordion-body").length).toBe(0);

  fireEvent.click(getByText("Accordion Header 1"));
  expect(getAllByTestId("accordion-body").length).toBe(1);

  fireEvent.click(getByText("Accordion Header 2"));
  await new Promise(r => setTimeout(r, 1000));
  expect(getAllByTestId("accordion-body").length).toBe(1);
});
