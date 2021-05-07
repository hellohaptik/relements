import styled from "styled-components";

import Box from "@src/components/UI/Box";

const tabsItemsStyle = props => ({
  flexDirection: "column",
  alignItems: "center",
  padding: `${props.theme.space.sm}px ${props.theme.space.md}px`,
  cursor: "pointer",
  transition: "0.2s ease-out",
  opacity: props.disabled ? 0.2 : props.active ? 1 : 0.75,
  pointerEvents: props.disabled ? "none" : "auto",
  "&:hover": {
    opacity: 1,
  },
});

const ThemedTabsItems = styled(Box)(tabsItemsStyle);

export default ThemedTabsItems;
