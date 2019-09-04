import React from "react";
import PropTypes from "prop-types";
import Icon from "components/UI/Icon";

import ContextMenuPortal from "./ContextMenuPortal";

class ContextMenuIcon extends React.Component {
  state = {
    active: false,
  };

  render() {
    const {
      className,
      offset,
      children,
      iconType,
      iconComponent,
      maxHeight,
      prefixClassName,
    } = this.props;
    return (
      <React.Fragment>
        {iconComponent ? (
          React.cloneElement(iconComponent, {
            onClick: this._handleClick,
            ref: DOMElement => {
              this._contextMenuIcon = DOMElement;
            },
          })
        ) : (
          <Icon
            prefixClassName={`${prefixClassName}`}
            style={{ cursor: "pointer" }}
            onClick={this._handleClick}
            src={iconType}
            className={className}
            innerRef={DOMElement => {
              this._contextMenuIcon = DOMElement;
            }}
          />
        )}
        <ContextMenuPortal
          active={this.state.active}
          attachTo={this._contextMenuIcon}
          offset={offset}
          onClose={this._handleOverlayClick}
          maxHeight={maxHeight}
          prefixClassName={`${prefixClassName}-portal`}
        >
          {typeof children === "function"
            ? children(this._handleOverlayClick)
            : children}
        </ContextMenuPortal>
      </React.Fragment>
    );
  }

  _handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ active: true });
  };

  _handleOverlayClick = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ active: false });
  };
}

ContextMenuIcon.propTypes = {
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
  maxHeight: PropTypes.number,
  /** The icon type (string) */
  iconType: PropTypes.string,
  /** The icon component in case some other component needs to be rendered */
  iconComponent: PropTypes.string,
};

ContextMenuIcon.defaultProps = {
  offset: {
    left: 0,
    top: 0,
  },
  children: null,
  className: "",
  prefixClassName: "",
  maxHeight: 200,
  iconType: "circle-more",
  iconComponent: null,
};

ContextMenuIcon.classNames = {
  $prefix: "Outermost className (icon)",
  "$prefix-portal": "className for the portal",
  "$prefix-portal-overlay": "overlay",
  "$prefix-portal-context-menu": "wrapping content div",
  "$prefix-portal-context-menu-content": "the actual content div",
};

export default ContextMenuIcon;
