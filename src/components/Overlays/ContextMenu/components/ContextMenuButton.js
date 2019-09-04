import React from "react";
import PropTypes from "prop-types";

import Button from "components/UI/Button";
import Icon from "components/UI/Icon";

import ContextMenuPortal from "./ContextMenuPortal";
import styles from "./ContextMenuButton.scss";

class ContextMenuButton extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false,
    };
  }

  render() {
    const {
      className,
      offset,
      children,
      title,
      size,
      prefixClassName,
    } = this.props;
    return (
      <>
        <ContextMenuPortal
          active={this.state.active}
          attachTo={this._contextMenuIcon}
          offset={offset}
          onClose={this.handleClose}
          prefixClassName={`${prefixClassName}-portal`}
        >
          {typeof children === "function"
            ? children(this.handleClose)
            : children}
        </ContextMenuPortal>
        <Button
          size={size}
          style={{ cursor: "pointer" }}
          onClick={this._handleClick}
          className={`${prefixClassName} ${className}`}
          innerRef={DOMElement => {
            this._contextMenuIcon = DOMElement;
          }}
        >
          {title}
          <Icon
            prefixClassName={`${prefixClassName}-icon`}
            className={styles.contextMenuButtonIcon}
            src="angle-down"
          />
        </Button>
      </>
    );
  }

  _handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ active: true });
  };

  handleClose = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ active: false });
  };
}

ContextMenuButton.propTypes = {
  /** Outermost className */
  className: PropTypes.string,
  /** className appended to each of the elements */
  prefixClassName: PropTypes.string,
  /** What needs to be rendered inside the context menu */
  children: PropTypes.node,
  /** Offset prop to adjust the element's position */
  offset: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
  }),
  /** The size of the button */
  size: PropTypes.number,
  /** The title of the button */
  title: PropTypes.string,
};

ContextMenuButton.defaultProps = {
  className: "",
  prefixClassName: "",
  offset: null,
  size: 0,
  title: "",
};

ContextMenuButton.classNames = {
  $prefix: "Outermost className (button)",
  "$prefix-icon": "the down arrow on the button",
  "$prefix-portal": "className for the portal",
  "$prefix-portal-overlay": "overlay",
  "$prefix-portal-context-menu": "wrapping content div",
  "$prefix-portal-context-menu-content": "the actual content div",
};

export default ContextMenuButton;
