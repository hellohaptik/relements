import React from "react";
import { storiesOf } from "@storybook/react";
import Docs from "./AlertBar.mdx";
import AlertBar from "./AlertBar";
import Button from "../Button/Button";

export class AlertBarPlayground extends React.Component {
  state = {
    showAlert: false,
  };

  showAlertBar = status => {
    this.setState({
      showAlert: status,
    });
  };

  render() {
    const { showAlert } = this.state;

    return (
      <div>
        <AlertBar
          message={`This is a test. Go mad! (You can just do active/inactive btw) 🥳`}
          type="success"
          active={showAlert}
          onDismiss={() => this.showAlertBar(false)}
        />
        <Button onClick={() => this.showAlertBar(true)}>Show Alert Bar</Button>
      </div>
    );
  }
}

storiesOf("Components|UI/AlertBar", module)
  .add("Documentation", () => <Docs />)
  .add("Playground", () => <AlertBarPlayground />);
