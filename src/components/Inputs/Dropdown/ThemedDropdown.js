import styled from "styled-components";
import space from "@styled-system/space";
import color from "@styled-system/color";
import border from "@styled-system/border";
import variant from "@styled-system/variant";
import typography from "@styled-system/typography";

import { inputStyle } from "@src/components/Inputs/_common/ThemedTextInput";
import Box from "@src/components/UI/Box";

const DropdownOptionsMode = variant({
  prop: "mode",
  scale: "dropdownOptionsModes",
  variants: {
    active: {},
    inactive: {},
  },
});

const DropdownOptionsVariant = variant({
  prop: "variant",
  scale: "dropdownOptionsVariant",
  variants: {
    withCheckbox: {},
  },
});

// If Dropdown opens at top when its towards bottom of the screen
const DropdownOptionsPositionVariant = variant({
  prop: "positionVariant",
  scale: "dropdownOptionsPositionVariant",
  variants: {
    top: {},
    default: {},
  },
});

const DropdownOptionMode = variant({
  prop: "mode",
  scale: "dropdownOptionModes",
  variants: {
    disabled: {},
  },
});

const DropdownOptionSize = variant({
  prop: "size",
  scale: "dropdownOptionSize",
  variants: {
    small: {},
  },
});

const DropdownOptionVariant = variant({
  prop: "variant",
  scale: "dropdownOptionVariant",
  variants: {
    default: {},
    selected: {},
  },
});

const DropdownWithCheckboxVariant = variant({
  prop: "variant",
  scale: "dropdownWithCheckboxInputVariants",
  variants: {
    disabled: {},
  },
});

const DropdownArrowMode = variant({
  prop: "mode",
  scale: "dropdownArrowModes",
  variants: {
    active: {},
  },
});

const DropdownIconMode = variant({
  prop: "mode",
  scale: "dropdownIconModes",
  variants: {
    withCheckbox: {},
  },
});

const DropdownCheckboxOptionsMode = variant({
  prop: "mode",
  scale: "dropdownCheckboxOptionsModes",
  variants: {
    withoutSearch: {},
  },
});

const DropdownCheckboxSearchWrapperMode = variant({
  prop: "mode",
  scale: "dropdownCheckboxSearchWrapperModes",
  variants: {
    withoutSearch: {},
  },
});

// Non customizable CSS props
const wrapperStyle = {
  position: "relative",
  outline: "none",
  boxSizing: "border-box",
};

