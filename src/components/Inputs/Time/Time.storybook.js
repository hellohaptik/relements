import React from "react";
import { storiesOf } from "@storybook/react";

import TimePicker from "./Time";

storiesOf("Inputs/Time", module)
  .add("Single", () => {
    const story = <TimeWrapper />;
    return story;
  })
  .add("Range", () => {
    const story = <TimeWrapper />;
    return story;
  });

class TimeWrapper extends React.Component {
  state = {
    value: new Date(),
  };

  render() {
    console.log("VALUE", this.state.value);
    return (
      <TimePicker
        label="Select Time"
        placeholder="Select..."
        value={this.state.value}
        onChange={value => this.setState({ value })}
        minTime={new Date()}
      />
    );
  }
}
