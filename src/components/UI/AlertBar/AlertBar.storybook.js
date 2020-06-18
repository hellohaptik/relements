import React from "react";
import { storiesOf } from "@storybook/react";
import Docs from "./AlertBar.mdx";
import AlertBar from "./AlertBar";
import Button from "../Button/Button";

export class AlertBarPlayground extends React.Component {
  state = {
    active: false,
  };

  toggleAlertBar = () => {
    this.setState({
      active: !this.state.active,
    });
  };

  render() {
    const { active } = this.state;
    return (
      <div>
        <AlertBar
          message={`This is a test. Go mad! (You can just do active/inactive btw) 🥳`}
          type="success"
          active={active}
        />
        <br />
        <Button onClick={this.toggleAlertBar}>
          {!active ? "Show" : "Hide"} Alert Bar
        </Button>
      </div>
    );
  }
}

storiesOf("Components|UI/AlertBar", module)
  .add("Documentation", () => <Docs />)
  .add("Playground", () => <AlertBarPlayground />);
