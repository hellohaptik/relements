import React from "react";

import Button from "components/UI/Button";
import Tooltip from "./Tooltip";

const TestComp = () => {
  const ref = React.createRef();
  const [active, setActive] = React.useState(false);

  return (
    <div>
      <Button
        themed
        variant="secondary"
        innerRef={ref}
        onClick={() => setActive(true)}
      >
        Open Themed Tooltip
      </Button>
      <Tooltip
        attachTo={ref}
        themed
        onClose={() => setActive(false)}
        active={active}
      >
        <div>This is how I will look.</div>
      </Tooltip>
    </div>
  );
};

export default TestComp;
