import React from 'react';

import { KEY_CODES } from 'constants';
import Search from './Search';
import SearchDropdown from './SearchDropdown';

export default class SearchWithDropdown extends React.Component {
  constructor(props) {
    super(props);
    this._Search = React.createRef();
    this._SearchDropdown = React.createRef();
    this._dropdownOptionsDOMs = [];

    this.state = {
      activeIndex: 0,
    };
  }

  render() {
    return (
      <>
        <Search
          {...this.props}
          onKeyDown={this._handleKeyDown}
          innerRef={this._Search}
          dropdownRef={this._SearchDropdown}
          withDropdown
          searchTerm={this.props.value}
        />
        <SearchDropdown ref={this._SearchDropdown} attachTo={this._Search}>
          {React.Children.map(this.props.children, (child, i) => React.cloneElement(child, {
            selected: i === this.state.activeIndex,
            innerRef: (DOMNode) => {
              this._dropdownOptionsDOMs[i] = DOMNode;
            },
          }))}
        </SearchDropdown>
      </>
    );
  }

  _handleKeyDown = (e) => {
    const activeIndex = this.state.activeIndex;

    switch (e.keyCode) {
      case KEY_CODES.DOWN:
        e.preventDefault();
        return this._changeActiveIndex(activeIndex + 1);
      case KEY_CODES.UP:
        e.preventDefault();
        return this._changeActiveIndex(activeIndex - 1);
      case KEY_CODES.ENTER:
        e.preventDefault();
        return this._onDropdownClick(this.props.options[activeIndex]);
      default:
        return null;
    }
  };

  _changeActiveIndex = (newIndex) => {
    if (newIndex >= React.Children.count) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = React.Children.count - 1;
    }

    this._dropdownOptionsDOMs[newIndex].scrollIntoView(false);
    this.setState({ activeIndex: newIndex });
  };

  _calculateActiveIndex = (props) => {
    const { options, optionKey = 'text', value } = props;
    options.map((option, i) => {
      if (value && option[optionKey] === value[optionKey]) {
        this.setState({ activeIndex: i });
      }
    });
  };
}
