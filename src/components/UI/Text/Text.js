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
const Text = styled("span")(color, typography, sizeVariant, colorVariant);

Text.defaultProps = {
  size: "regular",
  variant: "default",
};

export default Text;
