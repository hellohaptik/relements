import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import Chips from "./Chips";

storiesOf("Components|Inputs/Chips", module).add("Single", () => {
  return <ChipsTest />;
});

function ChipsTest() {
  const [value, set] = useState([]);
  return (
    <div>
      <Chips label="Sample Input" value={value} onChange={set} />
    </div>
  );
}
