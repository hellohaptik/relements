import React from "react";
import { storiesOf } from "@storybook/react";
import { KEY_CODES } from "constants";
import Button from "components/UI/Button";

import Search from "./Search";
import SearchWithDropdown from "./SearchWithDropdown";

storiesOf("Components|UI/Search", module)
  .add("Default", () => {
    const story = <Search placeholder="Search..." />;
    return story;
  })
  .add("With Button", () => {
    const story = (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button>Test</Button>
        <Search
          options={[{ title: "awesome" }, { title: "sauce" }]}
          onChange={console.log}
          placeholder="Search..."
        />
      </div>
    );
    return story;
  })
  .add("With Dropdown", () => {
    return <SearchDropdownTest />;
  });

class SearchDropdownTest extends React.Component {
  state = {
    searchTerm: "",
  };

  render() {
    const options = [
      { title: "awesome" },
      { title: "sauce" },
      { title: "sauce" },
      { title: "sauce" },
      { title: "sauce" },
      { title: "sauce" },
      { title: "sauce" },
      { title: "sauce" },
      { title: "sauce" },
    ];
    return (
      <div>
        <SearchWithDropdown onType={this._handleChange} placeholder="Search...">
          {options.map(this.renderRow)}
        </SearchWithDropdown>
      </div>
    );
  }

  renderRow(item, i) {
    const Component = ({ selected, innerRef }) => {
      return (
        <h1 onClick={() => console.log("YOOOOOO")} ref={innerRef}>
          {item.title}
        </h1>
      );
    };

    return <Component />;
  }

  _handleChange = searchTerm => {
    this.setState({ searchTerm });
  };
}
