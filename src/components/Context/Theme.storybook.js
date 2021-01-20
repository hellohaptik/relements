import React from "react";
import { storiesOf } from "@storybook/react";
import Provider from "./Provider";
import Button from "../UI/Button/Button";

storiesOf("Theme/Spec", module).add("Default", () => {
  const story = (
    <Provider>
      <Button
        themed
        bg="blue.haptik"
        color="white"
        fontSize={2}
        borderRadius="2"
        borderWidth="0"
        px="3"
        py="2"
      >
        Theme Button - Regular
      </Button>
      <br />
      <br />
      <Button
        themed
        bg="red.haptik"
        color="white"
        fontSize={3}
        borderRadius="2"
        borderWidth="0"
        px="4"
        py="3"
      >
        Theme Button - Large
      </Button>
    </Provider>
  );
  return story;
});
