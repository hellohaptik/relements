import styled from "styled-components";
import Box from "@src/components/UI/Box";

// Non customizable CSS props
const bodyStyle = () => ({
  flexDirection: "column",
});

const ThemedDrawerBody = styled(Box)(bodyStyle);

export default ThemedDrawerBody;
