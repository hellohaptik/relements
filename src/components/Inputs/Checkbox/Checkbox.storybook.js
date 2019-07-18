import React from "react";
import { storiesOf } from "@storybook/react";

import Checkbox from "./Checkbox";

storiesOf("Components|Inputs/Checkbox", module)
  .add("Multiple", () => {
    const story = (
      <Checkbox
        label="Node Type"
        value={[{ title: "test2" }]}
        options={[{ title: "test" }, { title: "test2" }]}
        onChange={console.log}
      />
    );
    return story;
  })
  .add("Single Item", () => {
    const story = (
      <Checkbox.Item label="Node Type" value={true} onChange={console.log} />
    );
    return story;
  });
