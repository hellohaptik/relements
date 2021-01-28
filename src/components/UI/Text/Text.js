import styled from "styled-components";
import { color, variant, typography } from "styled-system";

const sizeVariant = variant({
  prop: "size",
  scale: "textSizes",
  variants: {
    xSmall: {},
    small: {},
    regular: {},
    large: {},
  },
});

const colorVariant = variant({
  scale: "textColors",
  variants: {
    default: {},
    primary: {},
    success: {},
    danger: {},
    muted: {},
  },
});

const style = {
  transition: "all 0.3s ease-in",
};

const Text = styled("span")(
  style,
  color,
  typography,
  sizeVariant,
  colorVariant,
);

Text.defaultProps = {
  size: "regular",
  variant: "default",
  fontFamily: `"Proxima Nova", sans-serif`,
};

export default Text;
