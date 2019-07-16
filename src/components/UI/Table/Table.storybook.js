import React from "react";
import { storiesOf } from "@storybook/react";
import Docs from "./Table.mdx";

export const DATA = {
  columns: [
    {
      title: "Rating",
      width: "100px",
      sortKey: "rating",
    },
    {
      title: "Comment",
    },
    {
      title: "Task",
      width: "15%",
    },
    {
      title: "Reason",
      width: "15%",
    },
    {
      title: "View Chat",
      width: "100px",
    },
  ],
  data: [
    [
      { content: "hello", value: "hello" },
      { content: "this", value: "this" },
      { content: "is", value: "is" },
      { content: "an", value: "an" },
      { content: "item", value: "item" },
    ],
  ],

  dataWithHidden: [
    {
      hidden: true,
      columns: [
        { content: "hello", value: "hello" },
        { content: "this", value: "this" },
        { content: "is", value: "is" },
        { content: "an", value: "an" },
        { content: "item", value: "item" },
      ],
    },
    {
      disabled: true,
      columns: [
        { content: "hello", value: "hello" },
        { content: "this", value: "this" },
        { content: "is", value: "is" },
        { content: "an", value: "an" },
        { content: "item", value: "item" },
      ],
    },
  ],
};

storiesOf("Components|UI/Table", module).add("Documentation", () => <Docs />);
