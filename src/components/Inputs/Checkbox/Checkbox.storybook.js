import React from "react";
import { storiesOf } from "@storybook/react";

import Docs from "./Checkbox.mdx";
import CheckboxItemDocs from "./CheckboxItem.mdx";

storiesOf("Components|Inputs/Checkbox", module)
  .add("Documentation", () => <Docs />)
  .add("Checkbox.Item", () => <CheckboxItemDocs />);
