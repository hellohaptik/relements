import React from "react";
import { storiesOf } from "@storybook/react";

import Radio from "./Radio";

storiesOf("Components|Inputs/Radio", module)
  .add("Multiple", () => {
    const story = (
      <Radio
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
      <Radio.Item label="Node Type" value={true} onChange={console.log} />
    );
    return story;
  });
