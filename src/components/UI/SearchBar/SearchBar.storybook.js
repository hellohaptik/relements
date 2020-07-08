import React from "react";

import { storiesOf } from "@storybook/react";
import Docs from "./SearchBar.mdx";

import SearchBar from "./SearchBar";

storiesOf("Components|UI/SearchBar", module).add("Documentation", () => (
  <Docs />
));
