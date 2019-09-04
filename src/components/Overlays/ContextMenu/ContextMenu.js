import React from "react";
import PropTypes from "prop-types";

import ContextMenuPortal from "./components/ContextMenuPortal";
import ContextMenuItem from "./components/ContextMenuItem";
import ContextMenuButton from "./components/ContextMenuButton";
import ContextMenuIcon from "./components/ContextMenuIcon";

const ContextMenu = props => {
  // it warrants it here since this is just a wrapper
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ContextMenuPortal {...props} />;
};

ContextMenu.Item = ContextMenuItem;
ContextMenu.Button = ContextMenuButton;
ContextMenu.Icon = ContextMenuIcon;

ContextMenu.propTypes = {
  /** Whether the context menu is active or not */
  active: PropTypes.bool,
  /** What needs to be rendered inside the context menu */
  children: PropTypes.node,
  /** Outermost className */
  className: PropTypes.string,
  /** className appended to each of the elements */
  prefixClassName: PropTypes.string,
  /** The DOM Element to attach the context menu to */
  attachTo: PropTypes.object,
  /** The onClose callback */
  onClose: PropTypes.func,
  /** Offset prop to adjust the element's position */
  offset: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
  }),
};

ContextMenu.defaultProps = {
  active: false,
  className: "",
  prefixClassName: "",
  attachTo: {},
  onClose: () => {},
  offset: null,
};

ContextMenu.classNames = {
  $prefix: "portal element",
  "$prefix-overlay": "overlay",
  "$prefix-context-menu": "wrapping content div",
  "$prefix-context-menu-content": "the actual content div",
};

export default ContextMenu;
