import React from "react";
import { storiesOf } from "@storybook/react";

import Docs from "./Radio.mdx";
import RadioItemDocs from "./RadioItem.mdx";

storiesOf("Components|Inputs/Radio", module)
  .add("Documentation", () => <Docs />)
  .add("Radio.Item", () => <RadioItemDocs />);
