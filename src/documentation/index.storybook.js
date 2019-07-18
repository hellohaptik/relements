import React from "react";
import { storiesOf } from "@storybook/react";

import Introduction from "./Introduction.mdx";
import Installation from "./Installation.mdx";
import Usage from "./Usage.mdx";
import Theming from "./Theming.mdx";

storiesOf("Documentation|Getting Started", module)
  .add("Introduction", () => <Introduction />)
  .add("Installation", () => <Installation />)
  .add("Usage", () => <Usage />);

storiesOf("Documentation|Theming", module)
  .add("Basic", () => <Theming />)
  .add("Advanced", () => <Theming />);

storiesOf("Documentation|Contributing", module)
  .add("Introduction", () => <Theming />)
  .add("Reporting Issues", () => <Theming />)
  .add("Writing Tests", () => <Theming />);
