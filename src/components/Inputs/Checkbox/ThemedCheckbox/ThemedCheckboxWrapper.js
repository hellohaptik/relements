import styled from "styled-components";
import variant from "@styled-system/variant";
import Box from "@src/components/UI/Box";

const CheckboxWrapperMode = variant({
  prop: "mode",
  scale: "checkboxWrapperModes",
  variants: {
    stacked: {},
  },
});

const checkboxWrapperVariant = variant({
  prop: "variant",
  scale: "checkboxWrapperVariants",
  variants: {
    stacked: {},
  },
});

const ThemedCheckboxWrapper = styled(Box)(
  CheckboxWrapperMode,
  checkboxWrapperVariant,
);

ThemedCheckboxWrapper.defaultProps = {
  mode: "stacked",
  padding: "zero",
};

export default ThemedCheckboxWrapper;
