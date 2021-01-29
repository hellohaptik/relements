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
  transition: "all 0.3s ease-in",
};

const Text = styled("span")(style, color, typography, textVariant);

Text.defaultProps = {
  variant: "body",
  fontSize: "md",
  color: "text",
  fontFamily: `"Proxima Nova", sans-serif`,
};

export default Text;
