import React from "react";
import { Portal } from "react-portal";
import PropTypes from "prop-types";
// import { Activify } from 'decorators';

import styles from "./SearchDropdown.scss";

// @Activify()
class SearchDropdown extends React.Component {
  render() {
    return <Portal>{this.renderPortalContainer()}</Portal>;
  }

  renderPortalContainer() {
    const activeClassName = this.props.active ? styles.active : "";
    const focusedClassName = this.props.focused ? styles.focused : "";
    const rect = this.props.attachTo.current.getBoundingClientRect();
    let reverseMode = false;

    const position = {
      top: rect.top + window.scrollY,
      left: rect.left,
      width: rect.width,
    };

    if (rect.bottom + 150 >= window.innerHeight) {
      reverseMode = true;
      position.top = "none";
      position.bottom = window.innerHeight - rect.top + window.scrollY - 1;
    }

    const reverseModeClassName = reverseMode ? styles.reverse : "";

    return (
      <div className={`${styles.dropdownOptionsWrapper}`}>
        <div
          className={styles.dropdownOptionsOverlay}
          onClick={this.props.onClose}
        />
        <div
          style={position}
          className={`${styles.dropdownOptions} ${activeClassName} ${focusedClassName} ${reverseModeClassName}`}
        >
          <div className={`${styles.dropdownOptionsInner}`}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

SearchDropdown.propTypes = {
  children: PropTypes.node,
  attachTo: PropTypes.object,
  onClose: PropTypes.func,
  active: PropTypes.bool,
  focused: PropTypes.bool,
};

export default SearchDropdown;
