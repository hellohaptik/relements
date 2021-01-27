import styled from "styled-components";
import border from "@styled-system/border";
import color from "@styled-system/color";

const style = {
  display: "flex",
  alignItems: "center",
  borderBottomStyle: "solid",
};

const ThemedHeader = styled("div")(style, border, color);

ThemedHeader.defaultProps = {
  borderBottomColor: "grey.haptik",
  borderBottomWidth: "xs",
};

export default ThemedHeader;
