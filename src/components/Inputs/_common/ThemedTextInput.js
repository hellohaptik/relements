import styled from "styled-components";
import space from "@styled-system/space";
import color from "@styled-system/color";
import border from "@styled-system/border";
import variant from "@styled-system/variant";
import typography from "@styled-system/typography";

import Box from "@src/components/UI/Box";

const InputMode = variant({
  prop: "mode",
  scale: "textInputModes",
  variants: {
    disabled: {},
  },
});

const WrapperMode = variant({
  prop: "mode",
  scale: "textWrapperModes",
  variants: {
    label: {},
  },
});

const InputVariant = variant({
  prop: "variant",
  scale: "textInputVariants",
  variants: {
    dropdown: {},
  },
});

// Non customizable CSS props
const inputStyle = props => {
  const { theme } = props;
  const { radii, borderWidths, colors, space } = theme;
  const paddingTopBottom = space.lg - space.xs; // 10px
  const paddingLeftRight = space.sm; // 8px

  return {
    borderRadius: radii.sm,
    border: `${borderWidths.xs}px solid ${colors.grey.haptik}`,
    backgroundColor: colors.grey.pastel,
    boxSizing: "border-box",
    width: "100%",
    padding: `${paddingTopBottom}px ${paddingLeftRight}px`,
    transition: "border 0.3s ease, color 0.3s ease",
    outline: "none",
    "&:focus": {
      border: `${borderWidths.xs}px solid ${colors.blue.dark}`,
    },
    "&:hover": {
      border: `${borderWidths.xs}px solid ${colors.blue.dark}`,
    },
    resize: "none",
    overflowY: "hidden",
  };
};

const inputWrapperStyle = {
  position: "relative",
};

const ThemedTextInputWrapper = styled(Box)(
  inputWrapperStyle,
  space,
  color,
  border,
  typography,
  WrapperMode,
);

const ThemedTextInput = styled("input")(
  inputStyle,
  space,
  color,
  border,
  typography,
  InputMode,
  InputVariant,
);

const ThemedTextarea = styled("textarea")(
  inputStyle,
  space,
  color,
  border,
  typography,
  InputMode,
  WrapperMode,
);

// Customizable CSS props
ThemedTextInputWrapper.defaultProps = {
  fontFamily: `"Proxima Nova", sans-serif`,
  mode: "default",
  variant: "default",
  padding: "zero",
};

ThemedTextInput.defaultProps = {
  fontFamily: `"Proxima Nova", sans-serif`,
  mode: "default",
  variant: "default",
};

ThemedTextarea.defaultProps = {
  fontFamily: `"Proxima Nova", sans-serif`,
  mode: "default",
};

export { ThemedTextInputWrapper, ThemedTextInput, ThemedTextarea, inputStyle };
