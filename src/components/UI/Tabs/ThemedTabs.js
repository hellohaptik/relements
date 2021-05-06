import styled from "styled-components";

const tabsStyle = {
  position: "relative",
};

const tabsItemsStyle = {
  display: "flex",
  alignItems: "center",
};

const tabsIndicatorStyle = props => ({
  position: "absolute",
  left: 0,
  bottom: 0,
  height: "2px",
  width: "1px",
  transformOrigin: "0 0",
  transition: "0.5s cubic-bezier(0.175, 0.5, 0.12, 1)",
  backgroundColor: props.theme.colors.blue.dark,
  transform: `translateX(${props.left}px) scale(${props.width}, 1)`,
});

const ThemedTabs = styled("div")(tabsStyle);

const ThemedTabsItems = styled("div")(tabsItemsStyle);

const ThemedTabsIndicator = styled("div")(tabsIndicatorStyle);

export { ThemedTabs, ThemedTabsItems, ThemedTabsIndicator };
