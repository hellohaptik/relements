import styled from "styled-components";
import Box from "@src/components/UI/Box";
import Icon from "components/UI/Icon";

// Non customizable CSS props
const headerStyle = props => ({
  justifyContent: "space-between",
  alignItems: "center",
  padding: props.theme.space.lg,
  borderBottom: `1px solid ${props.theme.colors.grey.haptik}`,
});

const iconStyle = props => ({
  transform: "rotate(180deg)",
  marginRight: props.theme.space.lg,
});

export const BackIcon = styled(Icon)(iconStyle);

export const ThemedDrawerHeader = styled(Box)(headerStyle);
