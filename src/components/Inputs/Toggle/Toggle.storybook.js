import React from "react";
import { storiesOf } from "@storybook/react";

import Toggle from "./Toggle";

const VALUE = "";

storiesOf("Components|Inputs/Toggle", module).add("Single", () => {
  const story = (
    <div>
      <Toggle label="Toggle Input" value={VALUE} onChange={console.log} />
    </div>
  );
  return story;
});
