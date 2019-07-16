import React from "react";
import { storiesOf } from "@storybook/react";

import Odometer from "./Odometer";
import Docs from "./Odometer.mdx";

storiesOf("Components|UI/Odometer").add("Documentation", () => <Docs />);

export class OdometerTest extends React.Component {
  state = {
    value: 10,
  };

  componentDidMount = () => {
    this._interval = setInterval(
      () => this.setState({ value: this.state.value + 1 }),
      2000,
    );
  };

  componentWillUnmount = () => {
    clearInterval(this._interval);
  };

  render() {
    return <Odometer fontSize={24}>{this.state.value}</Odometer>;
  }
}

OdometerTest.__codeString = `
  <Odometer fontSize={24}>{0}</Odometer>
`;
