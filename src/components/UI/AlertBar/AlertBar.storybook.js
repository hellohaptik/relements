import React from "react";
import { storiesOf } from "@storybook/react";
import Docs from "./AlertBar.mdx";
import AlertBar from "./AlertBar";
import Button from "../Button/Button";

export class AlertBarPlayground extends React.Component {
  state = {
    active: false,
  };

  toggleAlertBar = status => {
    this.setState({
      active: status,
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
          onDismiss={status => this.toggleAlertBar(status)}
        />
        <Button onClick={() => this.toggleAlertBar(true)}>
          Show Alert Bar
        </Button>
      </div>
    );
  }
}

storiesOf("Components|UI/AlertBar", module)
  .add("Documentation", () => <Docs />)
  .add("Playground", () => <AlertBarPlayground />);
