import styled from "styled-components";
import space from "@styled-system/space";
import color from "@styled-system/color";
import border from "@styled-system/border";
import typography from "@styled-system/typography";

// Non customizable CSS props
const style = {
  maxHeight: "inherit",
  maxWidth: 550,
  overflow: "hidden",
  overflowX: "auto",
  lineHeight: 1.4,
};

const ThemedContent = styled("div")(style, space, color, border, typography);

// Customizable CSS props
ThemedContent.defaultProps = {
  padding: 0,
};

export default ThemedContent;
