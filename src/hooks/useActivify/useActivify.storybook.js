import React from "react";
import { storiesOf } from "@storybook/react";
import useActivify from "./useActivify";

const stories = storiesOf("Components|Hooks/useActivify", module);

stories.add("Default", () => <TestComponent />);

function ActivifiedComponent({ active }) {
  const { visible, enabled } = useActivify(active);
  if (!enabled) return null;
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: "0.2s ease-out",
      }}
    >
      I am activified content
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
      <ActivifiedComponent active={active} />
    </div>
  );
}
