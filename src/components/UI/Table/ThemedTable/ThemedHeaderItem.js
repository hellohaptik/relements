import styled from "styled-components";
import variant from "@styled-system/variant";
import color from "@styled-system/color";
import border from "@styled-system/border";
import space from "@styled-system/space";

const tableBorder = variant({
  prop: "appearance",
  scale: "tableBorder",
  variants: {
    noBorder: {},
  },
});

const tableSpace = variant({
  prop: "space",
  scale: "tableSpace",
  variants: {
    default: {},
    compact: {},
  },
});

const style = {
  display: "flex",
  flex: 1,
  alignItems: "center",
  borderRightStyle: "solid",
  cursor: "pointer",
  "&:last-child": {
    borderRight: "none",
  },
};

const ThemedHeaderItem = styled("div")(
  style,
  color,
  border,
  space,
  tableBorder,
  tableSpace,
);

ThemedHeaderItem.defaultProps = {
  appearance: "withBorder",
  borderRightWidth: "xs",
  borderRightColor: "grey.haptik",
  space: "default",
};

export default ThemedHeaderItem;
