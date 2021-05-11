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

const tableRowBackground = variant({
  prop: "rowBackground",
  scale: "tableRowBackground",
  variants: {
    default: {},
    alternate: {},
  },
});

const style = {
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const ThemedTableWrapper = styled("div")(
  style,
  color,
  border,
  tableBorder,
  tableRowBackground,
);

ThemedTableWrapper.defaultProps = {
  appearance: "withBorder",
  borderWidth: "xs",
  borderColor: "grey.haptik",
  borderStyle: "solid",
  backgroundColor: "grey.pastel",
  borderRadius: "3",
  rowBackground: "default",
};

export default ThemedTableWrapper;
