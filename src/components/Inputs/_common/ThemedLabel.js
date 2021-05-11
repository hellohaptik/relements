import styled from "styled-components";
import space from "@styled-system/space";
import color from "@styled-system/color";
import border from "@styled-system/border";
import variant from "@styled-system/variant";
import typography from "@styled-system/typography";

import Box from "@src/components/UI/Box";
import Text from "@src/components/UI/Text";

const labelMode = variant({
  prop: "mode",
  scale: "labelModes",
  variants: {
    focussed: {},
  },
});

// Non customizable CSS props
const labelWrapperStyle = {
  position: "relative",
  display: "flex",
  alignItems: "center",
};

const labelStyle = {
  position: "relative",
};

const ThemedLabelWrapper = styled(Box)(
  labelWrapperStyle,
  space,
  color,
  border,
  typography,
);

const ThemedLabel = styled(Text)(
  labelStyle,
  space,
  color,
  border,
  typography,
  labelMode,
);

// Customizable CSS props
ThemedLabelWrapper.defaultProps = {
  fontFamily: `"Proxima Nova", sans-serif`,
  mode: "default",
  variant: "default",
  padding: "zero",
};

ThemedLabel.defaultProps = {
  fontFamily: `"Proxima Nova", sans-serif`,
  variant: "h4.semi-bold",
  marginRight: "xs",
};

export { ThemedLabelWrapper, ThemedLabel };
