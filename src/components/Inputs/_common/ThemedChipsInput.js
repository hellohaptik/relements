import styled from "styled-components";
import space from "@styled-system/space";
import color from "@styled-system/color";
import border from "@styled-system/border";
import variant from "@styled-system/variant";
import typography from "@styled-system/typography";

const ChipWrapperMode = variant({
  prop: "mode",
  scale: "chipWrapperModes",
  variants: {
    chipAdded: {},
  },
});

const ChipWrapperVariant = variant({
  prop: "variant",
  scale: "chipWrapperVariants",
  variants: {
    chipAdded: {},
  },
});

// Non customizable CSS props
const inputWrapperStyle = props => ({
  borderRadius: props.theme.radii.sm,
  border: `${props.theme.borderWidths.xs}px solid ${props.theme.colors.grey.haptik}`,
  backgroundColor: props.theme.colors.grey.pastel,
  boxSizing: "border-box",
  width: "100%",
  transition: "border 0.3s ease, color 0.3s ease",
  outline: "none",
  "&:focus": {
    border: `${props.theme.borderWidths.xs}px solid ${props.theme.colors.blue.haptik}`,
  },
  "&:hover": {
    border: `${props.theme.borderWidths.xs}px solid ${props.theme.colors.blue.haptik}`,
  },
  position: "relative",
});

const chipStyle = props => ({
  position: "relative",
  fontSize: props.theme.fontSizes[1],
  border: `${props.theme.borderWidths.xs}px solid ${props.theme.colors.grey.haptik}`,
  backgroundColor: props.theme.colors.grey.neon,
  borderRadius: props.theme.radii.lg,
  padding: "2px 6px",
  marginRight: 6,
  marginBottom: 6,
  display: "flex",
  alignItems: "center",
});

const ThemedChipsInputWrapper = styled("div")(
  inputWrapperStyle,
  space,
  color,
  border,
  typography,
  ChipWrapperMode,
  ChipWrapperVariant,
);

const chipsContainerStyle = props => {
  return {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    cursor: "text",
    width: "100%",
    "&:not(:first-child)": {
      paddingLeft: 3 * props.theme.space.lg - props.theme.space.md, // 38px
    },
  };
};

const ThemedChipsContainer = styled("div")(
  chipsContainerStyle,
  space,
  color,
  border,
  typography,
);

const ThemedChip = styled("div")(chipStyle, space, color, border, typography);

// Customizable CSS props
ThemedChipsInputWrapper.defaultProps = {
  fontFamily: `"Proxima Nova", sans-serif`,
  mode: "default",
  variant: "default",
};

ThemedChipsContainer.defaultProps = {
  fontFamily: `"Proxima Nova", sans-serif`,
  mode: "default",
  variant: "default",
};

export { ThemedChipsInputWrapper, ThemedChipsContainer, ThemedChip };
