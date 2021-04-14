import space from "./space";
import shadows from "./shadows";
import radii from "./radii";
import borderWidths from "./borderWidths";
import fontSizes from "./fontSizes";
import fontWeights from "./fontWeights";
import { colors, modes } from "./colors";

import * as textTheme from "./text";
import * as labelTheme from "./label";
import * as tableTheme from "./table";
import * as buttonTheme from "./button";
import * as tooltipTheme from "./tooltip";
import * as checkboxTheme from "./checkbox";
import * as dropdownTheme from "./dropdown";
import * as textInputTheme from "./textInput";
import * as chipsInputTheme from "./chipsInput";

export const Theme = {
  space,
  radii,
  fontSizes,
  fontWeights,
  borderWidths,
  colors,
  shadows,
  modes,
  ...buttonTheme,
  ...tableTheme,
  ...textTheme,
  ...tooltipTheme,
  ...checkboxTheme,
  ...dropdownTheme,
  ...textInputTheme,
  ...chipsInputTheme,
  ...labelTheme,
};
