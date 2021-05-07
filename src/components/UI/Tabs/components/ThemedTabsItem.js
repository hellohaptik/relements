import styled from "styled-components";

import Box from "@src/components/UI/Box";

const tabsItemsStyle = props => ({
  flexDirection: "column",
  alignItems: "center",
  paddingRight: props.theme.space.md,
  paddingLeft: props.theme.space.md,
  paddingTop: props.theme.space.sm,
  paddingBottom: props.theme.space.sm,
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
