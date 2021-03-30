import styled from "styled-components";
import space from "@styled-system/space";
import color from "@styled-system/color";
import border from "@styled-system/border";
import variant from "@styled-system/variant";
import typography from "@styled-system/typography";

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

// Non customizable CSS props
const style = props => ({
  appearance: "button",
  outline: 0,
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    cursor: "pointer",
    boxShadow: props.theme.shadows.md,
  },
  "&:active": {
    boxShadow: props.theme.shadows.sm,
  },
});

const ThemedButton = styled("button")(
  style,
  space,
  color,
  border,
  typography,
  ButtonColor,
  ButtonSize,
);

// Customizable CSS props
ThemedButton.defaultProps = {
  borderRadius: "sm",
  borderWidth: 0,
  borderStyle: "solid",
  margin: "xs",
  paddingY: "sm",
  paddingX: "md",
  variant: "primary",
  size: "medium",
  fontWeight: "semiBold",
  fontFamily: `"Proxima Nova", sans-serif`,
};

export default ThemedButton;
