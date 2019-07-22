import React from "react";
import { storiesOf } from "@storybook/react";

import Docs from "./ContextMenu.mdx";

// eslint-disable-next-line
storiesOf("Components|Overlays/ContextMenu", module).add(
  "Documentation",
  () => <Docs />,
);
