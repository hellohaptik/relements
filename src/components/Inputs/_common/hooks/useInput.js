import { useState } from "react";

export function useInput(inputDOM, onFocus, onBlur) {
  let _timeout;
  const [focused, setFocused] = useState(false);
  const handleFocus = e => {
    e.preventDefault();
    setFocused(true);
    inputDOM.current && inputDOM.current.focus();
    onFocus(e);
  };

  const handleBlur = e => {
    if (_timeout) clearTimeout(_timeout);
    setFocused(false);
    inputDOM.current && inputDOM.current.blur();
    onBlur(e);
  };

  return {
    focused,
    setFocused,
    handleFocus,
    handleBlur,
  };
}
