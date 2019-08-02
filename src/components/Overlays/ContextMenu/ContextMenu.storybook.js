import React from "react";
import { storiesOf } from "@storybook/react";

import Docs from "./docs/ContextMenu.mdx";
import ContextMenuButtonDocs from "./docs/ContextMenu.Button.mdx";
import ContextMenuIconDocs from "./docs/ContextMenu.Icon.mdx";
import ContextMenuItemDocs from "./docs/ContextMenu.Item.mdx";

// eslint-disable-next-line
storiesOf("Components|Overlays/ContextMenu", module)
  .add("Documentation", () => <Docs />)
  .add("ContextMenu.Icon", () => <ContextMenuIconDocs />)
  .add("ContextMenu.Button", () => <ContextMenuButtonDocs />)
  .add("ContextMenu.Item", () => <ContextMenuItemDocs />);
