import styled from "styled-components";
import variant from "@styled-system/variant";
import border from "@styled-system/border";
import color from "@styled-system/color";
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
  alignItems: "center",
  flex: 1,
  borderRightStyle: "solid",
  borderBottomStyle: "solid",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "&:last-child": {
    borderRight: "none",
  },
};

const ThemedRowItem = styled("div")(
  style,
  border,
  color,
  space,
  tableBorder,
  tableSpace,
);

ThemedRowItem.defaultProps = {
  borderRightWidth: "xs",
  borderRightColor: "grey.haptik",
  borderBottomWidth: "xs",
  borderBottomColor: "grey.haptik",
  px: "sm",
  py: "xs",
  space: "default",
};

export default ThemedRowItem;
