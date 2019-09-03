import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import Chips from "./Chips";
import Docs from "./Chips.mdx";


storiesOf("Components|Inputs/Chips", module).add("Single", () => {
  return <ChipsTest />;
})
.add("Documentation", () => {
    return <Docs />;
});

function ChipsTest() {
  const focus = () => {console.log('chaklo');}
  const [value, set] = useState([]);
  return (
    <div>
      <Chips label="Sample Input" value={value} onChange={set} onFocus={focus}/>
    </div>
  );
}
