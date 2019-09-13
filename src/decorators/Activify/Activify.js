import React from "react";
import useActivify from "@src/hooks/useActivify";

const Activify = () => WrappedComponent => {
  // eslint-disable-next-line react/prop-types
  return ({ active, ...props }) => {
    const { visible, enabled } = useActivify(active);
    if (!enabled) return null;
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent {...props} active={visible} />;
  };
};

export default Activify;
