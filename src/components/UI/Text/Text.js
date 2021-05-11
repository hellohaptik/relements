import styled from "styled-components";
import color from "@styled-system/color";
import variant from "@styled-system/variant";
import typography from "@styled-system/typography";

const textVariant = variant({
  scale: "textVariant",
  variants: {
    body: { lg: {} },
  },
});

const style = {
  transition: "color 0.3s ease-in, font-size 0.3s ease-in",
};

const Text = styled("span")(style, color, typography, textVariant);

Text.defaultProps = {
  variant: "body.lg",
  color: "text",
  fontFamily: `"Proxima Nova", sans-serif`,
};

export default Text;
