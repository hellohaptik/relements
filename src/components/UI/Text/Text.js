import styled from "styled-components";
import { color, variant, typography } from "styled-system";

const textVariant = variant({
  scale: "textVariant",
  variants: {
    heading: {},
    body: {},
    secondary: {},
    tertiary: {},
  },
});

const style = {
  transition: "color 0.3s ease-in, font-size 0.3s ease-in",
};

const Text = styled("span")(style, color, typography, textVariant);

Text.defaultProps = {
  variant: "body",
  color: "text",
  fontFamily: `"Proxima Nova", sans-serif`,
};

export default Text;
