import React from "react";
import { storiesOf } from "@storybook/react";
import Docs from "./NumberCounter.mdx";

import NumberCounter from "./NumberCounter";

storiesOf("Components|Inputs/NumberCounter", module)
  .add("Single", () => {
    const story = <NumberCounterWrapper />;
    return story;
  })
  .add("Documentation", () => <Docs />);

class NumberCounterWrapper extends React.Component {
  state = {
    value: 0,
  };

  render() {
    return (
      <NumberCounter
        label="Select Time"
        placeholder="Select..."
        value={this.state.value}
        onChange={value => this.setState({ value })}
        max={10}
      />
    );
  }
}
