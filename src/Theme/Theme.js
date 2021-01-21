import colors from "./colors";
import fontSizes from "./fontSizes";
import space from "./space";
import * as textTheme from "./text";
import * as buttonTheme from "./button";

const radii = [2, 4, 6];

const fontWeights = [400, 700];
const borderWidths = [0, 1, 2, 4];

export const Theme = {
  space,
  radii,
  fontSizes,
  fontWeights,
  borderWidths,
  colors,
  ...buttonTheme,
  ...textTheme,
};
