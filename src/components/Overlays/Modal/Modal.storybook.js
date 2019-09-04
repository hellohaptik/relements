import React from "react";
import { storiesOf } from "@storybook/react";

import Docs from "./Modal.mdx";
import ModalHeaderDocs from "./components/ModalHeader.mdx";

// eslint-disable-next-line
storiesOf("Components|Overlays/Modal", module)
  .add("Documentation", () => <Docs />)
  .add("Modal.Header", () => <ModalHeaderDocs />);
