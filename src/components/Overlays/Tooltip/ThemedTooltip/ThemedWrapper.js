import styled from "styled-components";
import space from "@styled-system/space";
import color from "@styled-system/color";
import border from "@styled-system/border";
import variant from "@styled-system/variant";
import typography from "@styled-system/typography";

const TooltipColor = variant({
  scale: "tooltipColors",
  variants: {},
});

const TooltipSize = variant({
  prop: "size",
  scale: "tooltipSizes",
  variants: {
    small: {},
    regular: {},
    large: {},
  },
});

const TooltipMode = variant({
  prop: "mode",
  scale: "tooltipModes",
  variants: {},
});

// Non customizable CSS props
const style = {
  position: "absolute",
  pointerEvents: "auto",
  zIndex: 2,
  borderRadius: 8,
  outline: "none",
  filter: "drop-shadow(rgba(0, 0, 0, 0.2) 3px 0px 12px)",
  transition: "opacity 0.2s ease, transform 0.2s ease",
};

const ThemedWrapper = styled("div")(
  style,
  space,
  color,
  border,
  typography,
  TooltipColor,
  TooltipSize,
  TooltipMode,
);

// Customizable CSS props
ThemedWrapper.defaultProps = {
  mode: "inactive",
  borderRadius: 8,
  variant: "primary",
  size: "regular",
  fontFamily: `"Proxima Nova", sans-serif`,
};

export default ThemedWrapper;
