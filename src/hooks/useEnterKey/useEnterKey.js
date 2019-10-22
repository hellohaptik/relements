import React from "react";
import { KEY_CODES } from "constants/key_codes";

export default function useEnterKey(onEnter, ref = { current: document }) {
  const handleKeyUp = React.useCallback(
    e => {
      if (e.keyCode === KEY_CODES.ENTER) {
        onEnter(e);
      }
    },
    [onEnter],
  );

  React.useEffect(() => {
    ref.current.addEventListener("keyup", handleKeyUp);
    return () => ref.current.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);
}
