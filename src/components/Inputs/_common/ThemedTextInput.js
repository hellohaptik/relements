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

const InputSize = variant({
  prop: "size",
  scale: "textInputSize",
  variants: {
    small: {},
  },
});

// Non customizable CSS props
const inputStyle = props => {
  const { theme, multiline } = props;
  const { radii, borderWidths, colors, space } = theme;
  const paddingTopBottom = space.lg - space.xs; // 10px
  const paddingLeftRight = space.sm; // 8px

  // adds left padding when there's an icon, applies only if it's an input element
  const textInputStyle = !multiline
    ? {
        "&:not(:first-child)": {
          paddingLeft: 3 * space.lg - space.xs, // 38px
        },
      }
    : {};

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
      border: `${borderWidths.xs}px solid ${colors.blue.haptik}`,
    },
    "&:hover": {
      border: `${borderWidths.xs}px solid ${colors.blue.haptik}`,
    },
    resize: "none",
    overflowY: "hidden",
    color: colors.black.haptik,
    "&::-webkit-input-placeholder": {
      color: colors.grey.dark,
    },
    ...textInputStyle,
  };
};

const inputWrapperStyle = {
  position: "relative",
  outline: "none",
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
  InputSize,
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
  fontSize: "2",
};

ThemedTextarea.defaultProps = {
  fontFamily: `"Proxima Nova", sans-serif`,
  mode: "default",
  fontSize: "2",
};

export { ThemedTextInputWrapper, ThemedTextInput, ThemedTextarea, inputStyle };
