import React from "react";
import { storiesOf } from "@storybook/react";
import useLoader from "./useLoader";

const stories = storiesOf("Components|Hooks/useLoader", module);

stories.add("Default", () => <TestComponent />);

function WithLoader({ loading }) {
  const { renderLoader, activateLoader, deactivateLoader } = useLoader(loading);
  return (
    <div style={{ position: "relative" }}>
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
        {active ? "Deactivate" : "Activate"}
      </button>
      <WithLoader loading={active} />
    </div>
  );
}
