import styled from "styled-components";

import Box from "@src/components/UI/Box";

const tabsStyle = props => ({
  position: "relative",
  padding: props.theme.space.zero,
});

const tabsItemsStyle = props => ({
  alignItems: "center",
  padding: props.theme.space.zero,
});

const tabsIndicatorStyle = props => ({
  position: "absolute",
  left: 0,
  bottom: 0,
  height: "2px",
  width: "1px",
  transformOrigin: "0 0",
  transition: "transform 0.5s cubic-bezier(0.175, 0.5, 0.12, 1)",
  backgroundColor: props.theme.colors.blue.haptik,
  transform: `translateX(${props.left}px) scale(${props.width}, 1)`,
  padding: props.theme.space.zero,
});

const ThemedTabs = styled(Box)(tabsStyle);

const ThemedTabsItems = styled(Box)(tabsItemsStyle);

const ThemedTabsIndicator = styled(Box)(tabsIndicatorStyle);

export { ThemedTabs, ThemedTabsItems, ThemedTabsIndicator };
