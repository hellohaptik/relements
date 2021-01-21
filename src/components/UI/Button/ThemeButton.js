import styled from "styled-components";
import { space, color, border, typography, variant } from "styled-system";

const ButtonColor = variant({
  scale: "buttonColors",
  variants: {},
});

const ButtonHover = variant({
  scale: "buttonHover",
  variants: {
    default: {},
    disabled: {},
  },
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
    transition: "all 0.3s ease",
  },
  space,
  color,
  border,
  typography,
  ButtonColor,
  ButtonSize,
  ButtonHover,
);

ThemeButton.defaultProps = {
  borderRadius: 2,
  borderWidth: 0,
  borderColor: "transparent",
  margin: "xs",
  variant: "primary",
  size: "regular",
  fontFamily: `"Proxima Nova", sans-serif`,
};

export default ThemeButton;