const optionsOverlayStyle = {
  position: "absolute",
  zIndex: 1000000000,
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

const optionsStyle = props => ({
  position: "absolute",
  zIndex: 1000000001,
  maxHeight: "200px",
  overflowY: "auto",
  backgroundColor: "#fff",
  border: `1px solid ${props.theme.colors.blue.haptik}}`,
  boxSizing: "border-box",
  marginTop: "-1px",
  transition: "transform 0.3s ease, opacity 0.3s ease",
  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
});

const optionStyle = props => ({
  padding: "5px 12px",
  height: 30,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  transition: "background 0.3s ease",
  "&:hover": {
    background: `${props.theme.colors.blue.pastel}50`,
  },
});

const withCheckboxInputStyle = props => {
  const inputStyles = { ...inputStyle(props) };
  inputStyles.padding = "7px 38px 7px 8px";

  return {
    marginTop: 8,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    ...inputStyles,
  };
};

const DropdownIconStyle = {
  position: "absolute",
  top: 0,
  height: "100%",
  display: "flex",
  alignItems: "center",
  transition: "transform 0.3s ease",
};

const dropdownArrowStyle = props => ({
  ...DropdownIconStyle,
  right: props.theme.space.lg - props.theme.space.xs, // 10px
});

const dropdownIconStyle = props => ({
  ...DropdownIconStyle,
  left: props.theme.space.lg - props.theme.space.xs, // 10px
});

const checkboxWrapperStyle = {
  maxHeight: 198,
  overflow: "hidden",
};

const checkboxSearchWrapperStyle = props => ({
  position: "relative",
  padding: `${props.theme.space.lg - props.theme.space.xs}px ${
    props.theme.space.md
  }px ${props.theme.space.lg - props.theme.space.xs}px`, // "10px 12px 10px",
});

const checkboxOptionsWrapperStyle = props => ({
  position: "relative",
  maxHeight: "calc(100vh - 60px)", // Height of the Search Wrapper
  overflowY: "auto",
  padding: `${props.theme.space.sm}px ${props.theme.space.zero}px`,
});

const dropdownCheckboxSearchStyle = {
  position: "absolute",
  top: 15,
  left: 15,
  zIndex: 1,
  width: 25,
  height: 25,
  ">div": {
    width: "100%",
    height: "100%",
  },
};

const dropdownCreateTextStyle = props => ({
  color: props.theme.colors.green.haptik,
  paddingRight: props.theme.space.xs,
});

const checkboxItemWrapperStyle = props => ({
  transition: "background 0.3s ease",
  cursor: "pointer",
  ">div:first-child": {
    background: "transparent",
    width: "100%",
    margin: props.theme.space.zero,
  },
  "&:hover": {
    background: `${props.theme.colors.blue.pastel}50`,
  },
});

const DropdownWrapper = styled(Box)(
  wrapperStyle,
  space,
  color,
  border,
  typography,
);

const DropdownOptionsWrapper = styled(Box)(space, color, border, typography);

const DropdownOptionsOverlay = styled("div")(
  optionsOverlayStyle,
  space,
  color,
  border,
  typography,
);

const DropdownOptions = styled("div")(
  optionsStyle,
  space,
  color,
  border,
  typography,
  DropdownOptionsMode,
  DropdownOptionsVariant,
  DropdownOptionsPositionVariant,
);

const DropdownOption = styled("div")(
  optionStyle,
  space,
  color,
  border,
  typography,
  DropdownOptionMode,
  DropdownOptionVariant,
  DropdownOptionSize,
);

const DropdownWithCheckboxInput = styled("div")(
  withCheckboxInputStyle,
  space,
  color,
  border,
  typography,
  DropdownWithCheckboxVariant,
);

const DropdownArrow = styled("div")(
  dropdownArrowStyle,
  space,
  color,
  border,
  typography,
  DropdownArrowMode,
);

const DropdownIcon = styled(Box)(
  dropdownIconStyle,
  space,
  color,
  border,
  typography,
  DropdownIconMode,
);

const DropdownCheckboxWrapper = styled(Box)(
  checkboxWrapperStyle,
  space,
  color,
  border,
  typography,
  DropdownWithCheckboxVariant,
);

const DropdownCheckboxSearchWrapper = styled(Box)(
  checkboxSearchWrapperStyle,
  space,
  color,
  border,
  typography,
  DropdownCheckboxSearchWrapperMode,
);

const DropdownCheckboxOptionsWrapper = styled(Box)(
  checkboxOptionsWrapperStyle,
  space,
  color,
  border,
  typography,
  DropdownCheckboxOptionsMode,
);

const DropdownCheckboxItemWrapper = styled(Box)(
  checkboxItemWrapperStyle,
  space,
  color,
  border,
  typography,
);

const DropdownCheckboxSearchIcon = styled("div")(
  dropdownCheckboxSearchStyle,
  space,
  color,
  border,
  typography,
);

const DropdownCreateText = styled("span")(
  dropdownCreateTextStyle,
  space,
  color,
  border,
  typography,
);

// Customizable CSS props
DropdownWrapper.defaultProps = {
  fontFamily: `"Proxima Nova", sans-serif`,
  padding: "zero",
  flexDirection: "column",
  width: "100%",
};

DropdownIcon.defaultProps = {
  padding: "zero",
};

DropdownOptionsWrapper.defaultProps = {
  fontFamily: `"Proxima Nova", sans-serif`,
  padding: "zero",
  display: "initial",
};

DropdownCheckboxWrapper.defaultProps = {
  padding: "zero",
  display: "flex",
  flexDirection: "column",
};

DropdownCheckboxSearchWrapper.defaultProps = {
  display: "initial",
};

DropdownCheckboxOptionsWrapper.defaultProps = {
  padding: "zero",
  paddingBottom: "sm",
  display: "initial",
};

DropdownCheckboxItemWrapper.defaultProps = {
  paddingTop: "xs",
  paddingBottom: "xs",
  paddingLeft: "sm",
  paddingRight: "sm",
};

DropdownOptions.defaultProps = {
  mode: "inactive",
};

export {
  DropdownWrapper,
  DropdownOptionsWrapper,
  DropdownOptionsOverlay,
  DropdownOptions,
  DropdownOption,
  DropdownWithCheckboxInput,
  DropdownArrow,
  DropdownIcon,
  DropdownCheckboxWrapper,
  DropdownCheckboxItemWrapper,
  DropdownCheckboxSearchWrapper,
  DropdownCheckboxOptionsWrapper,
  DropdownCheckboxSearchIcon,
  DropdownCreateText,
};
