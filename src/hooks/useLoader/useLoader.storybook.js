import React from "react";
import { storiesOf } from "@storybook/react";
import Button from "@src/components/UI/Button";

import useLoader from "./useLoader";
import Docs from "./useLoader.mdx";

const stories = storiesOf("Components|Hooks/useLoader", module);

stories.add("Documentation", () => <Docs />);

export function WithLoader({ loading }) {
  const { renderLoader, activateLoader, deactivateLoader } = useLoader(loading);
  return (
    <div
      data-testid="content"
      style={{
        position: "relative",
        border: "1px solid #DDD",
        padding: 8,
        margin: 8,
      }}
    >
      {renderLoader()}
      This content has a loader
      <Button onClick={activateLoader}>Activate from inside too!</Button>
    </div>
  );
}

export function TestComponent() {
  const [active, setActive] = React.useState();
  return (
    <div>
      <Button onClick={() => setActive(!active)}>
        {active ? "Deactivate" : "Activate"}
      </Button>
      <WithLoader loading={active} />
    </div>
  );
}

TestComponent.__codeString = `
  function WithLoader({ loading }) {
    const { renderLoader, activateLoader, deactivateLoader } = useLoader(loading);
    return (
      <div style={{ position: 'relative' }}>
        {renderLoader()}
        This content has a loader
        <button onClick={activateLoader}>Activate from inside too!</button>
      </div>
    );
  }

  function TestComponent() {
    const [active, setActive] = React.useState();
    return (
      <div>
        <button onClick={() => setActive(!active)}>
          {active ? 'Deactivate' : 'Activate'}
        </button>
        <WithLoader loading={active} />
      </div>
    );
  }
`;
