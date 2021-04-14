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

const ThemedCheckboxWrapper = styled(Box)(CheckboxWrapperMode);

ThemedCheckboxWrapper.defaultProps = {
  mode: "stacked",
};

export default ThemedCheckboxWrapper;
