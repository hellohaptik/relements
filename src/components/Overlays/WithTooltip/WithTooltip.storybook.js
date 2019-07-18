import React from "react";
import { storiesOf } from "@storybook/react";

import WithTooltip from "./WithTooltip";

storiesOf("Components|Overlays/WithTooltip", module).add("Default", () => {
  const story = (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        paddingTop: 200,
        paddingLeft: 200,
      }}
    >
      <WithTooltip tooltip="Yo ! This is some longer message. Like really really long">
        Test
      </WithTooltip>
    </div>
  );
  return story;
});
