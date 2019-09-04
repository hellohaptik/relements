import React from "react";
import PropTypes from "prop-types";
import Fuse from "fuse.js";

import { KEY_CODES } from "constants/key_codes";
import Icon from "components/UI/Icon";
import SearchIcon from "icons/search.svg";

import styles from "./Search.scss";

export default class Search extends React.Component {
  fuseOptions = {
    shouldSort: true,
    threshold: 0.2,
    tokenize: true,
    matchAllTokens: true,
    findAllMatches: true,
    location: 0,
    distance: 50,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["title"],
  };

  constructor() {
    super();
    this.state = {
      active: false,
      searchTerm: this.props.searchTerm,
    };
  }

  componentDidMount() {
    this.fuseOptions.keys = this.props.searchKeys;
    this._fuse = new Fuse(this.props.options || [], this.fuseOptions);
  }

  componentWillReceiveProps(nextProps) {
    this._fuse = new Fuse(this.props.options || [], this.fuseOptions);

    if (this.props.searchTerm !== nextProps.searchTerm) {
      this._search(undefined, nextProps.searchTerm);
    }
  }

  /**
   * Render
   * @return {[type]} [description]
   */

  renderHint() {
    return (
      <div className={styles.hint} onClick={this._focusDiv}>
        {this.props.hint}
      </div>
    );
  }

  render() {
    const activeClassName = this.state.active ? styles.active : "";
    const withDropdownClassName = this.props.withDropdown
      ? styles.withDropdown
      : "";
    const parentClass = this.props.className || "";

    return (
      <div
        ref={this.props.innerRef}
        className={`${styles.searchWrapper} ${parentClass}`}
      >
        <div
          className={`${styles.search} ${withDropdownClassName} ${activeClassName}`}
        >
          <Icon src={{ default: SearchIcon }} className={styles.searchIcon} />
          <input
            ref={DOMElement => {
              this._input = DOMElement;
            }}
            onFocus={this._activate}
            onBlur={this._deactivate}
            type="text"
            placeholder={this.props.placeholder}
            className={styles.searchInput}
            onChange={this._search}
            onKeyUp={this._onKeyUp}
            onKeyDown={this.props.onKeyDown}
            value={this.state.searchTerm}
            autoFocus={this.props.autoFocus}
          />
          {this.props.hintPosition === "INSIDE" ? this.renderHint() : null}
        </div>
        <div>
          {this.props.hintPosition === "OUTSIDE" ? this.renderHint() : null}
        </div>
      </div>
    );
  }

  _focusDiv = () => {
    this._input.focus();
  };

  _activate = () => {
    this.setState({ active: true });
    if (this.props.dropdownRef) this.props.dropdownRef.current._enable();
  };

  _deactivate = () => {
    this.setState({ active: false });
    if (this.props.dropdownRef) this.props.dropdownRef.current._disable();
  };

  _search = (e, alternateText) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const searchTerm = e ? e.target.value : alternateText;
    if (searchTerm.length === 0 && this.props.onChange) {
      this.props.onChange(this.props.options);
    } else if (this.props.onChange) {
      this.props.onChange(this._fuse.search(searchTerm));
    }

    if (this.props.onType) {
      this.props.onType(searchTerm);
    }

    this.setState({ searchTerm });
  };

  _onKeyUp = e => {
    if (e.keyCode === KEY_CODES.ENTER && this.props.onSubmit) {
      this.props.onSubmit(this.state.searchTerm);
    }
  };
}

Search.propTypes = {
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  searchKeys: PropTypes.array,
  options: PropTypes.array,
  autoFocus: PropTypes.bool,
  withDropdown: PropTypes.bool,
  className: PropTypes.string,
  hint: PropTypes.string,
  hintPosition: PropTypes.string,
  searchTerm: PropTypes.string,
  innerRef: PropTypes.object,
  dropdownRef: PropTypes.object,
  onType: PropTypes.func,
  onKeyDown: PropTypes.func,
};

Search.defaultProps = {
  hintPosition: "INSIDE",
};
