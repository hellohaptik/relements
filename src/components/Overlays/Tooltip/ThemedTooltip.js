import styled from "styled-components";
import space from "@styled-system/space";
import color from "@styled-system/color";
import border from "@styled-system/border";
import variant from "@styled-system/variant";
import typography from "@styled-system/typography";

const TooltipColor = variant({
  scale: "tooltipColors",
  variants: {
    primary: {},
    success: {},
    danger: {},
  },
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
  variants: {
    active: {},
    inactive: {},
  },
});

const ArrowColorVariant = variant({
  prop: "variant",
  scale: "tooltipArrowColors",
  variants: {
    primary: {},
    success: {},
    danger: {},
  },
});

const ArrowPositionVariant = variant({
  prop: "position",
  scale: "tooltipArrowPositions",
  variants: {
    top: {},
    right: {},
    bottom: {},
    left: {},
  },
});

// Non customizable CSS props
const wrapperStyle = {
  position: "absolute",
  pointerEvents: "auto",
  zIndex: 1099999999999,
  borderRadius: 8,
  outline: "none",
  filter: "drop-shadow(rgba(0, 0, 0, 0.2) 3px 0px 12px)",
  transition: "opacity 0.2s ease, transform 0.2s ease",
};

const contentStyle = {
  maxHeight: "inherit",
  maxWidth: 550,
  overflow: "hidden",
  overflowX: "auto",
  lineHeight: 1.4,
};

const arrowStyle = {
  position: "absolute",
  marginLeft: "-5px",
  border: "6px solid",
};

const ThemedWrapper = styled("div")(
  wrapperStyle,
  space,
  color,
  border,
  typography,
  TooltipColor,
  TooltipSize,
  TooltipMode,
);

const ThemedContent = styled("div")(
  contentStyle,
  space,
  color,
  border,
  typography,
);

const ThemedArrow = styled("div")(
  arrowStyle,
  space,
  color,
  border,
  ArrowColorVariant,
  ArrowPositionVariant,
);

// Customizable CSS props
ThemedWrapper.defaultProps = {
  mode: "inactive",
  borderRadius: 8,
  variant: "primary",
  size: "regular",
  fontFamily: `"Proxima Nova", sans-serif`,
};

ThemedContent.defaultProps = {
  padding: "zero",
};

ThemedArrow.defaultProps = {
  position: "top",
  variant: "primary.bottom",
};

export { ThemedWrapper, ThemedContent, ThemedArrow };
