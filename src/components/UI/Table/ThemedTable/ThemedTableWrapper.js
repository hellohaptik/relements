import styled from "styled-components";
import variant from "@styled-system/variant";
import border from "@styled-system/border";
import color from "@styled-system/color";

const tableBorder = variant({
  prop: "appearance",
  scale: "tableBorder",
  variants: {
    noBorder: {},
  },
});

const style = {
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const ThemedTableWrapper = styled("div")(style, color, border, tableBorder);

ThemedTableWrapper.defaultProps = {
  appearance: "withBorder",
  borderWidth: "xs",
  borderColor: "grey.haptik",
  borderStyle: "solid",
  backgroundColor: "white",
  borderRadius: "3",
};

export default ThemedTableWrapper;
