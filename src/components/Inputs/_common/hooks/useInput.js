import { useState } from "react";

export function useInput(inputDOM, onFocus, onBlur) {
  const [focused, setFocused] = useState(false);
  const handleFocus = e => {
    e.preventDefault();
    setFocused(true);
    onFocus(e);
  };

  const handleBlur = e => {
    setFocused(false);
    onBlur(e);
  };

  return {
    focused,
    setFocused,
    handleFocus,
    handleBlur,
  };
}
