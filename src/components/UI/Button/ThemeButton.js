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
const style = {
  appearance: "button",
  outline: 0,
  transition: "opacity 0.3s ease, transform 0.3s ease",
  "&:hover": {
    cursor: "pointer",
    transform: "translateY(-1px)",
    boxShadow: "0px 2px 4px 1px rgba(0,0,0,0.15)",
    opacity: 0.8,
  },
};

const ThemeButton = styled("button")(
  style,
  space,
  color,
  border,
  typography,
  ButtonColor,
  ButtonSize,
);

// Customizable CSS props
ThemeButton.defaultProps = {
  borderRadius: "sm",
  borderWidth: 0,
  margin: "xs",
  variant: "primary",
  size: "regular",
};

export default ThemeButton;
