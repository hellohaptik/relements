import React from "react";

import { storiesOf } from "@storybook/react";
import Docs from "./ExpandableSearchBar.mdx";

import ExpandableSearchBar from "./ExpandableSearchBar";

storiesOf("Components|Inputs/ExpandableSearchBar", module).add(
  "Documentation",
  () => <Docs />,
);
