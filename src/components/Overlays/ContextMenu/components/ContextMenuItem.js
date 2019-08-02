import React from "react";
import PropTypes from "prop-types";
import Icon from "components/UI/Icon";
import styles from "./ContextMenuItem.scss";

const ContextMenuItem = ({
  title,
  icon,
  iconType,
  iconSize,
  onClick,
  disabled,
  children,
  size,
  href,
  className,
  prefixClassName,
}) => {
  const bigClassName = size === "big" ? styles.big : "";
  const Tag = href ? "a" : "div";
  return (
    <Tag
      data-testid="context-menu-item"
      href={href}
      target="_blank"
      onClick={onClick}
      className={`${styles.contextMenuItem} ${
        disabled ? styles.disabled : ""
      } ${className} ${prefixClassName}`}
    >
      <Icon
        size={iconSize}
        className={`${styles.contextMenuItemIcon} ${prefixClassName}-icon`}
        src={iconType || icon}
      />
      <span
        className={`${styles.contextMenuItemText} ${bigClassName} ${prefixClassName}-text`}
      >
        {title || children}
      </span>
    </Tag>
  );
};

ContextMenuItem.propTypes = {
  /** The name of the context menu item (display text) */
  title: PropTypes.string,
  /** The icon to display next to the display text */
  icon: PropTypes.node,
  /** If using a pre-existing icon */
  iconType: PropTypes.string,
  /** The size of the icon */
  iconSize: PropTypes.number,
  /** onClick callback */
  onClick: PropTypes.func,
  /** Whether the item is disabled or not */
  disabled: PropTypes.bool,
  /** Display text (same as the title prop) */
  children: PropTypes.node,
  /** The size of the item (big/small) */
  size: PropTypes.string,
  /** If the context menu item should be a link instead */
  href: PropTypes.string,
  /** Outermost className */
  className: PropTypes.string,
  /** className appended to each of the elements */
  prefixClassName: PropTypes.string,
};

ContextMenuItem.defaultProps = {
  title: "",
  iconType: "",
  className: "",
  prefixClassName: "",
  icon: null,
  iconSize: 24,
  onClick: () => {},
  disabled: false,
  children: null,
  size: "small",
  href: null,
};

ContextMenuItem.classNames = {
  $prefix: "Outermost element",
  "$prefix-icon": "The icon",
  "$prefix-text": "The text",
};

export default ContextMenuItem;
