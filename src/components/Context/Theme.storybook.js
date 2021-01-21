import React from "react";
import { storiesOf } from "@storybook/react";
import Provider from "./Provider";
import Button from "../UI/Button/Button";

storiesOf("Theme/Spec", module).add("Color variants", () => {
  const story = (
    <Provider>
      <Button themed size="regular">
        Theme Button - Default
      </Button>
      <br />
      <Button themed size="regular" variant="success">
        Theme Button - Success
      </Button>
      <br />
      <Button themed size="regular" variant="danger">
        Theme Button - Danger
      </Button>
      <br />
      <Button themed size="regular" variant="disabled">
        Theme Button - Disabled
      </Button>
    </Provider>
  );
  return story;
});

storiesOf("Theme/Spec", module).add("Size variants", () => {
  const story = (
    <Provider>
      <Button themed size="small">
        Theme Button - small
      </Button>
      <br />
      <Button themed size="regular">
        Theme Button - regular
      </Button>
      <br />
      <Button themed size="large">
        Theme Button - large
      </Button>
    </Provider>
  );
  return story;
});
