import React from "react";
import { storiesOf } from "@storybook/react";

import File from "./File";

storiesOf("Components|Inputs/File", module)
  .add("Single Image", () => {
    const story = <File onChange={console.log} />;
    return story;
  })
  .add("Multiple Images", () => {
    const story = <File onChange={console.log} multiple />;
    return story;
  })
  .add("File", () => {
    const story = <FileTest />;
    return story;
  });

class FileTest extends React.Component {
  state = {
    value: "",
  };

  render() {
    return (
      <File
        value={this.state.value}
        onChange={value => this.setState({ value })}
        type="file"
      />
    );
  }
}
