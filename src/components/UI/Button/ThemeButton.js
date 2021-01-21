import styled from "styled-components";
import { space, color, border, typography, variant } from "styled-system";

const ButtonColor = variant({
  scale: "buttonColors",
  variants: {},
});

const ButtonSize = variant({
  prop: "size",
  scale: "buttonSizes",
  variants: {
    small: {},
    regular: {},
    large: {},
  },
});

const ThemeButton = styled("button")(
  {
    appearance: "button",
    outline: 0,
  },
  space,
  color,
  border,
  typography,
  ButtonColor,
  ButtonSize,
);

ThemeButton.defaultProps = {
  borderRadius: 2,
  borderWidth: 0,
  margin: "xs",
  variant: "primary",
  size: "regular",
};

export default ThemeButton;
