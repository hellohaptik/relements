import React, { useState } from "react";
import { CodeBlock } from "@src/helpers/DocBlocks";
import { storiesOf } from "@storybook/react";
import Provider from "./Provider";
import Button from "../UI/Button/Button";
import Text from "../UI/Text";

import Table from "../UI/Table/Table";
import Tooltip from "../Overlays/Tooltip/Tooltip";
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

storiesOf("Theme/Spec", module).add("Table variants", () => {
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
      <Table themed space="compact" {...tableProps} />
      <br />
      <h3>Sparse</h3>
      <Table themed space="sparse" {...tableProps} />
      <br />
      <h3>No border</h3>
      <Table themed appearance="noBorder" {...tableProps} />
      <br />
      <h3>Alternate row background</h3>
      <Table themed rowBackground="alternate" {...tableProps} />
      <br />
      <h3>No border with alternate row background</h3>
      <Table
        themed
        appearance="noBorder"
        rowBackground="alternate"
        {...tableProps}
      />
      <br />
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

storiesOf("Theme/Spec", module).add("Tooltips", () => {
  const story = (
    <Provider>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "50% 50%",
          gridColumnGap: "15px",
        }}
      >
        <div>
          <h3>Default</h3>
          <CodeBlock>
            {(value, setValue, ref) => (
              <>
                <Button
                  themed
                  size="regular"
                  innerRef={ref}
                  onClick={() => setValue(true)}
                >
                  Open Tooltip
                </Button>
                <Tooltip
                  themed
                  attachTo={ref}
                  onClose={() => setValue(false)}
                  active={value}
                >
                  <div>Default Tooltip</div>
                </Tooltip>
              </>
            )}
          </CodeBlock>
        </div>

        <div>
          <h3>Default - Top</h3>
          <CodeBlock>
            {(value, setValue, ref) => (
              <>
                <Button
                  themed
                  size="regular"
                  innerRef={ref}
                  onClick={() => setValue(true)}
                >
                  Open Tooltip
                </Button>
                <Tooltip
                  themed
                  attachTo={ref}
                  onClose={() => setValue(false)}
                  active={value}
                  position="TOP"
                >
                  <div>Yoo! 🥳</div>
                </Tooltip>
              </>
            )}
          </CodeBlock>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "50% 50%",
          gridColumnGap: "15px",
        }}
      >
        <div>
          <h3>Success</h3>
          <CodeBlock>
            {(value, setValue, ref) => (
              <>
                <Button
                  themed
                  size="regular"
                  innerRef={ref}
                  onClick={() => setValue(true)}
                >
                  Open Tooltip
                </Button>
                <Tooltip
                  themed
                  variant="success"
                  attachTo={ref}
                  onClose={() => setValue(false)}
                  active={value}
                >
                  <div>Awesome! 😎</div>
                </Tooltip>
              </>
            )}
          </CodeBlock>
        </div>

        <div>
          <h3>Danger</h3>
          <CodeBlock>
            {(value, setValue, ref) => (
              <>
                <Button
                  themed
                  size="regular"
                  innerRef={ref}
                  onClick={() => setValue(true)}
                >
                  Open Tooltip
                </Button>
                <Tooltip
                  themed
                  variant="danger"
                  attachTo={ref}
                  onClose={() => setValue(false)}
                  active={value}
                >
                  <div>Careful! 😵</div>
                </Tooltip>
              </>
            )}
          </CodeBlock>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "50% 50%",
          gridColumnGap: "15px",
        }}
      >
        <div>
          <h3>Small Size</h3>
          <CodeBlock>
            {(value, setValue, ref) => (
              <>
                <Button
                  themed
                  size="regular"
                  innerRef={ref}
                  onClick={() => setValue(true)}
                >
                  Open Tooltip
                </Button>
                <Tooltip
                  themed
                  size="small"
                  attachTo={ref}
                  onClose={() => setValue(false)}
                  active={value}
                >
                  <div>Hey 🐭</div>
                </Tooltip>
              </>
            )}
          </CodeBlock>
        </div>

        <div>
          <h3>Large Size</h3>
          <CodeBlock>
            {(value, setValue, ref) => (
              <>
                <Button
                  themed
                  size="regular"
                  innerRef={ref}
                  onClick={() => setValue(true)}
                >
                  Open Tooltip
                </Button>
                <Tooltip
                  themed
                  size="large"
                  attachTo={ref}
                  onClose={() => setValue(false)}
                  active={value}
                >
                  <div>'sup? 🐘</div>
                </Tooltip>
              </>
            )}
          </CodeBlock>
        </div>
      </div>
    </Provider>
  );

  return story;
});
