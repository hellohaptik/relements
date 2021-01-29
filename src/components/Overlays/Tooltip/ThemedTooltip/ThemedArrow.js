import styled from "styled-components";
import space from "@styled-system/space";
import color from "@styled-system/color";
import border from "@styled-system/border";
import variant from "@styled-system/variant";

const ThemeTooltipArrowColor = variant({
  prop: "variant",
  scale: "tooltipArrowColors",
  variants: {},
});

const ThemeTooltipArrowPositon = variant({
  prop: "position",
  scale: "tooltipArrowPositions",
  variants: {},
});

// Non customizable CSS props
const style = {
  position: "absolute",
  left: "50%",
  marginLeft: "-5px",
  border: "6px solid",
};

const ThemedArrow = styled("div")(
  style,
  space,
  color,
  border,
  ThemeTooltipArrowColor,
  ThemeTooltipArrowPositon,
);

// Customizable CSS props
ThemedArrow.defaultProps = {
  position: "top",
  variant: "primary.bottom",
};

export default ThemedArrow;
