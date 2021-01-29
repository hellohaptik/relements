import fontSizes from "./fontSizes";
import space from "./space";
import borderWidths from "./borderWidths";
import fontWeights from "./fontWeights";
import { colors, modes } from "./colors";

import * as textTheme from "./text";
import * as buttonTheme from "./button";
import * as tableTheme from "./table";
import * as tooltipTheme from "./tooltip";

const radii = [2, 4, 6, 8];

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
