import styled from "styled-components";
import color from "@styled-system/color";
import space from "@styled-system/space";
import border from "@styled-system/border";
import shadow from "@styled-system/shadow";

const Box = styled("div")(color, space, border, shadow);

Box.defaultProps = {
  backgroundColor: "background",
  padding: "sm",
};

export default Box;
