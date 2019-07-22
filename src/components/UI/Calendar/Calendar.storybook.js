import React from "react";
import { storiesOf } from "@storybook/react";

import Docs from "./Calendar.mdx";

storiesOf("Components|UI/Calendar", module).add("Documentation", () => (
  <Docs />
));
