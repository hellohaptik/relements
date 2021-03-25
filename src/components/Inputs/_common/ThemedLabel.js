import styled from "styled-components";
import space from "@styled-system/space";
import color from "@styled-system/color";
import border from "@styled-system/border";
import variant from "@styled-system/variant";
import typography from "@styled-system/typography";

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
  marginRight: 5,
  fontWeight: "bold",
};

const ThemedLabelWrapper = styled("div")(
  labelWrapperStyle,
  space,
  color,
  border,
  typography,
);

const ThemedLabel = styled("div")(
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
};

ThemedLabel.defaultProps = {
  fontFamily: `"Proxima Nova", sans-serif`,
};

export { ThemedLabelWrapper, ThemedLabel };
