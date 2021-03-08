import React from "react";
import { storiesOf } from "@storybook/react";

import Introduction from "./Introduction.mdx";
import Installation from "./Installation.mdx";
import Usage from "./Usage.mdx";
import Theming from "./Theming.mdx";

import DesignSystem from "./DesignSystem/DesignSystem.mdx";
import Colors from "./DesignSystem/Colors.mdx";
import Typography from "./DesignSystem/Typography.mdx";

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

storiesOf("Documentation|Design System (NEW!)", module)
  .add("Introduction", () => <DesignSystem />)
  .add("Colors", () => <Colors />, {
    options: {
      showPanel: true,
      panelPosition: "right",
    },
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/yDUBndKU3aNUr2jFYeO1jT/Haptik-Design-System?node-id=403%3A0",
    },
  })
  .add("Typography", () => <Typography />, {
    options: {
      showPanel: true,
      panelPosition: "right",
    },
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/9Ar7pOkAjofRbfU7N60OsK/Design-System-2020-Typography-Set?node-id=500%3A0",
    },
  });
