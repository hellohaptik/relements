import React from "react";
import { storiesOf } from "@storybook/react";
import Provider from "./Provider";
import Button from "../UI/Button/Button";
import Text from "../UI/Text";

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

storiesOf("Theme/Spec", module).add("Typography size variants", () => {
  const story = (
    <Provider>
      <Text size="xSmall">Extra Small - Lorem ipsum dolor sit amet.</Text>
      <br />
      <Text size="small">Small - Lorem ipsum dolor sit amet.</Text>
      <br />
      <Text size="regular">Regular - Lorem ipsum dolor sit amet.</Text>
      <br />
      <Text size="large">Large - Lorem ipsum dolor sit amet.</Text>
      <br />
    </Provider>
  );
  return story;
});

storiesOf("Theme/Spec", module).add("Typography color variants", () => {
  const story = (
    <Provider>
      <Text size="regular">Default - Lorem ipsum dolor sit amet.</Text>
      <br />
      <Text size="regular" variant="primary">
        Primary - Lorem ipsum dolor sit amet.
      </Text>
      <br />
      <Text size="regular" variant="success">
        Success - Lorem ipsum dolor sit amet.
      </Text>
      <br />
      <Text size="regular" variant="danger">
        Danger - Lorem ipsum dolor sit amet.
      </Text>
      <br />
      <Text size="regular" variant="muted">
        Muted - Lorem ipsum dolor sit amet.
      </Text>
      <br />
    </Provider>
  );
  return story;
});
