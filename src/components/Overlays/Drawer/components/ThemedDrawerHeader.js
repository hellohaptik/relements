import styled from "styled-components";
import Box from "@src/components/UI/Box";

// Non customizable CSS props
const headerStyle = props => ({
  justifyContent: "space-between",
  alignItems: "center",
  padding: props.theme.space.lg,
  borderBottom: `1px solid ${props.theme.colors.grey.haptik}`,
});

const ThemedDrawerHeader = styled(Box)(headerStyle);

export default ThemedDrawerHeader;
