import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import Provider from "./Provider";
import Button from "../UI/Button/Button";
import Text from "../UI/Text";

import Table from "../UI/Table/Table";
import { DATA } from "../UI/Table/Table.storybook";
import Box from "../UI/Box";
import Toggle from "../Inputs/Toggle/Toggle";

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

storiesOf("Theme/Spec", module).add("Button Click Events", () => {
  const story = (
    <Provider>
      <Button
        themed
        size="regular"
        onClick={() => {
          alert("Clicked default");
        }}
      >
        Default
      </Button>
      <br />
      <Button
        themed
        size="regular"
        variant="success"
        onClick={() => {
          alert("Clicked success");
        }}
      >
        Success
      </Button>
      <br />
      <Button themed size="regular" variant="disabled">
        Disabled
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
      <Text variant="tertiary">Tertiary - Lorem ipsum dolor sit amet.</Text>
      <br />
      <Text variant="secondary">Secondary - Lorem ipsum dolor sit amet.</Text>
      <br />
      <Text variant="body">Body - Lorem ipsum dolor sit amet.</Text>
      <br />
      <Text variant="heading">Heading - Lorem ipsum dolor sit amet.</Text>
      <br />
    </Provider>
  );
  return story;
});

storiesOf("Theme/Spec", module).add("Typography color variants", () => {
  const story = (
    <Provider>
      <Text>Default - Lorem ipsum dolor sit amet.</Text>
      <br />
      <Text color="blue.haptik">Primary - Lorem ipsum dolor sit amet.</Text>
      <br />
      <Text color="green.haptik">Success - Lorem ipsum dolor sit amet.</Text>
      <br />
      <Text color="red.haptik">Danger - Lorem ipsum dolor sit amet.</Text>
      <br />
      <Text color="grey.haptik">Muted - Lorem ipsum dolor sit amet.</Text>
      <br />
    </Provider>
  );
  return story;
});

storiesOf("Theme/Spec", module).add("Table color variants", () => {
  const tableProps = {
    sortable: true,
    sortKey: "title",
    sortOrder: -1,
    columns: DATA.columns,
    rows: DATA.data,
  };
  const story = (
    <Provider>
      <h3>Not themed</h3>
      <Table {...tableProps} />
      <br />
      <h3>Default</h3>
      <Table themed {...tableProps} />
      <br />
      <h3>Compact</h3>
      <Table themed space="compact" fontSize="sm" {...tableProps} />
      <br />
      <h3>No border</h3>
      <Table themed appearance="noBorder" {...tableProps} />
      <br />
      <h3>Extra small text</h3>
      <Table themed appearance="noBorder" fontSize="xs" {...tableProps} />
      <br />
    </Provider>
  );
  return story;
});

storiesOf("Theme/Spec", module).add("Color modes", () => {
  const [mode, setMode] = useState("dark");
  const tableProps = {
    sortable: true,
    sortKey: "title",
    sortOrder: -1,
    columns: DATA.columns,
    rows: DATA.data,
  };
  const story = (
    <React.Fragment>
      <Toggle
        value={mode === "dark"}
        onChange={() => setMode(mode === "dark" ? "light" : "dark")}
      />
      <br />
      <Provider mode={mode}>
        <Box borderRadius="2" padding="md">
          <Text fontSize="md">Color modes</Text>
          <Table themed {...tableProps} />
        </Box>
      </Provider>
    </React.Fragment>
  );
  return story;
});
