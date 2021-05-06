import styled from "styled-components";

const tabsItemsStyle = props => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingRight: props.theme.space.md,
  paddingLeft: props.theme.space.md,
  paddingTop: props.theme.space.sm,
  paddingBottom: props.theme.space.sm,
  cursor: "pointer",
  opacity: "0.75",
  transition: "0.2s ease-out",
  "&:hover": {
    opacity: 1,
  },
  "&.active": {
    opacity: 1,
  },
  "&.disabled": {
    opacity: 0.2,
    pointerEvents: "none",
  },
});

const ThemedTabsItems = styled("div")(tabsItemsStyle);

export default ThemedTabsItems;
