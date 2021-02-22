import styled from "styled-components";
import color from "@styled-system/color";
import layout from "@styled-system/layout";
import flexbox from "@styled-system/flexbox";
import position from "@styled-system/position";
import space from "@styled-system/space";
import border from "@styled-system/border";
import shadow from "@styled-system/shadow";

const Box = styled("div")(
  color,
  space,
  border,
  shadow,
  layout,
  position,
  flexbox,
);

Box.defaultProps = {
  backgroundColor: "background",
  borderStyle: "solid",
  borderWidth: "zero",
  padding: "sm",
};

export default Box;
