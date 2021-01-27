import colors from "./colors";
import fontSizes from "./fontSizes";
import space from "./space";
import borderWidths from "./borderWidths";
import fontWeights from "./fontWeights";

import * as textTheme from "./text";
import * as buttonTheme from "./button";
import * as tableTheme from "./table";

const radii = [2, 4, 6, 8];

export const Theme = {
  space,
  radii,
  fontSizes,
  fontWeights,
  borderWidths,
  colors,
  ...buttonTheme,
  ...tableTheme,
  ...textTheme,
};
