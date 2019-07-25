import React from "react";
import Button from "@src/components/UI/Button";
import { storiesOf } from "@storybook/react";
import useActivify from "./useActivify";
import Docs from "./useActivify.mdx";

const stories = storiesOf("Components|Hooks/useActivify", module);

stories.add("Documentation", () => <Docs />);

export function ActivifiedComponent({ active }) {
  const { visible, enabled } = useActivify(active);
  if (!enabled) return null;
  return (
    <div
      data-testid="content"
      style={{
        opacity: visible ? 1 : 0,
        transition: "0.2s ease-out",
      }}
    >
      I am activified content
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
      <ActivifiedComponent active={active} />
    </div>
  );
}

TestComponent.__codeString = `
  function ActivifiedComponent({ active }) {
    const { visible, enabled } = useActivify(active);
    if (!enabled) return null;
    return (
      <div
        style={{
          opacity: visible ? 1 : 0,
          transition: '0.2s ease-out',
        }}
      >
        I am activified content
      </div>
    );
  }
  
  export function TestComponent() {
    const [active, setActive] = React.useState();
    return (
      <div>
        <Button onClick={() => setActive(!active)}>
          {active ? 'Deactivate' : 'Activate'}
        </Button>
        <ActivifiedComponent active={active} />
      </div>
    );
  }
`;
