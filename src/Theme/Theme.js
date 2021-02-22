import space from "./space";
import radii from "./radii";
import borderWidths from "./borderWidths";
import fontSizes from "./fontSizes";
import fontWeights from "./fontWeights";
import { colors, modes } from "./colors";

import * as textTheme from "./text";
import * as buttonTheme from "./button";
import * as tableTheme from "./table";
import * as tooltipTheme from "./tooltip";

export const Theme = {
  space,
  radii,
  fontSizes,
  fontWeights,
  borderWidths,
  colors,
  modes,
  ...buttonTheme,
  ...tableTheme,
  ...textTheme,
  ...tooltipTheme,
};
