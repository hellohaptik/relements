import React from "react";
import { storiesOf } from "@storybook/react";

import Docs from "./Time.mdx";
import Time from "./Time";

storiesOf("Components|Inputs/Time", module).add("Documentation", () => {
  const story = <Docs />;
  return story;
});

export class TimeWrapper extends React.Component {
  state = {
    value: new Date(),
  };

  render() {
    console.log("VALUE", this.state.value);
    return (
      <Time
        label="Select Time"
        placeholder="Select..."
        value={this.state.value}
        onChange={value => this.setState({ value })}
        minTime={new Date()}
      />
    );
  }
}
